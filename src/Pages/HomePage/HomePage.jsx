import React from 'react'
import Hero from '../../Components/Hero/Hero'
import AboutSection from '../../Components/AboutSection/AboutSection';
import CardsSection from '../../Components/CardsSection/CardsSection';
import { competitionsData } from '../../DataAboutComponents/CompetitionsData';
import { teamData } from "../../DataAboutComponents/TeamData"
import Sponsers from '../../Components/Sponsers/Sponsers';
import ContactUs from '../../Components/ContactUs/ContactUs';

const HomePage = () => {

    return <>

        <Hero />
        <AboutSection />
        <CardsSection data={teamData} sectionName="Our Teams" imgWidth="w-100" />
        <Sponsers />
        <CardsSection data={competitionsData} sectionName="Competitions" imgWidth="w-85" />
        <ContactUs />



    </>
}

export default HomePage
