
import fs from 'fs/promises'
import path from 'node:path'

const mediaPath = path.join(process.cwd(), 'media')

export const resolvers = {
  Query: {
    getFiles: async (_, { path: dirPath }) => {
      try {
        const fullPath = path.join(mediaPath, dirPath)
        const files = await fs.readdir(fullPath)
        
        return Promise.all(files.map(async file => {
          const filePath = path.join(fullPath, file)
          const stats = await fs.stat(filePath)
          
          return {
            name: file,
            path: path.relative(mediaPath, filePath),
            isDirectory: stats.isDirectory(),
            size: stats.isFile() ? stats.size : null
          }
        }))
      } catch (error) {
        throw new Error('فشل في قراءة المجلد')
      }
    }
  }
}