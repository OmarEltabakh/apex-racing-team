import { createContext, useEffect, useState } from "react";
import axios from 'axios';




export const gallaryContext = createContext();

const GallaryContextProvider = (props) => {


    // hooks
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    // fetch gallary Images =================================================>
    useEffect(() => {

        const fetchData = async () => {

            try {
                setLoading(true);
                const response = await axios.get(`https://apexracingteam-eg.onrender.com/gallery/get-gallery-item`);
                setData(response);
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



    return <gallaryContext.Provider value={{ data, loading }}>
        {props.children}
    </gallaryContext.Provider>


}


export default GallaryContextProvider;