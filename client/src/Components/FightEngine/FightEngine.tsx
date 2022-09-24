import React, { useEffect, useState } from 'react';
import Data from "../Helpers/Data";
import { calcEngagement } from "./calcEngagement.tsx";
import useFightState from "./useFightState.tsx";

type Boxer = import("../Boxer/BoxerClass").Boxer;

const FightEngine = (boxerOne: Boxer, boxerTwo: Boxer) => {

  const { aggressor, counterStriker, calcAggressor } = useFightState();
  const [PBP, setPBP] = useState<Array<object>>();

  /*
  FIGHT FLOW

  !! Need to abstract one single function that passes two Boxer objects, and can run independently for simulation of npc. i.e. fight() ?
  */

  const updatePBP = (calcs: object) => {
    console.log(PBP); //THIS IS WHERE YOU MUTATE THE BOXER OBJECT
    PBP !== undefined ? setPBP((prev => [...prev, calcs])) : setPBP([calcs])
  }

  const fight = async () => {
    await calcAggressor(boxerOne, boxerTwo);
    console.log(`check aggressor res`, aggressor, `cs`, counterStriker); //check post
    const calcEngagementResults = await calcEngagement(aggressor, counterStriker);
    console.log(calcEngagementResults); //check results
    updatePBP(calcEngagementResults);
  };

  return { fight, PBP }
};

export default FightEngine