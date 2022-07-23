import React from 'react'

const FightLogic = () => {

const determineKO = (offense, defense, hit, timeout ) => {
    /*** Initialize getUp abilites, update UI ***/
    if (defense.hp <= 0) {
      const getUpTimer = setTimeout(() => {
        //slow down getUp post knock out text boxes.
        const takesShot = defense.getUp();
        const getUp = defense.getUp();

        setPbp(prev => [...prev, { 
        //push to play-by-play array with new object.
          attacker: offense,
          defender: defense,
          hit: hit,
          text: `${defense.firstName} down with the count!`}
        ])
        defense.knockdownCount++;


        if (getUp > takesShot) {
        // Check getUp, if greater than first "will" to get up, boxer gets up.          
          setKo(false)          
          setPbp(prev => [...prev, {
            attacker: offense,
            defender:defense,
            hit: hit,
            text: `${defense.firstName} stands back up!`
          }])
          defense.hp*=1.2;
          return determineKO;
          
        } else { 
          //fight is over, clear timeout, set the play-by-play to notify user and return
          setFightOver(true); 
          clearTimeout(timeout)
          setPbp(prev => [prev, {
            attacker: offense,
            defender: defense,
            hit: hit,
            text: `THIS FIGHT IS OVER. The ref waves it off! ${offense.firstName} PUTS ${defense.firstName} AWAY.`
          }])
          return determineKO;
        }
      }, 600);
      clearTimeout(getUpTimer)
    }
  };


  const determinePowerShot = (off, def, diff) => {
    let powerShot = off.ko(def); //determine powershot, then if KO
    if (powerShot > def.chin){  //check if powershot is stronger than chin
      setPbp(prev => [...prev, {
        attacker: off,
        defender: def,
        hit: diff,
        text: `A BIG SHOT BY ${off.firstName}. ${def.firstName} stumbles!`
      }])

    const consciousness = def.getUp();
    if (consciousness < powerShot){  //check if powershot is stronger than def ability to getUp (take a shot)
      setKo(true);
      def.knockdownCount++;
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
  };


 //Phase 2 = wrap both attack and defense with output text in one single obj, easier to package for output

  const calcDamage = (attacker, defender, difference, timeout) => {

      let result = { //an object template to populate the pbp
        attacker: attacker,
        defender: defender,
        totalDmg: 0,
        text: 'The fighters clinch'
      };
      let hit;
      let normalOrPowerPunch;

    /*** Fight balance favors defender ***/

    if (fightOver || knockdownRule) clearTimeout(timeout);

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

    /***  Fight balance is close  ***/

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

    } else if (difference > 2 && difference <= 5) { // Close in favor of Attacker
      normalOrPowerPunch = determinePowerShot(attacker, defender, difference)
      hit = defender.hp -= normalOrPowerPunch;
      setObj(defender, "hp", hit)
      result.totalDmg = normalOrPowerPunch;
      result.text = `Solid work and steady shots by ${attacker.firstName}`;

    /***  Fight balance favors attacker  ***/

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

  const engagement = (user, opp, timeout) => {  //engagement determines who initiates the attack   
    let userOffense = user.engage();
    let oppOffense = opp.engage();
    let resultDmg;
    if (fightOver || knockdownRule) stopFight.stop();

    if (userOffense > oppOffense) {
      let userDmg = exchange(user, opp);
      resultDmg = calcDamage(user, opp, userDmg, timeout); //determines resulting dmg after engage and exchange
      determineKO(user, opp, userDmg, timeout);
      setUserDmgScale(userDmg);

    } else if (oppOffense > userOffense) {
      let oppDmg = exchange(opp, user);
      resultDmg = calcDamage(opp, user, oppDmg, timeout); //determines resulting dmg after engage and exchange
      determineKO(opp, user, oppDmg, timeout);
      setOppDmgScale(oppDmg);

    } else if (oppOffense === userOffense) {
      resultDmg = 0;
    }
    return resultDmg;
  };

  return (
    <div>FightLogic</div>
  )
}

export default FightLogic