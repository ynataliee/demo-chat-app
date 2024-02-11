import React, { Fragment } from 'react';
import { Button } from 'semantic-ui-react';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

const BlockUser = (props) => {
    const [blockId, setBlockId] = React.useState('');
    const [blockMessage, setblockMessage] = React.useState('');
    
    //set block message to empty unless a user clicks on block button
    React.useEffect(() => { 
      setblockMessage('');
    }, [props.value2])

    async function handleBlockUser() {
    setblockMessage(''); // fresh error message each time
    const body = {
      fromId: props.value1,      //get the current user name
      toId: props.value2
    };

    const httpSettings = {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        auth: cookies.get('auth'), // utility to retrive cookie from cookies
      }
    };
    const result = await fetch('/blockUser', httpSettings);
    const apiRes = await result.json();
    console.log(apiRes);
    setblockMessage(apiRes.message);        //return message
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          className="circular negative right floated ui button"
          onClick={handleBlockUser}
        >
          Block
        </button>
        {blockMessage}
      </div>
    );
    /*Changed from:
    return <div>
      <button class="circular negative left floated ui button" onClick={handleBlockUser}>Block</button>
      <div>{blockMessage}</div>
    </div>
    */

    // return <div className='blockUser_container'>
    //       <h4>Block User</h4>
    //       <input type='text' value={blockId} onChange={e => setBlockId(e.target.value)}/>
    //       <button id='BUbutton' onClick={handleBlockUser}>Block User</button>
    //       <div>{blockMessage}</div>
    //     </div>
};

export default BlockUser;