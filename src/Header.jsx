import React from 'react'

/**
 * This class represents a React component that renders the header for the app.
 * Requires a log out function, as "logOut".
 */
export default class Header extends React.Component {
  /**
   * Constructor for Header.
   *
   * @param {any} props The props for the Header. Must contain a log out function as "logOut".
   */
  constructor(props) {
    super(props);
  }

  /**
   * React method for the rendering of the component.
   *
   * @returns {ReactNode} The rendering of the component.
  */
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item is-active">
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