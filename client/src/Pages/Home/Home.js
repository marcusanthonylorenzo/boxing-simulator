import React, { useState, useEffect } from 'react'
import './Home.scss'
import randomUserAPI from '../../Components/API/API';

const Home = (
  { user, enemy, urls, fightNight, setFightNight,
    monthCounter, setMonthCounter, advanceMonth, setAdvanceMonth,
    fightNumber, setFightNumber, stopFight, setStopFight,
    fightOver, setFightOver, setResetFightBtn }) => {

  /***  General State  ***/
  const [ url, setUrl ] = useState(urls[1]);
  const [getHistory, setGetHistory] = useState(JSON.parse(localStorage.getItem('fightHistory')));
  const [newBoxerList, setNewBoxerList ] = useState([]);

  /***  Toggles, Counters  ***/
  const [hideGenerateBoxerBtn, setHideGenerateBoxerBtn] = useState(false)
  const [disableFightBtn, setDisableFightBtn] = useState(true);
  const [trainingFinished, setTrainingFinished] = useState(false);

  /***  Data Retreival ***/
  const [updateStatus, setUpdateStatus] = useState("Looking for a fight...");
  const getTrainingEntries = Object.entries(user.train);
  const boxerListFromLocal = JSON.parse(localStorage.getItem('boxers'));

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

  // update localStorage everytime newBoxerList is updated
  useEffect(() => {
    localStorage.setItem('boxers', JSON.stringify([...newBoxerList]))
    setUpdateStatus('Opponents found.')
  }, [newBoxerList])


  // Must recover user.hp before continuing to next fight! Map all training and recovery options, sync with weekly calendar.

  /***  Make calls to randomUserAPI to aggregate list of opponents, set conditions later  ***/
  const generateBoxer = () => {
    randomUserAPI.get()
      .then(response => {
        console.log(response.data.results)
        setHideGenerateBoxerBtn(true);
        setNewBoxerList(prev => [...prev, ...response.data.results])
      })
      .catch(err => setUpdateStatus("No opponents found yet! Advance month for a new search."))
  }

  const mapOpponents = () => {
    return boxerListFromLocal.map((each, i) => {
      console.log(each)
      return (
        <div className='boxer-card'>
          <h5>{each.name.first + ` ` + each.name.last}</h5>
        </div>
      )
    })
  }

  const generateListOfBoxers = //Button that generates a new list of opponents, makes API calls
      <button id={'generator-btn'} onClick={() => {
        setUpdateStatus('Searching...')
        console.log("Looking for a fight...");
        generateBoxer();
        setHideGenerateBoxerBtn(true);
        }}>
        <h5>Search new opponents</h5>
      </button>


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
                <button key={`training-buttons-${i}`} className="training-buttons" disabled={trainingFinished}
                  onClick={()=>{
                    each[1]();
                    setTrainingFinished(true); }}>
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
              <div className='generate-boxer-button'>
                <h5>{!hideGenerateBoxerBtn ? generateListOfBoxers : updateStatus}</h5>
              </div>
              {mapOpponents()}
            </div>

            <div className="home-options">
              <div className="home-select-menu">
                <button className={`home-buttons advance`} disabled={advanceMonth}
                onClick={()=> {
                  setHideGenerateBoxerBtn(false);
                  setMonthCounter(monthCounter+1);
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