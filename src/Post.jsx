import React from 'react'
import fetchJSONServer from "./utils.js"

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.renderPostedAt = this.renderPostedAt.bind(this);
  }

  renderPostedAt(postedAt) {
    return postedAt.replace("T", " at ")
  }

  async componentDidMount() {
    let userData = await fetchJSONServer("/users", [["id", this.props.post.userId]]).then((data) => {return data;});
    this.setState({ user: userData[0] });
  }

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