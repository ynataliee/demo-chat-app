import './App.css';
import React from 'react';
import Cookies from 'universal-cookie';

import SearchForUser from './SearchForUser';
import BlockUser from './BlockUser';
import Header from './Header';
import DeleteMessages from './deleteMessages'
import 'semantic-ui-css/semantic.min.css';

const cookies = new Cookies();

function App() {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  // new state variables for chat box
  const [toId, setToId] = React.useState('');
  const [message, setMessage] = React.useState('');

  // new state variable for list of convos
  const [conversations, setConversations] = React.useState([]); // default empty array

  async function getConversations() {
    const httpSettings = {
      method: 'GET',
      headers: {
        auth: cookies.get('auth'), // utility to retrive cookie from cookies
        newField: "hello from client",
      }
    };
    const result = await fetch('/getConversations', httpSettings);
    const apiRes = await result.json();
    console.log(apiRes);
    if (apiRes.status) {
      // worked
      setConversations(apiRes.data); // java side should return list of all convos for this user
    } else {
      setErrorMessage(apiRes.message);
    }
  }

  async function handleSubmit() {
    setIsLoading(true);
    setErrorMessage(''); // fresh error message each time
    const body = {
      userName: userName,
      password: password,
    };
    const httpSettings = {
      body: JSON.stringify(body),
      method: 'POST'
    };
    const result = await fetch('/createUser', httpSettings);
    const apiRes = await result.json();
    console.log(apiRes);
    if (apiRes.status) {
      console.log("What we got back from the java backend: \n" + result)
    } else {
      // some error message
      setErrorMessage(apiRes.message);
    }
    setIsLoading(false);
  };

  async function handleLogIn() {
    setIsLoading(true);
    setErrorMessage(''); // fresh error message each time
    const body = {
      userName: userName,
      password: password,
      newField: "Hello from client" 
    };
    const httpSettings = {
      body: JSON.stringify(body),
      method: 'POST',
    };
    const result = await fetch('/login', httpSettings);
    if (result.status === 200) {
      // login worked
      console.log("Here is what we got from our java front end: \n" + result)
      setIsLoggedIn(true);
      getConversations();
    } else {
      // login did not work
      setErrorMessage(`Username or password incorrect.`);
    }

    setIsLoading(false);
  };

  async function handleSendMessage() {
    setIsLoading(true);
    setErrorMessage(''); // fresh error message each time
    const body = {
      fromId: userName,
      toId: toId,
      message: message,
    };
    const httpSettings = {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        auth: cookies.get('auth'), // utility to retrive cookie from cookies
      }
    };
    const result = await fetch('/createMessage', httpSettings);
    const apiRes = await result.json();
    console.log(apiRes);
    if (apiRes.status) {
      // worked
      setMessage('');
      getConversations();
    } else {
      setErrorMessage(apiRes.message);
    }
    setIsLoading(false);
  };

  if (isLoggedIn) {
    return (
      <div className="App">
        <Header/>
        <div className="ui raised segment">
        <h2 className="ui header">Welcome {userName}</h2>
</div>
        <div className="ui raised segment">
          <div className="ui search">
            To: <div className="ui icon input">
              <input className="ui prompt" type="text" placeholder="Messag to: " value={toId} onChange={e => setToId(e.target.value)} />
            </div>
          </div> 
        
        <div className="ui form">
          <div className='field'>
          <textarea style={{width: 250, height: 75}} value={message} onChange={e => setMessage(e.target.value)} />
          </div>
        </div>
        
        

        <div>
          <button class="circular positive ui button" onClick={handleSendMessage}>Send Message</button>
        </div>
        </div>

        <div>{errorMessage}</div>
        <div className="ui raised segment">
        <DeleteMessages conversations={conversations}/>
</div>
<div className="ui raised segment">
        <SearchForUser value={userName}/>
       </div>
        {/* <BlockUser value={userName}/> */}
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <div className='ui raised segment'>
      <div className="ui input focus">
        <input value={userName} onChange={e => setUserName(e.target.value)} placeholder='username' />
      </div>
      <div className="ui input focus">
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='password'/>
      </div>
      {/* If reguster button clicked then execute the handleSubmit function, if Log in button hit, execute hte handleLogin function */}
      <button className="miny ui green button" onClick={handleSubmit} disabled={isLoading}>Register</button>
      <button className="miny ui blue button" onClick={handleLogIn} disabled={isLoading}>Log in</button>
      <div>
        {isLoading ? 'Loading ...' : null}
      </div>
      <div>{errorMessage}</div>
      </div>
    </div>
  );
}



export default App;