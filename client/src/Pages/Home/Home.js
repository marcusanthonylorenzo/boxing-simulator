import React, { useState, useEffect } from 'react'
import './Home.css'
import BoxerCard from '../../Components/Boxer/BoxerCard/BoxerCard'
import FightEngine from '../../Components/FightEngine/FightEngine'

const Home = (
  { user, enemy, urls, fightNight, setFightNight,
  fightOver, setFightOver, setResetFightBtn }) => {

  const [disableWhenLowHP, setDisableWhenLowHP] = useState(false);
  const [ url, setUrl ] = useState(urls[1])

  useEffect(() => {
    setFightNight(false)
    user.knockdownCount = 0;
  }, [])

  useEffect(() => {
    if (user.hp <= user.maxHp*0.15) {
      setDisableWhenLowHP(true);
    }
  }, [])

  // Must recover user.hp before continuing to next fight! Map all training and recovery options, sync with weekly calendar.

  return (
    <div className="main-container-wrap" style={{ backgroundImage: url }}>
      <div className="main-container" id="home-gym-container">

        <div className='home-gym-nav'>
          example text
        </div>
        
        <div className={`inner-container`}>
          <div className="display-options">
            <button disabled={disableWhenLowHP}
              onClick={(e)=> {
                e.preventDefault();
                setFightOver(false);    
                setFightNight(true);
                setResetFightBtn(true);
            }}> Fight Night </button>
          </div>
        </div>
            

      </div>
    </div>
  )
}

export default Home