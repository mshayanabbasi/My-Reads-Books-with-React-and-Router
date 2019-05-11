import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Search from './Components/Search'
import BookShelf from './Components/BookShelf'
import { getAll, update } from './BooksAPI'


class BooksApp extends Component {
  state = {
    Read: [],
    CurrentlyRead: [],
    WantToRead: [],
  }
  componentDidMount(){
    this.getData()
  }
  getData = () => {
    getAll().then(data => {
      let CurrentlyRead = []
      let Read = []
      let WantToRead = []
      data.map(v => {
        const {shelf} = v
        switch(shelf){
          case "currentlyReading":
            CurrentlyRead.push(v)
            return null
          case "wantToRead":
            WantToRead.push(v)
            return null
          case "read":
            Read.push(v)
            return null
          default:
            return null
        }
      })  
      this.setState({CurrentlyRead, Read, WantToRead})
    })
  }
  whenSelect = (event, book) => {
    let shelf = event.target.value
    update(book, shelf).then(data => {
      this.getData()
    })
  }
  render(){
    const { CurrentlyRead, WantToRead, Read } = this.state
    return(
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/" render={()=> <BookShelf
            CurrentlyRead={[...CurrentlyRead]}
            WantToRead={[...WantToRead]}
            Read={[...Read]}
            whenSelect={this.whenSelect}
            />}/>
            
            <Route exact path="/search" render={() => <Search 
            allCurrentShelfBooks={[...CurrentlyRead, ...WantToRead, ...Read]}
            />}/>
            
          </Switch>
        </Router>
      </div>
    )
  }
}
export default BooksApp
