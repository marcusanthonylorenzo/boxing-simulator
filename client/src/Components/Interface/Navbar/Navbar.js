import React from 'react'
import './Navbar.css'
import SelectMenu from '../SelectMenu/SelectMenu'

const Navbar = ({buttons}) => {


  return (
    <div className="Navbar">
      
      <h2>Ringcraft</h2>

      <SelectMenu show={true} buttons={buttons} />
    
    </div>
  )
  
}

export default Navbar