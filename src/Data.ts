import axios from 'axios'

const URLs = {
  health: 'http://localhost:5000/health',
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
