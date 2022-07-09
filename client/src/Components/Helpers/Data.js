import Boxer from '../Boxer/BoxerClass';

const temp = () => {

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

  return { user, enemy }

}

export default temp