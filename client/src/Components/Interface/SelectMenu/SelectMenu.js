import React, { useState, useEffect } from 'react'
import './SelectMenu.css'

const SelectMenu = ({ buttons, fightStart, fightOver }) => {

  const backToHomeButtons = () => {
    console.log("render back home buttons")
    return (
      <>
        <button className='fight-button' id={`back-home-button`}
          onClick={()=> console.log('route back to home!')}>
          Back to Gym.
        </button>
      </>
    )
  }
  return (
      <div className="select-menu">
        { !fightOver ? buttons : backToHomeButtons() }
      </div>
  );

}

export default SelectMenu