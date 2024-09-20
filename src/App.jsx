import { useContext, useEffect, useState } from 'react'
import './App.css'
import './animate.css'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Layout from './layout/Layout'
import Show from './pages/Show/Show'
import ErrorPage from './pages/Error/Error'
import Home from './pages/Home/Home'
import Product from './pages/Product/Product'
import Shop from './pages/Shop/Shop'
import Admin from './pages/Admin/Admin'
import AdminList from './pages/AdminList/AdminList'
import Login from './pages/Login/Login'
import OwnerDash from './pages/OwnerDash/OwnerDash'
import OwnerMessages from './pages/OwnerMessages/OwnerMessages'
import OwnerOrders from './pages/OwnerOrders/OwnerOrders'
import AddSection from './pages/AddSection/AddSection'
import AddProduct from './pages/AddProduct/AddProduct'
import AdminSponsers from './pages/AdminSponsers/AdminSponsers'
import OwnerSettings from './pages/OwnerSettings/OwnerSettings'
import Search from './pages/Search/Search'
import SeeItems from './pages/SeeItems/SeeItems'
import NotActive from './pages/NotActive/NotActive'
import axios from 'axios'
import { API, main } from './api'
import OwnerStatistics from './pages/OwnerStatistics/OwnerStatistics'
import AdminServices from './pages/AdminServices/AdminServices'
import AdminServicesJoin from './pages/AdminServicesJoin/AdminServicesJoin'
import AdminServicesShow from './pages/AdminServicesShow/AdminServicesShow'
import OwnerTables from './pages/OwnerTables/OwnerTables'
import AllOrders from './pages/AllOrders/AllOrders'
import { io } from 'socket.io-client'
import { useAlertHooks } from './hooks/useAlertHooks'
import Check from './pages/Check/Check'
import { useAccountHook } from './hooks/useAccountHook'
import View from './pages/View/View'
import { SocketContext } from './context/socketContext'
import Code from './pages/Code/Code'

