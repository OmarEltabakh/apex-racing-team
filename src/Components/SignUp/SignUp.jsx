import React from 'react'
import style from "./SignUp.module.css"

export default function SignUp() {



  return <>

    <section className={`${style.SignUp}`}>

      <div className={`${style.SignUpContainer} myContainer `}>

        <div className={`${style.SignUpContent} shadow `}>


          <h2>Sign Up</h2>


          <form className={`${style.signUnForm}`} action="">

            <label htmlFor="">Email:</label>
            <input type="email" autoComplete='off' />

            <label htmlFor="">Password:</label>
            <input type="password" autoComplete='off' />

            <label htmlFor="">Id:</label>
            <input type="number" autoComplete='off' />

            <button>Sign Up</button>

          </form>

        </div>




      </div>


    </section>





  </>
}
