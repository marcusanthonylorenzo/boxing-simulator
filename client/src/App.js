import { useState } from 'react'
import './App.css';
import Boxer from './Components/Boxer/BoxerClass';
import FightEngine from './Components/Helpers/FightEngine'

function App() {

  //Test boxers
  const user = new Boxer(
    "Marcus", "catdog", "Lorenzo", //first, nickname, last
    "Melbourne, Australia", "145",  //Hometown, Weight (string)
    80, 83, 81, 83, 78  //stamina, agressivness, agility, strength, defense
  );

  const enemy = new Boxer(
    "Allan", "Loser", "V", //first, nickname, last
    "Melbourne, Australia", "195",  //Hometown, Weight (string)
    81, 79, 73, 83, 85  //stamina, agressivness, agility, strength, defense
  );

  const [userHp, setUserHp] = useState(user.hp);
  const [enemyHp, setEnemyHp] = useState(enemy.hp);

  console.log(user.hp, enemy.hp)

  return (
    <div className="App">

      <div>
        <FightEngine
          user={user} enemy={enemy}
          userHp={userHp} enemyHp={enemyHp}
          setUserHp={setUserHp} setEnemyHp={setEnemyHp}/>
      </div>

    </div>
  );
}

export default App;
