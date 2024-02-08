import React from 'react'
import Page1 from './Page1'
import { RouterProvider, createBrowserRouter ,Navigate} from 'react-router-dom'
import Page2 from './Page2'
import Page3 from './Page3'
import Grid from './parts/Grid'
import Login from './parts/Login'
import Signup from './parts/Signup'
const App = () => {
  const auth=localStorage.getItem('user'); // is key 
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
        element:<div className='col-span-3'>
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
    }  ]
    },
    {
      path:"/rent",
      element :auth?<Page3/>:<Navigate to="/signup"/>
    } 
  
  ])
  return (
    <div>
         <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App;