import React from 'react'
import fetchJSONServer from "./utils.js"
import Post from './Post.jsx'

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
    this.loadPosts = this.loadPosts.bind(this);
  }

  async loadPosts() {
    // const data = await fetchJSONServer("../db/data.json");
    // const posts = data.posts;
    // let user_posts = [];
    // for (let post of posts)
    //   if (post.userId == this.props.user.id)
    //     user_posts.push(post);
    const user_posts = await fetchJSONServer("/posts", [["userId", this.props.user.id]])
    this.setState({ posts: user_posts });
  }

  componentDidMount() {
    this.loadPosts();
  }

  render() {
    return (
      <div className="columns">
        <div className="column is-3 card">
          <div className="card-image">
            <figure className="image is-128x128">
              <img className="is-rounded" src="/default_user.svg" />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{this.props.user.firstName} {this.props.user.lastName}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="column m-4">
          <h1 className="title is-1 is-underlined">Posts</h1>
          <div>
            {this.state.posts.map((p) => <div key={p.postId}> <Post post = {p} /> </div>)}
          </div>
        </div>
      </div>
    );
  }
}