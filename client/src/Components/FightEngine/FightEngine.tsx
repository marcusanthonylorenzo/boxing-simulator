import React, { useEffect, useState } from 'react';
import ClickyBoi from "../Button/ClickyBoi.tsx";
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


  const handleBtn = () => console.log("clicked") //use for fight start events!

  return (
    <div>
      FightEngine
      <ClickyBoi buttonText="clickerz" buttonCallback={handleBtn} />
    </div>
  )
};

export default FightEngine