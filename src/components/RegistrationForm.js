import  React  from 'react';
import TextField from '@material-ui/core/TextField';
import '../App.css';
import { Row, Col } from 'reactstrap';
import ResponseModal from './ResponseModal';
import { createEmployee } from '../requests/uploadData';

class RegistrationForm extends React.Component {
   state={
    fullName:'',
    emailAddress:'',
    mobileNumber:'',
    password:'',
    confirmPassword:'',
    show:false,
    response:'',
    title:''
   }
  handleClose =() => {
    this.setState({ show: false });
  }

   handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  addEmployee = (e) => {
    e.preventDefault();
    const { fullName,
        mobileNumber,
        password,
        emailAddress,
        confirmPassword
   } = this.state;
if(password === confirmPassword){
    createEmployee(
        fullName,
        mobileNumber,
        password,
        emailAddress,
    ).then(response =>{
        console.log(response.data);
        if(response.status === 200){
        this.setState({
          show:true,
          response:'Registration Successful',
          title:'RESPONSE'
        })
      }else{
        this.setState({
          show:true,
          response:response.data,
          title:'Response'
        })
      }
    })
    .catch(error => {
      console.log(`error:${error}`);
      this.setState({
        show:true,
        response:error,
        title:'ERROR'
      })
    })
}else{
    this.setState({
        show:true,
        response: 'Password MisMatch',
        title:'ERROR'
      })
}
  }

    render(){
    return (
        <Col className='col-match'>
        <form className="Host-form" onSubmit={this.addEmployee}>
        <Row style={{ width:'50%', alignItems:'center', padding:15}} >
         <text style={{margin:3,padding:3, fontWeight:'bold', fontSize:26}}>Employee Registration Form</text>
         </Row>
        
        <Row style={{ alignItems:'center', flexDirection:'column',width:'50%'}}>
         <TextField
         style={{ marginTop:10, marginBottom:10, width:300}}
        id="outlined-adornment-weight"
        variant="outlined"
        label="Employee Name"
        value={this.state.fullName}
        onChange={this.handleChange('fullName')}
      />
 
    
       <TextField
      style={{ marginTop:10, marginBottom:10, width:300}}
        id="outlined-adornment-weight"
        variant="outlined"
        label="Employee Email"
        value={this.state.emailAddress}
        onChange={this.handleChange('emailAddress')}
      />
    
         <TextField
        style={{ marginTop:10, marginBottom:10, width:300}}
        id="outlined-adornment-weight"
        variant="outlined"
        label="Employee Mobile Number"
        value={this.state.mobileNumber}
        onChange={this.handleChange('mobileNumber')}
      />

       <TextField
      style={{ marginTop:10, marginBottom:10, width:300}}
        id="outlined-adornment-weight"
        variant="outlined"
        label="Password"
        value={this.state.password}
        onChange={this.handleChange('password')}
      />
     
     
         <TextField
        style={{ marginTop:10, marginBottom:10, width:300}}
        id="outlined-adornment-weight"
        variant="outlined"
        label="Confirm Password"
        value={this.state.confirmPassword}
        onChange={this.handleChange('confirmPassword')}
      />
      </Row>
      <Row style={{ width:'50%', alignItems:'center'}}>
      <button
          style={{ 
      width: 80,
      height: 36,
      marginTop:5,
      marginRight: 15,
      backgroundColor: 'transparent',
      borderColor: '#2d2727',
      borderWidth: 2,
      justifyContent: 'center',
      borderRadius: 3}}
            title='Register'
          >Register</button>
      </Row>
      </form>
      <ResponseModal show={this.state.show} title={this.state.title} error={this.state.response} onHide={this.handleClose} onClick={this.handleClose} />
        </Col>
    )
    }

}

export default RegistrationForm;