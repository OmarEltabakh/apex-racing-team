
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import Layout from './Components/Layout/Layout';
import AboutPage from './Pages/AboutPage/AboutPage';
import CardsSection from './Components/CardsSection/CardsSection';
import { teamData } from "./DataAboutComponents/TeamData"
import CompetitionDetails from './Components/CompetitionDetails/CompetitionDetails';


export default function App() {


  const routers = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { index: "true", element: <HomePage /> },
        { path: "AboutUs", element: <AboutPage /> },
        { path: "CompetitionDetails", element: <CompetitionDetails /> },
        {
          path: "Teams", element: <CardsSection data={teamData} sectionName="Our Teams" imgWidth="w-100" />
        }


      ]
    }
  ])



  return <>
    <RouterProvider router={routers}></RouterProvider>
  </>
}
