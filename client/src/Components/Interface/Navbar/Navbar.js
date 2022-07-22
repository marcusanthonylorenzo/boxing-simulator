import React, { useState, useEffect } from 'react'
import './Navbar.css'
// import Ticker from 'react-ticker'
import oppBody from '../../../assets/images/oppBody.png'

const Navbar = ({roundCount, monthCounter, roundOver, fightNight }) => {

  const [roundToIndexInit, setRoundToIndexInit] = useState(roundCount)
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => { if (roundOver) setRoundToIndexInit(roundCount-1)}, [roundCount])

  const navTickerInfo = () => {

    if (fightNight) {
      if (roundCount === 0) {
        return "Fight Introductions"
      } 
    } else if (!fightNight) {
      return (
        <>
          <h4>Month: { monthNames[monthCounter] }</h4>
        </>
      )
    }
  }


  return (
    <div className="Navbar">
      
      <div className="navbar-container"> 
        <div className="navbar-title">
          <h2>Ringcraft</h2> <h5>A Boxing text-realism simulator.</h5>
        </div>

        <div className="navbar-logo">
          <img src={oppBody} alt={"Ringcraft"} id={`logo`}/>
        </div>
      </div>

      <div className="navbar-ticker">
        <div className="navbar-round-count">
          <h3 id="round-count">{navTickerInfo()}</h3>

        </div>
      </div>
    
    </div>
  )
}

export default Navbar