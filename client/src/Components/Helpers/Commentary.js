import React from 'react'

const Commentary = () => {

  const weightClassName = (boxer) => {

    const weight = parseInt(boxer.weightClass);

    if (weight >= 108 && weight < 112){
      return "Light-Flyweight"
    } else if (weight >= 112 && weight < 115){
      return "Flyweight"
    } else if (weight >= 115 && weight < 118){
      return "Super-Flyweight"
    } else if (weight >= 118 && weight < 122){
      return "Bantamweight"
    } else if (weight >= 122 && weight < 126){
      return "Super-Bantamweight"
    } else if (weight >= 126 && weight < 130){
      return "Featherweight"
    } else if (weight >= 130 && weight < 135){
      return "Super-Featherweight"
    } else if (weight >= 135 && weight < 140){
      return "Lightweight"
    } else if (weight >= 140 && weight < 147){
      return "Light-Welterweight"
    } else if (weight >= 147 && weight < 154){
      return "Welterweight"
    } else if (weight >= 154 && weight < 160){
      return "Light-Middleweight"
    } else if (weight >= 160 && weight < 168){
      return "Middleweight"
    } else if (weight >= 168 && weight < 175){
      return "Super-Middleweight"
    } else if (weight >= 175 && weight < 200){
      return "Light-Heavyweight"
    } else if (weight >= 200 && weight < 205){
      return "Cruiserweight"
    } else if (weight >= 205 && weight < 112){
      return "Heavyweight"
    }
  }


  return { weightClassName }

}

export default Commentary