import React from 'react';
import Cookies from 'universal-cookie';
import { Button, Segment} from 'semantic-ui-react';
import MatchedUserList from './MatchedUserList';


const cookies = new Cookies();

const SearchForUser = (props) => {
    const [user, setUser] = React.useState('');
    const [matchedUsers, setMatchedUsers] = React.useState([]); //arry to hold returned users that matched
    
    //show matched users a user types in search bar
    React.useEffect(() => { 
        getMatchingUsers()
      }, [user])

    async function getMatchingUsers() {
        const httpSettings = {
            method: 'GET',
            headers: {
                auth: cookies.get('auth'), //teacher showed util to retrieve cookie from cookies
            }
        };

        const result = await fetch('/searchForUser?userName='+user, httpSettings);
        const apiResponse = await result.json();
        console.log(apiResponse);
        if(apiResponse.status) {
            //we got results
            setMatchedUsers(apiResponse.data);
        } else {
            //we had an error
            console.log('could not retrrieve users');
        }

    }

    return <Segment basic padded='very'>
        <div className="ui search">
            <div className="ui icon input">
                <input className="ui prompt" type="text" placeholder="Search users..." value={user} onChange={e => setUser(e.target.value)} />
                <i className="search icon"></i>
            </div>
            <MatchedUserList value ={props.value} matchedUsers={matchedUsers} />
        </div>
    </Segment>
};

export default SearchForUser;

