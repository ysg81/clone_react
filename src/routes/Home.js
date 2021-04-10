import Tweet from 'components/Tweet';
import { v4 as uuidv4 } from "uuid"
import { dbService, storageService } from 'myfirebase';
import React, { useState, useEffect } from 'react'

function Home({ userObj }) {
  const [tweet, setTweet] = useState("")
  const [tweetlist, setTweetlist] = useState([]);
  const [file, setFile] = useState()
  useEffect(() => {
    // getTweets();
    dbService.collection("tweets").orderBy("createdAt","desc").onSnapshot(snapshot => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setTweetlist(tweetArray)
    })
  }, [])

  // firestore db에 저장
  const onSubmit = async(event) => {
    event.preventDefault();
    let fileUrl = "";
    if(fileUrl != ""){
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(file, "data_url")
      fileUrl = await response.ref.getDownloadURL()
    }
    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      fileUrl
    }
    await dbService.collection("tweets").add(tweetObj)
    setTweet("")
    setFile("")
  }

  const onChange = (event) => {
    setTweet(event.target.value);
  }

  const onFileChange = (event) => {
    const {target: {files}} = event
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {currentTarget: {result}} = finishedEvent;
      setFile(result)
    }
    reader.readAsDataURL(theFile);
  }

  const onClearFileClick = () => setFile(null)

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="무슨 생각을 하고 있나요?"
          maxLength={120}
          onChange={onChange}
          value={tweet}
        />
        <input type="file" accept="image/*" onChange={onFileChange}/>
        <input type="submit" value="Tweet"/>
        {file && (
          <div>
            <img src={file} width="50px" height="50px"/>
            <button onClick={onClearFileClick}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {tweetlist.map(onetweet => (
           <Tweet
            key={onetweet.id}
            tweetObj={onetweet}
            isOwner={onetweet.creatorId === userObj.uid}/>
        ))}
      </div>
    </div>
  )
}

export default Home
