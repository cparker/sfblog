import React, { useState, useEffect } from 'react'
import styles from './EditBlog.module.scss'
import { TextField, Button } from '@material-ui/core'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import * as data from './Data'

export interface IEditBlog {
  id: string
  blogUpdated: any
}

function EditBlog({
  history,
  id,
  blogUpdated,
}: RouteComponentProps & IEditBlog) {
  useEffect(() => {
    if (id) {
      data.getBlogDetails(id).then((blog) => {
        console.log('got blog from DB', blog)
        setTitle(blog.title)
        setBody(blog.body)
      })
    }
  }, [id])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  return (
    <div className={styles.editBlog}>
      <form>
        <TextField
          id="blogtitle"
          label="title"
          fullWidth={true}
          value={title || ''}
          onChange={(event) => setTitle(event.target.value)}
          classes={{root:styles.tf}}
        />
        <TextField
          id="blogbody"
          label="body"
          value={body || ''}
          multiline={true}
          variant="outlined"
          rows={10}
          fullWidth={true}
          onChange={(event) => setBody(event.target.value)}
        />
        <Button
          id="blogEditSave"
          variant="contained"
          color="primary"
          onClick={() => {
            console.log('saving id', id)
            if (id) {
              data.updateBlog({id, title, body}).then(() => {
                blogUpdated()
                history.replace(`/viewblog/${id}`)
              })
            } else {
              data.saveBlog({ title, body }).then((newBlogId) => {
                console.log('got save response', newBlogId)
                blogUpdated()
                history.push(`/viewblog/${newBlogId}`)
              })
            }
          }}
        >
          Save
        </Button>
      </form>
    </div>
  )
}
// function EditBlog({ id }: IEditBlog) {

export default withRouter(EditBlog)
