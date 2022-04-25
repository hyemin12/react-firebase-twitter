import { useEffect, useState } from "react";
import { dbService } from "fbase";

import ProfileHeader from "components/ProfileHeader";
import Tweet from "components/Tweet";
import EditProfile from "components/EditProfile";
import "css/profile.css";

function Profile({ refreshUser, userObj }) {
  const [tweets, setTweets] = useState([]);
  const [editing, setEditing] = useState(false);
  const getMyTweets = async () => {
    // 해당 id 값을 가지고 있는 트윗만 필터링해서 출력
    const tweet = await dbService
      .collection("tweet")
      .where("creatorId", "==", userObj.uid)
      // firebase는 sql을 사용하지 않아서  따로 index를 설정해줘야 필터링 할 수 있음
      .get();
    setTweets(tweet.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyTweets();
  }, []);
  function handleAlert() {
    alert("준비중인 서비스입니다.");
  }
  return (
    <section className="profile">
      <ProfileHeader userObj={userObj} setEditing={setEditing} />
      {editing && (
        <EditProfile
          userObj={userObj}
          refreshUser={refreshUser}
          setEditing={setEditing}
        />
      )}
      <div className="timeline-tab">
        <ul>
          <li className="active">Tweets</li>
          <li onClick={handleAlert}>Tweets &#38; replies</li>
          <li onClick={handleAlert}>Media</li>
          <li onClick={handleAlert}>Likes</li>
        </ul>
      </div>
      <div className="timeline">
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.createdAt}
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

export default Profile;
