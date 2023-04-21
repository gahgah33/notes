import logo from './logo.svg';
import './App.css';
import Layout from './Components/Layout/Layout';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Notfound from './Components/Notfound/Notfound';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {


  let routes = createBrowserRouter([{
    path:"", element:<Layout/>, children:[
    {index:true, element:<Register/>,},
    {path:"home", element: <ProtectedRoutes><Home/></ProtectedRoutes>},
    {path:"login", element:<Login/>},
    {path:"*", element:<Notfound/>}

  ]
}])
  return (
   
    <>
 <RouterProvider router={routes }/>
    
    </>
  )
}

export default App;
