import React, { useState, useEffect } from 'react'
import './SelectMenu.css'

const SelectMenu = ({ buttons, roundOver, roundCount, fightStart, setFightStart, fightOver, setFightOver, fightNight, setFightNight }) => {

  const [resetFightBtn, setResetFightBtn] = useState(false);
  
  useEffect(() =>  {
    if(fightNight) {
      setResetFightBtn(true);
      setFightOver(false);
    }
  }, [fightNight])

  console.log(fightNight, fightOver, resetFightBtn)

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