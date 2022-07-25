import React, { useState, useEffect } from 'react'
import './Landing.css'
import oppBody from '../../assets/images/oppBody.png'

const Landing = ({setLandingPage, generateBoxerFunc}) => {

  // useEffect(() => { console.log(generateBoxerFunc) },[])

  // console.log(generateBoxerFunc)

  return (
    <>
      <div className='landing-page'>
        <div className='landing-container'>
          <div className='landing-title'>
            <h5>Welcome to</h5>
            <h2><em>Ringcraft Boxing</em></h2>
            <h5>A Boxing text-simulator.</h5>
          </div>
          <div className="navbar-logo">
            <div className="enter" onClick={() =>{
                setLandingPage(false);
                // generateBoxersOnLanding.generate();
                console.log(`welcome`);
            }}>
              <img src={oppBody} alt={"Ringcraft"} className="landing-logo" id={`logo`}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing