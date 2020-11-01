import axios from 'axios'
import {
  collapseTextChangeRangesAcrossMultipleVersions,
  createModuleResolutionCache,
} from 'typescript'

export type Blog = {
  id?: string
  title: string
  date?: string
  body: string
}

const URLs = {
  health: 'http://localhost:5000/health',
  blogs: 'http://localhost:5000/blogs',
  blog: 'http://localhost:5000/blog',
}

export async function getHealth(): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const result = await axios.get(URLs.health)
      resolve(result.data)
    } catch (err) {
      console.error('error getting server health', err)
      reject('error, could not get server health')
    }
  })
}

export async function getBlogList(): Promise<Array<Blog>> {
  return new Promise<Array<Blog>>(async (resolve, reject) => {
    try {
      const result = await axios.get(URLs.blogs)
      resolve(result.data)
    } catch (err) {
      console.error('error getting blogs', err)
      reject(err)
    }
  })
}

export async function getBlogDetails(id: string): Promise<Blog> {
  return new Promise<Blog>(async (resolve, reject) => {
    try {
      const result = await axios.get(`${URLs.blog}/${id}`)
      resolve(result.data)
    } catch (err) {
      console.error('caught error getting blog details', err)
      reject(err)
    }
  })
}

export async function saveBlog(blog: Blog): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const saveResult = await axios.post(URLs.blog, {
        title: blog.title,
        body: blog.body,
      })
      resolve(saveResult.data)
    } catch (err) {
      console.error('error while saving', err)
      reject(err)
    }
  })
}

export async function updateBlog(blog: Blog): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const result = await axios.put(`${URLs.blog}/${blog.id}`, {
        title: blog.title,
        body: blog.body,
      })
      console.log('result from update', result)
      resolve(result.data)
    } catch (err) {
      console.error('caught error updating blog', err)
      reject(err)
    }
  })
}

export async function removeBlog(blog: Blog): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const result = await axios.delete(`${URLs.blog}/${blog.id}`)
      resolve(result.data)
    } catch (err) {
      reject(err)
    }
  })
}
