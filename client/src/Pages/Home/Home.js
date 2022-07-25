import React, { useState, useEffect } from 'react'
import './Home.scss'
import randomUserAPI from '../../Components/API/API'
import Boxer from '../../Components/Boxer/BoxerClass'
import Randomize from '../../Components/Helpers/Randomize'
import Commentary from '../../Components/Helpers/Commentary'
import Data from '../../Components/Helpers/Data'

const Home = (
  { user, enemy, urls, fightNight, setFightNight,
    setUserState, setOppState, landingPage, setGenerateBoxersFunc,
    monthCounter, setMonthCounter, advanceMonth, setAdvanceMonth,
    fightNumber, setFightNumber, stopFight, setStopFight,
    fightOver, setFightOver, setResetFightBtn }) => {

  /***  General State  ***/
  const [ url, setUrl ] = useState(urls[1]);
  const [newBoxerList, setNewBoxerList ] = useState([]);
  const [officialBoxerList, setOfficialBoxerList ] = useState([]);

  /***  Toggles, Counters  ***/
  const [hideGenerateBoxerBtn, setHideGenerateBoxerBtn] = useState(false)
  const [disableFightBtn, setDisableFightBtn] = useState(true);
  const [disableBoxer, setDisableBoxer] = useState(false);
  const [trainingFinished, setTrainingFinished] = useState(false);
  const [opponentsFound, setOpponentsFound] = useState(false);

  /***  Data Retreival ***/
  const [getHistory, setGetHistory] = useState(JSON.parse(localStorage.getItem('fightHistory')));
  const [updateStatus, setUpdateStatus] = useState("Looking for a fight...");
  const getTrainingEntries = Object.entries(user.train);
  const commentary = Commentary();
  const data = Data();
  const boxerListFromLocal = JSON.parse(localStorage.getItem('boxers'));

  useEffect(() => {
    setGenerateBoxersFunc({ generate: generateBoxer });
    setDisableFightBtn(true);
  }, [])

  useEffect(() => {
    if (monthCounter > 0) setNewBoxerList([...boxerListFromLocal]);
    setFightNight(false)
    user.knockdownCount = 0;
    setDisableFightBtn(true);
  }, [])

  useEffect(() => {
    if (user.hp <= user.maxHp*0.35 || !fightNight) {
      setDisableFightBtn(true);
    }
  }, [])

  useEffect(() => {
    if (monthCounter === 4) {
    setDisableFightBtn(false);
    }
  }, [monthCounter])

  // Must recover user.hp before continuing to next fight! Map all training and recovery options, sync with weekly calendar.

  /***  Make calls to randomUserAPI to aggregate list of opponents, set conditions later  ***/
  const generateBoxer = () => {
    randomUserAPI.get()
      .then(response => {
        setHideGenerateBoxerBtn(true);
        //create instance of boxer directly, outside of this method will re-instantiate each object.
        const convertRandosToBoxers = [...response.data.results].map(each => generateBoxerWithAPI(each))
        setNewBoxerList(prev => [...prev, ...convertRandosToBoxers]);
        localStorage.setItem('boxers', JSON.stringify(convertRandosToBoxers))
        setUpdateStatus('Opponents found.');
        setOpponentsFound(true);
      })
      .catch(err => {
        setUpdateStatus("No opponents found yet! Advance month for a new search.");
      })
  }
  
  const generateBoxerWithAPI = (input) => {
    console.log(input)
    const newUserFromAPI = input
    //create level scaling later
    const firstName = `${newUserFromAPI.name.first}`;
    const nickname = '';
    const lastName = `${newUserFromAPI.name.last}`;
    const hometown = `${newUserFromAPI.location.city}, ${newUserFromAPI.location.country}`;
    const weight = Randomize(125, 250);
    const favColor = ``;
    const stamina = Randomize(50, 100);
    const aggression = Randomize(50, 100);
    const agility = Randomize(50, 100);
    const strength = Randomize(50, 100);
    const defense = Randomize(50, 100);
    const heart = Randomize(50, 100);

    const newBoxer = new Boxer(
      firstName, nickname, lastName, hometown, weight, favColor,
      stamina, aggression, agility, strength, defense, heart
    );
    //Optional attributes before returning
    newBoxer.win = Randomize(1, 50);
    newBoxer.loss = Randomize(1, 50);
    newBoxer.favoriteColor = data.colorNames[Randomize(0, data.colorNames.length )]
    return newBoxer;
  }

  const mapOpponents = () => { //Map these badboys onto the DOM
    return newBoxerList.map((each, i) => {
      return (
        <button className='boxer-card' disabled={disableBoxer} onClick={(e) => {
          console.log(each)
          setOppState(each);
          setDisableBoxer(true); }}>
          <div className='boxer-card-row'>
            <div className='boxer-card-column'>
              <h4><strong>{`${each.firstName} ${each.lastName}`}</strong></h4>
            </div>
            <div className='boxer-card-column'>
              <h4>{`${each.win}-${each.loss}`}</h4>
            </div>
            <div className='boxer-card-column'>
              <h5>{commentary.weightClassName(each)}</h5>
            </div>
            <div className='boxer-card-column'>
              <h5>Rank: {each.rank}</h5>
            </div> 
          </div>
      </button>
      )
    })
  }

  const generateListOfBoxers = //Button that generates a new list of opponents, makes API calls
    <div id={'generator-btn'}>
      <h5>Searching for Opponents...</h5>
    </div>


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
              <div className='boxer-list'>
                { mapOpponents() }                
              </div>

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