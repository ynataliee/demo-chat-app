
import { Button, Card} from 'semantic-ui-react';
import BlockUser from './BlockUser';
import AddFriend from './AddFriend';

const MatchedUserList = (props) => {

  const renderMatchedUsersList = props.matchedUsers.map(user => {
    return (
      <div className='item'>
      <div className='ui container'>
         <div className='ui three column grid'>
         <div className='column'> <img className="ui mini right floated circular image" src="../searchForUsersImages/NicePng_watsapp-icon-png_9332131.png"></img></div>
           <div className='column'>
              <h2 className='ui left aligned header' >{user.userName}</h2>
              <h7 className="ui blue left aligned sub header">{user.userName}@gmail.com</h7>
           </div>
            <div className='column'>
              <BlockUser value1={props.value} value2={user.userName} />
              <AddFriend value1={props.value} value2={user.userName} />
            </div>
          </div>
        </div>
      </div>
    );
  });


    return <div className='ui list'>
                {renderMatchedUsersList}
           </div> 
};

export default MatchedUserList;