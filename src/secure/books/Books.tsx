import React, {Component, SyntheticEvent} from 'react'
import Wrapper from '../Wrapper'
import axios from 'axios'
import {Book} from '../../classes/book'
import {Link} from 'react-router-dom'


class Books extends Component {

  state = {
    books : [],
    
  }

  page = 1;
  last_page = 0;
  selectedExport = 'all';
  searchKey = '';
  sortDirection = 'desc';
 

  componentDidMount = async () => {
    const response = await axios.get(`books?page=${this.page}`)

   this.setState({
     books: response.data.data
   })

   this.last_page = response.data.meta.last_page;
    
  }

  handleSearch = async (key:string) => {
    if(key !== '') {
        this.setState({
            books: this.state.books.filter((b: Book) => b.title.toLowerCase().includes(key.toLowerCase()) || b.author.toLowerCase().includes(key.toLowerCase()) )
          })
    } 
    else {
        await this.componentDidMount();
    }

  }


  handleSort = async (column:string) => {
    if (this.sortDirection === 'desc') {
      this.sortDirection = 'asc'
      this.setState({ books: this.state.books.sort((a,b) => a[column] > b[column] ? 1 : -1)

      })
    }else {
      this.sortDirection =  'desc'
      this.setState({ books: this.state.books.sort((a,b) => a[column] < b[column] ? 1 : -1)

      })
    }
         
  }

//pagination
  previous = async () => {
      if(this.page === 1) return;

          this.page--;

          await this.componentDidMount();
      }


  next = async () => {

    if(this.page === this.last_page) return;

    this.page++;

    await this.componentDidMount();

  }


  delete = async (id:number) => {
    if(window.confirm('Are you sure you want to delete this book?')) {
        await axios.delete(`books/${id}`);

        this.setState({
          books: this.state.books.filter((b: Book) => b.id !== id)
        })
      } 
  }

//csv export
  handleExport = async () => {
    const response = await axios.get(`export/${this.selectedExport}`, {responseType: 'blob'});
    const blob = new Blob([response.data], {type: 'text/csv'});
    const download_url = window.URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = download_url;
    link.download = `book_${this.selectedExport}.csv`;
    link.click();

  }

  render() {
    return (
      <Wrapper>

       <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Book List</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
           <div className="btn-toolbar mb-2 mb-md-0">
               <select className="form-select" aria-label="Default select example" id="export-type" onChange={e => this.selectedExport = e.target.value}>
                <option selected>Select export type</option>
                <option value="all">All books</option>
                <option value="authors">All Authors</option>
                <option value="titles">All Titles</option>
              </select>
             </div>
              
                <button onClick={this.handleExport} className="btn btn-sm btn-outline-secondary">Export</button>
             
         </div>

       
    </div>

   
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 ">
         <div className="btn-toolbar mb-2 mb-md-0">
            <Link to={'/books/create'} className= "btn btn-sm btn-outline-secondary">Add new book</Link>
         </div>  
      </div>
      <input type ="text" placeholder="Search..." onChange={e => this.handleSearch(e.target.value)}  />
        <div className="table-responsive">
        <table className="table table-striped table-sm">
            <thead>
            <tr>
                <th>#</th>
                <th style={{cursor: "pointer"}} onClick={()=>this.handleSort('title')}>Title </th>
                <th style= {{cursor: "pointer"}} onClick={()=>this.handleSort('author')}>Author</th>
                <th>Action</th>
               
            </tr>
            </thead>
            <tbody>

             {this.state.books.map(
               (book : Book) => {
                 return (
              <tr>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>  
                <div className="btn-group-mr2">
                  <Link key={book.id} to={`/books/${book.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit </Link>
                  <a className="btn btn-sm btn-outline-secondary" 
                  onClick={() =>this.delete(book.id)}>Delete </a>

                </div>
                 </td>
                {/* <td>{book.description}</td>
                <td>{book.publisher}</td>
                <td>{book.genre}</td> */}
            </tr>
                 )
               }
             )}
           
            
            </tbody>
        </table>
    </div>

    <nav>
      <ul className ="pagination">

        <li className= "page-item">
          <a href="#" className="page-link" onClick={this.previous}>Previous </a>
        </li>

        <li className= "page-item">
          <a href="#" className="page-link" onClick={this.next}>Next</a>
        </li>

      
      </ul>


    </nav>

    </Wrapper>
      

    )
  }
}

export default Books;