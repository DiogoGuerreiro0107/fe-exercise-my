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
      <div className="card">
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
            <div className="media-content">
              <p className="title is-4">{this.state.user.firstName} {this.state.user.lastName}</p>
            </div>
          </div>

          <div className="content">
            {this.props.post.text}
            <br />
            <time dateTime={this.props.post.postedAt}>{date}</time>
          </div>
        </div>
      </div>
    );
  }
}