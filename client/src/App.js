import React from 'react'
import './App.css';
import FightEngine from './FightEngine'
import temp from './Components/Helpers/Data'

function App() {
  const { user, enemy } = temp();

  return (
    <div className="App">
      
      <FightEngine user={user} enemy={enemy}/>

    </div>
  );
}
export default App;
