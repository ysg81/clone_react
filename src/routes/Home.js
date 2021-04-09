import Tweet from 'components/Tweet';
import { dbService } from 'myfirebase';
import React, { useState, useEffect } from 'react'

function Home({ userObj }) {
  const [tweet, setTweet] = useState("")
  const [tweetlist, setTweetlist] = useState([]);

  // firestore에서 data 가져오기
  // const getTweets = async () => {
  //   const dbTweets = await dbService.collection("tweets").get();
  //   dbTweets.forEach((document) => {
  //   // object에 id원소 추가
  //     const tweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setTweetlist((prev) => [tweetObject, ...prev]);
  //   });
  // }

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
    await dbService.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTweet("")
  }

  const onChange = (event) => {
    setTweet(event.target.value);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="무슨 생각을 하고 있나요?"
          maxLength={120}
          onChange={onChange}
          value={tweet}/>
        <input type="submit" value="Tweet"/>
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
