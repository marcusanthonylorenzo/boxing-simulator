import React from 'react'
import './Display.css'
import SelectMenu from '../SelectMenu/SelectMenu'

const Display = ({ buttons }) => {
  return (

    <div className="Display">

      <div className="display-container">
        <h4>Fight Night</h4>
      </div>

      <div className="display-options">
        <SelectMenu buttons={buttons} />
      </div>


    </div>
    
  )
}

export default Display