import React, { useState, useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styles from './ViewBlog.module.scss'
import { Blog } from './Data'
import * as data from './Data'
import { Button } from '@material-ui/core'

export interface IViewBlog {
  id: string
  blogUpdated: () => void
}

function ViewBlog({
  history,
  id,
  blogUpdated,
}: IViewBlog & RouteComponentProps) {
  useEffect(() => {
    data.getBlogDetails(id).then((blog) => setBlog(blog))
  }, [id])
  const [blog, setBlog] = useState<Blog | null>()

  const formatDate = (dateJSONString: string): string => {
    const d = new Date(dateJSONString)
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
  }

  return blog ? (
    <div className={styles.viewBlog}>
      <div>TITLE: {blog.title}</div>
      <div>DATE: {formatDate(blog.date || '')}</div>
      <div>BODY: {blog.body}</div>

      <Button
        id="editBlogEdit"
        variant="contained"
        color="primary"
        onClick={() => history.push(`/editblog/${blog.id}`)}
      >
        Edit
      </Button>
      <Button
        id="editBlogRemove"
        variant="contained"
        color="secondary"
        onClick={() => {
          data.removeBlog(blog).then(() => {
            blogUpdated()
            history.replace(`/`)
          })
        }}
      >
        Remove
      </Button>
    </div>
  ) : null
}

export default withRouter(ViewBlog)
