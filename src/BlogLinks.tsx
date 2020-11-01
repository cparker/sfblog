import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './BlogLinks.module.scss'
import BlogLink from './BlogLink'
import { Blog } from './Data'

export interface IBlogLinkProps {
  blogs: Array<Blog>
}

export default function BlogLinks({ blogs }: IBlogLinkProps) {
  return (
    <div className={styles.blogLinks}>
      <div className={styles.title}>Blogs</div>
      {blogs.map(blog => <BlogLink key={blog.id} blog={blog}/>)}
 
    </div>
  )
}
