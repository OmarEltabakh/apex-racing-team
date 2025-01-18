
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import Layout from './Components/Layout/Layout';
import AboutPage from './Pages/AboutPage/AboutPage';
import CardsSection from './Components/CardsSection/CardsSection';
import { teamData } from "./DataAboutComponents/TeamData"
import CompetitionDetails from './Components/CompetitionDetails/CompetitionDetails';
import TeamPage from './Pages/TeamPage/TeamPage';
import SubTeam from './Components/SubTeam/SubTeam';
import LearningPhase from './Components/LearningPhase/LearningPhase';
import GalleryPage from './Pages/GalleryPage/GalleryPage';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import DashboardPage from './Pages/DashboardPage/DashboardPage';
import UsersManagementDashboard from './Components/UsersManagementDashboard/UsersManagementDashboard';
import GalleryDashboard from './Components/GalleryDashboard/GalleryDashboard';
import LearningPhaseDashboard from './Components/LearningPhaseDashboard/LearningPhaseDashboard';
import GallaryContextProvider from './Context/GallaryContext';


export default function App() {


  const routers = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { index: "true", element: <HomePage /> },
        { path: "AboutUs", element: <AboutPage /> },
        { path: "CompetitionDetails", element: <CompetitionDetails /> },
        { path: "TeamPage", element: <TeamPage /> },
        { path: "subTeam", element: <SubTeam /> },
        { path: "learningPhase", element: <LearningPhase /> },
        { path: "Gallery", element: <GalleryPage /> },
        { path: "signIn", element: <SignIn /> },
        { path: "signUP", element: <SignUp /> },
        {
          path: "dashboardPage", element: <DashboardPage />, children: [
            { path: "", element: <UsersManagementDashboard /> },
            { path: "GalleryDashboard", element: <GalleryDashboard /> },
            { path: "LearningPhaseDashboard", element: <LearningPhaseDashboard /> },
          ]
        },
        {
          path: "Teams", element: <CardsSection data={teamData} sectionName="Our Teams" imgWidth="w-100" navigation="TeamPage" />
        }


      ]
    }
  ])



  return <>
    <GallaryContextProvider>
      <RouterProvider router={routers} />
    </GallaryContextProvider>
  </>
}
