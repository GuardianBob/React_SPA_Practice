import React, { Component } from 'react';
import firebase from './Firebase';
import {GoTrashcan, GoListUnordered} from 'react-icons/go';
import {FaLink} from 'react-icons/fa';
import { navigate } from '@reach/router';

// Component from React can be called like above in brackets and referenced alone 
// like below or it can be referenced below as "React.Component" without being imported above.
class MeeteingsList extends Component {
    constructor(props){
        super(props);
        this.deleteMeeting = this.deleteMeeting.bind(this);
    }

    deleteMeeting = (e, whichMeeting) => {
        e.preventDefault(); // prevent page reload
        const ref = firebase.database().ref(`meetings/${this.props.userID}/${whichMeeting}`);
        ref.remove();
    }

    render() {
        const { meetings } = this.props;
        const myMeetings = meetings.map(item => {
            return(
            <div className="list-group-item d-flex" key={item.meetingID}> {/* React requires keys when iterating through a list */}
                <section className="btn-group align-self-center me-3" role="group" aria-label="Meeting Options">
                    <button className="btn btn-sm btn-outline-secondary" 
                        title="Delete Meeting"
                        onClick={e => this.deleteMeeting(e, item.meetingID)}
                        >
                        <GoTrashcan />
                    </button>
                    <button className="btn btn-sm btn-outline-secondary" 
                        title="Check In"
                        onClick={() => navigate(`/checkin/${this.props.userID}/${item.meetingID}`)}
                        >
                        <FaLink />
                    </button>
                    <button className="btn btn-sm btn-outline-secondary" 
                        title="Attendees List"
                        onClick={() => navigate(`/attendees/${this.props.userID}/${item.meetingID}`)}
                        >
                        <GoListUnordered />
                    </button>
                </section>
                <section className="pl-3 text-left align-self-center">
                    {item.meetingName}
                </section>
            </div>
            )
        })
            
        return (
            <div>{myMeetings}</div>
        );
    }
}

export default MeeteingsList;