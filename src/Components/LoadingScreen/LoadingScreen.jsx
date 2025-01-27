import React from 'react'
import style from "./LoadingScreen.module.css"
export default function LoadingScreen() {

    return <>
        <section className={`${style.loadingScreen} `}>


            <span className={`${style.loader}`}></span>
        </section>

    </>
}
