import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import FightEngine from './Components/FightEngine/FightEngine'
import temp from './Components/Helpers/Data'

function App() {
  const { user, enemy, urls } = temp();
  const [ fightNight, setFightNight ] = useState(true);
  const [ changeAppBgColor, setChangeAppBgColor ] = useState(`black`)

  useEffect(() => { if(!fightNight) setChangeAppBgColor(`white`) }, [fightNight]);

  return (
    <div className="App" style={{ backgroundColor: changeAppBgColor }}>
        <FightEngine user={user} enemy={enemy} urls={urls} fightNight={fightNight} setFightNight={setFightNight}/>
    </div>
  );
}
export default App;
