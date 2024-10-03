import React from 'react'
import {fetchJSONServer} from "./utils.js"

/**
 * This class represents a React component that renders the login page.
 * Requires a log in function, as "logIn".
 */
export default class LoginForm extends React.Component {
  /**
   * Constructor for LoginForm.
   *
   * @param {any} props The props for the LoginForm. Must contain a log in function as "logIn".
   */
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: false,
      passwordError: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Method that handles the changes on the inputs, from the event onChange, changing its corresponding value.
   *
   * @param {Event} event An onChange event from an input.
  */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  /**
   * Method used to test if the given email and password correspond to a valid user.
   *
   * @param {string} email The user's email.
   * @param {string} password The user's password.
   * @returns {Promise.<boolean | {id: string, email: string, password: string, firstName: string, lastName: string} User>} 
   * Returns false, if there is no user with the given email and password, or an object User, if it does exist on the
   * data base.
  */
  async testLogin(email, password) {
    const user = await fetchJSONServer("/users", [["email", email], ["password", password]]);
    if (user.length == 0)
      return false;
    return user[0];
  }

  /**
   * Method used to test if the given email exists in the data base.
   *
   * @param {string} email The user's email.
   * @returns {Promise.<boolean>} Returns false, if there is no user with the given email. Otherwise returns true.
  */
   async testEmail(email) {
    const user = await fetchJSONServer("/users", [["email", email]]);
    return user.length > 0;
  }

  /**
   * Method that handles the log in form submition.
   *
   * @param {Event} e The form submition event.
  */
  async handleSubmit(e) { 
    e.preventDefault();

    this.setState({
      ["emailError"]: false,
      ["passwordError"]: false
    });

    const user = await this.testLogin(this.state.email, this.state.password);
    if (user) {
      this.props.logIn(user);
      return;
    }

    const testEmail = await this.testEmail(this.state.email);
    if (!testEmail)
      this.setState({
        ["emailError"]: true
    });
    else
      this.setState({
        ["passwordError"]: true
    });
  }
  
  /**
   * React method for the rendering of the component.
   *
   * @returns {ReactNode} The rendering of the component.
  */
  render() {
    const emailInput = this.state.emailError ? 
      (<div className="field">
        <div className="control has-icons-left has-icons-right">
          <input className="input is-danger" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <p className="help is-danger">This email does not exist</p>
      </div>) :
      (<div className="control has-icons-left">
        <input className="input" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} />
        <span className="icon is-small is-left">
          <i className="fas fa-envelope"></i>
        </span>
      </div>);
      
    const passwordInput = this.state.passwordError ? 
    (<div className="field">
      <div className="control has-icons-left has-icons-right">
        <input className="input is-danger" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
        <span className="icon is-small is-left">
          <i className="fas fa-key"></i>
        </span>
        <span className="icon is-small is-right">
          <i className="fas fa-exclamation-triangle"></i>
        </span>
      </div>
      <p className="help is-danger">The password is incorrect</p>
    </div>) :
    (<div className="control has-icons-left">
      <input className="input" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
      <span className="icon is-small is-left">
        <i className="fa-solid fa-key"></i>
      </span>
    </div>);
    
    return (
      <div className="hero is-link is-fullheight">
        <div className="hero-body">
          <form className="box login-form forms" onSubmit={this.handleSubmit}>
            <h1 className="title">Log in please</h1>
            {emailInput}
            {passwordInput}
            <div className="field is-grouped is-grouped-right">
              <button className="button is-primary is-rounded" type="submit">Log in</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}