function App() {
    const { socket } = useContext(SocketContext);

    const { pathname } = useLocation();

    const { dispatch } = useAlertHooks(); 

    const { account } = useAccountHook();

    useEffect(() => {  
      socket?.on('recive', data => {
        // console.log("RECIVE:", data)
        if(data === 'messages') {
            dispatch({ type: 'ADD', payload: 2 })
        } else if(data === 'orders') {
            dispatch({ type: 'ADD', payload: 1 })
        } else {
            dispatch({ type: 'ADD', payload: 3 })
        }
      })
    }, [pathname])

    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminScrs'));
    const [ownerToken, setOwnerToken] = useState(localStorage.getItem('owner'));
    const [userToken, setUserToken] = useState(localStorage.getItem('user'));

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    const to = useNavigate();

    useEffect(() => {
      if(window.location?.pathname?.includes('/owner')) {
        to('/owner/dash')
      }
    }, [window.location]);

    useEffect(() => {
      if(window.location?.pathname?.includes('/admin') || window.location?.pathname?.includes('/view') || window.location?.pathname?.includes('/owner')) {
        return;
      }

      if(!account) {
        return;
      }

      axios.get(API.ACCOUNT.STATEUSER+account?.token, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('user')
        }
      })
        .then(res => {
        })
        .catch(err => {
          if(err.response?.data.state === 'empty') {
            localStorage.clear();
            to('/code')
          }
        })

        if(localStorage.getItem('owner')) {
          axios.get(API.ACCOUNT.STATEOWNER, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('owner')
            }
          })
            .then(res => {
            })
            .catch(err => {
              if(err.response?.data?.state === 'block') {
                  localStorage.removeItem('owner')
                  to('/not-active');
              }
              if(err.response?.data?.state === 'empty') {
                  localStorage.clear()
                  to('/login');
              }
            })
        }
    }, [pathname, account])

  return (
    <Layout>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/code' element={<Code/>}/>
      <Route path='/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' element={adminToken? <Admin/>: <Navigate to={'/login-admin'}/>}/>      
      <Route path='/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/:id' element={adminToken? <Admin/>: <Navigate to={'/login-admin'}/>}/>      
      <Route path='/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/list' element={adminToken? <AdminList/>: <Navigate to={'/login-admin'}/>}/>
      <Route path='/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/sponsers' element={adminToken? <AdminSponsers/>: <Navigate to={'/login-admin'}/>}/>
      <Route path='/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/services' element={adminToken? <AdminServices/>: <Navigate to={'/login-admin'}/>}/>
      <Route path='/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/services/:id' element={adminToken? <AdminServices/>: <Navigate to={'/login-admin'}/>}/>
      <Route path='/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/services/show' element={adminToken? <AdminServicesShow/>: <Navigate to={'/login-admin'}/>}/>
      <Route path='/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/services/join/:id' element={adminToken? <AdminServicesJoin/>: <Navigate to={'/login-admin'}/>}/>
      <Route path='/login-admin' element={adminToken? <Navigate to={'/admin/ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'}/>:<Login/>}/>            
      <Route path='/login' element={ownerToken? <Navigate to={'/owner/dash'}/>:<Login/>}/>            
      <Route path='/check/:account' element={<Check setUser={setUserToken}/>}/>      
      <Route path='/show/:account' element={userToken?<Show/>: <Navigate to={'/'}/>}/>      
      <Route path='/view/:account' element={<View/>}/>      
      <Route path='/owner/dash' element={ownerToken?<OwnerDash/>: <Navigate to={"/login"}/>}/>      
      <Route path='/owner/settings' element={ownerToken?<OwnerSettings/>: <Navigate to={"/login"}/>}/>      
      <Route path='/owner/settings/colors' element={ownerToken?<OwnerSettings/>: <Navigate to={"/login"}/>}/>      
      <Route path='/owner/settings/times' element={ownerToken?<OwnerSettings/>: <Navigate to={"/login"}/>}/>      
      <Route path='/owner/sections/add' element={ownerToken?<AddSection/>: <Navigate to={"/login"}/>}/>      
      <Route path='/owner/products/add' element={ownerToken?<AddProduct/>: <Navigate to={"/login"}/>}/> 
      <Route path='/owner/sections/' element={ownerToken?<SeeItems/>: <Navigate to={"/login"}/>}/>      
      <Route path='/owner/products/' element={ownerToken?<SeeItems/>: <Navigate to={"/login"}/>}/>
      <Route path='/owner/all-orders/' element={ownerToken?<AllOrders/>: <Navigate to={"/login"}/>}/>
      <Route path='/owner/section/edit/:id' element={ownerToken?<AddSection/>: <Navigate to={"/login"}/>}/>      
      <Route path='/owner/product/edit/:id' element={ownerToken?<AddProduct/>: <Navigate to={"/login"}/>}/>      
      <Route path='/owner/messages' element={ownerToken?<OwnerMessages/>: <Navigate to={"/login"}/>}/>      
      <Route path='/owner/orders' element={ownerToken?<OwnerOrders/>: <Navigate to={"/login"}/>}/>      
      <Route path='/owner/statistcis' element={ownerToken?<OwnerStatistics/>: <Navigate to={"/login"}/>}/>      
      <Route path='/owner/tables' element={ownerToken?<OwnerTables/>: <Navigate to={"/login"}/>}/>      
      <Route path='/product/:account/:id' element={userToken? <Product/>: <Navigate to={'/'}/>}/>      
      <Route path='/shop/:account/1' element={userToken?<Shop/>: <Navigate to={'/'}/>}/>      
      <Route path='/shop/:account/2' element={userToken?<Shop/>: <Navigate to={'/'}/>}/>      
      <Route path='/not-active' element={<NotActive/>}/>      
      <Route path='*' element={<Navigate to={'/error'}/>}/>      
      <Route path='/error' element={<ErrorPage/>}/>      
    </Routes>
    </Layout>
  )
}

export default App
