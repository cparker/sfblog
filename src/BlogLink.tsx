import React from 'react'
import styles from './BlogLink.module.scss'
import { NavLink } from 'react-router-dom'
import { Blog } from './Data'
export interface IBlogLink {
  blog: Blog
}

export default function BlogLink({blog}:IBlogLink) {
  return (
    <div><NavLink to={`/viewblog/${blog.id}`} activeClassName={styles.active}>{blog.title}</NavLink></div>
  )
}