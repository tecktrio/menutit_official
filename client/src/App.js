import './App.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import StoreView from './pages/StoreView/StoreView';

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
    path:"/store",
    element:<StoreView/>
  }
])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
