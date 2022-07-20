import React from 'react'
import './Home.css'
import BoxerCard from '../../Components/Boxer/BoxerCard/BoxerCard'

const Home = ({ user, fightNight, setFightNight, fightBtn }) => {
  return (
    <div className="home-gym">
      <div className="home-title">WELCOME TO THE HOME GYM</div>
        <div className="home-main">

        <button onClick={()=> {
          setFightNight(true)
          console.log(fightNight)
        }
        }> Fight Night </button>
      </div>
    </div>
  )
}

export default Home