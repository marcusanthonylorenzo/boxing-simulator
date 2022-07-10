import { useState } from 'react'
import './Helpers.css'
import Navbar from '../Interface/Navbar/Navbar'
import BoxerCard from '../Boxer/BoxerCard/BoxerCard'
import Display from '../Interface/Display/Display'
// import SelectMenu from '../Interface/SelectMenu/SelectMenu'
import leftside from '../../assets/images/leftside.png'
import oppBody from '../../assets/images/oppBody.png'
// import Commentary from './Commentary'

const FightEngine = ({ user, enemy }) => {

  const [userHp, setUserHp] = useState();
  const [enemyHp, setEnemyHp] = useState();
  const [userDmgScale, setUserDmgScale] = useState();
  const [oppDmgScale, setOppDmgScale] = useState();


  const exchange = (attacker, defender) => { //exchange() determines who wins the trading of blows
    
    let atk = attacker.attack();
    let def = defender.defend();
    let difference = atk - def;

    //first conditions will check negative difference, if true, attacker pays a price for attacking first
    //COMMENTARY GOES HERE

    if (difference <= -5){
      attacker.hp += difference;
      console.log(attacker.hp, `${defender.firstName} returning heavy fire!`)
      return difference;

    } else if (difference >= -5 && difference <= -1){
      attacker.hp += difference;
      console.log(attacker.hp, `${defender.firstName} making ${attacker.firstName} pay on the way in`)
      return difference;

    }else if (difference === 0) {
      defender.hp -= 0;
      console.log(`${attacker.firstName} misses! ${defender.hp}`);
      return difference;

    } else if (difference >= 1 && difference <= 5) {
      defender.hp -= difference;
      console.log(`good back and forth action.`);

      return difference

    } else if (difference > 5) {
      defender.hp -= difference;
      console.log(`${attacker.firstName} laying on the hurt!`);

      return difference

    }
  }


  const engagement = (user, opp) => {  //engagement determines who initiates the attack
    
    let userOffense = user.engage();
    let oppOffense = opp.engage();

    console.log(oppOffense, userOffense)
    let userDmg;
    let oppDmg;

    if (userOffense > oppOffense) {
      userDmg = exchange(user, opp)
      setEnemyHp(opp.hp)
      setUserDmgScale(userDmg)
      console.log("user")
    } else if (oppOffense > userOffense) {
      oppDmg = exchange(opp, user)
      setUserHp(user.hp)
      setOppDmgScale(oppDmg)
      console.log("enemy")

    }
    return engagement
  }


  const fightBtn =
    <button className="fight-button" onClick={()=> {

      for (let i = 0; i < 12; i++){
        let k = i;
        setTimeout(()=>{

          if (user.hp <= 0 || enemy.hp <= 0){ //check for knockout
            console.log("THIS FIGHT IS OVER");
            return;
          }

          engagement(user, enemy)
          engagement(enemy, user)

        }, 200*(k + 1), ); //This third argument is a second callback that runs once after timeout, use for modal etc.
      }
    }}><h4>Fight</h4></button>



  // Use Composition to restructure boxer object
  const setCorner = (fighter, color, side, champion, dmg) => {
    return {
      ...fighter,
      cornerColor: color,
      side: side,
      champion: champion,
      dmgScale: () => dmg
    }
  }

  //corner color picker
  const cornerColor = { red: `rgba(139, 0, 0, 1)`, blue: `rgba(10, 30, 103, 1)` }


  return (

    <div className="fight-engine-wrap">

      <Navbar/>

      <div className="main-container">

        <BoxerCard boxer={user} path={oppBody} corner={() => setCorner(user, cornerColor.red, "left", false, userDmgScale)}/>

        <div className="inner-container">

          <Display buttons={fightBtn}/>
{/* 
          <SelectMenu show={true} buttons={fightBtn} /> */}

        </div>

        <BoxerCard boxer={enemy} path={oppBody} corner={() => setCorner(enemy, cornerColor.blue, "right", true, oppDmgScale)}/>

      </div>

    </div>

  )

}

export default FightEngine