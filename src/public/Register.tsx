import React, { Component, SyntheticEvent  } from 'react'
import './Public.css'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

 class Register extends Component {
     first_name = '';
     last_name = '';
     email = '';
     password = '';
     password_confirm = '';
     state = {
         redirect: false,
     }

     submit = async (e : SyntheticEvent) => {
         e.preventDefault();
       
        await  axios.post('users', 
        {
             first_name : this.first_name,
             last_name : this.last_name,
             email : this.email,
             password : this.password,
           //  Password : this.password_confirm
         },
        {
            headers: { 
            'Content-Type': 'application/json;charset=UTF-8'
            }
            
        });
      
        this.setState({
            redirect : true
        })
        
     }
     
    render() {
        if(this.state.redirect){
             return <Redirect to={'/login'}/>;
        }
       
        return (
            <form className="form-signin" onSubmit={this.submit}>
                
                <h1 className="h3 mb-3 fw-normal">Please Register</h1>

                <div className="form-floating">
                 
                    <input type="text" className="form-control" id="first-name" placeholder="First Name" 
                        onChange={e => this.first_name = e.target.value}
                    />
                     <label htmlFor="first-name">First Name</label>
                  
                </div>


                <div className="form-floating">
               
                    <input type="text" className="form-control" id="last-name" placeholder="Last Name"
                     onChange={e => this.last_name = e.target.value}
                     />
                    <label htmlFor="last-name">Last Name</label>
                  
                </div>

                 <div className="form-floating">
                    <input type="email" className="form-control" id="email" placeholder="name@example.com"
                     onChange={e => this.email = e.target.value}
                     />
                    <label htmlFor="email">Email address</label>
                </div>


                <div className="form-floating">
                    <input type="password" className="form-control" id="input-password" placeholder="Password" required
                    
                     onChange={e => this.password = e.target.value}
                     />
                    <label htmlFor="input-password">Password</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" id="password-confirm" placeholder="Password" required
                     onChange={e => this.password_confirm = e.target.value}
                     />
                    <label htmlFor="password-confirm">Password Confirm</label>
                </div>
            
                <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
                
            
            </form>
        )
    }
}
export default Register;