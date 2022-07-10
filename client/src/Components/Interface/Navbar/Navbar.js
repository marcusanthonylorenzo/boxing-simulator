import React from 'react'
import './Navbar.css'
import SelectMenu from '../SelectMenu/SelectMenu'
import oppBody from '../../../assets/images/oppBody.png'

const Navbar = ({buttons}) => {


  return (
    <div className="Navbar">
      
      <div className="navbar-container">
        
        <div className="navbar-title"><h2>Ringcraft</h2> <h5>A realism Boxing text-simulator.</h5></div>

        <div className="navbar-logo">
          <img src={oppBody} alt={"Ringcraft"} id={`logo`}/>
        </div>

      </div>

      <SelectMenu show={true} buttons={buttons} />
    
    </div>
  )
  
}

export default Navbar