import React, { Component } from 'react';
import {Link} from '@reach/router'

// Component from React can be called like above in brackets and referenced alone 
// like below or it can be referenced below as "React.Component" without being imported above.
class Home extends Component {
    render() {

        const {user} = this.props;

        // adding css styles within React
        const biggerLead = {
            fontSize: 24,
            fontWeight: 200
        }
        return (
            <div className="container text-center" id="Home-Component">
                <div className="row justify-content-center">
                <div className="col-10 col-md-10 col-lg-8 col-xl-7">
                    <div className="display-4 text-primary mt-3 mb-2">
                    Meeting Log
                    </div>
                    <p className="lead" style={biggerLead}> {/* Adding css styles within React */}
                    This simple app creates meetings, allows people to check
                    in, and picks random users to award giveaways. It's a
                    good example of a Single Page Application which includes
                    connection to a database and routing. It's a practical
                    way to learn <a href="https://reactjs.org/">React</a>{' '} {/* The {' '} adds a space after "React" */} 
                    with <a href="https://firebase.google.com">Firebase</a>.
                    </p>

                    {/* If user is null then show Register nad Login buttons */}
                    {user == null && (
                        <>
                            <Link to="/register" className="btn btn-outline-primary mr-2">
                            Register
                            </Link>
                            <Link to="/login" className="btn btn-outline-primary mr-2">
                            Log In
                            </Link>
                        </>
                    )}

                    {/* If user exists then show Meetings button */}
                    {user && (
                        <>
                            <Link to="/meetings" className="btn btn-primary">
                            Meetings
                            </Link>
                        </>
                    )}
                    
                    
                </div> {/* columns */}
                </div>
            </div>
        );
    }
}

export default Home;