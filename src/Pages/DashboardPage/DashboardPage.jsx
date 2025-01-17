import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import style from './DashboardPage.module.css';
import SideBarDashboard from '../../Components/SideBarDashboard/SideBarDashboard';
import { Outlet } from 'react-router-dom';

export default function DashboardPage() {

    // hooks============================================================>


    return (
        <>
            <section className={`${style.DashboardPage} `}>

                {/* SideBar */}
                <SideBarDashboard />




                {/* DashboardPage Container */}
                <div className={`${style.DashboardPageContainer} myContainer `}>

                    <Outlet />


                </div>


            </section>
        </>
    );
}
