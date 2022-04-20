import { dbService } from "fbase";
import { useState } from "react";

function AddTweet({ userObj }) {
  const [newTweet, setNewTweet] = useState();
  function onChangeTweet(event) {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  }
  const onSubmitTweet = async (event) => {
    event.preventDefault();
    await dbService.collection("tweet").add({
      //data
      text: newTweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNewTweet("");
  };
  return (
    <div className="create-tweet">
      <form onSubmit={onSubmitTweet}>
        <input
          type="text"
          value={newTweet}
          placeholder="What's Happening"
          maxLength={120}
          onChange={onChangeTweet}
        />
        <div className="btn-group">
          <input type="submit" value="tweet" className="submit-btn" />
        </div>
      </form>
    </div>
  );
}

export default AddTweet;
