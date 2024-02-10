import React from 'react'
import Page1 from './Page1'
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import Page2 from './Page2'
import Page3 from './Page3'
import Page4 from './Page4'
import Grid from './parts/Grid'
import Login from './parts/Login'
import Signup from './parts/Signup'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
const App = () => {
   // is key 
  // return auth?<Outlet/>:<Navigate to="/signup"/>
  const appRouter=createBrowserRouter([
    {
      path:"/",
      element:<Page1/>,
      children:[{
        path:"/",
        element :<Grid/> 
      },
      {
        path:"/card",
        element: <div className='col-span-3'>
        <Page2/>
        </div> 
      },{
        
          path:"/login",
          element:<div className='col-span-3 m-auto'>
          <Login/>
    </div>
      },{
        
        path:"/signup",
        element:<div className='col-span-3 m-auto'>
        <Signup/>
  </div>
    },{
        
      path:"/products",
      element:<div className='col-span-3  '>
       <Page4/>
</div>
  }   ]
    },
    {
      path:"/rent",
      element : <Page3/> 
    } 
  
  ])
  return (
    <div>
    <Provider store={appStore}>
         <RouterProvider router={appRouter}/>
         </Provider>
    </div>
  )
}

export default App;