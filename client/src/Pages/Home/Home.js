import React, { useEffect } from 'react'
import './Home.css'
import BoxerCard from '../../Components/Boxer/BoxerCard/BoxerCard'
import FightEngine from '../../Components/FightEngine/FightEngine'

const Home = ({ user, enemy, urls, fightNight, setFightNight, setFightOver, newFightLoad }) => {

  useEffect(() => {
    setFightNight(false)
  }, [])

  return (
    <div className="home-gym">
      <div className="home-title">WELCOME TO THE HOME GYM</div>
        <div className="home-main">

        <button onClick={(e)=> {
          e.preventDefault();
          setFightNight(true);
          setFightOver(false);
          // setFightOver(false);
          console.log(fightNight)
          
        }}
        > Fight Night </button>
      </div>
    </div>
  )
}

export default Home