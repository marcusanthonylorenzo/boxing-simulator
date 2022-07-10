import { useState } from 'react'
import './Helpers.css'
import Navbar from '../Interface/Navbar/Navbar'
import BoxerCard from '../Boxer/BoxerCard/BoxerCard'
import Display from '../Interface/Display/Display'
import oppBody from '../../assets/images/oppBody.png'
// import Commentary from './Commentary'

const FightEngine = ({ user, enemy }) => {

  const [userHp, setUserHp] = useState();
  const [enemyHp, setEnemyHp] = useState();

  //exchange() determines who wins the trading of blows

  const exchange = (attacker, defender) => {
    
    let atk = attacker.attack();
    let def = defender.defend();
    let difference = atk - def;

    //first conditions will check negative difference, if true, attacker pays a price for attacking first

    //COMMENTARY GOES HERE

    if (difference <= -5){
      attacker.hp += difference;
      console.log(attacker.hp, `${defender.firstName} returning heavy fire!`)
    } else if (difference >= -5 && difference <= -1){
      attacker.hp += difference;
      console.log(attacker.hp, `${defender.firstName} making ${attacker.firstName} pay on the way in`)
    }else if (difference === 0) {
      defender.hp -= 0;
      console.log(`${attacker.firstName} misses! ${defender.hp}`);
      return;
    } else if (difference >= 1 && difference <= 5) {
      defender.hp -= difference;
      console.log(`good back and forth action.`);
      console.log(attacker.firstName, atk, defender.firstName, def,`hp: ${defender.hp}`);
    } else if (difference > 5) {
      defender.hp -= difference;
      console.log(`${attacker.firstName} laying on the hurt!`);
      console.log(attacker.firstName, atk, defender.firstName, def,`hp: ${defender.hp}`);
    }
  }


  const engagement = (user, opp) => {  //engagement determines who initiates the attack
    
    let userOffense = user.engage();
    let oppOffense = opp.engage();

    if (userOffense > oppOffense) {
      exchange(user, enemy)
      setEnemyHp(opp.hp)
    } else if (oppOffense > userOffense) {
      exchange(opp, user)
      setUserHp(user.hp)
    }
  }


  const fightBtn =
    <button className="fight-button" onClick={()=> {

      for (let i = 0; i < 12; i++){
        let k = i;
        setTimeout(()=>{

          engagement(user, enemy)

        }, 100*(k + 1), ); //This third argument is a second callback that runs once after timeout, use for modal etc.
      }
    }}><h4>Fight</h4></button>


  // Use Composition to restructure boxer object
  const setCorner = (fighter, color, champion) => {
    return {
      ...fighter,
      cornerColor: color,
      champion: champion
    }
  }

  //corner color picker
  const cornerColor = { red: `rgba(139, 0, 0, 1)`, blue: `rgba(10, 30, 103, 1)` }
      

  return (

    <div className="fight-engine-wrap">

      <Navbar buttons={fightBtn}/>

      <div className="main-container">

        <BoxerCard boxer={user} path={oppBody} corner={() => setCorner(user, cornerColor.red)}/>

        <div className="inner-container">

          <Display />

        </div>

        <BoxerCard boxer={enemy} path={oppBody} corner={() => setCorner(enemy, cornerColor.blue, true)}/>

      </div>

    </div>

  )

}

export default FightEngine