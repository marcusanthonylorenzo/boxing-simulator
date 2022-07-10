import React, { useState, useEffect } from 'react'
import './SelectMenu.css'

const SelectMenu = ( { buttons }) => {

  //To reuse, pass props as buttons={ whateverProp to render return below }
  
  // const [show, setShow] = useState(show);

  // useEffect(() => {
  //     setTimeout(() => {
  //       setShow(false);
  //     }, 3000);
  //   });

  console.log(buttons.fightBtn)

  return (

      <div className="select-menu">
        {buttons}
      </div>

  );

}

export default SelectMenu