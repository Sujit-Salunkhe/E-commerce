import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,
createRoutesFromElements,
Route,RouterProvider} from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import { Provider } from 'react-redux';
import {HelmetProvider} from 'react-helmet-async'
import {PayPalScriptProvider} from  '@paypal/react-paypal-js'
// import store from './store.js ';
import store from './store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PrivateRoutes from './componets/PrivateRoutes';
import HomeScreens from './screens/HomeScreens.js';
import ProductScreen from './screens/ProductScreen.js';
import CartScreen from './screens/CartScreen.js';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminRoutes from './componets/AdminRoutes.js'
import OrderListScreen from './screens/Admin/OrderListScreen';
import ProductListScreen from './screens/Admin/ProductListScreen';
import ProductEditScreen from './screens/Admin/ProductEditScreen';
import UsersListScreen from './screens/Admin/UsersListScreen';
import UsersEditScreen from './screens/Admin/UserEditScreen';
import DataScreen from './screens/Admin/DataScreen.js';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreens/>}/>
      <Route  path='/search/:keyword' element={<HomeScreens/>}/>
      <Route  path='/page/:pageNumber' element={<HomeScreens/>}/>
      <Route  path='/search/:keyword/page/:pageNumber' element={<HomeScreens/>}/>
      <Route  path='/product/:id' element={<ProductScreen/>}/>
      <Route path='/cart' element = {<CartScreen/>}/>
      <Route path='/login' element = {<LoginScreen/>}/>
      <Route path='/register' element = {<RegisterScreen/>}/>

      <Route path='' element={<PrivateRoutes/>}>
      <Route path='/shipping' element = {<ShippingScreen/>}/> 
      <Route path='/payment' element = {<PaymentScreen/>}/> 
      <Route path='/placeorder' element = {<PlaceOrderScreen/>}/> 
      <Route path='/order/:id' element = {<OrderScreen/>}/>
      <Route path='/profile' element={<ProfileScreen/>} />
      </Route>
      <Route path='' element={<AdminRoutes />}>
        <Route path='/admin/orderlist' element={<OrderListScreen/>} />
        <Route path='/admin/productlist' element={<ProductListScreen/>} />
        <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen/>} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>} />
        <Route path='/admin/userlist' element={<UsersListScreen/>} />
        <Route path='/admin/user/:id/edit' element={<UsersEditScreen/>} />
        <Route path='/admin/data' element={<DataScreen/>} />
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <HelmetProvider>
    <Provider store={store} >
      <PayPalScriptProvider deferLoading={true} >
        <RouterProvider router={router}/>
      </PayPalScriptProvider>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
