import homegym from '../../assets/images/homegym.jpg';
import Boxer from '../Boxer/BoxerClass';

const data = () => {

  //Test boxers
  const user = new Boxer(
    "Marcus", "catdog", "Lorenzo", //first, nickname, last
    "Melbourne, Australia", "145",
    "Forestgreen",  //Hometown, Weight (string)
    80, 83, 81, 83, 78, 80, //stamina, agressivness, agility, strength, defense
    80, 90
  );

  const enemy = new Boxer(
    "Allan", "Loser", "Volvo", //first, nickname, last
    "Melbourne, Australia", "195",
    "Navy", //Hometown, Weight (string)
    81, 83, 73, 83, 85, 80,  //stamina, agressivness, agility, strength, defense
    85, 75
  );

  const urls = [
    `url('https://www.matchroomboxing.com/app/uploads/2020/07/Untitled-1-1.jpg')`,
    `url('${homegym}')`
  ]

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const colorNames = [
    "Black",
    // "BlanchedAlmond",
    "Blue",
    "Brown",
    "Chocolate",
    "Coral",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGrey",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DodgerBlue",
    "FireBrick",
    "Fuchsia",
    "Gainsboro",
    "Gold",
    "Green",
    "Lavender",
    "LawnGreen",
    "LimeGreen",
    // "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "Navy",
    "Orange",
    "OrangeRed",
    "Orchid",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "SandyBrown",
    "SeaGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
  ];

  return { user, enemy, urls, monthNames, colorNames }
}

export default data