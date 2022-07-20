import React, { useState, useEffect } from 'react'
import './SelectMenu.css'

const SelectMenu = ({ buttons, roundOver, fightStart, fightOver, fightNight, setFightNight }) => {

  const backToHomeButtons = () => {
    return (
      <>
        <button className='fight-button' id={`back-home-button`}
          onClick={()=> {
            console.log('route back to home!')
            setFightNight(false);
          }
          }>
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