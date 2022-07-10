import React from 'react'
import './Navbar.css'
import oppBody from '../../../assets/images/oppBody.png'

const Navbar = () => {


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
    
    </div>
  )
  
}

export default Navbar