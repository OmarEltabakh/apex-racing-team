import React, { Suspense } from 'react';
import style from "./ContactUs.module.css";
import SectionTitle from '../SectionTitle/SectionTitle';
import { motion } from 'framer-motion';
import { useForm } from '@formspree/react';
import emailImage from "../../Assets/contactUs/send mail.svg"


export default function ContactUs() {


  const [state, handleSubmit] = useForm("mwpvvnbo");

  const motionSettings = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1, ease: "easeInOut", delay: 0.5 },
  };

  const successAnimation = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  return (
    <section id="ContactUs" className={`${style.ContactUs} `}>


      {/* contactUsContainer */}
      <div className={`${style.contactUsContainer} myContainer`}>

        <SectionTitle title="ContactUs" />

        <div className={`${style.fromAndImageContainer} rounded-2 shadow`}>
          {/* formContainer */}
          <div className={`${style.formContainer}`}>
            <motion.form
              onSubmit={handleSubmit}
              {...motionSettings}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              className=""
            >
              <input className="form-control" type="text" placeholder="Name" name="name" autoComplete="off" required />
              <input className="form-control" type="email" placeholder="Email" name="email" autoComplete="off" required />
              <textarea className="form-control" placeholder="Message" rows="5" name="message" autoComplete="off" required />

              <button type="submit" className="shadow" disabled={state.submitting} >
                {state.submitting ? "Submitting..." : "Submit"}
              </button>
              {state.succeeded && (
                <motion.div {...successAnimation}>
                  <p className={style.successMessage}>
                    Your message has been sent successfully!
                  </p>
                </motion.div>
              )}
            </motion.form>
          </div>

          {/* contactImage */}
          <div className={`${style.contactImage} d-flex justify-content-center`}>
            <Suspense fallback={<div>Loading...</div>}>
              <motion.img
                loading='lazy'
                {...motionSettings}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="w-70"
                src={emailImage}
                alt="Contact"
              />
            </Suspense>
          </div>
        </div>

      </div>
    </section>
  );
}
