import React from 'react';
import TextField from '@material-ui/core/TextField';
import '../App.css';
import { Row, Col } from 'reactstrap';
import { updateEmployee, orderBilled } from './../requests/uploadData';

class Order extends React.Component {
    state = {
        Pname: '',
        Dname: '',
        Amount: '',
        Weight: ''
    }
    renderClothesList(data) {
        return (
            data.clothesItem.map((element, index) => {
                return (<Row style={{ paddingLeft: 20, paddingTop: 10 }}>
                       <text style={{marginRight:15}}>{index + 1}.</text>
                    <Row style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <text style={{ fontSize: 18, fontWeight: '500', color: '#000', marginLeft: 5, marginRight: 5 }}>Item :-</text>
                        <text style={{ fontSize: 16, fontWeight: 'bold', color: '#000', marginLeft: 5, marginRight: 5, width:150 }}>{element.Item}</text>
                    </Row>
                    <Row style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <text style={{ fontSize: 18, fontWeight: '500', color: '#000', marginLeft: 5, marginRight: 5 }}>Qunatity :-</text>
                        <text style={{ fontSize: 16, fontWeight: 'bold', color: '#000', marginLeft: 5, marginRight: 5 }}>{element.Quantity}</text>
                    </Row>
                    <Row style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <text style={{ fontSize: 18, fontWeight: '500', color: '#000', marginLeft: 5, marginRight: 5 }}>Category :-</text>
                        <text style={{ fontSize: 16, fontWeight: 'bold', color: '#000', marginLeft: 5, marginRight: 5 }}>{element.Category}</text>
                    </Row>
                </Row>);
            })

        )
    }
    addEmployee = (job) => {
        let name = '';
        if(job === 'PICKUP'){
           name = this.state.Pname; 
        }else{
            name = this.state.Dname
        }
        updateEmployee(name, job, this.props.data.orderId)
            .then(resp => {
                if(resp.status === 200){
                    alert('Employee added');
                }else{
                    alert(resp.data);
                }
            })
            .catch(err => {
                alert(err);
            })
    }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    renderPickup() {
        if ( this.props.data.Employee === undefined || this.props.data.Employee.PickUp === undefined) {
            return (
                <div style={{ margin: 3, fontWeight: 'bold', fontSize: 16 }}><text>Enter Employee Name to Assign For Pickup</text>
                    <form className="Message-form" onSubmit={(e) => {
                        e.preventDefault()
                        return this.addEmployee('PICKUP')
                    }
                    }>
                        <TextField
                            style={{ margin: 1, padding: 0 }}
                            label='Pickup Employee'
                            id="outlined-adornment-weight"
                            variant="outlined"
                            value={this.state.Pname}
                            onChange={this.handleChange('Pname')}
                        />
                        <button
                            style={{ margin: 4, borderWidth: 1, borderColor: '#000', borderRadius: 5 }}
                        >Assign</button>
                    </form>
                </div>
            )
        }
        return (
            <div style={{ margin: 3, fontWeight: 'bold', fontSize: 16 }}><text>PickUp Duty: {this.props.data.Employee.PickUp.EmployeeName}</text></div>
        )
    }

