import React, { useState, useEffect } from 'react'
import Home from './Pages/Home/Home'
import './App.css'
import FightEngine from './Components/FightEngine/FightEngine'
import temp from './Components/Helpers/Data'

function App() {
  const { user, enemy, urls } = temp();
  const [ fightNight, setFightNight ] = useState(true);
  const [ changeAppBgColor, setChangeAppBgColor ] = useState(`black`);
  const [resetFightBtn, setResetFightBtn] = useState(false);
  const [fightOver, setFightOver] = useState(false);

  /***  User and Opponent to pass down as state  ***/
  const [userState, setUserState ] = useState(user)
  const [oppState, setOppState ] = useState(enemy)

  useEffect(() => { if(!fightNight) setChangeAppBgColor(`white`) }, [fightNight]);

  console.log(`App state: fightNight`, fightNight)

  return (
    <div className="App" style={{ backgroundColor: changeAppBgColor }}>

        { !fightNight ?

        <Home user={userState} enemy={oppState} urls={urls}
          fightNight={fightNight} setFightNight={setFightNight}
          fightOver={fightOver} setFightOver={setFightOver}
          resetFightBtn={resetFightBtn} setResetFightBtn={setResetFightBtn}/>

        :

        <FightEngine user={userState} enemy={oppState} urls={urls}
        fightNight={fightNight} setFightNight={setFightNight}
        fightOver={fightOver} setFightOver={setFightOver}
        resetFightBtn={resetFightBtn} setResetFightBtn={setResetFightBtn}/>

        }   

    </div>
  );
}
export default App;
