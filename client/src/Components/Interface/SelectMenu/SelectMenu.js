import React, { useState, useEffect } from 'react'
import './SelectMenu.css'

const SelectMenu = (
  { buttons, roundOver,
    roundCount, setRoundCount,
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
              setRoundCount(0);
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
        <input type='text' id="notes" placeholder="Fight Notes here" />
      </div>
  );
}

export default SelectMenu