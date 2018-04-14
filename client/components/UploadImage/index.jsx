import React, {Component} from 'react'

export default class UploadImage extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        let { onChange, srcData, message, showMessage, button } = this.props;

        let xhtml = button ? <button onClick={() => document.getElementById('uploadImage').click()}>Upload Image</button> : '';
        return (
            <div>
                <img src={srcData} alt=""/><br></br>
                {xhtml}
                <input
                    id='uploadImage'
                    type = 'file'
                    accept = 'image/*'
                    onChange={(e) => {
                        this.encodeImageFileAsURL(e.target.files[0], (base64Img) => {
                            onChange(base64Img);
                        });
                    }}
                />
                { showMessage && message && <span> {message} </span> }
            </div>
        );
    }
    encodeImageFileAsURL = (file, callback) => {
        if (!file) {
            if (!this.props.required) {
                callback(null);
                return;
            }
            else {
                return;
            }
        }
        let reader = new FileReader();
        reader.onloadend = function(){
            callback(reader.result);
        }
        reader.readAsDataURL(file);
    }
}
