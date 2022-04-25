import { useState } from "react";
import { dbService, storageService } from "fbase";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEdit,
  faHeart,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import "css/tweet.css";

function Tweet({ userObj, tweetObj, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onDeleteTweet = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet");
    const urlRef = ref(storageService, tweetObj.attachmentURL);
    if (ok) {
      //delete tweet
      await dbService.doc(`tweet/${tweetObj.id}`).delete();
      await deleteObject(urlRef);
    }
  };
  function toggleEditing() {
    setEditing(!editing);
  }
  const onSubmitTweet = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweet/${tweetObj.id}`).update({
      text: newTweet,
    });
    setEditing(false);
  };
  function onChangeTweet(event) {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  }
  return (
    <>
      <div className="tile">
        <div className="user-img">
          <img src={tweetObj.photoURL} alt="user" />
        </div>

        <>
          {editing ? (
            <div className="tweet-item">
              <form onSubmit={onSubmitTweet}>
                <input
                  type="text"
                  value={newTweet}
                  placeholder="Edit your Tweet"
                  required
                  onChange={onChangeTweet}
                />

                <div className={"btn-group" + (editing ? " editing" : null)}>
                  <input
                    type="submit"
                    value="Update Tweet"
                    className="submit-btn"
                    style={{ width: "130px", height: "40px" }}
                  />
                  <button className="danger-btn" onClick={toggleEditing}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <div className="tweet-item">
                <h4>
                  {tweetObj.displayName}
                  <span className="tweet-user-id">@{tweetObj.creatorId}</span>
                </h4>
                <p>{tweetObj.text}</p>
                <div className="upload-img">
                  {tweetObj.attachmentUrl && (
                    <img
                      src={tweetObj.attachmentUrl}
                      alt="img"
                      style={{ width: "100%" }}
                    />
                  )}
                </div>
              </div>

              <ul className="btn-group">
                <li>
                  <FontAwesomeIcon icon={faComment} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faRepeat} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faHeart} />
                </li>
                {isOwner && (
                  <>
                    <li onClick={toggleEditing}>
                      <FontAwesomeIcon icon={faEdit} />
                    </li>
                    <li onClick={onDeleteTweet}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </>
      </div>
    </>
  );
}
export default Tweet;
