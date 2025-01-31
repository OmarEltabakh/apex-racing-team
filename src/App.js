
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import Layout from './Components/Layout/Layout';
import AboutPage from './Pages/AboutPage/AboutPage';
import CompetitionDetails from './Components/CompetitionDetails/CompetitionDetails';
import SubTeamPage from "./Pages/SubTeamPage/SubTeamPage";
import SubTeam from './Components/SubTeam/SubTeam';
import LearningPhase from './Components/LearningPhase/LearningPhase';
import GalleryPage from './Pages/GalleryPage/GalleryPage';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import DashboardPage from './Pages/DashboardPage/DashboardPage';
import UsersManagementDashboard from './Components/UsersManagementDashboard/UsersManagementDashboard';
import GalleryDashboard from './Components/GalleryDashboard/GalleryDashboard';
import LearningPhaseDashboard from './Components/LearningPhaseDashboard/LearningPhaseDashboard';
import GalleryContextProvider from './Context/GalleryContext';
import TeamsPage from './Pages/TeamsPage/TeamsPage';
import TeamsContextProvider from './Context/TeamsContext';


export default function App() {


  const routers = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { index: "true", element: <HomePage /> },
        { path: "AboutUs", element: <AboutPage /> },
        { path: "CompetitionDetails", element: <CompetitionDetails /> },
        { path: "Teams/SubTeamsPage", element: <SubTeamPage /> },
        { path: "subTeam", element: <SubTeam /> },
        { path: "learningPhase", element: <LearningPhase /> },
        { path: "Gallery", element: <GalleryPage /> },
        { path: "signIn", element: <SignIn /> },
        { path: "signUP", element: <SignUp /> },
        { path: "Teams", element: <TeamsPage /> },
        {
          path: "dashboardPage", element: <DashboardPage />, children: [
            { path: "", element: <UsersManagementDashboard /> },
            { path: "GalleryDashboard", element: <GalleryDashboard /> },
            { path: "LearningPhaseDashboard", element: <LearningPhaseDashboard /> },
          ]
        },

      ]
    }
  ])



  return <>

        <TeamsContextProvider>
          <GalleryContextProvider>
            <RouterProvider router={routers} />
          </GalleryContextProvider>
        </TeamsContextProvider>
     
  </>
}
