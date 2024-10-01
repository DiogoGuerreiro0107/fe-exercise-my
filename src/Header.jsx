import React from 'react'

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">
              Profile
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-danger" onClick={this.props.logOut}>
                  <strong>Logout</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}