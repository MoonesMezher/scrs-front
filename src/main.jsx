import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { AlertProvider } from './context/alertContext.jsx'
import { AccountProvider } from './context/accountContext.jsx'
import { SocketProvider } from './context/socketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
        <SocketProvider>
          <AlertProvider>
            <AccountProvider>
              <App />
            </AccountProvider>
          </AlertProvider>
        </SocketProvider>
    </BrowserRouter>
)
