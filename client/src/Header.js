import React from 'react';
import {Segment} from 'semantic-ui-react';

const Header = () => {
    
    return <Segment basic padded='very'>
        <h2 class="ui header">
            <i class="plug icon"></i>
            <div class="content">
                TeamAwesome
            </div>
        </h2>
    </Segment>
};

export default Header;