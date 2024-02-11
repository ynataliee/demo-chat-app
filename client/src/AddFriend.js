import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const AddFriend = (props) => {
  const [friendId, setFriendId] = useState('');
  const [friendMessage, setFriendMessage] = useState('');


  async function handleAddFriend() {
    const body = {
      fromId: props.value1,
      toId: props.value2
    };
    const httpSettings = {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        auth: cookies.get('auth')
      }
    };

    const result = await fetch('/addFriend', httpSettings);
    const apiRes = await result.json();
    console.log(apiRes);
    if (apiRes.status) {
      setFriendMessage(apiRes.message);


    } else {
      console.log('Failed to add friend:', apiRes.message);
      setFriendMessage(apiRes.message);
    }
  }

  //makes sure the friendMessage is empty unless the button is clicked
  React.useEffect(() => { 
    setFriendMessage('');
  }, [props.value2])


  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button
        className="circular green right floated ui button"
        onClick={handleAddFriend}
      >
        Add Friend
      </button>
      {friendMessage}
    </div>
  );
};

export default AddFriend;
