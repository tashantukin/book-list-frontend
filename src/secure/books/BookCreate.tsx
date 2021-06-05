import React, { Component, SyntheticEvent } from 'react'
import Wrapper from '../Wrapper'
import {Redirect} from 'react-router-dom'
import axios from 'axios'


 class BookCreate extends Component {

    state = {
        redirect: false
    }
    title = '';
    author = '';

    submit = async(e : SyntheticEvent ) => {
        e.preventDefault();

        await axios.post('books',{
            title : this.title,
            author: this.author 
        });

        this.setState({
            redirect: true
        })
        
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={'/books'} />
        }
        return (
            <Wrapper>
                <form onSubmit={this.submit}>
                    
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" name="title" onChange={e => this.title = e.target.value}/>
                    </div>

                    <div className="form-group">
                            <label>Author</label>
                            <input type="text" className="form-control" name="author" onChange={e => this.author = e.target.value} />
                    </div>

                    <div className="form-group">
                        <button className="w-100 btn btn-lg btn-primary" type="submit" >Save</button>
                    </div>
                
                </form>


            </Wrapper>
        )
    }
}

export default BookCreate