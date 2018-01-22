import React, {Component} from 'react'

export default class UploadImage extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        let { property, onChange , srcData} = this.props;
        return (
            <div>
                <img src={srcData} alt=""/>
                <input 
                    type = 'file'
                    accept = 'image/*'
                    onChange={(e) => {
                        this.encodeImageFileAsURL(e.target.files[0], (base64Img) => {
                            onChange(base64Img, property);
                        });
                    }}
                />
            </div>
        );
    }
    encodeImageFileAsURL = (file, callback) => {
        if (!file) {
            return;
        }
        let reader = new FileReader();
        reader.onloadend = function(){
            callback(reader.result);
        }
        reader.readAsDataURL(file);
    }
}