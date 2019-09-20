import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import List from './pages/List'
import Rank from './pages/Rank'
import 'reset.css/reset.css'
import 'animate.css/animate.min.css'
import './index.css'

function App() {
  return (
    <div className='wrapper'>
      <Router>
        <Switch>
          <Route exact path='/' component={List} />
          <Route path='/rank' component={Rank} />
        </Switch>
      </Router>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
