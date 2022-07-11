import { useState, useRef } from 'react'
import './Helpers.css'
import Navbar from '../Interface/Navbar/Navbar'
import BoxerCard from '../Boxer/BoxerCard/BoxerCard'
import Display from '../Interface/Display/Display'
// import SelectMenu from '../Interface/SelectMenu/SelectMenu'
import Textbox from '../Interface/Textbox/Textbox'
import leftBoxer from '../../assets/images/redgloves.png'
import oppBody from '../../assets/images/oppBody.png'
// import Commentary from './Commentary'

const FightEngine = ({ user, enemy }) => {

  // const [userHp, setUserHp] = useState();
  // const [enemyHp, setEnemyHp] = useState();
  const [userDmgScale, setUserDmgScale] = useState();
  const [oppDmgScale, setOppDmgScale] = useState();

  const [pbp, setPbp] = useState([]);
  const [ko, setKo] = useState(false);
  const [roundCount, setRoundCount] = useState(1);

  const setObj = (resultObj, key, value) => { //Composition create key
    return {
      ...resultObj,
      [key]: value
    }
  };


 //Phase 1 = exchange() determines who wins the trading of blows
  const exchange = (attacker, defender) => {
    let atk = attacker.attack();
    let def = defender.defend();
    let difference = atk - def;
    return difference
  };
  

 //Phase 2 = wrap both attack and defense with output text in one single obj, easier to package for output
  const determineDmg = (attacker, defender, difference) => {

    let result = {
      attacker: attacker,
      defender: defender,
      text: 'The fighters clinch'
    };

    let hit;

    if (attacker.hp <= 0 || defender.hp <= 0){ //check for knockout
      setKo(true)
      result.text = `THIS FIGHT IS OVER.`
      return;
    }

    if (difference <= -5){
      hit = attacker.hp += difference;
      setObj(attacker, "hp", hit)
      result.text = `${defender.firstName} returning heavy fire!`;

    } else if (difference >= -5 && difference <= -1){
      hit = attacker.hp += difference;
      setObj(attacker, "hp", hit)
      result.text = `${defender.firstName} making ${attacker.firstName} pay on the way in`;

    }else if (difference === 0) {
      hit = defender.hp -= 0;
      setObj(defender, "hp", hit)
      result.text = `${attacker.firstName} misses! ${defender.hp}`;

    } else if (difference >= 1 && difference <= 5) {
      defender.hp -= difference;
      setObj(defender, "hp", hit)
      result.text = `good back and forth action.`;

    } else if (difference > 5) {
      defender.hp -= difference;
      setObj(defender, "hp", hit)
      result.text = `${attacker.firstName} laying on the hurt!`;

    }
    return result
  };


  const engagement = (user, opp) => {  //engagement determines who initiates the attack
    
    let userOffense = user.engage();
    let oppOffense = opp.engage();
    let resultDmg;

    if (userOffense > oppOffense) {
      let userDmg = exchange(user, opp)
      resultDmg = determineDmg(user, opp, userDmg) //determines resulting dmg after engage and exchange
      setUserDmgScale(userDmg)
      console.log(opp.hp)

    } else if (oppOffense > userOffense) {
      let oppDmg = exchange(opp, user)
      resultDmg = determineDmg(opp, user, oppDmg) //determines resulting dmg after engage and exchange
      setOppDmgScale(oppDmg)
      // setUserHp(user.hp)

    } else if (oppOffense === userOffense) {
      console.log("cancel")
    }
    return resultDmg
  };


  const setCorner = (fighter, color, side, champion, dmg) => { //set fight corner, color, champ status
    return {
      ...fighter,
      cornerColor: color,
      side: side,
      champion: champion,
      dmgScale: () => dmg
    }
  };

  //corner color picker
  const cornerColor = { red: `rgba(139, 0, 0, 1)`, blue: `rgba(10, 30, 103, 1)` }


  /*
   *  userReady and oppReady is the final obj to store in pbp (the primary fight log)
   *  use these to pass as props/context
   */

  const userReady = setCorner(user, cornerColor.red, "left", false, userDmgScale)
  const oppReady = setCorner(enemy, cornerColor.blue, "right", true, oppDmgScale)


  const fightBtn =
    <button className="fight-button" onClick={()=> {

      for (let i = 0; i < 12; i++){ //loop to begin action
        let k = i;
        if (k === 1) { //updates the next round, if iterator starting from 0.
          let newRnd = roundCount + 1
          setRoundCount(newRnd)
        }

        setTimeout(()=>{
          let activity;

          if (ko === true || user.hp <= 0 || enemy.hp <= 0){ //check for knockout
            let over = "THIS FIGHT IS OVER";
            setPbp(prev => [...prev, {text: over, round: roundCount, attacker: ``, defender: ``} ] )
            return;
          }

          let fight = engagement(user, enemy)
          activity = setObj(fight, "round", roundCount)
          setPbp((prev) => [...prev, activity]);

        }, 200*(k + 1),);
        //This third argument is a second callback that runs once after timeout, use for modal etc.
      };
    }}><h4>Fight</h4></button>


  return (
    <div className="fight-engine-wrap">

      <Navbar/>

      <div className="main-container">
        <BoxerCard boxer={user} path={leftBoxer}
          corner={() => userReady}/>

        <div className="inner-container">
          <Display pbp={pbp} user={userReady} opp={oppReady} buttons={fightBtn}/>
        </div>

        <BoxerCard boxer={enemy} path={oppBody}
          corner={() => oppReady}/>

      </div>

    </div>
  )
}

export default FightEngine