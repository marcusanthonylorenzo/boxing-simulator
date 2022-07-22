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
    <div className="main-container-wrap" id={`home-gym-container-wrap`} style={{ backgroundImage: url }}>
      <div className="main-container" id="home-gym-container">

        {/*** Left Grid ***/}

        <div className='home-gym-nav'>
          <div className='home-gym-user'>
            <h2>{user.firstName}</h2>
            <h2>{user.lastName}</h2>
            <h4>Wins - Losses</h4>
            <h4>{user.win} - {user.loss}</h4>
          </div>

          <div className='home-gym-stats'>
            <h2>Stats go here</h2>

          </div>

          <div className='home-gym-train'>
            <h4>Map week-to-week training here</h4>
          </div>

        </div>

        {/***  Center Grid  ***/}

        <div className='home-gym-main'>
          <div className='headlines'>
            <h2>Headlines and progress go here</h2>
            <h4>Or click to progress to next week</h4>
          </div>
          

          <div className={`inner-container`} id={`home-gym-feed`}>
            <div className='home-gym-display'>
              <h2>Display week-to-week rankings, charts, and updates here.</h2>
            </div>

            <div className="home-options">
              <div className="home-select-menu">

                <button id={`home-to-fight-button`} disabled={disableWhenLowHP}
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

        {/*** Right Grid ***/}

        <div className="home-gym-rankings">
          <div className="home-rankings-info">
            <h2>Ranking list to go here</h2>

            <div className="official-rankings">
              <h5>Actual rankings</h5>
            </div>

          </div>
   
        </div>

      </div>
    </div>
  )
}

export default Home