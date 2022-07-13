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

  const [disable, setDisable] = useState(false)
  const [roundCount, setRoundCount] = useState(0);
  const [fightStart, setFightStart] = useState(false);
  const [exchangeCount, setExchangeCount] = useState(0);
  const [delay, setDelay] = useState(500);


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

  const determinePowerShot = (off, def, diff) => {
    let powerShot = off.ko(def); //determine powershot, then if KO
    let takesAShot = def.getUp();
    
    if (powerShot > def.chin){  //check if powershot is stronger than chin
      pbp.forEach((el, i) => el.text = `A BIG SHOT BY ${off.firstName}`)

      if (powerShot > takesAShot){  //check if powershot is stronger than def ability to getUp (take a shot)
        setKo(true);
        pbp.forEach((el, i) => { //change text again
          el.text = `${def.firstName} GOES DOWN.`;
          setPbp(prev => [prev, { text: `WILL ${def.firstName} GET UP?`}])
          def.con = 0.1;

          //This is where the AI decides if it can get up
          const getUp = def.getUp();
          if (getUp > takesAShot) {
            setPbp(prev => [prev, { text: `${def.firstName} stands back up!`}])
            setKo(false)
            def.hp = pbp.defender.hp*def.con;
          } else {
            setPbp(prev => [prev, {text: `THIS FIGHT IS OVER. ${off.firstName} PUTS ${def.firstName} AWAY`}])
            return;
          }
          console.log(off.firstName, def.firstName)
        })
      }

      return powerShot + diff //if not return a heavier shot
    } else {
      return diff
    }
  }


 //Phase 2 = wrap both attack and defense with output text in one single obj, easier to package for output
  const determineDmg = (attacker, defender, difference) => {

    let result = {
      attacker: attacker,
      defender: defender,
      totalDmg: 0,
      text: 'The fighters clinch'
    };
    let hit;
    let normalOrPowerPunch;
    let finished;
    const takesAShot = defender.getUp();
    const getUp = defender.getUp();

    if (attacker.hp <= 0) { //check for knockout
      setKo(true)
      finished = `${attacker.firstName} hits the canvas!`;
      setPbp(prev => [...prev, {text: finished, round: roundCount, attacker: ``, defender: ``} ] )

      const getUp = defender.getUp();
      if (getUp > takesAShot) {
        setPbp(prev => [prev, { text: `${defender.firstName} stands back up!`}])
      } else {
        setPbp(prev => [prev, {text: `THIS FIGHT IS OVER. ${attacker.firstName} PUTS ${defender.firstName} AWAY`}])
        return;
      }
      return;

    } else if (defender.hp <= 0) {
      setKo(true);
      finished = `${defender.firstName} is down!`;
      setPbp(prev => [...prev, {text: finished, round: roundCount, attacker: ``, defender: ``} ] )

      if (getUp > takesAShot) {
        setPbp(prev => [prev, { text: `${defender.firstName} stands back up!`}])
      } else {
        setPbp(prev => [prev, {text: `THIS FIGHT IS OVER. ${attacker.firstName} PUTS ${defender.firstName} AWAY`}])
        return;
      }
      return;
    }

    if (difference <= -5){ //if counter is too high

      hit = attacker.hp += difference; //reduce health
      setObj(attacker, "hp", hit);
      result.totalDmg = difference //log dmg value for boxerCard volume
      result.text = `${defender.firstName} returning heavy fire!`;

    } else if (difference >= -5 && difference <= -1){

      hit = attacker.hp += difference; //reduce health
      setObj(attacker, "hp", hit);
      result.totalDmg = difference;
      result.text = `${defender.firstName} making ${attacker.firstName} pay on the way in`;

    }else if (difference === 0) {
      hit = defender.hp -= 0;
      setObj(defender, "hp", hit);
      result.totalDmg = 0;
      result.text = `${attacker.firstName} swinging for air!`;

    } else if (difference >= 1 && difference <= 5) {
      normalOrPowerPunch = determinePowerShot(attacker, defender, difference)
      console.log(normalOrPowerPunch)
      hit = defender.hp -= normalOrPowerPunch; //reduce health
      setObj(defender, "hp", hit)

      result.totalDmg = normalOrPowerPunch;
      result.text = `Good back-and-forth action.`;

    } else if (difference > 5) {
      normalOrPowerPunch = determinePowerShot(attacker, defender, difference)
      console.log(normalOrPowerPunch)
      hit = defender.hp -= normalOrPowerPunch; //reduce health
      setObj(defender, "hp", hit)

      result.totalDmg = normalOrPowerPunch;
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
      resultDmg = 0;
    }
    console.log(resultDmg)
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


  const fight = () => {

  /*** set i length to user+opp engage for volume of strikes***/
      for (let i = 0; i < 12; i++){
        let k = i;

        if (k === 1) { //updates the next round
          let newRnd = roundCount + 1
          setRoundCount(newRnd)
        }

        const fightAction = setTimeout(()=>{
          let activity;

          //*** WHAT TO DO WHEN A BOXER IS DOWN AND NEEDS TO GET UP ***/
          if (ko === true){ //check for knockout
              let over;

              if (user.hp <= 0) { //check for knockout
                setKo(true)
                over = `${user.firstName} hits the canvas! a`;

                return;
              } else if (enemy.hp <= 0) {
                setKo(true);
                over = `${enemy.firstName} is down! x`;

              }
              setPbp(prev => [...prev, {text: over, round: roundCount, attacker: ``, defender: ``} ] )
              clearTimeout(fightAction);
              return;

          } else {
            /***  FIGHT WORKFLOW ***/
            let fightUnderway = engagement(user, enemy)
            setExchangeCount(k)
            activity = setObj(fightUnderway, "round", roundCount)
            setPbp((prev) => [...prev, activity]);
          }
        },
        delay*(k + 1), setDisable(false) )};
        //This third argument is a second callback that runs once after timeout, use for modal etc.
  } 

  const fightBtn = //The main button
    <button className="fight-button" disabled={disable} onClick={()=> {
      setFightStart(true);
      setDisable(true);
      fight()
    }}><h4>Fight</h4></button>

  console.log(ko)

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
              roundCount={roundCount} fightStart={fightStart} ko={ko}/>
            
            <div className="display-options">
              <SelectMenu  buttons={fightBtn} ko={ko} fightStart={fightStart} />
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