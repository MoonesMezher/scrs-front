import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react"
import { API, main } from "../../api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAccountHook } from "../../hooks/useAccountHook";
import Toast from '../../components/Toast/Toast'
import SplashScreen from "../SplashScreen/SplashScreen";
import ErrorResponse from "../../components/ErrorResponse/ErrorResponse";
import Loading from "../../components/Loading/Loading";
import { SocketContext } from "../../context/socketContext";

const Check = ({ setUser }) => {
    const { account } = useParams()

    const { socket } = useContext(SocketContext);

    const to = useNavigate();
    
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(true)

    const { account: acc, dispatch } = useAccountHook();

    useEffect(() => {
        localStorage.removeItem('account');

        if(!account) {
            to('/code')
        }

        setLoadingPage(true)
        axios.get(API.ACCOUNT.GETBYTOKEN+account)
            .then(res => {
                if(res.data.state === 'success') {
                    dispatch({ type: 'ADD', payload: res.data.data })
                }
            })
            .catch(err => {
                if(err.response.data.state === 'block') {
                    to('/not-active')
                } else {
                    to('/code')
                }
            })
            .finally(res => {
                setTimeout(() => {
                    setLoadingPage(false)
                }, 4000)
            })
    }, []);

    const [show, setShow] = useState(false);
    const [code, setCode] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('user')) {
            axios.delete(API.USERS.DELETE, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('user')
                }
            })
                .then(res => {
                    localStorage.removeItem('user');
                })
                .catch(err => {

                })
        }
    }, [])

    const handleLogin = () => {
        setLoading(true);
        axios.post(API.USERS.ADD+account, {
            code
        })
            .then(res => {
                if(res.data.state === 'success') {
                    localStorage.setItem('user', res.data.token)
                    setUser(res.data.token);
                    socket?.emit('send', {accId: acc?.account?._id, type: 'tables'})
                    to('/show/'+account)
                }
            })
            .catch(err => {
                if(err.response.data.state === 'failed') {
                    setError(err.response.data.message)
                }
            })
            .finally(res => {
                setLoading(false);
            });
    }

    const handleLoginByKey = (e) => {
        if(e.key === 'Enter') {
            setLoading(true);
            axios.post(API.USERS.ADD+account, {
                code
            })
                .then(res => {
                    if(res.data.state === 'success') {
                        to('/show/'+account)
                    }
                })
                .catch(err => {
                    if(err.response.data.state === 'failed') {
                        setError(err.response.data.message)
                    }

                    // console.log(err)
                })
                .finally(res => {
                    setLoading(false);
                });
        }
    }

    const mainBtn = useRef();
    const secBtn = useRef();

    useEffect(() => {
        if(!loadingPage) {
            mainBtn.current.style.backgroundColor = acc?.account.mainColor
            secBtn.current.style.backgroundColor = acc?.account.mainColor
        }
    }, [acc, loadingPage])

    const  handleBack = () => {
        setShow(false)
        setCode("")
    }

    return (
        <div className="min-h-screen flex justify-center py-10 bg-white" dir="rtl">
            {loadingPage ? <SplashScreen/>: 
            <>
                <div className="text-center">
                    <div className="w-[120px] h-[120px] rounded-full shadow-md overflow-hidden mx-auto bg-white border">
                        <img src={main+acc?.account.image} alt="logo" className="w-full h-full"/>
                    </div>
                    <h1 className="text-[1.2rem] my-3">مرحبا بك في {acc?.account.title}</h1>
                    <div className="flex flex-col gap-3">
                        <Link to={'/view/'+account} className={`p-2 cursor-pointer rounded-md shadow-md font-bold duration:300 hover:scale-105 text-white ${acc?.services.find(e => e.name === 'View') ? 'block':'hidden'}`} ref={secBtn}>تصفح</Link>
                        <div className="p-2 cursor-pointer rounded-md shadow-md font-bold duration:300 hover:scale-105 text-white" onClick={() => setShow(true)} ref={mainBtn}>إدخال كود</div>
                    </div>
                </div>
                <Toast show={show} message={'أدخل الكود'}>
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} className="w-[250px] p-3 rounded-md shadow-md bg-[#eee] outline-noe focus:outline-none" onKeyDown={(e) => handleLoginByKey(e)} dir={'ltr'}/>
                    <Loading loading={loading}/>
                    <ErrorResponse error={error}/>
                    <div className="mt-2">
                        <div className="mx-auto p-2 rounded-md shadow-md w-[100px] text-center bg-green-500 text-white duration:300 cursor-pointer hover:scale-105" onClick={handleLogin}>إدخال</div>
                        <div className="mx-auto p-2 rounded-md shadow-md w-[100px] text-center mt-2 bg-red-500 text-white duration:300 cursor-pointer hover:scale-105" onClick={handleBack}>رجوع</div>
                    </div>
                </Toast>
            </>}
        </div>
    )
}

export default Check