import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './nav';
import * as API from '../api/API';

class HotelBooking extends Component {

    constructor(props){
        super(props);
        this.state = {
           hotelname: "",
           address:"",
           roomtype:"",
           noofrooms:"",
           total:"",
           stay:""
        }
     }
    componentWillMount(){

      const payload = JSON.parse(localStorage.getItem("hotelbooking"));
      console.log("payload=>"+payload)
      var address = payload.booking.address.street+", "+
      payload.booking.address.city+", "+
      payload.booking.address.state+" - "+
      payload.booking.address.zip
    
      this.setState({

            hotelname: payload.booking.name,
            address:address,
            roomtype:payload.booking.roomtype,
            noofrooms:payload.booking.roomcount,
            total:payload.booking.price,
            stay:payload.booking.days+" days ("+payload.booking.bookingstartdate.substring(0, 10)+" - "+payload.booking.bookingenddate.substring(0, 10)+")"

      })

    

    }

    handlePay(){
      const payload = JSON.parse(localStorage.getItem("hotelbooking"));
     
      var travellerinfo = {
          "firstname":this.refs.firstname.value,
          "lastname":this.refs.lastname.value,
          "email":this.refs.email.value,
          "phoneno":this.refs.phoneno.value,
          "address":this.refs.address.value,
          "zipcode":this.refs.zipcode.value
      }
      var credit_card = {
            "card_number": this.refs.creditcardno.value,
            "valid_till":this.refs.expirydate.value,
            "cvv":this.refs.cvv.value
      }
      API.bookHotel(payload)
          .then((res) => {
              console.log(res);
              if (res.status == 200) {
                  console.log("Success booking the Hotel!");
                  console.log("Response is " + res);
              }else if (res.status == 402) {
                  console.log("Error booking the Hotel!");
                  console.log("Error is " + res);
              }else {
                  console.log("Error booking the Hotel!");
                  console.log("Error is " + res);
              }
          });
    }

    render(){
        return(
            <div>
                <div style={{backgroundColor:'black'}}>
                <Nav/>
                </div>

                    <div style={{padding:'2%',paddingLeft:'10%',paddingRight:'10%'}}>
                        <div className="card">

                        <div className="card-header deep-orange lighten-1 white-text">
                            Booking Details
                        </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-6">
                                        Hotel Name: {this.state.hotelname}
                                        </div>
                                        <div className="col-sm-6">
                                        Address: {this.state.address}
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-sm-6">
                                          Room Type: {this.state.roomtype}
                                        </div>
                                        <div className="col-sm-6">
                                          No of Rooms: {this.state.noofrooms}
                                        </div>

                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-sm-6">
                                          Stay: {this.state.stay}
                                        </div>
                                        <div className="col-sm-6">
                                          Total: ${this.state.total}
                                      </div>
                                    </div>
                                </div>
                        </div>


                        <div className="card">

                        <div className="card-header deep-orange lighten-1 white-text">
                            Personal Details
                        </div>
                                <div className="card-body">
                                    <div className="row">
                                            <div className="col-sm-6">
                                                <div className="md-form">
                                                    <i className="fa fa-user prefix"></i>
                                                    <input type="text" id="firstname"
                                                    ref="firstname" className="form-control"/>
                                                    <label htmlFor="firstname">Firstname</label>
                                                </div>

                                            </div>
                                            <div className="col-sm-6">
                                                <div className="md-form">
                                                    <i className="fa fa-user prefix"></i>
                                                    <input type="text" id="lastname"
                                                     ref="lastname" className="form-control"/>
                                                    <label htmlFor="lastname">Lastname</label>
                                                </div>

                                            </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                        <div className="md-form">
                                        <i className="fa fa-envelope prefix"></i>
                                        <input type="text" id="email" 
                                        ref="email" className="form-control"/>
                                        <label htmlFor="email">Email</label>
                                        </div>

                                        </div>

                                        <div className="col-sm-6">
                                        <div className="md-form">
                                        <i className="fa fa-phone prefix"></i>

                                        <input type="text" id="phone" 
                                        ref="phoneno" className="form-control"/>
                                        <label htmlFor="phone">Phone Number</label>

                                        </div>

                                        </div>
                                </div>
                                <div className="row">
                                        <div className="col-sm-8">
                                        <div className="md-form">
                                        <i className="fa fa-map-marker prefix"></i>

                                        <input type="text" id="address" 
                                        ref="address" className="form-control"/>
                                        <label htmlFor="address">Address</label>

                                        </div>

                                        </div>
                                        <div className="col-sm-4">
                                        <div className="md-form">
                                        <i className="fa fa-location-arrow prefix"></i>

                                        <input type="text" id="zipcode" ref="zipcode" className="form-control"/>
                                        <label htmlFor="zipcode">Zip Code</label>

                                        </div>

                                        </div>
                                </div>
                        </div>
                        </div>


                        <div className="card">

                        <div className="card-header deep-orange lighten-1 white-text">
                            Payment
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="md-form form-group">
                                    <i className="fa fa-credit-card-alt prefix"></i>
                                    <input type="text" id="creditcardno" 
                                    ref="creditcardno"
                                    className="form-control validate" maxLength='16'/>
                                    <label htmlFor="creditcardno">Credit Card No</label>
                                    </div>

                                </div>
                                <div className="col-sm-4">
                                    <label>Expiry Date :  </label>
                                    <div className="md-form form-group">

                                        <input type="month" id="form92" 
                                        ref="expirydate" className="form-control validate"/>

                                    </div>

                                </div>
                                <div className="col-sm-4">
                                    <div className="md-form form-group">
                                    <input type="text" id="cvv" 
                                    ref="cvv" className="form-control validate" maxLength='3'/>
                                    <label htmlFor="cvv">CVV</label>
                                    </div>

                                </div>
                            </div>
                            <button className="btn btn-default btn-lg btn-block" onClick={()=>this.handlePay()}></button>
                          </div>
                        </div>

                     </div>


            </div>
        )
    }
}

export default HotelBooking;