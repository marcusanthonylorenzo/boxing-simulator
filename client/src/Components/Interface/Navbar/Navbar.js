import React from 'react'
import './Navbar.css'
// import Ticker from 'react-ticker'
import oppBody from '../../../assets/images/oppBody.png'

const Navbar = ({roundCount}) => {

  // const navTickerInfo = () => {
  //   if (roundCount === 0) {
  //     return "Fight Introductions"
  //   } else {
  //     if (ko) {
  //       return "THIS ROUND IS OVER"
  //     }
  //   }
  // }

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
          <h3 id="round-count">{roundCount === 0 ? "Fighter Introductions" : `Round: ${roundCount}`}</h3>
        </div>
      </div>
    
    </div>
  )
}

export default Navbar