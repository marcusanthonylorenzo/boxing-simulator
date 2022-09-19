const judgeRound = ( passedObjects, whatToJudge, whichJudge) => {
  const {
    user,
    enemy,
    filterStats,
    setJudgeOne,
    setJudgeTwo,
    setJudgeThree,
  } = passedObjects;

  console.log(passedObjects)

  //Use the judges criteria to filter the aggregated stats of each fighter.
  const judgeUser = filterStats(user, whatToJudge); 
  const judgeOpp = filterStats(enemy, whatToJudge);
  let userScore = 9;
  let oppScore = 9;

  const chooseJudge = (whichJudge) => {
    switch (whichJudge){
      case "one":
      setJudgeOne(prev => [...prev, [userScore, oppScore]]);
      return;
      case "two":
      setJudgeTwo(prev => [...prev, [userScore, oppScore]]);
      return;
      case "three":
      setJudgeThree(prev => [...prev, [userScore, oppScore]]);
      return;
      default: 
      setJudgeOne(prev => [...prev, [userScore, oppScore]]);
      return;
    }
  }
  
  if (enemy.knockdownCount === user.knockdownCount) {
    //If all counts are equal, judge the winner based on judges criteria filtered above.
    if (judgeUser > judgeOpp){
      userScore = 9;
      oppScore = 10;
      chooseJudge(whichJudge);
    } else if (judgeOpp > judgeUser) {
      oppScore = 9;
      userScore = 10;
      chooseJudge(whichJudge);
    }
  } else {
    //For each knockdown, adjust scores
    if (user.knockdownCount > 0) {
      userScore -= user.knockdownCount;
      oppScore++;
      chooseJudge(whichJudge);
    }
    if (enemy.knockdownCount > 0) {
      oppScore -= enemy.knockdownCount;
      userScore++;
      chooseJudge(whichJudge);
    }

    if (user.knockdownCount > 0 && enemy.knockdownCount > 0) {
      //If users are both getting knocked down, winner is the one with less knockdowns.
      if (user.knockdownCount > enemy.knockdownCount) {
        userScore = 9;
        oppScore = 10;
        chooseJudge(whichJudge);

      } else if (enemy.knockdownCount > user.knockdownCount) {
        oppScore = 9;
        userScore = 10;
        chooseJudge(whichJudge);
      }
    }
  }
}

const setScorecardsFunc = (judgeOne, judgeTwo, judgeThree) => {
  console.log(judgeOne, judgeTwo, judgeThree)

  const judgeOneUserScore = judgeOne.reduce((acc, curr, i) => acc += curr[0], 0);
  const judgeOneOppScore = judgeOne.reduce((acc, curr, i) => acc += curr[1], 0);
  // setJudgeOneOfficialScorecard({ user: judgeOneUserScore, opp: judgeOneOppScore });
  const judgeTwoUserScore = judgeTwo.reduce((acc, curr, i) => acc += curr[0], 0);
  const judgeTwoOppScore = judgeTwo.reduce((acc, curr, i) => acc += curr[1], 0);
  // setJudgeTwoOfficialScorecard({ user: judgeTwoUserScore, opp: judgeTwoOppScore });
  const judgeThreeUserScore = judgeThree.reduce((acc, curr, i) => acc += curr[0], 0);
  const judgeThreeOppScore = judgeThree.reduce((acc, curr, i) => acc += curr[1], 0);
  // setJudgeThreeOfficialScorecard({ user: judgeThreeUserScore, opp: judgeThreeOppScore });

  return {
    judgeOneOfficialScorecard: {
      user: judgeOneUserScore,
      opp: judgeOneOppScore,
    },
    judgeTwoOfficialScorecard: {
      user: judgeTwoUserScore,
      opp: judgeTwoOppScore,
    },
    judgeThreeOfficialScorecard: {
      user: judgeThreeUserScore,
      opp: judgeThreeOppScore,
    }
  }
};  


/***  Tally scorecards  ***/

const compareScorecards = (compareScorecardsProps, judgeObject) => {

  const { 
    user,
    opp,
    updateWinLoss 
  } = compareScorecardsProps;

  const {
    judgeOneOfficialScorecard,
    judgeTwoOfficialScorecard,
    judgeThreeOfficialScorecard
  } = judgeObject;

  let userTally = 0;
  let oppTally = 0;

  console.log(`compareScorecards() check props`,compareScorecardsProps, judgeObject)

  //Judge One
  if (judgeOneOfficialScorecard.user > judgeOneOfficialScorecard.opp) {
    userTally++
  } else if (judgeOneOfficialScorecard.user < judgeOneOfficialScorecard.opp) {
    oppTally++
  }
  //Judge Two
  if (judgeTwoOfficialScorecard.user > judgeTwoOfficialScorecard.opp) {
    userTally++
  } else if (judgeTwoOfficialScorecard.user < judgeTwoOfficialScorecard.opp){
    oppTally++
  }
  //Judge Three (Judge Two placeholders for now!)
  if (judgeThreeOfficialScorecard.user > judgeThreeOfficialScorecard.opp) {
    userTally++
  } else if (judgeThreeOfficialScorecard.user < judgeThreeOfficialScorecard.opp){
    oppTally++
  }

  console.log(`judges tally overall`, userTally, oppTally)

  if (judgeOneOfficialScorecard.user === judgeOneOfficialScorecard.opp) {
    userTally++
    oppTally++
  }

  console.log(`compareScorecards() check props`,compareScorecardsProps, judgeObject)

  if (userTally + oppTally >= 3){
    if (userTally > oppTally) {
      updateWinLoss(user, opp)
    } else if (userTally < oppTally) {
      updateWinLoss(opp, user)
    } else if (userTally === oppTally) {
      console.log(`We have a draw! *Crowd boos*`) //remove later
    }
  }
}
export { judgeRound, setScorecardsFunc, compareScorecards };

