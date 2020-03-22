import React,{ Component } from "react";
import   '../login/Auth.css'
import {InputText} from 'primereact/inputtext';
import SimpleReactValidator from "simple-react-validator";
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import Error from '../../../components/Error/Messages'


class Registration extends Component {
   
    render(){

        let errors=null;
        /*onSubmit={event => this.submitForm(event)} */ 
      
        return(
        <div className="login"> 
                {errors }
                <hr/>
                <h2>Regisztráció</h2>
                
                <form>
                       <div className="p-col-12 p-md-4 input">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <InputText className="text" placeholder="Username" />
                            </div>
                        </div>
                    
                    
                        <div className="p-col-12 p-md-4 input">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-envelope"></i>
                                </span>
                                <InputText className="text" placeholder="Email" />
                            </div>
                        </div>
                      
                        <div className="p-col-12 p-md-4 input">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-id-card"></i>
                                </span>
                                <InputText className="text" placeholder="Username" />
                            </div>
                        </div>
            
                    <Dropdown placeholder="Beosztás" editable={true}/>
                    <br/>
                    <Button label="Regisztráció" />
                </form>
        </div>
        )
    }
}

export default Registration