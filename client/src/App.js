import './App.css';
import Boxer from './Components/Boxer/BoxerClass';
import fightEngine from './Components/Helpers/FightEngine'

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






  return (
    <div className="App">

      {user.hp} {enemy.hp}


      {fightEngine(user, enemy)}

    </div>
  );
}

export default App;
