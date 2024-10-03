import React from 'react'
import {fetchJSONServer} from "./utils.js"
import PostForm from './PostForm.jsx'

/**
 * This class represents a React component that renders a modal component for a post creation or editing.
 * Requires an user id, as "UserId", the classes for the link that opens the modal, as "linkClasses", 
 * and the text or html to be presented inside said link, as "linkText". It may receive a post, as "post",
 * in which case means that the modal will be used to edit an already existing post.
 */
export default class PostModal extends React.Component {
  /**
   * Constructor for PostModal.
   *
   * @param {any} props The props for the Post. Must contain an user id, as "UserId", the classes
   * for the link that opens the modal, as "linkClasses", and the text or html to be presented~
   * inside said link, as "linkText". It may also receive a post, as "post".
   */
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  /**
   * Method to open the modal.
  */
  openModal() {
    this.setState({ open: true });
  }

  /**
   * Method to close the modal.
  */
  closeModal() {
    this.setState({ open: false });
  }

  /**
   * React method for the rendering of the component.
   *
   * @returns {ReactNode} The rendering of the component.
   */
  render() {
    const modalTitle = typeof this.props.post !== "undefined" ? "Editing post" : "Creating new post";
    const userId = this.props.userId;
    
    let modalClasses = "modal";
    let form = "";
    if (this.state.open) {
      modalClasses += " is-active";
      form = (<PostForm post={this.props.post} userId={this.props.userId} closeModal={this.closeModal} />);
    }
    return (
    <>
      <a href="#" className={this.props.linkClasses} onClick={this.openModal}>{this.props.linkText}</a>
      <div className={modalClasses}>
        <div className="modal-background" onClick={this.closeModal}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{modalTitle}</p>
            <button className="delete" aria-label="close" onClick={this.closeModal}></button>
          </header>
          {form}
        </div>
      </div>
    </>);
  }
}