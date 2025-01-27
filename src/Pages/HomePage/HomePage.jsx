import React, { useContext } from 'react'
import Hero from '../../Components/Hero/Hero'
import AboutSection from '../../Components/AboutSection/AboutSection';
import Sponsers from '../../Components/Sponsers/Sponsers';
import ContactUs from '../../Components/ContactUs/ContactUs';
import Competitions from '../../Components/Competitions/Competitions';
import { galleryContext } from '../../Context/GalleryContext';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';
import ScrollToTop from '../../Components/ScrollToTop/ScrollToTop';


const HomePage = () => {

    const { isLoading } = useContext(galleryContext);


    return <>
        <ScrollToTop />
        {isLoading ? <LoadingScreen /> :
            <>
                <Hero />
                <AboutSection />
                <Competitions />
                <Sponsers />
                <ContactUs />
            </>

        }



    </>
}

export default HomePage
