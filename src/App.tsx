import React, { useState, useEffect } from 'react'
import './App.scss'
import { Button } from '@material-ui/core'
import * as data from './Data'

function App() {
  useEffect(() => {
    data
      .getHealth()
      .then((h) => setHealth(h))
      .catch((e) => setHealth('ERROR: ' + e))
  }, [])

  const [health, setHealth] = useState('')
  return (
    <div className="app">
      <Button variant="contained" color="secondary">
        let's BLOG!
      </Button>
      <div>health is {health}</div>
    </div>
  )
}

export default App
