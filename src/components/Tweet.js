import { dbService } from 'myfirebase'
import React,{ useState } from 'react'

function Tweet({ tweetObj, isOwner }) {

  const [editing, setediting] = useState(false)
  const [newTweet, setNewTweet] = useState(tweetObj.text)

  const onDeleteClick = async() => {
    const ok = window.confirm("정말 삭제하시겠습니까?")
    if(ok){
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      //트윗 삭제
    } else {
      //트윗 삭제 취소
    }
  }

  const toggleEditing = async() => {
    setediting(prev => !prev)
  }
  const onChange = (event) => {
    setNewTweet(event.target.value)
  }
  const onSubmit = async(event) => {
    event.preventDefault();
    console.log(tweetObj, newTweet);
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });
    setediting(false)
  }
  return (
    <div>
      {
        editing ? (
          <>
            {isOwner && 
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="트윗 수정하기"
                  value={newTweet}
                  required
                  onChange={onChange}
                />
                <div>
                  <input type="submit" value="수정 완료"/>
                </div>
              </form>
              <button onClick={toggleEditing}>취소</button>
            </>
            }
          </>
        ) : (    
          <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.fileUrl && (
            <img src={tweetObj.fileUrl} width="50px"/> 
          )}
          {isOwner &&
            <>
              <button onClick={onDeleteClick}>트윗 삭제하기</button>
              <button onClick={toggleEditing}>트윗 수정하기</button>
            </>
          } 
          </>
        )
      }  
    </div>
  )
}

export default Tweet
