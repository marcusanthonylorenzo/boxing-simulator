import React, { useState, useEffect } from 'react'
import './App.css'
import Landing from './Pages/Landing/Landing'
import Home from './Pages/Home/Home'
import Navbar from './Components/Interface/Navbar/Navbar'
import FightEngine from './Components/FightEngine/FightEngine'
import data from './Components/Helpers/Data'

function App() {

  /*** Main  ***/
  const { user, enemy, urls } = data(); //import new fighters here
  const [landingPage, setLandingPage] = useState(true);
  
  /***  User and Opponent to pass down as state  ***/
  const [userState, setUserState ] = useState(user);
  const [oppState, setOppState ] = useState(enemy);

  /*** Counters and Switches ***/
  const [changeAppBgColor, setChangeAppBgColor] = useState(`rgb(234, 234, 234)`);
  const [fightNumber, setFightNumber] = useState(0);
  const [prevFightNumber, setPrevFightNumber] = useState(fightNumber);
  const [monthCounter, setMonthCounter] = useState(0);
  const [advanceMonth, setAdvanceMonth] = useState(false);

  /*** Match specific state ***/
  const [roundCount, setRoundCount] = useState(0);
  const [fightNight, setFightNight ] = useState(false);  
  const [resetFightBtn, setResetFightBtn] = useState(false);
  const [roundOver, setRoundOver] = useState(false);
  const [fightOver, setFightOver] = useState(false);
  const [fightDataCollection, setFightDataCollection] = useState([]);
  const [stopFight, setStopFight] = useState({});

  useEffect(() => { !fightNight ? setChangeAppBgColor(`rgb(234, 234, 234)`) : setChangeAppBgColor(`black`) }, [fightNight])

  useEffect(() => { persistInLocalStorage("fightHistory", JSON.stringify(fightDataCollection)) }, [fightDataCollection])

  /***
  * IMPORTANT: sends callback down to FightEngine, to collect fight data rendered and setState at App level.
  ***/
 

  const updateDataCollections = (input) => { setFightDataCollection(prev => [...prev, { matchDetails: input, matchId: fightNumber }])}

  const persistInLocalStorage = (key, item) => { localStorage.setItem(key, item) }

  const loadGame = () => {
    return (
      <>
        <Navbar
          roundCount={roundCount} roundOver={roundOver}
          monthCounter={monthCounter} fightNight={fightNight}/>

        {
          
        !fightNight ?

        <Home user={userState} enemy={oppState} urls={urls}
          setUserState={setUserState} setOppState={setOppState}
          monthCounter={monthCounter} setMonthCounter={setMonthCounter}
          advanceMonth={advanceMonth} setAdvanceMonth={setAdvanceMonth}
          stopFight={stopFight} setStopFight={setStopFight}
          roundCount={roundCount} setRoundCount={setRoundCount}
          fightNight={fightNight} setFightNight={setFightNight}
          fightOver={fightOver} setFightOver={setFightOver}
          resetFightBtn={resetFightBtn} setResetFightBtn={setResetFightBtn}
          fightNumber={fightNumber} setFightNumber={setFightNumber} />

        :

        <FightEngine user={userState} enemy={oppState} urls={urls}
          roundCount={roundCount} setRoundCount={setRoundCount}
          roundOver={roundOver} setRoundOver={setRoundOver}
          fightNight={fightNight} setFightNight={setFightNight}
          fightOver={fightOver} setFightOver={setFightOver}
          resetFightBtn={resetFightBtn} setResetFightBtn={setResetFightBtn}
          fightNumber={fightNumber} prevFightNumber={prevFightNumber}
          setPrevFightNumber={setPrevFightNumber}
          stopFight={stopFight} setStopFight={setStopFight}
          updateDataCollections={updateDataCollections}/>

        }
      </>
    )
  }
  return (
    <div className="App" style={{ backgroundColor: changeAppBgColor }}>
      {
        landingPage ?

        <Landing landingPage={landingPage} setLandingPage={setLandingPage}/>

        :
        
        loadGame()
      }    
    </div>
  )
}
export default App;
