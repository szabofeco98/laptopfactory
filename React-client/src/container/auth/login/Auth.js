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
        email : "",
        password: "",
        touched:false,
        valid:false
    }

  
    constructor() {
        super();
        this.validator = new SimpleReactValidator({
            messages:{
                email: "That is not an valid email adress"
            }
        });
    }

   
    test = () =>{
        delete axios.defaults.headers.common['Authorization'];
        
        if(this.props.login)
         
        console.log(localStorage.getItem('token'));
        axios.defaults.headers.common['authorization'] =  localStorage.getItem('token');
        axios.get('http://localhost:9090/test').then(resp =>{
            console.log(resp.data)
        });
    }

    validationChecker = () => {
        this.validator.message('email', this.state.email, 'required' )
        this.validator.message('password', this.state.password, 'required' )
    }
  
    
    submitForm = (event) =>{
        event.preventDefault();

        this.setState({
            touched:true
        });
       
       if(this.validator.allValid()){
        this.props.onAuth(this.state.email,this.state.password);
       
       //    this.props.history.push("/home")
         this.setState({
             valid:true
         });
       };
    }
    
    render(){
       this.validationChecker();
       let errors = null;
       const errorMap=this.validator.getErrorMessages();
      
        errors = !this.state.touched ? null :
        Object.keys(errorMap).map( error =>{
            if(errorMap[error]!==null)
            return <Error key={error} msg={errorMap[error]} style="error" header="Invalid"/> 
        })
        console.log(this.props.login);
        if(this.props.login === 'username' ||this.props.login === 'password'){
            errors.push(<Error key={this.props.login} msg={this.props.login} header="Invalid" style="error"/>)
        }
       
     
        return(
        <div className="login"> 
          {errors }
           <hr/>
           <h2>Bejelentkezes</h2>
        <form onSubmit={event => this.submitForm(event)} >
        
              <div className="p-col-12 p-md-4 input">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>                                 
                                <InputText value={this.state.email}
                                placeholder="Felhasználónév"  
                                className="text"
                                onChange={(e) => this.setState({ email: e.target.value})}
                                type="text"
                                />
                            </div>
              </div>
             <div className="p-col-12 p-md-4 input">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-lock"></i>
                                </span>
                                <InputText value={this.state.password}
                                placeholder="Jelszó" 
                                className="text" 
                                onChange={(e) => this.setState({ password: e.target.value})}
                                type="password"
                                />
                            </div>
              </div>
              
              <Button label="Submit"/>
        </form>
        <Button onClick = {this.test}/>
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