import './App.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import StoreView from './pages/StoreView/StoreView';
import Dashboard from './pages/Dashboards/Dashboard';
import Registration from './pages/register/Register';

function App() {

  const router = createBrowserRouter([{
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Registration/>
  },
  {
    path:"/store",
    element:<StoreView/>
  },
  {
    path:"/Dashboard",
    element:<Dashboard/>
  }
])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
