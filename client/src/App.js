import { useState } from 'react'
import './App.css';
import FightEngine from './Components/Helpers/FightEngine'
import temp from './Components/Helpers/Data'

function App() {

  const { user, enemy } = temp();

  return (
    <div className="App">

      <div>
        <FightEngine
          user={user} enemy={enemy} />
      </div>

    </div>
  );
}

export default App;
