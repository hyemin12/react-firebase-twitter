import { useState } from "react";
import { dbService, storageService } from "fbase";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faImage,
  faSmile,
} from "@fortawesome/free-regular-svg-icons";

function AddTweet({ userObj }) {
  const [newTweet, setNewTweet] = useState();
  const [attachmentImg, setAttachmentImg] = useState("");
  function onChangeTweet(event) {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  }
  const onSubmitTweet = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachmentImg !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachmentImg,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(response.ref);
    }
    const tweetObj = {
      text: newTweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      displayName: userObj.displayName,
      photoURL: userObj.photoURL,
      attachmentUrl,
    };
    await dbService.collection("tweet").add(tweetObj);
    setNewTweet("");
    setAttachmentImg("");
  };
  function onImage(event) {
    const {
      target: { files },
    } = event;
    const theImg = files[0];
    const reader = new FileReader();
    // 로딩이 끝나고 나면 실행
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachmentImg(result);
    };
    reader.readAsDataURL(theImg);
  }
  function onClearImg() {
    setAttachmentImg("");
  }
  return (
    <div className="create-tweet">
      <div className="user-img">
        <img src={userObj.photoURL} alt={userObj.displayName} />
      </div>

      <form onSubmit={onSubmitTweet}>
        <input
          type="text"
          value={newTweet}
          placeholder="What's Happening?"
          maxLength={120}
          className="border-none"
          onChange={onChangeTweet}
        />
        {attachmentImg && (
          <div className="preview-img">
            <img src={attachmentImg} alt="" />
            <button className="danger-btn" onClick={onClearImg}>
              X
            </button>
          </div>
        )}
        <div className="btn-group btn-area">
          <ul>
            <li className="file-btn-wrapper">
              <label htmlFor="imgFile" className="file-btn">
                <FontAwesomeIcon icon={faImage} />
              </label>
              <input
                type="file"
                id="imgFile"
                accept="image/*"
                onChange={onImage}
              />
            </li>
            <li>
              <FontAwesomeIcon icon={faChartBar} />
            </li>
            <li>
              <FontAwesomeIcon icon={faSmile} />
            </li>
          </ul>
          <input type="submit" value="tweet" className="submit-btn" />
        </div>
      </form>
    </div>
  );
}

export default AddTweet;
