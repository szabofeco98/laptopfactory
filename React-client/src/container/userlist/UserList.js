import React,{ Component, Fragment } from "react";
import { connect } from 'react-redux';
import * as action from '../../store/actions/userlist';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column'
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog'
import {InputText} from 'primereact/inputtext'
import Registration from "../auth/registration/Registration";
import axios from "axios";

class UserList extends Component{

    state={
        loading:false,
        userList:[],
        selectedUser:{},
        showDialog:false,
        roles:[],
        employee:{
            role:null,
            username:null,
            identityNum:null,
            email:null,
            bornDate:null
        }
    };

    constructor(){
        super();

    }

    componentDidMount(){
        this.props.getAllUser();
        console.log("mount" + this.props.userList);
        axios.defaults.headers.common['authorization'] =  localStorage.getItem('token');
        axios.get("http://localhost:9090/roles").then(Response=>{
            let roles=[];
            Response.data.map(role => {
                roles.push({label:role.role,value:role,key:role.id});
            })
            this.setState({
                roles:roles
            });
        }).catch(e =>{
            console.log(e);
        });
    }

    componentDidUpdate(){
        if(this.state.userList!=this.props.userList){
            this.setState({
                userList:this.props.userList
            })
        }
    }

    selectUser = (rowData) =>{
        this.setState({
            selectUser:Object.assign({}, rowData),
            showDialog:true
        });
    };

    registration=()=>{
        this.setState({
            showDialog:true,
            selectUser:{
                role:null,
                username:null,
                identityNum:null,
                email:null,
                bornDate:null}
        });
        this.props.getAllUser();
    };

    disableUser=(rowdata)=>{
        axios.defaults.headers.common['authorization'] =  localStorage.getItem('token');
        const url = "http://localhost:9090/signup";
        const deletedEmp={
            ...rowdata,
            isActiveWorker: false
        };

        axios.post(url,deletedEmp).then(resp => {
            console.log(resp.data);
            this.props.getAllUser();
        }).catch(e =>{
            console.log(e);
        });
    };

    actionTemplate(rowData, column) {
        return <div>
            <Button type="button" icon="pi pi-trash" className="p-button-danger" style={{marginRight:"20px"}} onClick={()=>this.disableUser(rowData)}/>
            <Button  icon="pi pi-pencil" className="p-button-warning" onClick={()=>this.selectUser(rowData)}/>
        </div>;
    }

    render() {
        console.log(this.state.userList);
        let cols = [
            {field: 'identityNum',header: 'identityNum'},
            {field: 'username', header: 'username'},
            {field: 'email' , header: 'email'},
            {field: 'role.role',header:"Role"},

        ];



        let dynamicColumns = cols.map((col,i) => {
            return <Column sortable filter key={col.field} field={col.field} header={col.header} body={col.body} style={col.style} />;
        });

        console.log(this.state.selectedUser);

        let footer = <div className="p-clearfix" style={{width:'100%'}}>
            <Button style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={this.registration}/>
        </div>;

        return (
            <Fragment>
                <DataTable footer={footer} paginator={true} rows={10} value={this.props.userList}
                           rowsPerPageOptions={[5,10,20,50]}>
                      {dynamicColumns}
                      <Column  body={(e)=>this.actionTemplate(e)} style={{textAlign:'center', width: '8em'}} />
                 </DataTable>
                 <Dialog visible={this.state.showDialog}  style={{width:"50%"}}
                 header="User Detials" modal={true} onHide={() => this.setState({showDialog: false})} >
                        <Registration
                            employee={this.state.selectUser}/>
                    </Dialog>
            </Fragment>
        );
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


export default connect(mapStateToProps,mapDispatchToProps)(UserList);
