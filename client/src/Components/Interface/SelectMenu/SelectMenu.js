import React, { useState, useEffect } from 'react'
import './SelectMenu.css'

const SelectMenu = ( { buttons }) => {
  
  const [show, setShow] = useState(`show`);
  const showHide = () => {
    if (show) {
      setShow(`hide`);
    } else if (!show) {
      setShow(`show`);
    }
  }

  // useEffect(() => {
  //     setTimeout(() => {
  //       setShow(false);
  //     }, 3000);
  //   });

  return (

      <div className="select-menu">
        {buttons}
      </div>

  );

}

export default SelectMenu