import { useEffect, useState } from 'react'
import oppBody from '../../assets/images/oppBody.png'
import leftBoxer from '../../assets/images/redgloves.png'
import BoxerCard from '../Boxer/BoxerCard/BoxerCard'
import Functions from '../Helpers/Functions'
import Display from '../Interface/Display/Display'
import SelectMenu from '../Interface/SelectMenu/SelectMenu'
import { compareScorecards, judgeRound, setScorecardsFunc } from '../Judges/JudgesDecisionLogic'
import MatchData from "../MatchData"

const FightEngine = (
  { user, enemy, urls,
    fightNight, setFightNight,
    roundCount, setRoundCount,
    stopFight, setStopFight,
    fightNumber, setFightNumber,
    prevFightNumber, setPrevFightNumber,
    roundOver, setRoundOver,
    resetFightBtn, setResetFightBtn,
    fightOver, setFightOver,
    updateDataCollections }) => {

  const { setObj, setCorner } = Functions(); //unpack functions from Helpers/Functions

  /*
  MAKE SURE TO SET HANDLERS NEXT WEEK ! =D
  */
 
  const {
    ko, setKo,
    disable, setDisable,
    roundStart, setRoundStart,
    fightStart, setFightStart,
    totalRingControl, setTotalRingControl,
    totalAccuracy, setTotalAccuracy,
    finalTotals, setFinalTotals,
    aggregatedFinalTotals, setAggregatedFinalTotals,
    winner, setWinner,
    loser, setLoser,

    /*** Match Conditions ***/
    knockdownRule, setKnockdownRule,
    rateOfExchange, setRateOfExchange,
    knockdownRuleLimit, setKnockdownRuleLimit,

    //Extract later !
    url, setUrl,
    userActive, setUserActive,
    oppActive, setOppActive,
    userDmgScale, setUserDmgScale,
    oppDmgScale, setOppDmgScale,
    pbp, setPbp,
    punchCount, setPunchCount,
    incrementor, setIncrementor,
    exchangeCount, setExchangeCount,
    delay
  } = MatchData(user, enemy);


  /*** Judges Decision state ***/
  const [judgeOne, setJudgeOne] = useState([]);
  const [judgeTwo, setJudgeTwo] = useState([]);
  const [judgeThree, setJudgeThree] = useState([]);
  const [judgesProps, setJudgesProps] = useState({});
  const [compareScorecardProps, setCompareScorecardProps] = useState({});
  const [judgesOfficialDecision, setJudgesOfficialDecision] = useState({});
  const [finalResult, setFinalResult] = useState(false)


  //End and reset fight depending on which round (roundCount)
  useEffect(() => { 
    if (roundCount === 1 && roundOver) {
      setJudgesProps({
          user: user,
          enemy: enemy,
          filterStats: filterStats,
          setJudgeOne: setJudgeOne,
          setJudgeTwo: setJudgeTwo,
          setJudgeThree: setJudgeThree,
        })
      setCompareScorecardProps({
          user: user,
          opp: enemy,
          updateWinLoss: updateWinLoss
        }
      )
      setDisable(true);
      setFightOver(true);
      setFightStart(false);
      setFinalResult(true);
      // checkWinnerAndLoser(user, enemy);
    }
  },[roundOver, roundCount, setFightOver, stopFight])

  //set Final Total Statistics and check Local Storage
  useEffect(() => {
    localStorage.setItem('finalTotals', JSON.stringify(
        {
          fightNumber: fightNumber,
          finalTotals: finalTotals,
          round: roundCount
        }
    ));
    setAggregatedFinalTotals(prev => [...prev, finalTotals]);
  }, [finalTotals])

  useEffect(() => {  //Similar to useEffect above, but within a record-altering function
    if (fightOver || roundStart) {
      updateDataCollections({ pbp: pbp, finalTotals: finalTotals})
    }
  },[fightOver, roundStart])

  useEffect(() =>  { //Check if beginning of a new fight
    if(fightNight && roundCount === 0) {
      setFinalResult(false);
      setResetFightBtn(true);
      setFightOver(false);
    }
  }, [fightNight])

  useEffect(() => { //change background depending on fighting or training
    switch (fightNight) {
      case true: setUrl(urls[0]);
      break;
      default: setUrl(urls[1]);
      break;
    }
  }, [fightNight]);

  useEffect(() => { //shallow copy of user/enemy for manipulation
    setUserActive(userReady);
    setOppActive(oppReady);
  },[])

  useEffect(() => { //manage 3 knockdown rule.
    checkBoxerKnockdownCount(user, enemy);
    checkBoxerKnockdownCount(enemy, user);
  }, [user.knockdownCount, enemy.knockdownCount])

  useEffect(() => { //check start/stop conditions
    if (roundStart || ko || fightOver ) setDisable(true) //disable buttons
    if (ko || knockdownRule)  setFightOver(true)
  },[roundStart, ko, fightOver, knockdownRule])

  useEffect(() => { //This is where you stop the fight if Koed or too many downs
    if (fightOver && knockdownRule){
      console.log(`fightOver and knockdown render`)
      setRateOfExchange(0);
      stopFight.stop();
    } else if (fightOver && !knockdownRule) {
      console.log(judgeOne, judgeTwo, judgeThree)
      //reduce scores from each round AKA "Set Scorecards"
      const getOfficialScoresAsObject = setScorecardsFunc(judgeOne, judgeTwo, judgeThree)


      //set these results in state here
      setJudgesOfficialDecision(getOfficialScoresAsObject);
      //use this object to destructure and compare values for an official decision
      checkWinnerAndLoser(user, enemy);
      user.knockdownCount = 0;
      enemy.knockdownCount = 0;
    } else if (!fightOver && roundOver) {
      console.log(judgesProps)
      judgeRound(judgesProps, 'control', 'one');
      judgeRound(judgesProps, 'accuracy', 'two');
      judgeRound(judgesProps, 'accuracy', 'three');
    }
  },[fightOver])

/*** check here ***/
/***
 * Here you set the fighters fight attributes which change depending on the match, randomize cornerColors in future.
***/

  const cornerColor = { red: `rgba(139, 0, 0, 1)`, blue: `rgba(10, 30, 103, 1)` }
  const userReady = setCorner(user, cornerColor.red, "red", "left", false, userDmgScale)
  const oppReady = setCorner(enemy, cornerColor.blue, "blue", "right", false, oppDmgScale)

  const filterStats = (person, whatToFilter) => {
    for (let i = 0; i < finalTotals.length; i++){
      if(finalTotals[i].hasOwnProperty(person.firstName)){
        return finalTotals[i][person.firstName][whatToFilter]
      }
    }
  };

  /*** Adjust win or loss  ***/

  const checkWinnerAndLoser = (user, opp) => {
    setFightOver(true);
    setRoundOver(true);

    if (user.hp <= 0) {
      updateWinLoss(opp, user);
    } else if (opp.hp <= 0) {
      updateWinLoss(user, opp);
    } else {
      // //use this object to destructure and compare values for an official decision
      compareScorecards(compareScorecardProps, judgesOfficialDecision);
      console.log(`checkWinnerAndLoser()`, winner, loser) //updates third
    } 
  }

  /*** Update win/loss record ***/

  const updateWinLoss = (winner, loser) => {
    winner.win++;
    setWinner(winner);
    loser.loss++;
    setLoser(loser);
  }

  /*** Determine if fighter gets up after knockdown or is unconscious ***/

  const checkBoxerKnockdownCount = (boxer, otherBoxer) => {
    if (boxer.knockdownCount === knockdownRuleLimit) {
      setKnockdownRule(true);
      boxer.loss++;
      otherBoxer.win++;
      setWinner(otherBoxer);
      setLoser(boxer);
      setKo(true)
      setFightOver(true);
      setRoundOver(true);
    }
  }

  /***  Update pbp text cards with this func  ***/

  const setPbpFunc = (off, def, hit, text) => {
    setPbp(prev => [...prev, { 
      //push to play-by-play array with new object.
        attacker: off,
        defender: def,
        hit: hit,
        text: text}
      ])
  };

  const determineKO = (offense, defense, hit, timeout ) => {
    if (defense.hp <= 0) {
      const getUpTimer = setTimeout(() => {

        //Runs boxer.getUp twice, representing first and second wind after knockdown.
        const takesShot = defense.getUp();
        const getUp = defense.getUp();
        setPbpFunc(offense, defense, hit, `${defense.firstName} down with the count!`);
        defense.knockdownCount++;

        if (getUp > takesShot) {
        // Check getUp, if greater than first "will" to get up, boxer gets up.          
          setKo(false)          
          setPbpFunc(offense, defense, hit, `${defense.firstName} stands back up!`)
          defense.hp*=1.2;
          return determineKO;
          
        } else { 
          //fight is over, clear timeout, set the play-by-play to notify user and return
          setFightOver(true); 
          clearTimeout(timeout)
          setPbpFunc(offense, defense, 0, `THIS FIGHT IS OVER. The ref waves it off! ${offense.firstName} PUTS ${defense.firstName} AWAY.`)
          return determineKO;
        }
      }, 2000);
      clearTimeout(getUpTimer)
    }
  };
  
  //Phase 1 = exchange() determines who wins the trading of blows


  const exchange = (attacker, defender) => {
    /***  Important:
     * This is the mean line where you can stop all extra damage after the KO.
     * Fight should end on KO or too many Knockdowns  ***/
    if (defender.knockdownCount === knockdownRuleLimit || attacker.knockdownCount === knockdownRuleLimit) {
      setKnockdownRule(true)
      setFightOver(true)
      return 0;

    } else {
      let atkCombos = attacker.handSpeed(); //determine punch volume
      let defCombos = defender.handSpeed();
      let atk = attacker.attack(atkCombos);
      let def = defender.defend(defCombos);
      let difference = atk - def;

      //activity of fighters changes length of loop, makes it more or less active
      let attackerPunchesLanded = Math.round(((atk*(atkCombos/100))/rateOfExchange)*attacker.maxCon);
      let defenderPunchesLanded = Math.round(((def*(defCombos/100))/rateOfExchange)*defender.maxCon);

        setPunchCount(prev => [...prev, {  //set punchCount list, to store punchStats
          attacker: {
            name: attacker.firstName,
            punchesThrown: Math.ceil((atkCombos/rateOfExchange)*1.1), //round up a randomized no. of punches in combo
            punchesLanded: attackerPunchesLanded, //round 
            engagementRate: atk/10,
            ringControl: Math.round((atk/(atk+def))*100),
            engagement: `aggressor`
          },
          defender: {
            name: defender.firstName,
            punchesThrown: Math.ceil((defCombos/rateOfExchange)*1.1),
            punchesLanded: defenderPunchesLanded,
            engagementRate: def/10,
            ringControl: Math.round((def/(def+atk))*100),
            engagement: `counter`
          },
          difference: difference,
          round: roundCount+1
        }])
      return difference
      }
  };


//Phase 2 = wrap both attack and defense with output text in one single obj, easier to package for output


  const determinePowerShot = (off, def, diff) => {

    if (def.knockdownCount === knockdownRuleLimit) { return determinePowerShot; }

    let powerShot = off.ko(); //determine powershot, then if KO

    if (powerShot > def.chin*def.con) {  //check if powershot is stronger than chin
      setPbpFunc(off, def, diff, `A BIG SHOT BY ${off.firstName}!`);
      setPbpFunc(off, def, 0, ` `);

      const consciousness = def.getUp();
      if (consciousness < powerShot){  //check if powershot is stronger than def ability to getUp (take a shot)
        if (def.knockdownCount === knockdownRuleLimit) { return determinePowerShot; }

        setKo(true);
        def.knockdownCount++;
        def.energyLoss();
        setPbpFunc(off, def, diff, `${def.firstName} IS DOWN. WILL THEY GET BACK UP?`);
        setPbpFunc(off, def, 0, ``);
        determineKO(off, def, powerShot);
        setPbpFunc(off, def, 0, ``);

        //Post determine KO is where you setKo to false, and implement ref count (if func success, below does not run as fightOver === true)
        setKo(false) //if determineKO does not persist ko state, (setKo(false)), then continue pbp.
        setPbpFunc(off, def, diff, `${def.firstName} beats the count!`);
        setPbpFunc(off, def, 0, ``);
        return powerShot += diff //if not return a heavier shot
      } else {
        return diff
      }
    } else {
      return diff
    }
  }

  const calcDamage = (attacker, defender, difference) => {
    let result = { //an object template to populate the pbp
      attacker: attacker,
      defender: defender,
      totalDmg: 0,
      text: 'The fighters work in the clinch'
    };
    const setObjFunc = (who, textSummary) => {
      let hit;
      let normalOrPowerPunch = determinePowerShot(attacker, defender, difference)
      hit = who.hp += normalOrPowerPunch;
      setObj(who, "hp", hit);
      result.totalDmg = normalOrPowerPunch;
      result.text = textSummary;
    };

    /*** Fight balance favors defender ***/
    if (difference <= -55){ //Strong counters by defender
      setObjFunc(
        attacker,
        `${defender.firstName} returning some BIG, HEAVY counters!`
        )
    } else if (difference > -55 && difference <= -40){ //
      setObjFunc(
        attacker,
        `${defender.firstName} keeping the pressure off and working well on the outside.`
        )
    } else if (difference > -40 && difference <= -30){ //
      setObjFunc(
        attacker,
        `${defender.firstName} making ${attacker.firstName} pay on the way in`
        )
    } else if (difference > -30 && difference < -20){ //Close Counter in favor of defender.
      setObjFunc(
        attacker,
        `${defender.firstName} moving well to avoid ${attacker.firstName}'s offense. Peppering jabs in response.`
        )
    } else if (difference > -20 && difference <= -10){ //Close Counter in favor of defender.
      setObjFunc(
        attacker,
        `${attacker.firstName} trading well in the pocket.`
        )

    /***  Fight balance is close  ***/
    } else if (difference >=2 && difference <-10) { //Inside work for defender
      defender.hp -= 1;
      setObjFunc(
        attacker,
        `Both fighters work inside...${defender.firstName} getting the best of the scrap.`
        )
    } else if (difference >= 2 && difference <= 2) {
      setObjFunc(
        defender,
        `Both fighters work in the clinch...Ref decides to break.`
        )
    } else if (difference > 2 && difference <= 5) { // Close in favor of Attacker
      setObjFunc(
        defender,
        `Solid work and steady shots by ${attacker.firstName}`
        )

    /***  Fight balance favors attacker  ***/
    } else if (difference > 5 && difference <= 15) {
      setObjFunc(
        defender,
        `${attacker.firstName} working great in the mid-range!`
        )
    } else if (difference > 15 && difference <= 25) {
      setObjFunc(
        defender,
        `Hard, clean shots by ${attacker.firstName}!`
        )
    } else if (difference > 25) {
      setObjFunc(
        defender
        `${attacker.firstName} laying some hard, clean shots with ${defender.firstName} trapped in the corner!`
        )
    } 
    if (attacker.knockdownCount === knockdownRuleLimit || defender.knockdownCount === knockdownRuleLimit) {
      setKnockdownRule(true);
      return;
    } else {
      return result      
    }
  };

  //Phase 3: tie everything together

  const engagement = (user, opp, timeout) => {  //engagement determines who initiates the attack   
    let userOffense = user.engage();
    let oppOffense = opp.engage();
    let resultDmg;
    
    if (fightOver || knockdownRule) {
      stopFight.stop();
      clearTimeout(timeout);
    }

    const engageThenExchangeThenCalcDmg = (offensiveBoxer, defensiveBoxer) => {
      let exchangeDmg = exchange(offensiveBoxer, defensiveBoxer);
      resultDmg = calcDamage(offensiveBoxer, defensiveBoxer, exchangeDmg, timeout); //determines resulting dmg after engage and exchange
      determineKO(offensiveBoxer, defensiveBoxer, exchangeDmg, timeout);
      return exchangeDmg
    }

    if (userOffense > oppOffense) {
      let userDmg = engageThenExchangeThenCalcDmg(user, opp)
      setUserDmgScale(userDmg);

    } else if (oppOffense > userOffense) {
      let oppDmg = engageThenExchangeThenCalcDmg(opp, user)
      setOppDmgScale(oppDmg);
      
    } else if (oppOffense === userOffense) {
      resultDmg = 0;
    }
    return resultDmg;
  };

  const fight = (user, enemy) => {
    roundUpdate();

    for (let i = 0; i < rateOfExchange; i++){ //set i length to user+opp engage for volume of strikes
      let k = i; //copy of i, to attach to delay (timeout length)
      let newRnd = roundCount + 1; //update rounds on start
      setRoundCount(newRnd);

      let fightAction = setTimeout(()=>{
        setStopFight({ stop: () => clearTimeout(fightAction)})
        if(knockdownRule) return fight;
        let activity;
        let over;

        /*** Replace with determineKO later, when various commentary is added  ***/
        if (user.hp <= 0) { //check for knockout
          setKo(true);
          user.knockdownCount++;
          setFightOver(true);
          over = `${user.firstName} hits the canvas!! This fight is over!`;
          setPbp(prev => [...prev, {text: over, round: newRnd, attacker: enemy, defender: user} ] )
          checkWinnerAndLoser(user, enemy);
          clearTimeout(fightAction);
          return;
        } else if (enemy.hp <= 0) {
          setKo(true);
          enemy.knockdownCount++;
          setFightOver(true);
          over = `${enemy.firstName} is down in round ${newRnd}!! This fight is over!`;
          checkWinnerAndLoser(user, enemy);
          setPbp(prev => [...prev, {text: over, round: newRnd, attacker: user, defender: enemy} ] )
          clearTimeout(fightAction);
          return;
        }
        
        /***  FIGHT WORKFLOW ***/
        let fightUnderway = engagement(user, enemy, fightAction);
        setKo(false);
        setExchangeCount(k);
        activity = setObj(fightUnderway, "round", newRnd);
        setPbp((prev) => [...prev, activity]);
      }, delay*(k + 1),)
      
      /*** Delay between round options according to  ***/
      setTimeout(() => {
        setRoundStart(false);
        setRoundOver(true);
        if (!fightOver) setDisable(false);
      }, (delay*rateOfExchange)+500)
    };
 } 

 const roundUpdate = () => { //round text updates
    let update;
    if (roundCount === 0) {
      update = `This fight is officially underway!`;
      setPbp((prev) => [ ...prev, {
        text: update
        },]);
    } else if (roundStart && roundCount > 0) {
      setRoundStart(true);
      update = `The bell sounds for round ${roundCount}!`;
      setPbp((prev) => [
        {text: update},
        ...prev]);
    } 
    return update;
 }

  const fightBtn = //The main button
    <button className="fight-button" disabled={disable}
      onClick={()=> {
        setFightStart(true);
        setDisable(true);
        setRoundStart(true);
        setRoundOver(false);
        user.roundsFought++;
        fight(user, enemy);
        user.roundRecovery();
        enemy.roundRecovery();
    }}><h4>Fight</h4></button>

  //UI JSX for fight night

  const fightNightLoader = 
    <>
          <BoxerCard boxer={user} path={leftBoxer}
            setIncrementor={setIncrementor}
            pbp={pbp} fightNight={fightNight}
            fightNumber={fightNumber}
            prevFightNumber={prevFightNumber}
            roundStart={roundStart}
            roundCount={roundCount}
            roundOver={roundOver}
            fightOver={fightOver}
            exchangeCount={exchangeCount}
            punchCount={punchCount}
            setTotalRingControl={setTotalRingControl}
            setTotalAccuracy={setTotalAccuracy}
            finalTotals={finalTotals}
            setFinalTotals={setFinalTotals}
            corner={() => userReady}/>

        <div className="inner-container">

          <Display pbp={pbp} user={userActive} opp={oppActive}
            setRateOfExchange={setRateOfExchange}
            fightNight={fightNight}
            setFightNight={setFightNight}
            fightStart={fightStart}
            roundStart={roundStart}
            roundOver={roundOver}
            roundCount={roundCount}
            fightOver={fightOver}
            stopFight={stopFight}
            ko={ko}
            knockdownRule={knockdownRule}
            judgesOfficialDecision={judgesOfficialDecision}
            winner={winner}
            loser={loser}
            buttons={fightBtn}/>
          
          <div className="display-options">
            <SelectMenu buttons={fightBtn}
              fightNumber={fightNumber}
              setPrevFightNumber={setPrevFightNumber}
              fightNight={fightNight}
              roundCount={roundCount}
              setRoundCount={setRoundCount}
              setFightNight={setFightNight}
              fightStart={fightStart}
              setFightStart={setFightStart}
              fightOver={fightOver}
              setFightOver={setFightOver}
              roundStart={roundStart} 
              roundOver={roundOver}
              resetFightBtn={resetFightBtn}
              setResetFightBtn={setResetFightBtn}
              ko={ko} />
          </div>
        </div>

        <BoxerCard boxer={enemy} path={oppBody}
          setIncrementor={setIncrementor}
          pbp={pbp} fightNumber={fightNumber} prevFightNumber={prevFightNumber}
          roundStart={roundStart}
          roundCount={roundCount}
          roundOver={roundOver}
          fightOver={fightOver}
          exchangeCount={exchangeCount}
          punchCount={punchCount}
          setTotalRingControl={setTotalRingControl}
          setTotalAccuracy={setTotalAccuracy}
          finalTotals={finalTotals}
          setFinalTotals={setFinalTotals}
          corner={() => oppReady}/>
    </>

  return (
    <div className="fight-engine-wrap">
      <div className="main-container-wrap" style={{ backgroundImage: url }}>
        <div className="main-container">

        {/***  Boxer Card stays in this position as you navigate the page  ***/}
          { fightNightLoader }
          
        </div>
      </div>
    </div>
  )
}

export default FightEngine