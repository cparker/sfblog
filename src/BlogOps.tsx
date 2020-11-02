import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './BlogOps.module.scss'

export default function BlogOps() {
  return (
    <div className={styles.blogops}>
      <div className={styles.title}>Actions</div>
      <NavLink to="/newblog">New Post</NavLink>
    </div>
  )
}
