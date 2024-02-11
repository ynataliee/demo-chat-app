import React from 'react';
import Cookies from 'universal-cookie';
import {Segment, Divider, Button} from 'semantic-ui-react';

const cookies = new Cookies()

const DeleteMessages = ({conversations}) => {
    // new variable for displaying message history 
    const[conversationId, setConversationId] = React.useState('')
    const[messageThread, setMessageThread] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => { //listen for variable changes 
        // this will run anytime conversationId changes 
        getConversation()
      }, [conversationId]) // plugin custom list of variables to listen to 

      async function getConversation() {
        const httpSettings = {
          method: 'GET',
          headers: {
            auth: cookies.get('auth'), // utility to retrive cookie from cookies
          }
        };
    
        // this line call the endpoint in our backend(java endpoint)
        // result will store what the handleRequest() function returns 
        // if we delete the message then we would return in our apiRes Body 200 Ok and then null for data, and 
        // for the String message paramter in RestApiAppResponse we would return "Messages Deleted" 
        const result = await fetch('/getConversation?conversationId=' + conversationId, httpSettings);
        const apiRes = await result.json();
        console.log(apiRes);
        if (apiRes.status) {
          // worked
          setMessageThread(apiRes.data); // java side should return list of all convos for this user -> which will be updated when we delete messages 
        } else {
          console.log(apiRes.message);
        }
      }

      async function handleDeleteMessages(){
        setIsLoading(true);

        const httpSettings = {
          method: 'POST',
          headers: {
            auth: cookies.get('auth'), // utility to retrive cookie from cookies
          }
        };

        //use query params to get the convo history that we want, go to java where the messages will be deleted 
        const result = await fetch('/deleteMessages?conversationId=' + conversationId, httpSettings);
        const apiRes = await result.json();
        console.log(apiRes);
    
        if (apiRes.status) {
         
        } else {
          console.log(apiRes.message);
        }
        setIsLoading(false);
      };

      return <Segment basic padded='very'>
        
        <div class>{conversations.map(conversation => <div onClick={()=> setConversationId(conversation.conversationId)}>Convo: {conversation.conversationId} </div>)}</div>
        <Divider hidden />
        <h3>Selected Conversation: {conversationId} </h3>
       
        <Divider hidden />
       <div>
         {messageThread.map(messageDto => <div class = "content">{messageDto.message}</div>)}
       </div>
 
      <Divider hidden/>
       <div>
         <button class="circular negative center floated ui button" onClick={handleDeleteMessages}> Delete Messages </button>
       </div>
    </Segment>
}

export default DeleteMessages;