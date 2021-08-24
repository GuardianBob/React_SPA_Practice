import React, { Component } from 'react';
import {FaUsers} from 'react-icons/fa';
import {Link} from '@reach/router'

class Navigation extends Component {
    render() {

        const { user, logOutUser } = this.props;
            
        return (
            <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
                <div className="container-fluid">
                    {/* Link from @reach/router helps pages load faster and be more responsive */}
                    <Link to="/" className="navbar-brand">
                    <FaUsers className="mx-2" /> Meeting Log
                    </Link>
                    <div className="navbar-nav ml-auto">
                        {user && ( // <-- Basically checks if user exists
                            <Link className="nav-item nav-link" to="/meetings">
                            meetings
                            </Link>
                        )}
                        {!user && (
                            <Link className="nav-item nav-link" to="/login">
                            log in
                            </Link>
                        )}
                        {!user && (
                            <Link className="nav-item nav-link" to="/register">
                            register
                            </Link>
                        )}
                        {user && (
                            <Link className="nav-item nav-link" to="/login"
                            onClick={e => logOutUser(e)}>
                            log out
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigation;