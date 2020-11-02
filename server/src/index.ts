import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as blogHandlers from './blogHandlers'
import pino from 'express-pino-logger'
const PORT = process.env.PORT || 5000
const app = express()
app.use(pino())
app.use(cors())
app.use(bodyParser.json())

function registerRoutes(): void {
  app.get('/health', (req, res, next) => {
    res.status(200).send(`OK at ${new Date()}`)
  })
  app.post('/blog', blogHandlers.handleNewBlog)
  app.put('/blog/:id', blogHandlers.handleUpdateBlog)
  app.get('/blogs', blogHandlers.handleGetBlogs)
  app.get('/blog/:id', blogHandlers.handleGetBlogById)
  app.delete('/blog/:id', blogHandlers.handleDeleteBlog)
}

async function init(): Promise<boolean> {
  registerRoutes()

  app.listen(PORT, () => {
    console.log('listening on ', PORT)
  })

  return Promise.resolve(true)
}

init()
