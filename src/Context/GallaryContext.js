import { createContext, useEffect, useState } from "react";
import axios from 'axios';




export const gallaryContext = createContext();

const GallaryContextProvider = (props) => {


    // hooks
    const [gallaryData, setGallaryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    // fetch gallary Data =================================================>
    useEffect(() => {

        const fetchData = async () => {

            try {
                setLoading(true);
                const { data } = await axios.get(`https://apexracingteam-eg.onrender.com/gallery/get-gallery-item`);
                setGallaryData(data);
            }
            catch (error) {
                setError(error);

            } finally {
                setLoading(false);
            }

        }

        // fetch
        fetchData()

    }, [])



    return <gallaryContext.Provider value={{ gallaryData, loading }}>
        {props.children}
    </gallaryContext.Provider>


}


export default GallaryContextProvider;