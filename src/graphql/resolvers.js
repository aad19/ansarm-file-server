import fs from 'fs/promises'
import path from 'node:path'

const mediaPath = path.join(process.cwd(), 'media')

// تأكد من وجود مجلد media
const ensureMediaDirectory = async () => {
  try {
    await fs.access(mediaPath)
  } catch (error) {
    await fs.mkdir(mediaPath, { recursive: true })
  }
}

// تنفيذ التأكد من وجود المجلد عند بدء التطبيق
ensureMediaDirectory()
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
        console.error('Error reading directory:', error)
        throw new Error('فشل في قراءة المجلد')
      }
    }
  },

  Mutation: {
    createDirectory: async (_, { path: dirPath, name }) => {
      try {
        const fullPath = path.join(mediaPath, dirPath, name)
        await fs.mkdir(fullPath, { recursive: true })
        return { 
          success: true, 
          message: 'تم إنشاء المجلد بنجاح' 
        }
      } catch (error) {
        console.error('Error creating directory:', error)
        return { 
          success: false, 
          message: 'فشل في إنشاء المجلد' 
        }
      }
    },

    uploadFile: async (_, { path: filePath, name, content }) => {
      try {
        const fullPath = path.join(mediaPath, filePath, name)
        // تحويل المحتوى من Base64 إلى بيانات ثنائية إذا لزم الأمر
        const fileContent = Buffer.from(content, 'base64')
        await fs.writeFile(fullPath, fileContent)
        return { 
          success: true, 
          message: 'تم رفع الملف بنجاح' 
        }
      } catch (error) {
        console.error('Error uploading file:', error)
        return { 
          success: false, 
          message: 'فشل في رفع الملف' 
        }
      }
    },

    deleteItem: async (_, { path: itemPath }) => {
      try {
        const fullPath = path.join(mediaPath, itemPath)
        const stats = await fs.stat(fullPath)

        if (stats.isDirectory()) {
          await fs.rm(fullPath, { recursive: true, force: true })
        } else {
          await fs.unlink(fullPath)
        }

        return { 
          success: true, 
          message: 'تم حذف العنصر بنجاح' 
        }
      } catch (error) {
        console.error('Error deleting item:', error)
        return { 
          success: false, 
          message: 'فشل في حذف العنصر' 
        }
      }
    },

    moveItem: async (_, { sourcePath, destinationPath }) => {
      try {
        const fullSourcePath = path.join(mediaPath, sourcePath)
        const fullDestinationPath = path.join(mediaPath, destinationPath)

        await fs.rename(fullSourcePath, fullDestinationPath)

        return { 
          success: true, 
          message: 'تم نقل العنصر بنجاح' 
        }
      } catch (error) {
        console.error('Error moving item:', error)
        return { 
          success: false, 
          message: 'فشل في نقل العنصر' 
        }
      }
    }
  }
}