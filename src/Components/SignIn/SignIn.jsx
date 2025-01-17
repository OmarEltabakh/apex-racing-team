import React from 'react'
import style from "./SignIn.module.css"

export default function SignIn() {



  return <>

    <section className={`${style.SignIn}`}>

      <div className={`${style.signInContainer} myContainer `}>

        <div className={`${style.signInContent} shadow `}>


          <h2>Sign In</h2>


          <form className={`${style.signInForm}`} action="">

            <label htmlFor="">Email</label>
            <input type="email" autoComplete='off' />

            <label htmlFor="">Password</label>
            <input type="password" autoComplete='off' />

            <button>Sign In</button>

          </form>

        </div>




      </div>


    </section>





  </>
}
