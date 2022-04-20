import Tweet from "components/Tweet";
import { dbService } from "fbase";
import { getDocs, collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

function Home({ userObj }) {
  const [newTweet, setNewTweet] = useState();
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    // 실시간으로 처리
    dbService.collection("tweet").onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);
  function onChangeTweet(event) {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  }
  const onSubmitTweet = async (event) => {
    event.preventDefault();
    await dbService.collection("tweet").add({
      //data
      text: newTweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNewTweet("");
  };
  return (
    <div>
      <form onSubmit={onSubmitTweet}>
        <input
          type="text"
          value={newTweet}
          placeholder="What's Happening"
          maxLength={120}
          onChange={onChangeTweet}
        />
        <input type="submit" value="tweet" />
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            // 작성자 일치여부
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
