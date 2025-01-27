import { createContext } from "react";
import { useQuery } from 'react-query';
import axios from 'axios';

export const teamsContext = createContext();

// Fetch teams data===============================================>
const fetchTeamsData = async () => {
    try {
        const { data } = await axios.get('https://apexracingteam-eg.onrender.com/teams/all-teams');
        return data?.data;
    } catch (error) {
        throw new Error('Failed to fetch teams data');
    }
};

const TeamsContextProvider = (props) => {

    // Handle teams data using useQuery==============================>
    const { data: teamsData, isLoading, error } = useQuery('teams', fetchTeamsData, {
        staleTime: Infinity,  // Keep data fresh
        cacheTime: 3600000,    // Cache for 1 hour
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchInterval: false,
    });





    return (
        <teamsContext.Provider value={{ teamsData, isLoading, error }}>
            {props.children}
        </teamsContext.Provider>
    );
}

export default TeamsContextProvider;
