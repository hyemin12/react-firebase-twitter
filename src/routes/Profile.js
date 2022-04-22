import { useEffect, useState } from "react";
import { dbService } from "fbase";
import ProfileHeader from "components/ProfileHeader";
import Tweet from "components/Tweet";
import EditProfile from "./EditProfile";
import "css/profile.css";

function Profile({ refreshUser, userObj }) {
  const [tweets, setTweets] = useState();
  const [editing, setEditing] = useState(false);
  const getMyTweet = async () => {
    // 해당 id 값을 가지고 있는 트윗만 필터링해서 출력
    const tweetArr = await dbService
      .collection("tweets")
      .where("creatorId", "==", userObj.uid)
      // firebase는 sql을 사용하지 않아서  따로 index를 설정해줘야 필터링 할 수 있음
      .orderBy("createdAt")
      .get();
    console.log(tweetArr.forEach((doc) => doc.data()));
    // setTweets(tweetArr.forEach((doc) => doc.data()));
  };
  useEffect(() => {
    getMyTweet();
  });
  console.log(tweets);
  return (
    <section className="profile">
      <ProfileHeader userObj={userObj} setEditing={setEditing} />
      {editing && <EditProfile userObj={userObj} refreshUser={refreshUser} />}
      {/* <div className="timeline">
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            userObj={userObj}
            // 작성자 일치여부
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div> */}
    </section>
  );
}

export default Profile;
