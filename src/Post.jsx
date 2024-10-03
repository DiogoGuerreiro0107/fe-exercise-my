import React from 'react'
import {fetchJSONServer, deletePost} from "./utils.js"
import PostModal from './PostModal.jsx'

/**
 * This class represents a React component that renders a Post.
 * Requires a Post object, as "post", and an user id, as "UserId".
 */
export default class Post extends React.Component {
  /**
   * Constructor for Post.
   *
   * @param {any} props The props for the Post. Must contain an Post object as "post" and an user id.
   */
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.renderPostedAt = this.renderPostedAt.bind(this);
  }

  /**
   * Method that gets a string representing a date and turns it into the desired format to render.
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
    const editTool = (
    <span className="icon">
      <i className="fa-regular fa-pen-to-square"></i>
    </span>);
    const postOptions = this.props.post.userId !== this.props.userId ? "" : 
      (<div>
        <PostModal post={this.props.post} linkClasses={""} linkText={editTool} userId={this.props.userId} />
        <a href="#" className="" onClick={() => deletePost(this.props.post.id)}>
          <span className="icon">
            <i className="fa-regular fa-trash-can"></i>
          </span> 
        </a>
      </div>);
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
            {postOptions}
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