import lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import { v4 as uuidv4 } from 'uuid'
let db: any = lowdb(new FileSync('db/db.json'))
db.defaults({
  blogs: [],
}).write()

import { Request, Response, NextFunction } from 'express'

type Blog = {
  id: number
  title: string
  body: string
}

export function handleNewBlog(req: Request, res: Response, next: NextFunction) {
  db.read()
  const newId = uuidv4()
  db.get('blogs')
    .push({
      id: newId,
      title: req.body.title,
      body: req.body.body,
      date: new Date().toJSON(),
    })
    .write()

  res.status(201).send(newId)
}

export function handleGetBlogs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  db.read()
  const blogs = db.get('blogs').value()
  res.status(200).send(blogs)
}

export function handleGetBlogById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('params is', req.params)
  const blogId = req.params.id
  console.log('blogId', blogId)
  db.read()
  const blog = db.get('blogs').find({ id: blogId }).value()
  console.log('found blog', blog)
  res.send(blog)
}

export function handleUpdateBlog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('updating blog for id', req.params.id)
  console.log('body is ', req.body)
  db.read()
  db.get('blogs')
    .find({ id: req.params.id })
    .assign({ title: req.body.title, body: req.body.body })
    .write()
  res.status(201).send('updated')
}

export function handleDeleteBlog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  db.read()
  db.get('blogs').remove({ id: req.params.id }).write()
  res.status(200).send('removed')
}
