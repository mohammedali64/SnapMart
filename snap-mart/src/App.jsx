import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import AuthForm from './Components/AuthForm'
import Layout from './Components/Layout'
import Cart from './Components/Cart'
import Electronics from './Components/Electronics'
import Fashion from './Components/Fashion'
import HomeKitchen from './Components/HomeKitchen'
import Categories from './Components/Categories'
import ProductCard from './Components/ProductCard'
import Checkout from './Components/Checkout'
import PrivateRoute from './Components/PrivateRoute'
import PublicRoute from './Components/PublicRoute'
import Orders from './Components/Orders'
import Profile from './Components/Profile'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='/auth' element={<PublicRoute><AuthForm/></PublicRoute>}/>
        <Route path='cart' element={<Cart/>}/>
        <Route path='electronics' element={<Electronics/>}/>
        <Route path='fashion' element={<Fashion/>}/>
        <Route path='homeandkitchen' element={<HomeKitchen/>}/>
        <Route path='categories/:categoryName' element={<Categories/>}/>
        <Route path='products/:productId' element={<ProductCard/>}/>
        <Route path='checkout' element={<PrivateRoute><Checkout/></PrivateRoute>}/>
        <Route path='/orders' element={<PrivateRoute><Orders/></PrivateRoute>}/>
        <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
