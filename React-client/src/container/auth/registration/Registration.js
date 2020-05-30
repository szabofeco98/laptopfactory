import React,{ Component } from "react";
import   '../login/Auth.css'
import {InputText} from 'primereact/inputtext';
import SimpleReactValidator from "simple-react-validator";
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import Error from '../../../components/Error/Messages'
import axios from "axios";
import { connect } from 'react-redux';
import * as action from "../../../store/actions/userlist";


class Registration extends Component {
    state =  {
        roles:[],
        employee:{
            role:null,
            username:null,
            identityNum:null,
            email:null,
            bornDate:null
        }

    };

    constructor() {
        super();
        this.validator = new SimpleReactValidator({
            messages:{
                email: "That is not a valid username "
            }
        });
    }

    componentDidMount(){
        axios.defaults.headers.common['authorization'] =  localStorage.getItem('token');
        axios.get("http://localhost:9090/roles").then(Response=>{
            let roles=[];
            Response.data.map(role => {
                roles.push({label:role.role,value:role,key:role.id});
            });
            this.setState({
                roles:roles
            });
        }).catch(e =>{
            console.log(e);
        });

        console.log(this.props.employee);
        if (this.props.employee != null) {
            this.setState({
                employee: this.props.employee
            })
        }


    }

    roleChangeHandler = (event)=> {
        const role = event.value;
        const employee = this.state.employee;
        employee.role=role;
        this.setState({
            employee:employee
        })
    };

    usernameChangeHandler = (event)=> {
        const username = event.target.value;
        const employee = this.state.employee;
        employee.username=username;
        this.setState({
            employee:employee
        })
    };

    emailChangeHandler = (event)=> {
        const email = event.target.value;
        const employee = this.state.employee;
        employee.email=email;
        this.setState({
            employee:employee
        })
    };

    identityChangeHandler = (event)=> {
        const identityNum = event.target.value;
        const employee = this.state.employee;
        employee.identityNum=identityNum;
        this.setState({
            employee:employee
        })
    };

    bornDateChangeHandler = (event)=> {
        const bornDate = event.target.value;
        const employee = this.state.employee;
        employee.bornDate=bornDate;
        this.setState({
            employee:employee
        });
    };

    passwordChangeHandler(event) {
        const password = event.target.value;
        const employee = this.state.employee;
        employee.password=password;
        this.setState({
            employee:employee
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        axios.defaults.headers.common['authorization'] =  localStorage.getItem('token');
        const url = "http://localhost:9090/signup";
        axios.post(url,this.state.employee).then(resp => {
            console.log(resp.data);
            this.props.getAllUser();
        }).catch(e =>{
            console.log(e);
        });
    };

    render(){


        return(
        <div className="registration">

                <hr/>
                <h2>User Modify</h2>
                
                <form onSubmit={e => this.onSubmit(e)}>
                       <div className="p-col-12 p-md-4 input">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"/>
                                </span>
                                <InputText 
                                className="text"
                                value={this.state.employee.username}
                                placeholder="Username"
                                onChange={e => this.usernameChangeHandler(e)} />
                            </div>
                        </div>
                    
                    
                       <div className="p-col-12 p-md-4 input">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-envelope"/>
                                </span>
                                <InputText
                                 className="text"
                                 placeholder="Email"
                                 value={this.state.employee.email}
                                 onChange={e => this.emailChangeHandler(e)} />
                            </div>
                       </div>
                      
                        <div className="p-col-12 p-md-4 input">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-id-card"/>
                                </span>
                                <InputText 
                                className="text" 
                                placeholder="Identity"
                                value={this.state.employee.identityNum}
                                onChange={e => this.identityChangeHandler(e)}/>
                            </div>
                        </div>
                    <div className="p-col-12 p-md-4 input">
                        <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-lock"/>
                                </span>
                            <InputText
                                className="text"
                                placeholder="password"
                                type="password"
                              //  value={this.state.employee.password}
                                onChange={e => this.passwordChangeHandler(e)}/>
                        </div>
                    </div>
            
                    <div className="p-col-12 p-md-4 input">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i class="pi pi-calendar"></i>
                            </span>
                             <Calendar
                             value={new Date(this.state.employee.bornDate)}
                             onChange={(e) => this.bornDateChangeHandler(e)}
                             monthNavigator={true}
                             yearNavigator={true}
                             className="calendar"
                             yearRange="1920:2020"/>
                        </div>
                    </div>


                    <Dropdown placeholder="Position" 
                    options={this.state.roles}
                    editable={true}
                    onChange={(e) => this.roleChangeHandler(e)}
                    value={this.state.employee.role}/>
                    <br/>
                    <Button label="Save" />
                </form>
        </div>
        )
    }


}

const mapStateToProps = state => {
    return {
        loading: state.userList.loading,
        userList : state.userList.userList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUser: () => dispatch( action.getAllUser() ),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Registration)
