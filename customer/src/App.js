
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LandingPage from './LandingPage';
import StoreView from './StoreView/StoreView';

function App() {


  const routes= [
    {
      path:"/",
      element:<LandingPage/>
    },
    {
      path:"/store",
      element:<StoreView/>
    },
   
  ]

  const router = createBrowserRouter(routes)


  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
