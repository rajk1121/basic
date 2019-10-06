import React, { Component } from 'react';
import Data from './Data';
import axios from 'axios';
class Author extends Component {
    state = {
        data: "",
        author: ""
    }
    handleData = () => {
        console.log(this.state.author)
        axios.get('/api/poems', { params: { Author: this.state.author } }).then((res) => {
            // let poem = res.data.dbdata[0]['Poem'];
            // let poem = res.data;
            // let poem = res.data;
            if (res.data.dbdata.length > 0) {
                this.setState({ data: res.data.dbdata[0]['Poem'] })
            } else {
                this.setState({ data: "Author doesn't exist" })
            }
            // console.log(poem)

        }).catch((err) => {
            console.log(err);
        })

    }
    handleAuthor = (e) => {
        this.setState({ author: e.target.value })
    }
    render() {
        return (
            <div>
                <h3>Enter the Author</h3>
                <input type='text' id='author' value={this.state.author} onChange={this.handleAuthor}></input>
                <button type='submit' onClick={this.handleData}>Submit</button>
                <Data data={this.state.data} />
            </div>

        )
    }
}
export default Author;