    renderDeliver() {
        if (this.props.data.Employee === undefined || this.props.data.Employee.Delivery === undefined) {
            return (
                <div style={{ margin: 3, fontWeight: 'bold', fontSize: 16 }}><text>Enter Employee Name to Assign For Delivery</text>
                    <form className="Message-form" onSubmit={(e) => {
                        e.preventDefault()
                        return this.addEmployee('DELIVER')
                    }
                    }>
                        <TextField
                            style={{ margin: 1, padding: 0 }}
                            label='Delivery Employee'
                            id="outlined-adornment-weight"
                            variant="outlined"
                            value={this.state.Dname}
                            onChange={this.handleChange('Dname')}
                        ></TextField>
                        <button
                            style={{ margin: 4, borderWidth: 1, borderColor: '#000', borderRadius: 5 }}
                        >Assign</button>
                    </form>
                </div>
            )
        }
        return(
            <div style={{ margin: 3, fontWeight: 'bold', fontSize: 16 }}><text>Delivery Duty: {this.props.data.Employee.Delivery.EmployeeName}</text></div>
        )
    }
    render() {
        const { data } = this.props;
        const fullName = data.customer? data.customer.fullName:'Test';
        const mobileNumber = data.customer? data.customer.mobileNumber: 'Test'; 
        return (
            <Row style={{ width: '90%', marginRight: 20, backgroundColor: '#F1F1F1', marginTop: 15 }}>
                <Col style={{ margin: 20 }}>
                    <Row style={{ paddingTop: 1, justifyContent: 'start' }}>
                        <div style={{ paddingLeft: 13 }}>
                            <text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>OrderID: </text>
                            <text style={{ fontSize: 18, color: '#000' }}>{data.orderId}</text>
                        </div>
                        <div style={{ paddingLeft: 30 }}>
                            <text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>Order Status: </text>
                            <text style={{ fontSize: 18, color: '#000' }}>{data.orderStatus}</text>
                        </div>
                    </Row>
                    <div style={{ paddingTop: 1 }}>
                        <text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>Service Type: </text>
                        <text style={{ fontSize: 18, color: '#000' }}>{data.serviceType}</text>
                    </div>
                    <div>
                        <div style={{ paddingTop: 1 }}>
                            <text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>PickUp: </text>
                        </div>
                        <div style={{ paddingTop: 1, paddingLeft: 30 }}>
                            <text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>Time: <text style={{ fontWeight: 'normal' }}>{data.pickUp.pickupTime}</text> </text>
                        </div>
                        <div style={{ paddingTop: 1, paddingLeft: 30 }}>
                            <text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>Date: <text style={{ fontWeight: 'normal' }}>{data.pickUp.pickupDate}</text> </text>
                        </div>
                    </div>
                    <div style={{ paddingTop: 1 }}>
                        <text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>Address: </text>
                        <text style={{ fontSize: 18, color: '#000' }}>{data.orderAddress.formatedAddress}</text>
                    </div>
                    <div>
                        <div style={{ paddingTop: 1 }}>
                            <text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>Customer Details: </text>
                        </div>
                        <div style={{ paddingTop: 1, paddingLeft: 30 }}>
                            <text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>Name: </text>
                            <text style={{ fontSize: 18, color: '#000' }}>{fullName}</text>
                        </div>
                        <div style={{ paddingTop: 1, paddingLeft: 30 }}>
                            <text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>Contact: </text>
                            <text style={{ fontSize: 18, color: '#000' }}>+91-{mobileNumber}</text>
                        </div>
                    </div>
                    <div>
                        <div style={{ paddingTop: 1 }}>
                            <text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>Clothes List: </text>
                            {this.renderClothesList(data)}
                        </div>
                    </div>
                </Col>
                <Col style={{ margin: 20 }}>
                    {this.renderPickup()}
                    {this.renderDeliver()}
                    <form style={{ paddingTop: 10, justifyContent: 'start' }}>
                        <div style={{ alignItems: "start", padding: 5, justifyContent: "start" }}>
                            <text style={{ fontSize: 16, paddingRight: 20, fontWeight: 'bold' }}>Final Amount :</text>
                            <div>
                                <text style={{ fontSize: 16, paddingRight: 20 }}>{data.finalAmount}</text>
                            </div>
                        </div>
                        <div style={{ alignItems: "start", padding: 5, justifyContent: "start" }}>
                            <text style={{ fontSize: 16, paddingRight: 20, fontWeight: 'bold' }}>Paid Via:</text>
                            <div>
                                <text style={{ fontSize: 16, paddingRight: 20 }}>{data.payment.paymentMode}</text>
                            </div>
                        </div>
                    </form>
                </Col>
            </Row>
        )
    }

}

export default Order;