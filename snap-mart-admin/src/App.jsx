import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './components/Auth'
import Home from './components/Home'
import About from './components/About'
import PublicRoute from './RouteAuth/PublicRoute'
import PrivateRoute from './RouteAuth/PrivateRoute'
import Category from './components/Category'
import ManageOrders from './components/ManageOrders'

function App() {

  return (
    <>
      <Routes>
        <Route path='/auth' element={<PublicRoute><Auth/></PublicRoute>}/>
        <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute><About/></PrivateRoute>} />
        <Route path="/category" element={<PrivateRoute><Category/></PrivateRoute>}/>
        <Route path='/manageOrders' element={<PrivateRoute><ManageOrders/></PrivateRoute>}/>
      </Routes>
    </>
  )
}

export default App
