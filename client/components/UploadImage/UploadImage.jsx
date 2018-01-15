import React, { Component } from 'react';
import './UploadImage.scss'

export default class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: this.props.src,
      message: "",
      validate: false
    }
  }
  render() {
    const {src, label} = this.props;
    return (
      <div className='image'>
        <img src={this.state.src} alt={label} id = {this.props.id}/>
        { (!this.state.validate) && 
          <p>Please upload an image.</p>
        }
        <label>
          <input type='file' accept='image/*'
            onChange = {this._changeHandle.bind(this)}
          />
          {label}
        </label>
      </div>
    );
  }
  _changeHandle = (e) => {
    debugger
    let img = window.URL.createObjectURL(e.target.files[0]);
    this.setState({
      src: img,
      validate: true
    }, () => {
      // let src = this.getBase64Image();
      this.props.changeHandle(this.props.property, img, this.state.validate);
    })
  }
  getBase64Image = () => {
    var img = document.getElementById(this.props.id);
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    var dataURL = canvas.toDataURL("image/png");
    
    return dataURL;
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
}