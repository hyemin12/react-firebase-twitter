import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

function ProfileHeader({ userObj, setEditing }) {
  console.log(userObj);
  function editToggle() {
    setEditing(true);
  }
  return (
    <>
      <div className="profile-header">
        <div className="profile-nav">
          <div className="file-btn">
            <FontAwesomeIcon icon={faAngleLeft} />
          </div>
          <h4>{userObj.displayName}</h4>
        </div>
        <div className="user-info-wrapper">
          <div className="user-bg"></div>
          <div className="user-info">
            <div className="row">
              <div className="user-img">
                <img src={userObj.photoURL} alt="profile" />
              </div>
              <button onClick={editToggle}>Edit Profile</button>
            </div>
            <div className="row">
              <h4>{userObj.displayName}</h4>
              <p>@{userObj.uid}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;
