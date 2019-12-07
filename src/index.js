import React from 'react'
import ReactDOM from 'react-dom'

import './index.scss'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return <div>React</div>
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
