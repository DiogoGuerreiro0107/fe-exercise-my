import React from 'react'
import {createPost, updatePost} from "./utils.js"

/**
 * This class represents a React component that renders a Post form for the creation of a new post 
 * or to edit an existing post.
 * Requires an user id, as "UserId", and a function to close the modal, as "closeModal".
 * It may receive a post, as "post", in which case means that the modal will be used to edit an already existing post.
 */
export default class PostForm extends React.Component {
  /**
   * Constructor for PostForm.
   *
   * @param {any} props The props for the Post. Must contain an user id, as "userId"
   * and a function to close the modal, as "closeModal". It may receive a post, as "post",
   * in which case means that the modal will be used to edit an already existing post.
   */
  constructor(props) {
    super(props);
    let title = "";
    let text = "";
    let mode = "create";
    if (typeof this.props.post !== "undefined") {
        title = this.props.post.title;
        text = this.props.post.text;
        mode = "edit";
    }

    this.state = {
      title: title,
      text: text,
      mode: mode,
      titleError: false,
      textError: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Method that handles the changes on the inputs, from the event onChange, changing its corresponding value.
   *
   * @param {Event} event An onChange event from an input.
  */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  /**
   * Method that handles the post creation or editing form submition.
   *
   * @param {Event} e The form submition event.
  */
  async handleSubmit(e) { 
    e.preventDefault();

    this.setState({
      ["titleError"]: false,
      ["textError"]: false
    });
    if (this.state.title.length < 3 || this.state.title.length > 50) {
      this.setState({
        ["titleError"]: true
      });
      return;
    } else if (this.state.text.length < 3 || this.state.text.length > 200) {
      this.setState({
        ["textError"]: true
      });
      return;
    }

    if(this.state.mode === "edit")
      await updatePost(this.props.post.id, {title: this.state.title, text: this.state.text, userId: this.props.userId});
    else
      await createPost({title: this.state.title, text: this.state.text, userId: this.props.userId});
  }

  /**
   * React method for the rendering of the component.
   *
   * @returns {ReactNode} The rendering of the component.
   */
  render() {
    const buttonSaveText = this.state.mode === "edit" ? "Save changes" : this.state.mode === "create" ? "Create post" : "";
    const titleInput = this.state.titleError ? (
      <>
        <div className="control has-icons-right">
          <label className="label">Post's title</label>
          <input className="input is-danger" type="text" name="title" placeholder="Title of the post" value={this.state.title} onChange={this.handleInputChange} />
          <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <p className="help is-danger">The title must have between 3 to 50 letters</p>
      </>) : (
      <div className="control">
        <label className="label">Post's title</label>
        <input className="input" type="text" name="title" placeholder="Title of the post" value={this.state.title} onChange={this.handleInputChange} />
      </div>);
      
    const textInput = this.state.textError ? (
      <>
        <div className="control has-icons-right">
          <label className="label">Post's text</label>
          <textarea className="textarea is-danger" name="text" placeholder="Tell us your thoughts..." value={this.state.text} onChange={this.handleInputChange} ></textarea>
          <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <p className="help is-danger">The text must have between 3 to 200 letters</p>
      </>) : (
      <div className="control">
        <label className="label">Post's text</label>
        <textarea className="textarea" name="text" placeholder="Tell us your thoughts..." value={this.state.text} onChange={this.handleInputChange} ></textarea>
      </div>);

    return (
      <form className="" onSubmit={this.handleSubmit}>
        <section className="modal-card-body forms">
          <div className="field">
            {titleInput}
          </div>
          <div className="field">
            {textInput}
          </div>
        </section>
        <footer className="modal-card-foot">
          <div className="buttons">
            <button className="button is-success">{buttonSaveText}</button>
            <button type="button" className="button" onClick={this.props.closeModal}>Cancel</button>
          </div>
        </footer>
      </form>
    );
  }
}