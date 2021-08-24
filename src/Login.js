import React, { Component } from 'react';
import firebase from './Firebase';
import FormError from './FormError';
import { navigate } from '@reach/router';
// "Component" from React can be called like above in brackets and referenced alone 
// like below or it can be referenced below as "React.Component" without being imported above.
class Login extends Component {
    // We need to capture the state of each input section. A constructor is used for this
    constructor(props) { // Calling props here and in super allow for all props passed
        super(props);    // in this component to be available in entire app!
        this.state = {
            email: '',
            password: '', 
            errorMessage: null
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
        var registrationInfo = {
            email: this.state.email,
            password: this.state.password
        }
        e.preventDefault(); // prevent page reload

        firebase.auth().signInWithEmailAndPassword(
            registrationInfo.email,
            registrationInfo.password
        ).then(()=> {
            navigate('/meetings');
        })
        .catch(error => {
            if (error.message !== null) {
                this.setState({errorMessage: error.message});
            } else {
                this.setState({errorMessage: null});
            }
        })
    }

    render() {

        const {user} = this.props;
            
        return (
            <form className="mt-3" onSubmit={this.handleSubmit}>
                <div className="container">
                    <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h3 className="font-weight-light mb-3">Log in</h3>
                                <section className="form-group">
                                    { this.state.errorMessage !== null ? (
                                        <FormError theMessage={this.state.errorMessage} />
                                    ) : null}
                                    <label
                                        className="form-control-label sr-only"
                                        htmlFor="Email">
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
                                        onChange={ this.handleChange }
                                    />
                                </section>
                                <section className="form-group">
                                    <input
                                        required
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={ this.handleChange }
                                    />
                                </section>
                                <div className="form-group text-right mb-0">
                                    <button className="btn btn-primary" type="submit">
                                        Log in
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

export default Login;