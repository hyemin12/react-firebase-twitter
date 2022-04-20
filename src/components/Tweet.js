import { dbService } from "fbase";
import { useState } from "react";

function Tweet({ tweetObj, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onDeleteTweet = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet");
    if (ok) {
      //delete tweet
      await dbService.doc(`tweet/${tweetObj.id}`).delete();
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
    setEditing(!editing);
  };
  function onChangeTweet(event) {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  }
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmitTweet}>
            <input
              type="text"
              value={newTweet}
              placeholder="Edit your Tweet"
              required
              onChange={onChangeTweet}
            />
            <input type="submit" value="Update Tweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={toggleEditing}>Edit</button>
              <button onClick={onDeleteTweet}>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
export default Tweet;
