import React, { useState, useEffect } from 'react'
import './Home.css'
import BoxerCard from '../../Components/Boxer/BoxerCard/BoxerCard'
import FightEngine from '../../Components/FightEngine/FightEngine'

const Home = (
  { user, enemy, urls, fightNight, setFightNight,
  fightOver, setFightOver, setResetFightBtn }) => {

  const [disableWhenLowHP, setDisableWhenLowHP] = useState(false);

  useEffect(() => {
    setFightNight(false)
  }, [])

  useEffect(() => {
    if (user.hp <= user.maxHp*0.15) {
      console.log(user.hp)
      setDisableWhenLowHP(true);
    }
  }, [])

  // Must recover user.hp before continuing to next fight!



  return (
    <div className="home-gym">
      <div className="home-title">WELCOME TO THE HOME GYM</div>
        <div className="home-main">

        <button disabled={disableWhenLowHP}
          onClick={(e)=> {
            e.preventDefault();
            setFightOver(false);    
            setFightNight(true);
            setResetFightBtn(true);
        }}
        > Fight Night </button>
      </div>
    </div>
  )
}

export default Home