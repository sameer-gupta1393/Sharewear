import React from 'react'
import Page1 from './Page1'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Page2 from './Page2'
import Page3 from './Page3'
import Grid from './parts/Grid'
import Login from './parts/Login'
const App = () => {
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
        
          path:"/signup",
          element:<div className='col-span-3 m-auto'>
          <Login value={true}/>
    </div>
      },{
        
        path:"/login",
        element:<div className='col-span-3 m-auto'>
        <Login value={false}/>
  </div>
    }  ]
    },
    {
      path:"/rent",
      element :<Page3/>
    } 
  
  ])
  return (
    <div>
         <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App;