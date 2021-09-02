import React, { Component } from 'react';
import {Link} from '@reach/router'

// Component from React can be called like above in brackets and referenced alone 
// like below or it can be referenced below as "React.Component" without being imported above.
class Welcome extends Component {
    render() {

        const {userName, logOutUser} = this.props;
            
        return (
            <div className="text-center mt-4" id="Welcome-component">
                <span className="text-secondary font-weight-bold ps-1 me-1">
                    Welcome {userName} 
                </span>
                {/* <Link to="/login" className="font-weight-bold text-primary ps-1"
                onClick={e => logOutUser(e)}>
                    Log Out
                </Link> */}
            </div>
        );
    }
}

export default Welcome;