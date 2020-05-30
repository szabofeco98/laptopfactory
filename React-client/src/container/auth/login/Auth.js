import React,{ Component } from "react";
import {InputText} from 'primereact/inputtext';
import SimpleReactValidator from "simple-react-validator";
import {Button} from 'primereact/button';
import './Auth.css';
import Error from '../../../components/Error/Messages'
import { connect } from 'react-redux';
import * as action from '../../../store/actions/auth'
import axios from 'axios';



class Auth extends Component{
    state = {
        username : "",
        password: "",
        filled:false,
        touched:false
    }
    
    componentDidUpdate(){
        console.log(this.props.login);
  
        if(this.props.login  && this.props.login != 'Invalid username and password pair'){
            this.props.history.push("/home");
        }
    }

    submitForm = (event) =>{
        event.preventDefault();
        this.setState({
            touched:true
        });
       
       if(this.state.username!=='' && this.state.password !=='' ){
            this.props.onAuth(this.state.username,this.state.password);
            
            this.setState({
                filled:true
            });
        }else{
            this.setState({
                filled:false
            });
        }
   
    }

    render(){
    
       let error = null;
       if(this.state.touched){
            if(!this.state.filled)
           error = <Error  msg="A mezők kitöltése kötelező" header="Hiba: " style="error"/>
       }
    
        if(this.props.login === 'Invalid username and password pair'){
            error=<Error  msg="Nem megfelelő felhasználónév és jelszó páros"
             header="Hiba: " style="error"/>;
        }
       
     
        return(
        
        <div className="login"> 

          {error}
           <hr/>
           <h2>Login</h2>
        <form onSubmit={event => this.submitForm(event)} >
        
              <div className="p-col-12 p-md-4 input">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>                                 
                                <InputText value={this.state.username}
                                placeholder="Username"  
                                className="text"
                                onChange={(e) => this.setState({ username: e.target.value})}
                                type="text"
                                />
                            </div>
              </div>
             <div className="p-col-12 p-md-4 input">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-lock"/>
                                </span>
                                <InputText value={this.state.password}
                                placeholder="Password" 
                                className="text" 
                                onChange={(e) => this.setState({ password: e.target.value})}
                                type="password"
                                />
                            </div>
              </div>
              
              <Button label="Login"/>
        </form>
        </div>
       
        );
    }
    
}



const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        login : state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( username, password ) => dispatch( action.login( username, password ) ),
    };
}; 


export default connect(mapStateToProps,mapDispatchToProps)(Auth);

