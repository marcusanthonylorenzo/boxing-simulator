import React, { useState, useEffect } from 'react'
import Home from './Pages/Home/Home'
import './App.css'
import Navbar from './Components/Interface/Navbar/Navbar'
import FightEngine from './Components/FightEngine/FightEngine'
import temp from './Components/Helpers/Data'

function App() {
  const { user, enemy, urls } = temp();
  /***  User and Opponent to pass down as state  ***/
  const [userState, setUserState ] = useState(user)
  const [oppState, setOppState ] = useState(enemy)

  const [ changeAppBgColor, setChangeAppBgColor ] = useState(`black`);

  /*** Match specific state ***/
  const [roundCount, setRoundCount] = useState(0);
  const [fightNight, setFightNight ] = useState(true);  
  const [resetFightBtn, setResetFightBtn] = useState(false);
  const [roundOver, setRoundOver] = useState(false);
  const [fightOver, setFightOver] = useState(false);



  useEffect(() => { if (!fightNight) setChangeAppBgColor(`rgb(234, 234, 234);`) }, [fightNight]);

  console.log(`App state: fightNight`, fightNight)

  return (
    <div className="App" style={{ backgroundColor: changeAppBgColor }}>

        <Navbar roundCount={roundCount} roundOver={roundOver}/>

        {
          
        !fightNight ?

        <Home user={userState} enemy={oppState} urls={urls}
          roundCount={roundCount} setRoundCount={setRoundCount}
          fightNight={fightNight} setFightNight={setFightNight}
          fightOver={fightOver} setFightOver={setFightOver}
          resetFightBtn={resetFightBtn} setResetFightBtn={setResetFightBtn}/>

        :

        <FightEngine user={userState} enemy={oppState} urls={urls}
          roundCount={roundCount} setRoundCount={setRoundCount}
          roundOver={roundOver} setRoundOver={setRoundOver}
          fightNight={fightNight} setFightNight={setFightNight}
          fightOver={fightOver} setFightOver={setFightOver}
          resetFightBtn={resetFightBtn} setResetFightBtn={setResetFightBtn}/>

        }   

    </div>
  );
}
export default App;
