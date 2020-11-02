import React, { useState, useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styles from './ViewBlog.module.scss'
import { Blog } from './Data'
import * as data from './Data'
import { Button } from '@material-ui/core'
import moment from 'moment'

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
    const m = moment(dateJSONString)
    return m.format('MMMM DD yyyy hh:mm a')
  }

  return blog ? (
    <div className={styles.viewBlog}>
      <div className={styles.title}>{blog.title}</div>
      <div className={styles.date}>{formatDate(blog.date || '')}</div>
      <div className={styles.body}>{blog.body}</div>
      <div className={styles.actions}>
        <Button
          id="editBlogEdit"
          variant="outlined"
          color="primary"
          onClick={() => history.push(`/editblog/${blog.id}`)}
        >
          Edit
        </Button>
        <Button
          id="editBlogRemove"
          variant="outlined"
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
    </div>
  ) : null
}

export default withRouter(ViewBlog)
