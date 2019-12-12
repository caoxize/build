import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import './index.scss'

// import styles from './index.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* <p className={styles.test}>You clicked {count} times</p> */}
      <p className="test">You clicked {count} times</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
