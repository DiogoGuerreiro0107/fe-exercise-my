import React from 'react'

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    console.log("props: ", props)
  }

  render() {
    return (
      <div>
        <div>
          {this.props.post.title} + {this.props.post.postedAt}
        </div>
        <div>
          {this.props.post.text}
        </div>
      </div>
    );
  }
}