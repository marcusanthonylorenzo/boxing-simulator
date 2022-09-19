import Boxer from '../../Components/Boxer/BoxerClass';

const generateBoxer = (data) => {
  const firstName = data.firstName;
  const nickname = data.nickname;
  const lastName = data.lastName;
  const hometown = data.hometown;
  const weight = data.weight;
  const favColor = data.favColor;
  const stamina = data.stamina;
  const aggression = data.aggression;
  const agility = data.agility;
  const strength = data.strength;
  const defense = data.defense;
  const heart = data.heart;

  const newBoxer = new Boxer(
    firstName, nickname, lastName, hometown, weight, favColor,
    stamina, aggression, agility, strength, defense, heart
  );

  console.log(newBoxer)
  return newBoxer;
}

export default generateBoxer