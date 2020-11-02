import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.module.scss'
import * as data from './Data'
import BlogLinks from './BlogLinks'
import ViewBlog from './ViewBlog'
import EditBlog from './EditBlog'
import BlogOps from './BlogOps'
import { Blog } from './Data'
import styles from './App.module.scss'

function App() {
  function updateBlogs() {
    data.getBlogList().then((blogList) => setBlogs(blogList))
  }
  useEffect(() => {
    updateBlogs()
  }, [])

  const [blogs, setBlogs] = useState(new Array<Blog>())

  return (
    <div className={styles.app}>
      <header>
        <div>CP's Blog</div>
      </header>
      <div className={styles.main}>
        <nav>
          <div className={styles.header}>
            <BlogLinks blogs={blogs} />
          </div>
          <div>
            <BlogOps />
          </div>
        </nav>
        <main>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/viewblog" />}
          ></Route>
          <Switch>
            <Route
              exact
              path="/viewblog"
              render={() => {
                if (blogs && blogs.length > 0) {
                  return <Redirect to={`/viewblog/${blogs[0].id}`} />
                }
              }}
            />
            <Route
              exact
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
