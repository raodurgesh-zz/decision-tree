import React, { Component } from 'react';
import './interaction.css';


export default class Interaction extends Component {


  constructor(props) {
    super(props);
    this.state = { title: '' }
    if(props.type ==='ddl'){
      this.state = { title: props.options[0].title }
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if(this.inputBox){
      this.inputBox.focus();
    }
  }


  render() {

    let el;



    const createNode = () => {
      this.props.setTitle(this.state.title);
    }

    const updateValue = (e) => {
      this.setState({ title: e.target.value });
    }

    const updateDdlValue = (e) =>{
      this.setState({ title: e.target.value});
    }

    const onKeyPress = (e) => {
      if (e.key === 'Enter') {
        createNode();
      }
    }



    const removeNode = () => {
      this.props.removeNode();
    }

    const removeButton = this.props.showRemoveButton && <a className="remove-button" onClick={removeNode} ></a>


    const inputBox = (
      <div className="input-box">
        <input placeholder="Type interaction name"  ref={comp => (this.inputBox = comp)}  autoFocus="true" value={this.state.title} onKeyPress={onKeyPress} onChange={updateValue} className="" />
      </div>
    )

    const createDropDown = (options) => {
      return (
        <div className="select-style">
          <select onChange={updateDdlValue}>
            {options.map(opt => <option key = {opt.id} value={opt.id}> {opt.title}</option>)}
          </select>
        </div>
      )
    }


    switch (this.props.type) {
      case 'input':
        el = inputBox;
        break;
      case 'ddl':
        el = createDropDown(this.props.options);
        break;
      default:
        break;

    }





    return (
      <div className="interaction-wrapper">
        <div className="description">Interaction name</div>
        <div className="button pull-right"> {removeButton} <a className="add-button" onClick={createNode} ></a></div>
        {el}
      </div>
    );
  }
}