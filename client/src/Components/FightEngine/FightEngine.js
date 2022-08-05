import { useState, useEffect } from 'react'
import Functions from '../Helpers/Functions'
import BoxerCard from '../Boxer/BoxerCard/BoxerCard'
import Display from '../Interface/Display/Display'
import leftBoxer from '../../assets/images/redgloves.png'
import oppBody from '../../assets/images/oppBody.png'
import SelectMenu from '../Interface/SelectMenu/SelectMenu'
import { judgeDecision, compareScorecards } from '../Judges/Judges'
// import randomize from '../Helpers/Randomize'

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

  /*** General state ***/
  const [ url, setUrl ] = useState(urls[1])
  const [userActive, setUserActive] = useState(user); //point to an updated state of user attributes
  const [oppActive, setOppActive] = useState(enemy);
  const [userDmgScale, setUserDmgScale] = useState(); //store values for each total damage output for data
  const [oppDmgScale, setOppDmgScale] = useState();
  const [pbp, setPbp] = useState([]); //a combination of above state in objects, for historical fight record
  const [punchCount, setPunchCount] = useState([]); //data for each punch/counter punch thrown, for historical fight record
  const [rateOfExchange, setRateOfExchange] = useState(4);  //toggle number of punches in one round based on boxer handSpeed
  const [incrementor, setIncrementor] = useState(0);
  const [exchangeCount, setExchangeCount] = useState(0);  //count number of times boxers enter a scrap
  const [delay] = useState(1500);  //toggle rate of text ouput

  /***  Match specific state ***/
  const [ko, setKo] = useState(false);
  const [disable, setDisable] = useState(false);
  const [roundStart, setRoundStart] = useState(false);
  const [fightStart, setFightStart] = useState(false);
  const [totalRingControl, setTotalRingControl] = useState([]);
  const [totalAccuracy, setTotalAccuracy] = useState([]);
  const [finalTotals, setFinalTotals] = useState([]); //data for UI stat output
  const [aggregatedFinalTotals, setAggregatedFinalTotals] = useState([])
  const [winner, setWinner] = useState({});
  const [loser, setLoser] = useState({});

  /*** Match Conditions ***/
  const [knockdownRule, setKnockdownRule] = useState(false);
  const [knockdownRuleLimit, setKnockdownRuleLimit] = useState(3); //set max knockdowns

  /*** Judges Decision state ***/
  const [judgeOne, setJudgeOne] = useState([]);
  const [judgeOneOfficialScorecard, setJudgeOneOfficialScorecard] = useState();
  const [judgeTwo, setJudgeTwo] = useState([]);
  const [judgeTwoOfficialScorecard, setJudgeTwoOfficialScorecard] = useState();
  const [judgeThree, setJudgeThree] = useState([]);
  const [judgeThreeOfficialScorecard, setJudgeThreeOfficialScorecard] = useState();
  const [judgesProps, setJudgesProps] = useState({});
  const [compareScorecardProps, setCompareScorecardProps] = useState({});
  const [finalResult, setFinalResult] = useState(false)


  //End and reset fight depending on which round (roundCount)
  useEffect(() => { 
    if (roundCount === 1 && roundOver) {
      setJudgesProps(
        {
          user: user,
          enemy: enemy,
          filterStats: filterStats,
          setJudgeOne: setJudgeOne,
          setJudgeTwo: setJudgeTwo,
          setJudgeThree: setJudgeThree,
        }
      )
      setCompareScorecardProps(
        {
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
    };
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
    if (fightOver || roundStart) { updateDataCollections({ pbp: pbp, finalTotals: finalTotals }) }
  },[fightOver, roundStart, roundOver])

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
      console.log(`fightOver and NOT knockdown render`)
      judgeDecision(judgesProps, 'control', 'one');
      judgeDecision(judgesProps, 'accuracy', 'two');
      judgeDecision(judgesProps, 'accuracy', 'three');
      user.knockdownCount = 0;
      enemy.knockdownCount = 0;
      // setFinalResult(true);
      console.log(winner, loser)
    }
  },[fightOver])

useEffect(() => {
  console.log(`setting official scorecards`)
  setScorecardsFunc();
}, [fightOver])

