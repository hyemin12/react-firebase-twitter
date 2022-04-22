import { useEffect, useState } from "react";
import { dbService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faBackspace,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";

function Profile({ refreshUser, userObj }) {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const getMyTweet = async () => {
    // 해당 id 값을 가지고 있는 트윗만 필터링해서 출력
    const tweets = await dbService
      .collection("tweets")
      .where("creatorId", "==", userObj.uid)
      // firebase는 sql을 사용하지 않아서  따로 index를 설정해줘야 필터링 할 수 있음
      .orderBy("createdAt")
      .get();
  };
  useEffect(() => {
    getMyTweet();
  });
  function onChangeName(event) {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  }
  const onSubmitName = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  console.log(userObj);
  return (
    <div>
      <div className="profile-top">
        <ul>
          <li>
            <FontAwesomeIcon icon={faAngleLeft} />
          </li>
        </ul>
        <h4>{userObj.displayName}</h4>
      </div>
      <div className="user-info-wrapper">
        <div className="user-bg"></div>
        <div className="user-info">
          <div className="user-img"></div>
          <input type="submit" value="Edit Profile" />
          <h4>{userObj.displayName}</h4>
          <p>{userObj.email}</p>
        </div>
      </div>
      <form onSubmit={onSubmitName}>
        <input
          type="text"
          value={newDisplayName}
          placeholder="Display name"
          onChange={onChangeName}
        />
        <div className="btn-group"></div>
      </form>
    </div>
  );
}

export default Profile;
