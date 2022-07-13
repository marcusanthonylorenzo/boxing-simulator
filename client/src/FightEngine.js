import { useState, useEffect } from 'react'
import './Components/Helpers/Helpers.css'
import Navbar from './Components/Interface/Navbar/Navbar'
import BoxerCard from './Components/Boxer/BoxerCard/BoxerCard'
import Display from './Components/Interface/Display/Display'
import leftBoxer from './assets/images/redgloves.png'
import oppBody from './assets/images/oppBody.png'
import SelectMenu from './Components/Interface/SelectMenu/SelectMenu'

const FightEngine = ({ user, enemy }) => {

  const [userActive, setUserActive] = useState(user);
  const [oppActive, setOppActive] = useState(enemy);
  const [userDmgScale, setUserDmgScale] = useState();
  const [oppDmgScale, setOppDmgScale] = useState();
  const [pbp, setPbp] = useState([]);
  const [ko, setKo] = useState(false);

  const [roundCount, setRoundCount] = useState(0);
  const [fightStart, setFightStart] = useState(false);
  const [exchangeCount, setExchangeCount] = useState(0);


  useEffect(() => {
    setUserActive(userReady);
    setOppActive(oppReady);
  },[])


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
      totalDmg: 0,
      text: 'The fighters clinch'
    };
    let hit;


    if (attacker.hp <= 0) { //check for knockout
      setKo(true)
      result.text = `${attacker.firstName} hits the canvas!`;

      return;
    } else if (defender.hp <= 0) {
      setKo(true);
      result.text = `${defender.firstName} is down!`;

      //this is where you use .getUp
      return;
    }


    if (difference <= -5){
      hit = attacker.hp += difference;
      setObj(attacker, "hp", hit)
      result.totalDmg = hit

      result.text = `${defender.firstName} returning heavy fire!`;

    } else if (difference >= -5 && difference <= -1){

      let powerShot = defender.ko(attacker); //determine KO, based on the def chin mitigating atk pow
      console.log(powerShot, difference, attacker.hp)
      if (powerShot > attacker.chin){
        console.log(powerShot, attacker.chin, difference + powerShot)
      }
      
      hit = attacker.hp += difference; //reduce health
      setObj(attacker, "hp", hit)

      result.totalDmg = hit
      result.text = `${defender.firstName} making ${attacker.firstName} pay on the way in`;

    }else if (difference === 0) {
      hit = defender.hp -= 0;
      setObj(defender, "hp", hit)
      result.totalDmg = hit;
      result.text = `${attacker.firstName} misses!`;

    } else if (difference >= 1 && difference <= 5) {
      defender.hp -= difference;
      result.totalDmg = difference;
      setObj(defender, "hp", hit)
      result.text = `Good back-and-forth action.`;

    } else if (difference > 5) {
      defender.hp -= difference;
      result.totalDmg = difference;
      setObj(defender, "hp", hit)
      result.text = `${attacker.firstName} laying on the hurt!`;

    }
    return result
  };


  //Phase 3: tie everything together
  const engagement = (user, opp) => {  //engagement determines who initiates the attack   
    let userOffense = user.engage();
    let oppOffense = opp.engage();
    let resultDmg;

    if (userOffense > oppOffense) {
      let userDmg = exchange(user, opp)
      resultDmg = determineDmg(user, opp, userDmg) //determines resulting dmg after engage and exchange
      setUserDmgScale(userDmg)

    } else if (oppOffense > userOffense) {
      let oppDmg = exchange(opp, user)
      resultDmg = determineDmg(opp, user, oppDmg) //determines resulting dmg after engage and exchange
      setOppDmgScale(oppDmg)

    } else if (oppOffense === userOffense) {
      console.log("cancel")
    }
    return resultDmg
  };


  const setCorner = (fighter, color, cornerColorLabel, side, champion, dmg) => { //set fight corner, color, champ status
    return {
      ...fighter,
      cornerColor: color,
      cornerColorLabel: cornerColorLabel,
      side: side,
      champion: champion,
      dmgScale: () => dmg
    }
  };


  //HERE is where you set the fighters extra stats, randomize cornerColors in future, change before each new fight!
  const cornerColor = { red: `rgba(139, 0, 0, 1)`, blue: `rgba(10, 30, 103, 1)` }
  const userReady = setCorner(user, cornerColor.red, "red", "left", false, userDmgScale)
  const oppReady = setCorner(enemy, cornerColor.blue, "blue", "right", true, oppDmgScale)


  const fight = async () => {

  /*** set i length to user+opp engage for volume of strikes***/
      for (let i = 0; i < 12; i++){
        let k = i;

        if (k === 1) { //updates the next round
          let newRnd = roundCount + 1
          setRoundCount(newRnd)
        }

        setTimeout(()=>{
          let activity;
          if (ko === true){ //check for knockout

               let over = "THIS FIGHT IS OVER";
                      
              if (user.hp <= 0) { //check for knockout
                setKo(true)
                over = `${user.firstName} hits the canvas!`;

                return;
              } else if (enemy.hp <= 0) {
                setKo(true);
                over = `${enemy.firstName} is down!`;

                //this is where you use .getUp
                return;
              }

            setPbp(prev => [...prev, {text: over, round: roundCount, attacker: ``, defender: ``} ] )
            return;
          }
          /***  FIGHT WORKFLOW ***/
          let fight = engagement(user, enemy)
          setExchangeCount(k)
          activity = setObj(fight, "round", roundCount)
          setPbp((prev) => [...prev, activity]);

        },
        500*(k + 1),
        () => console.log("fight over"));//This third argument is a second callback that runs once after timeout, use for modal etc.

      };

  } 


  const fightBtn = //The main button
    <button className="fight-button" onClick={()=> {
      setFightStart(true);
      fight()
    }}><h4>Fight</h4></button>

    console.log(userActive.ko(oppActive), oppActive);


  return (
    <div className="fight-engine-wrap">

      <Navbar/>

      <div className="main-container-wrap">
        <div className="main-container">
          <BoxerCard boxer={user} path={leftBoxer}
            pbp={pbp}
            roundCount={roundCount}
            exchangeCount={exchangeCount}
            corner={() => userReady}/>

          <div className="inner-container">
            <Display
              pbp={pbp} user={userActive} opp={oppActive}
              roundCount={roundCount} fightStart={fightStart} />
            
            <div className="display-options">
              <SelectMenu  buttons={fightBtn} />
            </div>
          </div>

          <BoxerCard boxer={enemy} path={oppBody}
            pbp={pbp}
            roundCount={roundCount}
            exchangeCount={exchangeCount}
            corner={() => oppReady}/>
        </div>
      </div>
    </div>
  )
}

export default FightEngine