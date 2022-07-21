import React, { useState, useEffect } from 'react'
import Home from './Pages/Home/Home'
import './App.css'
import FightEngine from './Components/FightEngine/FightEngine'
import temp from './Components/Helpers/Data'

function App() {
  const { user, enemy, urls } = temp();
  const [ fightNight, setFightNight ] = useState(true);
  const [ changeAppBgColor, setChangeAppBgColor ] = useState(`black`)

  const [userState, setUserState ] = useState(user)
  const [oppState, setOppState ] = useState(enemy)

  useEffect(() => { if(!fightNight) setChangeAppBgColor(`white`) }, [fightNight]);

  console.log(userState.hp, userState.win, userState.loss)

  return (
    <div className="App" style={{ backgroundColor: changeAppBgColor }}>

        {
         !fightNight ?
        <Home user={userState} enemy={oppState} urls={urls}
          fightNight={fightNight} setFightNight={setFightNight}/>
        :
        <FightEngine user={userState} enemy={oppState} urls={urls} fightNight={fightNight} setFightNight={setFightNight}/>
        }   

    </div>
  );
}
export default App;
