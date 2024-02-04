import React from 'react'
import Page1 from './Page1'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Page2 from './Page2'
import Page3 from './Page3'
import Grid from './parts/Grid'
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
      }]
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