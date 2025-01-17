import React from 'react'
import Hero from '../../Components/Hero/Hero'
import AboutSection from '../../Components/AboutSection/AboutSection';
import CardsSection from '../../Components/CardsSection/CardsSection';
import { competitionsData } from '../../DataAboutComponents/CompetitionsData';
import Sponsers from '../../Components/Sponsers/Sponsers';
import ContactUs from '../../Components/ContactUs/ContactUs';
import NavBar from '../../Components/NavBar/NavBar';

const HomePage = () => {

    return <>

        <NavBar />
        <Hero />
        <AboutSection />
        <CardsSection data={competitionsData} sectionName="Competitions" imgWidth="w-85" navigation="CompetitionDetails" />
        <Sponsers />
        <ContactUs />



    </>
}

export default HomePage
