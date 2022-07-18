import React from 'react'

const Functions = () => {
  return {
    setObj: (resultObj, key, value) => { //Composition create key
      return {
        ...resultObj,
        [key]: value
      }
    },

    setCorner: (fighter, color, cornerColorLabel, side, champion, dmg) => { //set fight corner, color, champ status
      return {
        ...fighter,
        cornerColor: color,
        cornerColorLabel: cornerColorLabel,
        side: side,
        champion: champion,
        dmgScale: () => dmg
      }
    }

    }
  }

export default Functions