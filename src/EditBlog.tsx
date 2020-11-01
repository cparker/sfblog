import React, { useState } from 'react'
import styles from './EditBlog.module.scss'
import {
  TextField,
  FormControl,
  FormHelperText,
  TextareaAutosize,
  Button,
} from '@material-ui/core'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import * as data from './Data'

export interface IEditBlog {
  id: string
  blogUpdated:any
}

function EditBlog({ history, id, blogUpdated }: RouteComponentProps & IEditBlog) {
  const [title, setTitle] = useState('')
  return (
    <div className={styles.editBlog}>
      <form>
        <TextField
          label="title"
          fullWidth={true}
          value={title || ''}
          onChange={(event) => setTitle(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            console.log('saving blog, title is', title)
            data.saveBlog({ title: title, body: '' }).then(newBlogId => {
              console.log('got save response', newBlogId)
              blogUpdated()
              history.push(`/viewblog/${newBlogId}`)
            })
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
