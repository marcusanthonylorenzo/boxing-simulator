import './App.css';
import Boxer from './Components/Boxer/BoxerClass.js';

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


  // user.pepTalk.youGottaGo()
  console.log(user.attack(), enemy.defend())

  // user.pepTalk.relax()


  return (
    <div className="App">


    </div>
  );
}

export default App;
