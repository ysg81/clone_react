import { authService } from 'myfirebase'
import React from 'react'
import { useHistory } from 'react-router';

function Profile() {

  const history = useHistory();

  // 로그아웃시 홈으로 되돌아가기
  const onLogOutClick = () => {
    authService.signOut()
    history.push("/")
  };

  return (
    <>
      <button onClick={onLogOutClick}>로그아웃</button>
    </>
  )
}

export default Profile
