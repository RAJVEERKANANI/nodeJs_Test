import React, { Component } from 'react';
import axios from 'axios';

class UploadMyFile extends React.Component {
    
    render() {
        return(
        <div>
            <input type="file"
                   name="sampleFile"
                   onChange={() => this.props.uploadFile(event.target.files,"sampleFile")} />
        </div>
        )
    }
}
export default UploadMyFile;
