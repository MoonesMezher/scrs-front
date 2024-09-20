import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../api';
import ProductSearchCard from '../../components/ProductSearchCard/ProductSearchCard';
import { useEffect, useState } from 'react'
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import { useAccountHook } from '../../hooks/useAccountHook';
import checkFromToken from '../../helpers/checkFromTokenAsParams'

const Search = () => {
    const [products, setProducts] = useState()
    const [data, setData] = useState()

    const [loading, setLoading] = useState()

    const { type, account, id } = useParams()

    const { account: acc } = useAccountHook();

    const to = useNavigate()

    if(checkFromToken(acc, account)) {
        to('/code')
    }

    useEffect(() => {
        setLoading(true)

        axios.get(API.PRODUCT.GETALL, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('user')
            }
        })
            .then(res => {
                if(res.data.state === 'success') {
                    setData(res.data.data)
                    if(id) {
                        setProducts(res.data.data.filter(e => e.sectionId.toString() === id.toString()))
                    } else {
                        if(type === 'all-data') {
                            setProducts(res.data.data)                    
                        } else {
                            const newRegex = new RegExp(`.*${type}.*`, 'i')
                            setProducts(res.data.data.filter(e => newRegex.test(e.title)))
                        }
                    }
                }
            })
            .catch(err => {
                // console.log(err);
                if(err.response?.data.state === 'empty') {
                    localStorage.removeItem('user')
                    to('/code')
                }
            })
            .finally(res => {
                setLoading(false)
            })
    }, [type, id])

    return (
        <section>
            <div className="mx-auto">
                <div className="w-full relative overflow-hidden min-h-screen pt-[55px]">
                    <h1 className="text-center font-bold text-[1.5rem]">عرض النتائج</h1>
                    <Loading loading={loading}/>
                    <div className="grid-products pb-[50px] container mx-auto px-2 mt-[40px]">
                        {!loading && products && products.length !== 0 && products?.map((product,index) => <ProductSearchCard key={index} info={product} index={index}/>)}
                    </div>
                    {!loading && products && products.length === 0 && <h1 className='text-center text-[1.2rem]'>لا يوجد نتائج موافقة</h1>}
                </div>
            </div>
        </section>
    )
}

export default Search