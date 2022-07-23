import React, { useState, useEffect } from 'react'
import './SelectMenu.css'

const SelectMenu = (
  { buttons, roundOver, roundCount,
    fightStart, setFightStart,
    fightOver, setFightOver,
    fightNight, setFightNight,
    resetFightBtn, setResetFightBtn,
    fightNumber, setPrevFightNumber
  }) => {

  useEffect(() =>  {
    if(fightNight && roundCount === 0) {
      setResetFightBtn(true);
      setFightOver(false);
    }
  }, [fightNight])

  const backToHomeButtons = () => {
    return (
      <>
        <button className='fight-button' id={`back-home-button`}
            onClick={()=> {
              console.log('route back to home!')
              setFightNight(false);
              setResetFightBtn(false);
              setFightOver(true);
              setPrevFightNumber(fightNumber);
            }
          }>
          Back to Gym.
        </button>
      </>
    )
  }
  return (
      <div className="select-menu">
        { !fightOver && resetFightBtn ? buttons : backToHomeButtons() }
      </div>
  );
}

export default SelectMenu