import { authService } from 'myfirebase'
import React from 'react'
import { useHistory } from 'react-router';

function Profile() {

  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut()
    history.push("/git b")
  };

  return (
    <>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  )
}

export default Profile
