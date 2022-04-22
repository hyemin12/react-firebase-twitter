import { dbService } from "fbase";
import { useEffect, useState } from "react";
import AddTweet from "components/AddTweet";
import Tweet from "components/Tweet";

function Home({ userObj }) {
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
  return (
    <section>
      <h2>Home</h2>
      <AddTweet userObj={userObj} />
      <div className="timeline">
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            userObj={userObj}
            // 작성자 일치여부
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </section>
  );
}

export default Home;
