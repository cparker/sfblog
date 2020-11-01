import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './BlogOps.module.scss'

export default function BlogOps() {
  return (
    <div><NavLink to='/newblog'>NEW POST</NavLink></div>
  )
}