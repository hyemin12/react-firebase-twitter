import { authService, dbService } from "fbase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile({ refreshUser, userObj }) {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  function onLogout() {
    authService.signOut();
    navigate("/");
  }
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
  return (
    <div>
      {userObj.displayName}
      <form onSubmit={onSubmitName}>
        <input
          type="text"
          value={newDisplayName}
          placeholder="Display name"
          onChange={onChangeName}
        />
        <div className="btn-group">
          <input type="submit" value="Update Profile" className="" />
        </div>
      </form>
      <button onClick={onLogout}>Log Out</button>
    </div>
  );
}

export default Profile;
