import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.scss'
import { Button } from '@material-ui/core'
import * as data from './Data'
import BlogLinks from './BlogLinks'
import ViewBlog from './ViewBlog'
import EditBlog from './EditBlog'
import BlogOps from './BlogOps'
import { Blog } from './Data'

function App() {
  function updateBlogs() {
    data.getBlogList().then((blogList) => setBlogs(blogList))
  }
  useEffect(() => {
    updateBlogs()
  }, [])

  // const [health, setHealth] = useState('')
  const [blogs, setBlogs] = useState(new Array<Blog>())

  return (
    <div className="app">
      <header>CP's Great Blog</header>
      <div className="main">
        <nav>
          <BlogLinks blogs={blogs} />
          <BlogOps />
        </nav>
        <main>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/viewblog" />}
          ></Route>
          <Switch>
            <Route
              path="/viewblog/:blogid"
              render={({ match }) => (
                <ViewBlog
                  id={match.params.blogid}
                  blogUpdated={() => updateBlogs()}
                />
              )}
            />
            <Route
              path="/editblog/:blogid"
              render={({ match }) => (
                <EditBlog
                  id={match.params.blogid}
                  blogUpdated={() => updateBlogs()}
                />
              )}
            />

            <Route
              path="/newblog"
              render={({ match }) => (
                <EditBlog
                  id={match.params.blogid}
                  blogUpdated={() => updateBlogs()}
                />
              )}
            />
          </Switch>
        </main>
      </div>
    </div>
  )
}

export default App
