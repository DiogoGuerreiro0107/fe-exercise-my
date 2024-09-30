import React from 'react'
import fetchJSONData from "./utils.js"

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
      const user = await fetchJSONData("/users", [["email", email], ["password", password]]);
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
        <>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
                <label>email</label>
                <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
                <label>password</label>
                <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                <button type="submit">Login</button>
            </form>
        </>
      );
    }
  }

  
export default LoginForm