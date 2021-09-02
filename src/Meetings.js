import React, { Component } from 'react';
import MeetingsList from './MeetingsList';
import {FaPlus} from 'react-icons/fa';

// Component from React can be called like above in brackets and referenced alone 
// like below or it can be referenced below as "React.Component" without being imported above.
class Meetings extends Component {
    constructor(props) { // Calling props here and in super allow for all props passed
        super(props);    // in this component to be available in entire app!
        this.state = {
            meetingName: ''
        }

        // "this" from this.state won't carry over from the constructor to handleChange 
        // so React handles this with:
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this allows handeChange to refer to the this from the constructor
    }    

    // This is used to handle any changes made to the form
    handleChange(e) {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        this.setState({[itemName]: itemValue });

    }

    handleSubmit(e) {        
        e.preventDefault();
        this.props.addMeeting(this.state.meetingName);
        this.setState({meetingName: ''});
    }


    render() {

        const {user} = this.props;
            
        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center">
                        <h1 className="font-weight-light">Add a Meeting</h1>
                        <div className="card bg-light">
                            <div className="card-body text-center">
                                <form
                                    className="formgroup" onSubmit={this.handleSubmit}>
                                    <div className="input-group input-group-lg">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="meetingName"
                                        placeholder="Meeting name"
                                        aria-describedby="buttonAdd"
                                        value={this.state.meetingName}
                                        onChange={this.handleChange}
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-sm btn-outline-info"
                                        id="buttonAdd"
                                        >
                                        <FaPlus />
                                    </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center px-1">
                        <div className="card border-top-0 rounded-0">
                        {/* first part (before "&&" checks to see if meetings exist */}
                            {this.props.meetings && this.props.meetings.length ? (
                                <div className="card-body py-2">
                                    <h4 className="card-title font-weight-light m-0">
                                        Your Meetings
                                    </h4>
                                </div> 
                            ) : null } {/* Make sure to include ": null" if there is no second part!! */}
                            
                            {this.props.meetings && (
                                <div className="list-group list-group-flush">
                                    <MeetingsList userID={this.props.userID} meetings={this.props.meetings} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Meetings;