import React from 'react';
import ClickyBoi from "../../Button/ClickyBoi.tsx";
import FightEngine from "../../FightEngine/FightEngine.tsx";
import Data from "../../Helpers/Data";
// import Navbar from "../Navbar/Navbar";

const Display = () => { //UI for match

  const { user, enemy } = Data(); //Data Fetch (hardcoded)
  const { automateFight, fight, PBP } = FightEngine(user, enemy); //Game Engine

  return (
    <div>
      {/* <Navbar /> */}
      <ClickyBoi buttonText={"clickerz"} buttonCallback={() => automateFight(10, fight())} />

      {PBP ? PBP.map((each) => {
        const getEntries = Object.entries(each);
        return (
          <div className={`display-pbp`}
            style={{
              color: `white`,
              display: `flex`, flexDirection: `column`, width: `30vw` //TEMP
            }}
          >
            {getEntries}
          </div>
        )
      }) : null}

    </div>
  )
}

export default Display