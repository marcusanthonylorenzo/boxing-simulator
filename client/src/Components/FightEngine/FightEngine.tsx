import { useState } from 'react';
// import Data from "../Helpers/Data";
import { calcEngagement } from "./calcEngagement.tsx";
import useFightState from "./useFightState.tsx";

type Boxer = import("../Boxer/BoxerClass").Boxer;

const FightEngine = (boxerOne: Boxer, boxerTwo: Boxer) => {
  // const { user, enemy } = Data(); //Data Fetch (hardcoded)
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

  const automateFight = (definedLength: number, callbackAutomated: any) => { //specify type later
    // for (let i = 1; i < definedLength; i++) {
    if (PBP && PBP.length <= definedLength) {
      console.log(`check definiteLength value`, definedLength, PBP.length);
      callbackAutomated()
    } else if (!PBP) {
      console.log('length undef');
    } else {
      console.log("round over");
      return;
    }
  }

  const fight = async () => {
    await calcAggressor(boxerOne, boxerTwo);
    const calcEngagementResults = await calcEngagement(aggressor, counterStriker);
    await updatePBP(calcEngagementResults)
  };

  return { automateFight, fight, PBP }
};

export default FightEngine