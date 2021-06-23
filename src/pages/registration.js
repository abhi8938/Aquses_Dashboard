import React from 'react';
import { Row, Col } from 'reactstrap';
import '../App.css';
import { NavLink, Link } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm';
const title = {
    pageTitle: 'Aquses Dashboard',
  };
  const loading = {
    margin: '1em',
    fontSize:'24px',
    padding:15
  };
class Registration extends React.Component{
  state={
    error:false,
    orders: []
  }
  checkToken = () => {
    const token = localStorage.getItem('Token');

    if(token != null){
      this.setState({
        isLoading:false,
        error:false
      });
    }else{
      this.setState({
        isLoading:false,
        error:true
    });
  }  
  }

  async componentDidMount() {
    this.checkToken();  
    }
    render() {
      if(this.state.error){
        return(
          <div className='App'>
            <div style={loading}>
             <h4>Not Authorised. Please Login Again</h4>
            </div>
          </div>
        )
      }else{
        return (
            <div style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
             <div className='App' style={{ backgroundColor:'#F1F1F1', padding:20}}>
                <text style={{ margin:3,padding:3, fontWeight:'600', fontSize:24}}>{title.pageTitle}</text>
             </div>
             <Row style={{ flex:1, height:60, paddingLeft:50, alignItems:'center', justifyContent:'flex-start', backgroundColor:'#F1F1F1', marginTop:20}}>
             <NavLink to="/home" style={{ fontSize:20, marginRight:20}} activeClassName="Active">
                Home
               </NavLink>
             <NavLink to="/registration" style={{ fontSize:20, marginRight:20}} activeClassName="Active">
                Employee Registration
               </NavLink>
             <div style={{padding:10}}>
            <Link to="/" style={{ color:'#000', fontSize:20,marginRight:20}} onClick={() =>{
              localStorage.clear();
            }}>Log Out</Link>
            </div>
             </Row>
             <RegistrationForm /> 
             </div>
        )
               }
      }
}
export default Registration;
 