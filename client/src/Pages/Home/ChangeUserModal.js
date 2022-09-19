import React, { useEffect, useState } from 'react';
import Randomize from '../../Components/Helpers/Randomize';
import generateBoxer from './GenerateBoxer';
import './Home.scss';

const ChangeUserModal = ({ newUser }) => {
  
  const [show, setShow] = useState(false);
  const [newUserData, setNewUserData] = useState(
  {
    firstName: ``,
    nickname: '',
    lastName: ``,
    hometown: ``,
    weight: Randomize(125, 250),
    favColor: ``,
    stamina: Randomize(50, 100),
    aggression: Randomize(50, 100),
    agility: Randomize(50, 100),
    strength: Randomize(50, 100),
    defense: Randomize(50, 100),
    heart: Randomize(50, 100),
  });

  const handleModal = () => {
    setShow(!show)
    console.log(show)
  }

  useEffect(() => {
    console.log(newUserData)
  },[])

  return (
    <>
      <div className="change-user-modal">
        <div className="change-user-container">

          <form className="change-user-form">
            <div className="change-user-form-inputs">

              {/* Controlled vs uncontrolled input ? */}
              
              <input type="text" className="change-user-form-input" placeholder="First Name"
                value={newUserData.firstName}
                onChange={(e)=> {    
                  setNewUserData({firstName: e.target.value})
                  console.log(e.target.value, newUserData.firstName)
              }}/>
              <input type="text" className="change-user-form-input" placeholder="Nickname"                value={newUserData.nickname}
                onChange={(e)=> {    
                  setNewUserData({nickname: e.target.value})
                  console.log(e.target.value, newUserData.nickname)
              }}/>
              <input type="text" className="change-user-form-input" placeholder="Last Name"                value={newUserData.lastName}
                onChange={(e)=> {    
                  setNewUserData({lastName: e.target.value})
                  console.log(e.target.value, newUserData.lastName)
              }}/>
              <input type="text" className="change-user-form-input" placeholder="Hometown"/>
              <input type="number" className="change-user-form-input" placeholder="Weight"/>
              <input type="text" className="change-user-form-input" placeholder="Team Color(s)"/>
              <input type="number" className="change-user-form-input" placeholder="Stamina"/>
              <input type="number" className="change-user-form-input" placeholder="Aggression"/>
              <input type="number" className="change-user-form-input" placeholder="Agility"/>
              <input type="number" className="change-user-form-input" placeholder="Strength"/>
              <input type="number" className="change-user-form-input" placeholder="Defense"/>
              <input type="number" className="change-user-form-input" placeholder="Heart"/>

            </div>

            <button type="submit" className="change-user-btn"
              onClick={(e)=> {
                e.preventDefault();
                console.log(`change user btn clicked`)
                handleModal();
                const setNewBoxer = generateBoxer(newUserData)
                {/* Make this more reusable for both boxers */}
                newUser(setNewBoxer)
              }}
            >
              <h4>Change Boxer</h4>
            </button>
          </form>

        </div>
      </div>
    </>
  )
}

export default ChangeUserModal

