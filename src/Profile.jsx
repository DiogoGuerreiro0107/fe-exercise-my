import React from 'react'
import fetchJSONServer from "./utils.js"
import Post from './Post.jsx'

/**
 * This class represents a React component that renders the profile page.
 * Requires an User object, as "user".
 */
export default class Profile extends React.Component {
  /**
   * Constructor for Profile.
   *
   * @param {any} props The props for the Profile. Must contain an User object as "user".
   */
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
    this.loadPosts = this.loadPosts.bind(this);
  }

  /**
   * Method that loads the user posts from the data base.
  */
  async loadPosts() {
    const user_posts = await fetchJSONServer("/posts", [["userId", this.props.user.id]])
    user_posts.sort((a, b) => -a.postedAt.localeCompare(b.postedAt))
    this.setState({ posts: user_posts });
  }
  
  /**
   * React method that executes before rendering. It is used to get something that
   * may require asynchronous execution, like a fetch, that is being used in this
   * case to get the user posts.
  */
  componentDidMount() {
    this.loadPosts();
  }

  /**
   * React method for the rendering of the component.
   *
   * @returns {ReactNode} The rendering of the component.
  */
  render() {
    return (
      <div className="columns">
        <div className="column is-3">
          <div className="profile-me">
            <figure className="image is-128x128">
              <img className="is-rounded" src="/default_user.svg" />
            </figure>
            <span className="title is-4">{this.props.user.firstName} {this.props.user.lastName}</span>
          </div>
        </div>
        <div className="column m-4">
          <h1 className="title is-2 is-underlined">My Posts</h1>
          <div>
            {this.state.posts.map((p) => <div key={p.postId}> <Post post = {p} /> </div>)}
          </div>
        </div>
      </div>
    );
  }
}