import React, { useState, useEffect } from 'react'
import './SelectMenu.css'

const SelectMenu = (
  { buttons, roundOver, roundCount, fightStart, setFightStart,
    fightOver, setFightOver, fightNight, setFightNight,
    resetFightBtn, setResetFightBtn
  }) => {

  
  useEffect(() =>  {
    if(fightNight && roundCount === 0) {
      setResetFightBtn(true);
      setFightOver(false);
    }
  }, [fightNight])

  console.log( `SelectMenu state:`,
    `fightNight`, fightNight,
    `fightStart`, fightStart,
    `fightOver`, fightOver,
    `resetFightBtn`, resetFightBtn)

  const backToHomeButtons = () => {
    return (
      <>
        <button className='fight-button' id={`back-home-button`}
          onClick={()=> {
            console.log('route back to home!')
            setFightNight(false);
            setResetFightBtn(false);
            setFightOver(true);
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