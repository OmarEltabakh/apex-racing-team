import { createContext } from "react";
import { useQuery } from 'react-query';
import axios from 'axios';



export const galleryContext = createContext();

// Fetch gallery data===============================================>
const fetchGalleryData = async () => {
    try {
        const { data } = await axios.get('https://apexracingteam-eg.onrender.com/gallery/get-gallery-item');
        return data;
    } catch (error) {
        throw new Error('Failed to fetch gallery data');
    }
};


const GalleryContextProvider = (props) => {


    // handle gallery data useing useQuery==============================>
    const { data, isLoading, error, refetch } = useQuery('gallery', fetchGalleryData, {
        staleTime: Infinity, // Keep data fresh
        cacheTime: Infinity,   // Cache for 1 hour
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchInterval: false,
    });



    return (
        <galleryContext.Provider value={{ galleryData: data?.data, isLoading, error, refetch }}>
            {props.children}
        </galleryContext.Provider>
    );
}

export default GalleryContextProvider;
