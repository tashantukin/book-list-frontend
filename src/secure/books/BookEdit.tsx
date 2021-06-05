import React, { Component, PropsWithRef, SyntheticEvent  } from 'react'
import Wrapper from '../Wrapper'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {Book} from '../../classes/book'

 class BookEdit extends Component<{match: PropsWithRef<any> }> {

     state = {
        redirect: false,
         title :  '',
         author : ''
    }
    id: 0;
    title = '';
    author = '';

    componentDidMount = async () => {
        this.id = this.props.match.params.id;

        const bookCall = await axios.get(`books/${this.id}`);

        const book : Book = bookCall.data.data;

        this.setState({
            title : book.title,
            author : book.author
        })


    }
     
    submit = async(e : SyntheticEvent ) => {
        e.preventDefault();

        await axios.put(`books/${this.id}`,{
            title : this.title,
            author: this.author
        });

        this.setState({
            redirect: true,
           
        })
        
    }
    render() {
        if(this.state.redirect){
            return <Redirect to={'/books'} />
        }
        return (
          <Wrapper>
                <form onSubmit={this.submit}>
                    
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" name="title" disabled
                        defaultValue={this.title = this.state.title}
                        onChange={e => this.title = e.target.value}/>
                    </div>

                    <div className="form-group">
                            <label>Author</label>
                            <input type="text" className="form-control" name="author"
                            defaultValue={this.author = this.state.author}
                             onChange={e => this.author = e.target.value} />
                    </div>

                    <div className="form-group">
                        <button className="w-100 btn btn-lg btn-primary" type="submit" >Save</button>
                    </div>
                
                </form>


            </Wrapper>
        )
    }
}

export default BookEdit
