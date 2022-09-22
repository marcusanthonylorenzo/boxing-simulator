import React, { useEffect, useState } from 'react';
import Data from "../Helpers/Data";
import { calcEngagement } from "./calcEngagement.tsx";
import useFightState from "./useFightState.tsx";

const { user, enemy } = Data(); //Replace later

const FightEngine: React.FC = () => {

  const { aggressor, counterStriker, calcAggressor } = useFightState();

  //fight flow
  console.log(`check aggressor pre`, aggressor, `cs`, counterStriker); //check pre
  calcAggressor(user, enemy);
  console.log(`check aggressor res`, aggressor, `cs`, counterStriker); //check post
  const calcEngagementResults = calcEngagement(aggressor, counterStriker);
  console.log(calcEngagementResults); //check results


  return (
    <div>
      FightEngine
    </div>
  )
};

export default FightEngine