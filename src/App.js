import React, { Component} from 'react';
import firebase from './Firebase';
import Home from './Home';
import Welcome from './Welcome';
import Navigation from './Navigation'
import Login from './Login'
import Meetings from './Meetings'
import Register from './Register'
import CheckIn from './Checkin'
import Attendees from './Attendees'
import './bootstrap.css';
import { Router, navigate } from '@reach/router'

class App extends Component {

  constructor() { // Constructor is a builder that defines what the component looks like
    super(); // Super is required to initialize a constructor
    this.state = {
      user: null,
      displayName: null,
      userID: null
    };
  }

  componentDidMount() {

    // This pulls current user info from Firebase when user registers/logs in
    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
          this.setState({
            user: FBUser,
            displayName: FBUser.displayName,
            userID: FBUser.uid
          });
        
          const meetingsRef = firebase.database().ref('meetings/' + FBUser.uid);
            meetingsRef.on('value', snapshot => {
              let meetings = snapshot.val();
              let meetingsList = [];

              for(let item in meetings) {
                meetingsList.push({
                  meetingID: item,
                  meetingName: meetings[item].meetingName
                });
              }

              this.setState({
                meetings: meetingsList,
                howManyMeetings: meetingsList.length
              });
            });
      } else {
        this.setState({user: null});
      }
    })
  // ============================ Used in the beginning to pull data from Firebase DB ==============
    // const ref = firebase.database().ref('user');

    // ref.on('value', snapshot => {
    //   let FBUser = snapshot.val();
    //   this.setState({user: FBUser });
    // })
    // ===========================================================================
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        navigate('/meetings');
      })
    })
  }

  // Logout can happen in several different components so it's written here to share among multiple components
  logOutUser = e => {
    e.preventDefault();
    this.setState({
      user: null,
      displayName: null,
      userID: null
    });

    firebase.auth().signOut().then(() => {
      navigate('/login');
    });
  };

  addMeeting = meetingName => {
    const ref = firebase
    .database()
    .ref(`meetings/${this.state.user.uid}`);
    ref.push({meetingName: meetingName})
  }

  render() {
    return (
      <div>
        {/* user and logOutUser are props passed to Navigation, etc. here */}
        <Navigation user={this.state.user} logOutUser={this.logOutUser}/> 
        {this.state.user && 
          <Welcome userName={this.state.displayName} logOutUser={this.logOutUser}/>
        }

        <Router>
          <Home path="/" user={this.state.user}/>
          {/* whatever the path is set to will point to the component listed in the beginning */}
          {/* Example, path is set to "/login" so if the user types that in, it will render the Login component */}
          {/* because "Login" is defined at the beginning of the line */}
          {/* This section basically allows you to pass parameters to each component/module/js file */}
          <Login path="/login" />
          <Meetings path="/meetings" 
            meetings={this.state.meetings} 
            addMeeting={this.addMeeting}
            userID={this.state.userID}
          />
          <Attendees path="/attendees/:userID/:meetingID" 
            adminUser={this.state.userID}
          />
          <CheckIn path="/checkin/:userID/:meetingID" /> 
          {/* the ":" indicates a variable being passed to the url */}
          <Register path="/register" registerUser={this.registerUser}/>
        </Router>

        
      </div>      
    );
  }
}

export default App;