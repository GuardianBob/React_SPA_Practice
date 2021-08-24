import React, { Component } from 'react';
import firebase from './Firebase';
import { navigate } from '@reach/router';
// "Component" from React can be called like above in brackets and referenced alone 
// like below or it can be referenced below as "React.Component" without being imported above.
class CheckIn extends Component {
    // We need to capture the state of each input section. A constructor is used for this
    constructor(props) { // Calling props here and in super allow for all props passed
        super(props);    // in this component to be available in entire app!
        this.state = {
            displayName: '',
            email: ''
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
        e.preventDefault(); // prevent page reload

        const ref = firebase.database().ref(`meetings/${this.props.userID}/${this.props.meetingID}/attendees`);
        ref.push({
            attendeeName: this.state.displayName,
            attendeeEmail: this.state.email,
            star: false
        });
        navigate(`/attendees/${this.props.userID}/${this.props.meetingID}`);
    }

    render() {
        return (
            <form className="mt-3" onSubmit={this.handleSubmit}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="card bg-light">
                                <div className="card-body">
                                    <h3 className="font-weight-light mb-3">Check in</h3>
                                    <section className="form-group my-2">
                                        <label
                                            className="form-control-label sr-only"
                                            htmlFor="displayName"
                                        >
                                            Name
                                        </label>
                                        <input
                                            required
                                            className="form-control"
                                            type="text"
                                            id="displayName"
                                            name="displayName"
                                            placeholder="Name"
                                            value={this.state.displayName}
                                            onChange={this.handleChange}
                                        />
                                    </section>
                                    <section className="form-group my-2">
                                        <label
                                            className="form-control-label sr-only"
                                            htmlFor="Email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            required
                                            className="form-control"
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                        />
                                    </section>
                                    <div className="form-group text-right mb-0">
                                        <button className="btn btn-primary" type="submit">
                                            Check in
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default CheckIn;