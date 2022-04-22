import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

function EditProfile({ refreshUser, userObj }) {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

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
    <div className="edit-modal">
      <div className="modal-wrapper">
        <div className="user-info-wrapper">
          <div className="user-bg">
            <label htmlFor="userBg" className="file-btn">
              <FontAwesomeIcon icon={faImage} />
            </label>
            <input type="file" id="userBg" />
          </div>
          <div className="user-info">
            <div className="row">
              <div className="user-img">
                <label htmlFor="userImg" className="file-btn">
                  <FontAwesomeIcon icon={faImage} />
                </label>
                <input type="file" id="userImg" />
              </div>
            </div>
            <div className="row">
              <form onSubmit={onSubmitName}>
                <input
                  type="text"
                  value={newDisplayName}
                  placeholder="Display name"
                  onChange={onChangeName}
                />
              </form>
              <p>@{userObj.uid}</p>
            </div>
            <div className="btn-group">
              <input
                type="submit"
                value="Edit Profile"
                className="submit-btn"
              />
              <button className="danger-btn">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