/*** Here you set the fighters fight attributes which change depending on the match, randomize cornerColors in future.
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

  const setScorecardsFunc = () => {
    console.log(judgeOne, judgeTwo, judgeThree)
    const judgeOneUserScore = judgeOne.reduce((acc, curr, i) => acc += curr[0], 0);
    const judgeOneOppScore = judgeOne.reduce((acc, curr, i) => acc += curr[1], 0);
    setJudgeOneOfficialScorecard({ user: judgeOneUserScore, opp: judgeOneOppScore });
    const judgeTwoUserScore = judgeTwo.reduce((acc, curr, i) => acc += curr[0], 0);
    const judgeTwoOppScore = judgeTwo.reduce((acc, curr, i) => acc += curr[1], 0);
    setJudgeTwoOfficialScorecard({ user: judgeTwoUserScore, opp: judgeTwoOppScore });
    const judgeThreeUserScore = judgeThree.reduce((acc, curr, i) => acc += curr[0], 0);
    const judgeThreeOppScore = judgeThree.reduce((acc, curr, i) => acc += curr[1], 0);
    setJudgeThreeOfficialScorecard({ user: judgeThreeUserScore, opp: judgeThreeOppScore });
  };

  /*** Adjust win or loss  ***/

  const checkWinnerAndLoser = (user, opp) => {
    setFightOver(true);
    setRoundOver(true);
    setScorecardsFunc();

    const judgeObject = {
      judgeOneOfficialScorecard: 
      judgeTwoOfficialScorecard,
      judgeThreeOfficialScorecard
    }

    if (user.hp <= 0) {
      updateWinLoss(opp, user);
    } else if (opp.hp <= 0) {
      updateWinLoss(user, opp);
    } else {
      compareScorecards(compareScorecardProps, judgeObject);
      console.log(`checkWinnerAndLoser()`, winner, loser) //updates third
    } 
  }

  /*** Update win/loss record ***/

  const updateWinLoss = (winner, loser) => {
    console.log(`updateWinLoss() beginning`, winner, loser) //updates
    winner.win++;
    setWinner(winner);
    loser.loss++;
    setLoser(loser);
    // setJudgeOne([]);
    // setJudgeTwo([]);
    // setJudgeThree([]);
    // setJudgeOneOfficialScorecard();
    // setJudgeTwoOfficialScorecard();
    // setJudgeThreeOfficialScorecard();
    console.log(`updateWinLoss() end`, winner, loser) //updates last
  }
  console.log(judgeOneOfficialScorecard, judgeTwoOfficialScorecard, judgeThreeOfficialScorecard)
  console.log(`func scope`, winner, loser) //updates second

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
    /*** Initialize getUp abilites, update UI ***/
    if (defense.hp <= 0) {
      const getUpTimer = setTimeout(() => {

        //slow down getUp post knock out text boxes.
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


  const determinePowerShot = (off, def, diff) => {

    if (def.knockdownCount === knockdownRuleLimit) { return determinePowerShot; }
    let powerShot = off.ko(def); //determine powershot, then if KO

    if (powerShot > def.chin) {  //check if powershot is stronger than chin
      setPbpFunc(off, def, diff, `A BIG SHOT BY ${off.firstName}. ${def.firstName} stumbles!`);

      const consciousness = def.getUp();
      const getUpTimer = setTimeout(() => {

        if (consciousness < powerShot){  //check if powershot is stronger than def ability to getUp (take a shot)
          if (def.knockdownCount === knockdownRuleLimit) { return determinePowerShot; }
          setKo(true);
          def.knockdownCount++;
          def.energyLoss();
          setPbpFunc(off, def, diff, `${def.firstName} IS DOWN. WILL THEY GET BACK UP?`);
          determineKO(off, def, powerShot)
          
          //Post determine KO is where you setKo to false, and implement ref count (if func success, below does not run as fightOver === true)
          setKo(false) //if determineKO does not persist ko state, (setKo(false)), then continue pbp.
          setPbpFunc(off, def, diff, `${def.firstName} beats the count!`)

          return powerShot + diff //if not return a heavier shot
        } else {
          return diff
        }

      }, 3000);
    }
  }
  
   //Phase 1 = exchange() determines who wins the trading of blows

  const exchange = (attacker, defender) => {
    /***  Important: This is the mean line where you can stop all extra damage after the KO. Fight should end on KO or too many Knockdowns  ***/
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

  const calcDamage = (attacker, defender, difference, timeout) => {

      let result = { //an object template to populate the pbp
        attacker: attacker,
        defender: defender,
        totalDmg: 0,
        text: 'The fighters work in the clinch'
      };
      let hit;
      let normalOrPowerPunch;

    /*** Fight balance favors defender ***/

    if (difference <= -55){ //Strong counters by defender
      normalOrPowerPunch = determinePowerShot(attacker, defender, difference)
      hit = attacker.hp += normalOrPowerPunch; //reduce health
      setObj(attacker, "hp", hit);
      result.totalDmg = difference
      result.text = `${defender.firstName} returning some BIG, HEAVY counters!`;

    } else if (difference > -55 && difference <= -40){ //
      normalOrPowerPunch = determinePowerShot(attacker, defender, difference)
      hit = attacker.hp += normalOrPowerPunch; //reduce health
      setObj(attacker, "hp", hit);
      result.totalDmg = difference;
      result.text = `${defender.firstName} keeping the pressure off and working well on the outside.`;

    } else if (difference > -40 && difference <= -30){ //
      normalOrPowerPunch = determinePowerShot(attacker, defender, difference)
      hit = attacker.hp += normalOrPowerPunch; //reduce health
      setObj(attacker, "hp", hit);
      result.totalDmg = difference;
      result.text = `${defender.firstName} making ${attacker.firstName} pay on the way in`;

    } else if (difference > -30 && difference < -20){ //Close Counter in favor of defender.
      hit = attacker.hp += difference; //reduce health
      setObj(attacker, "hp", hit);
      result.totalDmg = difference;
      result.text = `${defender.firstName} moving well to avoid ${attacker.firstName}'s offense. Peppering jabs in response.`;

    } else if (difference > -20 && difference <= -10){ //Close Counter in favor of defender.
      hit = attacker.hp += difference; //reduce health
      setObj(attacker, "hp", hit);
      result.totalDmg = difference;
      result.text = `${attacker.firstName} trading well in the pocket.`;

    /***  Fight balance is close  ***/

    } else if (difference >=2 && difference <-10) { //Inside work for defender
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

    } else if (difference > 2 && difference <= 5) { // Close in favor of Attacker
      // normalOrPowerPunch = determinePowerShot(attacker, defender, difference)
      // hit = defender.hp -= normalOrPowerPunch;
      hit = defender.hp -= difference;
      setObj(defender, "hp", hit)
      result.totalDmg = normalOrPowerPunch;
      result.text = `Solid work and steady shots by ${attacker.firstName}`;

    /***  Fight balance favors attacker  ***/

    } else if (difference > 5 && difference <= 15) {
      // normalOrPowerPunch = determinePowerShot(attacker, defender, difference)
      // hit = defender.hp -= normalOrPowerPunch;
      hit = defender.hp -= difference;
      setObj(defender, "hp", hit)
      result.totalDmg = normalOrPowerPunch;
      result.text = `${attacker.firstName} working great in the mid-range!`;

    } else if (difference > 15 && difference <= 25) {
      normalOrPowerPunch = determinePowerShot(attacker, defender, difference)
      hit = defender.hp -= normalOrPowerPunch;
      setObj(defender, "hp", hit)
      result.totalDmg = normalOrPowerPunch;
      result.text = `Hard, clean shots by ${attacker.firstName}!`;

    } else if (difference > 25) {
      normalOrPowerPunch = determinePowerShot(attacker, defender, difference)
      hit = defender.hp -= normalOrPowerPunch;
      setObj(defender, "hp", hit)
      result.totalDmg = normalOrPowerPunch;
      result.text = `${attacker.firstName} laying some hard, clean shots with ${defender.firstName} trapped in the corner!`;
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
    if (userOffense > oppOffense) {
      let userDmg = exchange(user, opp);
      resultDmg = calcDamage(user, opp, userDmg, timeout); //determines resulting dmg after engage and exchange
      determineKO(user, opp, userDmg, timeout);
      setUserDmgScale(userDmg);
      console.log(`userDmg`, userDmg)

    } else if (oppOffense > userOffense) {
      let oppDmg = exchange(opp, user);
      resultDmg = calcDamage(opp, user, oppDmg, timeout); //determines resulting dmg after engage and exchange
      determineKO(opp, user, oppDmg, timeout);
      setOppDmgScale(oppDmg);
      console.log(`oppDmg`, oppDmg)

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
            judgeOneOfficialScorecard={judgeOneOfficialScorecard}
            judgeTwoOfficialScorecard={judgeTwoOfficialScorecard}
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