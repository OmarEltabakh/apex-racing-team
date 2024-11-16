
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import Layout from './Components/Layout/Layout'
import AboutPage from './Pages/AboutPage/AboutPage'

export default function App() {


  const routers = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { index: "true", element: <HomePage /> },
        { path: "AboutPage", element: <AboutPage /> }

      ]
    }
  ])



  return <>
    <RouterProvider router={routers}></RouterProvider>
  </>
}
