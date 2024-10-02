import React from 'react'
import {fetchJSONServer} from "./utils.js"

/**
 * This class represents a React component that renders a Post.
 * Requires a Post object, as "post".
 */
export default class Post extends React.Component {
  /**
   * Constructor for Post.
   *
   * @param {any} props The props for the Post. Must contain a Post object as "post".
   */
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.renderPostedAt = this.renderPostedAt.bind(this);
  }

  /**
   * Method that gets a string representing a date and
   * turns it into the desired format to render.
   *
   * @param {string} postedAt Represents a date in the format "YYYY-MM-DDTHH:MM:SS".
   * @returns {string} The date in the desired format.
   */
  renderPostedAt(postedAt) {
    return postedAt.replace("T", " at ")
  }

  /**
   * React method that executes before rendering. It is used to get something that
   * may require asynchronous execution, like a fetch, that is being used in this
   * case to get the user data for this post.
  */
  async componentDidMount() {
    let userData = await fetchJSONServer("/users", [["id", this.props.post.userId]]).then((data) => {return data;});
    this.setState({ user: userData[0] });
  }

  /**
   * React method for the rendering of the component.
   *
   * @returns {ReactNode} The rendering of the component.
   */
  render() {
    const date = this.renderPostedAt(this.props.post.postedAt);
    return (
      <div className="card m-4">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img
                  src="/default_user.svg"
                  alt="Profile picture"
                />
              </figure>
            </div>
            <div className="media-content post-user"> 
              <p className="title is-4">{this.state.user.firstName} {this.state.user.lastName} </p>
              <time className="subtitle is-7" dateTime={this.props.post.postedAt}>{date}</time>
            </div>
          </div>
          <hr />
          <p className="title is-4">{this.props.post.title}</p>
          <div className="content">
            {this.props.post.text}
          </div>
        </div>
      </div>
    );
  }
}