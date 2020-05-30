import React,{ Component } from "react";
import Menu from "../../components/Navigation/UpMenu";


class Layout extends Component{
  
    render(){
    
        return(
            <div>
                <Menu/>
                {this.props.children}
            </div>
         );
    }
    
}

export default Layout;