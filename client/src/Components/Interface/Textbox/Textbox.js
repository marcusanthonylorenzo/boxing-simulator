import React from 'react'
import './Textbox.css'

const Textbox = ({ input, getAttacker, user, opp, pbp }) => {

  return (
    <div className="textbox"
      style={{ backgroundColor: getAttacker.favoriteColor}}>
      {input.text}
    </div>
  )
}

export default Textbox