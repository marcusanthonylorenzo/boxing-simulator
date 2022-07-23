import React, { useState, useEffect } from 'react'
import './Home.scss'

const Home = (
  { user, enemy, urls, fightNight, setFightNight,
    monthCounter, setMonthCounter, advanceMonth, setAdvanceMonth,
    fightNumber, setFightNumber, stopFight, setStopFight,
    fightOver, setFightOver, setResetFightBtn }) => {

  /***  General State  ***/
  const [ url, setUrl ] = useState(urls[1]);
  const [ getHistory, setGetHistory ] = useState(JSON.parse(localStorage.getItem('fightHistory')));

  /***  Toggles, Counters  ***/
  const [disableFightBtn, setDisableFightBtn] = useState(true);
  const [trainingFinished, setTrainingFinished] = useState(false);

  useEffect(() => {
    setFightNight(false)
    user.knockdownCount = 0;
  }, [])

  useEffect(() => {
    if (user.hp <= user.maxHp*0.35) {
      setDisableFightBtn(true);
    }
  }, [])

  useEffect(() => {
    if (monthCounter === 5) {
    setDisableFightBtn(false);
    }
  }, [monthCounter])

  // Must recover user.hp before continuing to next fight! Map all training and recovery options, sync with weekly calendar.
  const getTrainingEntries = Object.entries(user.train);

  return (
    <div className="main-container-wrap" id={`home-gym-container-wrap`} style={{ backgroundImage: url }}>
      <div className="main-container" id="home-gym-container">

        {/*** Left Grid ***/}

        <div className='home-gym-nav'>
          <div className='home-gym-user'>
            <h2>{user.firstName}</h2>
            <h2>{user.lastName}</h2>
            <h4>Record: {user.win} - {user.loss}</h4>
            <h4>Condition: {Math.round((user.hp/user.maxHp)*100)}%</h4>
          </div>

          <div className='home-gym-stats'>
            <h2>Stats go here</h2>
          </div>

          <div className='home-gym-train'>
            <h4>Training (use icons later):</h4>
            {getTrainingEntries.map((each, i) => {
              return (
                <button className="training-buttons" disabled={trainingFinished}
                  onClick={()=>{
                    console.log(each[1]);
                    each[1]()
                    setTrainingFinished(true);
                    console.log(user.hp)
                }}>
                  <h5>{each[0]}</h5>
                </button>
              )
            })}
          </div>
        </div>

        {/***  Center Grid  ***/}

        <div className='home-gym-main'>
            <div className='headlines-container'>
              {/* CSS Ticker */}
              <div className="ticker-wrap">
                <div className="ticker">
                  <div className="ticker__item">
                    <h5>Welcome to the home gym.</h5>
                  </div>
                  <div className="ticker__item">
                    <h5>Click to train, advance the month, or just sit and appreciate life.</h5>
                  </div>
                  <div className="ticker__item">
                    <h5>You take fights every 4 months no questions asked!</h5>
                  </div>
                </div>
              </div>
          </div>

          <div className={`inner-container`} id={`home-gym-feed`}>
            <div className='home-gym-display'>
              <h2>Welcome to the home gym.</h2>
              <h4>Click to progress to next week</h4>
            </div>

            <div className="home-options">
              <div className="home-select-menu">
                <button className={`home-buttons advance`} disabled={advanceMonth}
                onClick={()=> {
                  setMonthCounter(monthCounter+1)
                  setTrainingFinished(false);
                  if (monthCounter === 11) setMonthCounter(0);
                }}>
                  <h2>Advance Month</h2>
                </button>
                <button className={`home-buttons to-fight`} disabled={disableFightBtn}
                  onClick={(e)=> {
                    e.preventDefault();
                    setFightOver(false);    
                    setFightNight(true);
                    setResetFightBtn(true);
                    setFightNumber(fightNumber+1);
                    setTrainingFinished(false);
                }}> <h2>Fight Night</h2> </button>
              </div>
            </div>
          </div>
        </div>

        {/*** Right Grid ***/}

        <div className="home-gym-rankings">
          <div className="home-rankings-info">
            <h2>Previous Fight History goes here.</h2>

            <div className="official-rankings">
              <h6>W (TKO) Fighter Example</h6>
            </div>

          </div>
   
        </div>

      </div>
    </div>
  )
}

export default Home