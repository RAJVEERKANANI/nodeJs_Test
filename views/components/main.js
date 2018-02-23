import React from 'react';
import FormField from './formField'
import {createPdf, uploadPdf} from "../service/service";
import { Button, Form } from 'semantic-ui-react'
import UploadMyFile from './uploadMyFile'


class Main extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            fields : ["address","first_name","last_name"],
            
            details : {
                "address":"acca",
                "first_name":"sas",
                "last_name":"tt"
            }
        }
    }

    handleInputChange(key,value){
        let detail = this.state.details
        detail[key]=value
        this.setState({details:detail})
    }

    render() {
        return (
            <div>
                <UploadMyFile uploadFile = {this.uploadFile.bind(this)}/>
                
                <Form>
                    {this.state.fields.map( title =>
                        <FormField title = {title}
                                   value = {this.state.details[title]}
                               handleInputChange = {this.handleInputChange.bind(this)}/>)}
                </Form>

                <Button onClick={() => this.submitData()}>Submit</Button>
            </div>
        );
    }

    submitData() {
        console.log('submit!!!')
        createPdf(this.state.details)
    }

    uploadFile(file,name){
        const data = new FormData();
        data.append('file', file);
        data.append('name', name);
        uploadPdf(data).then(
            resp => {
                console.log(resp)
                 var fields = []
                var details = []
                resp["data"].map(field => {
                    fields.push(field)
                    details.push[{field : ""}]
                })
                this.setState({
                    fields:fields,
                    details:details
                })
            }
        )
    }
    
}

export default Main

