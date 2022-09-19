import React, { useEffect, useState } from 'react';

const MatchData = ({ user, enemy }) => {

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
  const [rateOfExchange, setRateOfExchange] = useState(2);  //toggle number of punches in one round based on boxer handSpeed
  const [knockdownRuleLimit, setKnockdownRuleLimit] = useState(3); //set max knockdowns

  const [ url, setUrl ] = useState(urls[1])
  const [userActive, setUserActive] = useState(user); //point to an updated state of user attributes
  const [oppActive, setOppActive] = useState(enemy);
  const [userDmgScale, setUserDmgScale] = useState(); //store values for each total damage output for data
  const [oppDmgScale, setOppDmgScale] = useState();
  const [pbp, setPbp] = useState([]); //a combination of above state in objects, for historical fight record
  const [punchCount, setPunchCount] = useState([]); //data for each punch/counter punch thrown, for historical fight record
  const [incrementor, setIncrementor] = useState(0);
  const [exchangeCount, setExchangeCount] = useState(0);  //count number of times boxers enter a scrap
  const [delay] = useState(1500);  //toggle rate of text ouput

  /*
   *  SET HANDLERS LATER, EXTRACT MATCH STATE FIRST !
   */


  return {
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
  }
}

export default MatchData