import React from 'react'
import fetchJSONData from "./utils.js"
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
    // const data = await fetchJSONData("../db/data.json");
    // const posts = data.posts;
    // let user_posts = [];
    // for (let post of posts)
    //   if (post.userId == this.props.user.id)
    //     user_posts.push(post);
    const user_posts = await fetchJSONData("/posts", [["userId", this.props.user.id]])
    this.setState({ posts: user_posts });
  }

  componentDidMount() {
    this.loadPosts();
  }

  render() {
    return (
      <>
        <div>first name: {this.props.user.firstName} </div>
        <div>last name: {this.props.user.lastName} </div>
        <h1>Posts</h1>
        <div>
          {this.state.posts.map((p) => <li key={p.postId}> <Post post = {p} /> </li>)}
        </div>
      </>
    );
  }
}