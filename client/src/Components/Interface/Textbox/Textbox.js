import React from 'react'
import './Textbox.css'

const Textbox = ({ scrap, getAttacker, user, opp }) => {

  const joinOpponentsToFilter = [user, opp];

  const filterByName = () => {
    return joinOpponentsToFilter.filter(obj => {
      console.log(obj.firstName, getAttacker.firstName)
      if (obj.firstName === getAttacker.firstName ||
          !obj.firstName ||
          !getAttacker.firstName) {
          return obj
      }
    })
  };

  const filterByKeyword = (input) => {
    return joinOpponentsToFilter.filter(obj => {
      if (scrap.text.includes(input)) {
        console.log(scrap.text, input, obj)
        return obj
      }
    })
  };


  // console.log(filterByKeyword('Allan'))
  let getMatch = filterByName()
  const checkReturnFire = filterByKeyword(getMatch[0].firstName)

  console.log(checkReturnFire)

  return (
    <div className="textbox"
      style={{
        backgroundColor: getMatch[0].cornerColor,
        display: `flex`,
        position: `relative`,
        justifyContent: `${getMatch[0].side}`,
        [getMatch[0].side]: `-15%`,
    }}>
      {scrap.text}
    </div>
  )
}

export default Textbox