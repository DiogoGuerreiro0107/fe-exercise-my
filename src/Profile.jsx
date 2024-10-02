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
    user_posts.sort((a, b) => -a.postedAt.localeCompare(b.postedAt))
    this.setState({ posts: user_posts });
  }

  componentDidMount() {
    this.loadPosts();
  }

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