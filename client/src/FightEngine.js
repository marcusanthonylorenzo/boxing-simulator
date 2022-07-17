import { useState, useEffect } from 'react'
import Navbar from './Components/Interface/Navbar/Navbar'
import BoxerCard from './Components/Boxer/BoxerCard/BoxerCard'
import Display from './Components/Interface/Display/Display'
import leftBoxer from './assets/images/redgloves.png'
import oppBody from './assets/images/oppBody.png'
import SelectMenu from './Components/Interface/SelectMenu/SelectMenu'
import randomize from './Components/Helpers/Randomize'

const FightEngine = ({ user, enemy }) => {

  const [userActive, setUserActive] = useState(user); //point to an updated state of user attributes
  const [oppActive, setOppActive] = useState(enemy);
  const [userDmgScale, setUserDmgScale] = useState(); //store values for each total damage output for data
  const [oppDmgScale, setOppDmgScale] = useState();
  const [pbp, setPbp] = useState([]); //a combination of above state in objects, for historical fight record
  
  const [punchCount, setPunchCount] = useState([]); //data for each punch/counter punch thrown, for historical fight record
  const [ko, setKo] = useState(false);
  const [disable, setDisable] = useState(false)
  const [roundCount, setRoundCount] = useState(0);
  const [roundStart, setRoundStart] = useState(false);
  const [roundOver, setRoundOver] = useState(false);
  const [fightStart, setFightStart] = useState(false);

  const [rateOfExchange, setRateOfExchange] = useState(12);  //toggle number of punches in one round based on boxer handSpeed
  const [exchangeCount, setExchangeCount] = useState(0);  //count number of times boxers enter a scrap
  const [delay, setDelay] = useState(1000);  //toggle rate of text ouput


  useEffect(() => {
    setUserActive(userReady);
    setOppActive(oppReady);
    if (roundStart) setDisable(true);
  },[])

  const setObj = (resultObj, key, value) => { //Composition create key
    return {
      ...resultObj,
      [key]: value
    }
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

  // const setPbpFunc = () => {


  // }

  //HERE is where you set the fighters extra stats, randomize cornerColors in future, change before each new fight!
  const cornerColor = { red: `rgba(139, 0, 0, 1)`, blue: `rgba(10, 30, 103, 1)` }
  const userReady = setCorner(user, cornerColor.red, "red", "left", false, userDmgScale)
  const oppReady = setCorner(enemy, cornerColor.blue, "blue", "right", true, oppDmgScale)


  const determineKO = (offense, defense, hit ) => {

    if (defense.hp <= 0) {
      console.log("DETERMINING KO")

      const getUpTimer = setTimeout(() => { //slow down getUp post knock out text boxes.
      const takesShot = defense.getUp();
      const getUp = defense.getUp();

      setPbp(prev => [...prev, {  //push to play-by-play array with new object.
        attacker: offense,
        defender: defense,
        hit: hit,
        text: `${defense.firstName} with the count!`}
      ])

      if (getUp > takesShot) { //if second will to "get up" is stronger than previous will to get up.
        setKo(false)          
        console.log("HE'S BACK UP")
        setPbp(prev => [...prev, {
          attacker: offense,
          defender:defense,
          hit: hit,
          text: `${defense.firstName} stands back up!`
        }])
        defense.hp*=1.2;
        return determineKO;
        
      } else {
        console.log("determineKO() says FIGHT OVER")
        setPbp(prev => [prev, {
          attacker: offense,
          defender: defense,
          hit: hit,
          text: `THIS FIGHT IS OVER. ${offense.firstName} PUTS ${defense.firstName} AWAY`
        }])
        return determineKO;
      }
      }, 600);
      clearTimeout(getUpTimer)
    }
  };


  const determinePowerShot = (off, def, diff) => {
    let powerShot = off.ko(def); //determine powershot, then if KO
    let takesAShot = def.getUp();
    
    if (powerShot > def.chin){  //check if powershot is stronger than chin
      setPbp(prev => [...prev, {
        attacker: off,
        defender: def,
        hit: diff,
        text: `A BIG SHOT BY ${off.firstName}. ${def.firstName} stumbles!`
      }])

    const consciousness = def.getUp();
    if (consciousness > takesAShot){  //check if powershot is stronger than def ability to getUp (take a shot)
      setKo(true);
      setPbp(prev => [...prev, {
        attacker: off,
        defender: def,
        hit: diff,
        text: `${def.firstName} IS DOWN. DOES HE GET BACK UP?`
      }])
      def.energyLoss();
      determineKO(off, def, powerShot) //Post determine KO is where you setKo to false, and implement ref count
      setKo(false) //if determineKO does not persist ko state, (setKo(false)), then continue pbp.
      setPbp(prev => [...prev, {
        attacker: off,
        defender: def,
        hit: diff,
        text: `${def.firstName} beats the count!`
      }])
      }
      return powerShot + diff //if not return a heavier shot
    } else {
      return diff
    }
  }
  
   //Phase 1 = exchange() determines who wins the trading of blows
  const exchange = (attacker, defender) => {
    let atkCombos = attacker.handSpeed(); //determine punch volume
    let defCombos = defender.handSpeed();

    let atk = attacker.attack(atkCombos);
    let def = defender.defend(defCombos);
    let difference = atk - def;

    console.log(`combos, atk, defCombos, def, diff`, atkCombos, atk, defCombos, def, difference)
    setPunchCount(prev => [...prev, {  //set punchCount list, to store punchStats
      attacker: {
        name: attacker.firstName,
        punchesThrown: Math.ceil(atkCombos/rateOfExchange), //round up a randomized no. of punches in combo
        punchesLanded: Math.round((atk*(atkCombos/100))/rateOfExchange), //round 
        effectiveness: atk/10,
        engagement: `aggressor`
      },
      defender: {
        name: defender.firstName,
        punchesThrown: Math.ceil(defCombos/rateOfExchange),
        punchesLanded: Math.round((def*(defCombos/100))/rateOfExchange),
        effectiveness: def/10,
        engagement: `counter`
      },
      difference: difference,
      round: roundCount+1
    }])
    return difference
  };


 //Phase 2 = wrap both attack and defense with output text in one single obj, easier to package for output
  const calcDamage = (attacker, defender, difference) => {

      let result = { //an object template to populate the pbp
        attacker: attacker,
        defender: defender,
        totalDmg: 0,
        text: 'The fighters clinch'
      };
      let hit;
      let normalOrPowerPunch;

      if (attacker.hp <= 0) { //check for knockout
        setKo(true)
        console.log("STRAIGHT TO DETERMINE DMG atk")

        const atkerGetUp = attacker.getUp();
        if (atkerGetUp > attacker.getUp()) {
          setKo(false);
          setPbp(prev => [prev, {text: `${attacker.firstName} stands back up!`}])
          attacker.roundRecovery();
          return calcDamage;
        } else {
          setRateOfExchange(1);
          setPbp(prev => [prev, {text: `THIS FIGHT IS OVER. ${defender.firstName} PUTS ${attacker.firstName} AWAY`}])
          return calcDamage;
        }

      } else if (defender.hp <= 0) {
        setKo(true);
        console.log("STRAIGHT TO DETERMINE DMG def")
        const takesAShot = defender.getUp();
        const getUp = defender.getUp();

        if (getUp > takesAShot) {
          setKo(false);
          console.log('down!')
          setPbp(prev => [prev, { text: `${defender.firstName} IS DOWN...BUT GETS BACK UP!`}])
          defender.roundRecovery();
          return calcDamage;

        } else {
          setRateOfExchange(1);
          setPbp(prev => [prev, {text: `THIS FIGHT IS OVER, That was a heavy, heavy shot. It looked like his soul escaped him immediately. ${attacker.firstName} PUTS ${defender.firstName} AWAY`}])
          return calcDamage;
        }
    }
    
    /*** 
    FIGHT COMMENTARY GOES HERE: refactor all conditional events!
    ***/

    if (difference <= -35){ //Strong counters by defender

      hit = attacker.hp += difference; //reduce health
    
      setObj(attacker, "hp", hit);
      result.totalDmg = difference
      result.text = `${defender.firstName} returning some BIG, HEAVY counters!`;

    } else if (difference > -35 && difference <= -25){ //Close Counter in favor of defender.
      hit = attacker.hp += difference; //reduce health
      setObj(attacker, "hp", hit);
      result.totalDmg = difference;
      result.text = `${defender.firstName} keeping the pressure off and working well on the outside.`;

    } else if (difference > -25 && difference <= -15){ //Close Counter in favor of defender.
      hit = attacker.hp += difference; //reduce health
      setObj(attacker, "hp", hit);
      result.totalDmg = difference;
      result.text = `${defender.firstName} making ${attacker.firstName} pay on the way in`;

    } else if (difference > -15 && difference < -5){ //Close Counter in favor of defender.
      hit = attacker.hp += difference; //reduce health
      setObj(attacker, "hp", hit);
      result.totalDmg = difference;
      result.text = `${defender.firstName} moving well to avoid ${attacker.firstName}'s offense. Peppering jabs in response.`;


    } else if (difference >=5 && difference <-2) { //Inside work for defender
      hit = attacker.hp -= 2;
      defender.hp -= 1;
      setObj(defender, "hp", hit);
      result.totalDmg = 2;
      result.text = `Both fighters work inside...${defender.firstName} getting the best of the scrap.`;

    } else if (difference >= 2 && difference <= 2) {
      hit = attacker.hp -= 0;
      attacker.roundRecovery();
      defender.roundRecovery();
      setObj(attacker, "hp", hit);
      result.totalDmg = 0;
      result.text = `Both fighters work in the clinch...Ref decides to break.`;

    // } else if (difference === 1){
    //   hit = defender.hp -= 2;
    //   attacker.hp -= 1;
    //   setObj(defender, "hp", hit);

    //   result.totalDmg = 2;
    //   result.text = `Strong corner bullying by ${attacker.firstName}`;



    } else if (difference > 2 && difference <= 5) { // Close in favor of Attacker
      normalOrPowerPunch = determinePowerShot(attacker, defender, difference)
      hit = defender.hp -= normalOrPowerPunch;
      setObj(defender, "hp", hit)
      result.totalDmg = normalOrPowerPunch;
      result.text = `Solid work and steady shots by ${attacker.firstName}`;

    } else if (difference > 5 && difference <= 15) {
      normalOrPowerPunch = determinePowerShot(attacker, defender, difference)
      hit = defender.hp -= normalOrPowerPunch;
      setObj(defender, "hp", hit)
      result.totalDmg = normalOrPowerPunch;
      result.text = `${attacker.firstName} working great in the mid-range!`;

    } else if (difference > 15 && difference <= 25) {
      normalOrPowerPunch = determinePowerShot(attacker, defender, difference)
      hit = defender.hp -= normalOrPowerPunch;
      setObj(defender, "hp", hit)
      result.totalDmg = normalOrPowerPunch;
      result.text = `A clinical performance by ${attacker.firstName}!`;

    } else if (difference > 25) {
      normalOrPowerPunch = determinePowerShot(attacker, defender, difference)
      hit = defender.hp -= normalOrPowerPunch;
      setObj(defender, "hp", hit)
      result.totalDmg = normalOrPowerPunch;
      result.text = `${attacker.firstName} laying some hard, clean shots with ${defender.firstName} trapped in the corner!`;
    }



    return result
  };


  //Phase 3: tie everything together
  const engagement = (user, opp) => {  //engagement determines who initiates the attack   
    let userOffense = user.engage();
    let oppOffense = opp.engage();
    let resultDmg;

    if (userOffense > oppOffense) {
      let userDmg = exchange(user, opp);
      let defDmg = exchange(opp, user);
      let dmgDifferential = userDmg - defDmg
      resultDmg = calcDamage(user, opp, dmgDifferential); //determines resulting dmg after engage and exchange
      setUserDmgScale(userDmg);

    } else if (oppOffense > userOffense) {
      let oppDmg = exchange(opp, user);
      let playerDmg = exchange(user, opp);
      let dmgDifference = oppDmg - playerDmg;
      resultDmg = calcDamage(opp, user, dmgDifference); //determines resulting dmg after engage and exchange
      setOppDmgScale(oppDmg);

    } else if (oppOffense === userOffense) {
      resultDmg = 0;
    }
    return resultDmg;
  };

  console.log(roundStart)

  const fight = (user, enemy) => {
      roundUpdate();


      for (let i = 0; i < rateOfExchange; i++){ //set i length to user+opp engage for volume of strikes
        let k = i;
        let newRnd = roundCount + 1;
        setRoundCount(newRnd);

        let fightAction = setTimeout(()=>{
          let activity;
          let over;

          //*** WHAT TO DO WHEN A BOXER IS DOWN AND NEEDS TO GET UP ***/
          if (user.hp <= 0) { //check for knockout
            console.log("USE FIGHT ACTION KO SEQUENCE");
            setKo(true);
            over = `${user.firstName} hits the canvas!! This fight is over!`;
            setPbp(prev => [...prev, {text: over, round: newRnd, attacker: enemy, defender: user} ] )
            clearTimeout(fightAction);
            return;
          } else if (enemy.hp <= 0) {
            setKo(true);
            over = `${enemy.firstName} is down in round ${newRnd}!! This fight is over!`;
            setPbp(prev => [...prev, {text: over, round: newRnd, attacker: user, defender: enemy} ] )
            clearTimeout(fightAction);
            return;
          }
          
          /***  FIGHT WORKFLOW ***/
          let fightUnderway = engagement(user, enemy);
          setKo(false)
          setExchangeCount(k);
          activity = setObj(fightUnderway, "round", newRnd);
          setPbp((prev) => [...prev, activity]);

        }, delay*(k + 1),)
        
        let roundOverRegulator = setTimeout(() => { //sync disable counters with other setTimeouts
          setRoundStart(false);
          setRoundOver(true);
          setDisable(false);
        }, (delay*rateOfExchange)+1000)
        
      };
 } 

 const roundUpdate = () => { //round text updates
    let update;
    if (roundCount === 0) {
      update = `This fight is officially underway!`;
      setPbp((prev) => [ ...prev, {text: update},]);
    } else if (roundStart && roundCount > 0) {
      setRoundStart(true);
      update = `The bell sounds for round ${roundCount}!`;
      setPbp((prev) => [{text: update}, ...prev]);
    } 
    return update;
 }

  // const handSpeed = 12;

  const fightBtn = //The main button
    <button className="fight-button" disabled={disable}
      onClick={()=> {
        setFightStart(true);
        setDisable(true);
        setRoundStart(true);
        setRoundOver(false);
        fight(user, enemy);
        user.roundRecovery();
        enemy.roundRecovery();
    }}><h4>Fight</h4></button>


  return (
    <div className="fight-engine-wrap">

      <Navbar roundCount={roundCount}/>

      <div className="main-container-wrap">
        <div className="main-container">
          <BoxerCard boxer={user} path={leftBoxer}
            pbp={pbp}
            roundStart={roundStart}
            roundCount={roundCount}
            exchangeCount={exchangeCount}
            punchCount={punchCount}
            corner={() => userReady}/>

          <div className="inner-container">
            <Display pbp={pbp} user={userActive} opp={oppActive}
              fightStart={fightStart}
              roundStart={roundStart}
              roundOver={roundOver}
              roundCount={roundCount}
              ko={ko}
              buttons={fightBtn}/>
            
            <div className="display-options">
              <SelectMenu buttons={fightBtn}
              fightStart={fightStart}
              roundStart={roundStart} 
              ko={ko} />
            </div>
          </div>

          <BoxerCard boxer={enemy} path={oppBody}
            pbp={pbp}
            roundStart={roundStart}
            roundCount={roundCount}
            exchangeCount={exchangeCount}
            punchCount={punchCount}
            corner={() => oppReady}/>
        </div>
      </div>
    </div>
  )
}

export default FightEngine