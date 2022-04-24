import { useState } from "react";
import { storageService } from "fbase";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

function EditProfile({ refreshUser, userObj, setEditing }) {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [attachmentImg, setAttachmentImg] = useState("");
  function onChangeName(event) {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  }
  function onImage(event) {
    const {
      target: { files },
    } = event;
    const theImg = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachmentImg(result);
    };
    reader.readAsDataURL(theImg);
  }
  const onSubmitProfile = async (event) => {
    event.preventDefault();
    const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
    const attachmentUrl = await getDownloadURL(uploadString(attachmentRef).ref);
    console.log(attachmentUrl);
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    } else if (userObj.photoURL !== attachmentUrl) {
      await userObj.updateProfile({
        photoURL: attachmentUrl,
      });
    }
    refreshUser();
    setEditing(false);
  };
  function editToggle() {
    setEditing(false);
  }

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
                <input
                  type="file"
                  accept="image/*"
                  id="userImg"
                  onChange={onImage}
                />
                <div className="preview-img">
                  <img
                    src={attachmentImg ? attachmentImg : userObj.photoURL}
                    alt="preview"
                  ></img>
                </div>
              </div>
            </div>
            <div className="row">
              <form onSubmit={onSubmitProfile}>
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
                onClick={onSubmitProfile}
              />
              <button className="danger-btn" onClick={editToggle}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
