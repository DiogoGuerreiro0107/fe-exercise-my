import React from 'react'
import fetchJSONServer from "./utils.js"

class LoginForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        password: ""
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

    async testLogin(email, password) {
      const user = await fetchJSONServer("/users", [["email", email], ["password", password]]);
      console.log("user: ", user)
      if (user.length == 0)
        return false;
      return user[0];
    }

    async handleSubmit(e) { 
        e.preventDefault();
        const user = await this.testLogin(this.state.email, this.state.password)
        console.log(user)
        if (user) {
          this.props.logIn(user);
          console.log("trueeeeeeee");
        }
        else
          console.log("falseeeeeeee");
    } 
  
    render() {
      return (
        <div className="container">
            <h1>Login</h1>
            <form className="box login-form" onSubmit={this.handleSubmit}>
              <div className="control has-icons-left">
                <input className="input" type="email" placeholder="Email"  name="email" value={this.state.email} onChange={this.handleInputChange} />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
              <div className="control has-icons-left">
                <input className="input" type="password" placeholder="Password"  name="password" value={this.state.password} onChange={this.handleInputChange} />
                <span className="icon is-small is-left">
                  <i className="fa-solid fa-key"></i>
                </span>
              </div>
              <div className="field is-grouped is-grouped-right">
                <button className="button is-primary is-rounded" type="submit">Login</button>
              </div>
            </form>
            
        </div>
      );
    }
  }

  
export default LoginForm