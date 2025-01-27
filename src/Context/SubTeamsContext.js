import { createContext } from "react";
import { useQuery } from 'react-query';
import axios from 'axios';

export const SubTeamsContext = createContext();


const fetchSubTeamsData = async () => {
    try {
        const { data } = await axios.get('https://apexracingteam-eg.onrender.com/subteams/all-subteams');
        return data;
    } catch (error) {
        throw new Error('Failed to fetch SubTeams data');
    }
};

const SubTeamsContextProvider = (props) => {


    const { data, isLoading, error } = useQuery('subteams', fetchSubTeamsData, {
        staleTime: Infinity, // Keep data fresh
        cacheTime: 3600000,   // Cache for 1 hour
        refetchOnWindowFocus: false, // Disable refetch on window focus
        refetchOnReconnect: false, // Disable refetch on reconnect
        refetchInterval: false, // Disable automatic refetching
    });
;


    return (
        <SubTeamsContext.Provider value={{ subteamData: data, isLoading, error }}>
            {props.children}
        </SubTeamsContext.Provider>
    );
};

export default SubTeamsContextProvider;
