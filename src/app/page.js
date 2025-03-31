'use client'
import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { gql } from '@apollo/client'
import Button from '@/components/Button'

// تعريف استعلامات GraphQL
const GET_FILES = gql`
  query GetFiles($path: String!) {
    getFiles(path: $path) {
      name
      path
      isDirectory
      size
    }
  }
`

const CREATE_DIRECTORY = gql`
  mutation CreateDirectory($path: String!, $name: String!) {
    createDirectory(path: $path, name: $name) {
      success
      message
    }
  }
`

const DELETE_ITEM = gql`
  mutation DeleteItem($path: String!) {
    deleteItem(path: $path) {
      success
      message
    }
  }
`
export default function Home() {
  const [currentPath, setCurrentPath] = useState('')
  const [history, setHistory] = useState([''])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')

  // استعلام للحصول على الملفات
  const { loading, error, data, refetch } = useQuery(GET_FILES, {
    variables: { path: currentPath },
  })

  // تعريف الـ mutations
  const [createDirectory] = useMutation(CREATE_DIRECTORY)
  const [deleteItem] = useMutation(DELETE_ITEM)

  // التنقل إلى مجلد
  const navigateToFolder = (folderPath) => {
    setCurrentPath(folderPath)

    // تحديث التاريخ
    const newHistory = [...history.slice(0, currentIndex + 1), folderPath]
    setHistory(newHistory)
    setCurrentIndex(newHistory.length - 1)
  }

  // إنشاء مجلد جديد
  const handleCreateFolder = async () => {
    if (!newFolderName) return

    try {
      const result = await createDirectory({
        variables: { path: currentPath, name: newFolderName }
      })

      if (result.data.createDirectory.success) {
        setNewFolderName('')
        setShowNewFolderDialog(false)
        refetch()
      } else {
        alert(result.data.createDirectory.message)
      }
    } catch (error) {
      console.error('Error creating folder:', error)
      alert('حدث خطأ أثناء إنشاء المجلد')
    }
  }

  // حذف عنصر
  const handleDeleteItem = async (itemPath) => {
    if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
      try {
        const result = await deleteItem({
          variables: { path: itemPath }
        })

        if (result.data.deleteItem.success) {
          refetch()
        } else {
          alert(result.data.deleteItem.message)
        }
      } catch (error) {
        console.error('Error deleting item:', error)
        alert('حدث خطأ أثناء حذف العنصر')
      }
    }
  }
  if (loading) return <p>جاري التحميل...</p>
  if (error) return <p>حدث خطأ: {error.message}</p>
  if (!data || !data.getFiles) return <p>لا توجد بيانات</p>

  return (
    <div className="container mx-auto">
      {/* زر إنشاء مجلد جديد */}
      <div className="mb-4">
        <Button 
          className="cir-btn"
          onClick={() => setShowNewFolderDialog(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          إنشاء مجلد جديد
        </Button>
      </div>

      {/* مربع حوار إنشاء مجلد جديد */}
      {showNewFolderDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">إنشاء مجلد جديد</h3>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="text-input mb-4"
              placeholder="اسم المجلد"
            />
            <div className="flex justify-end gap-2">
              <Button onClick={() => setShowNewFolderDialog(false)}>إلغاء</Button>
              <Button onClick={handleCreateFolder} className="cir-btn">إنشاء</Button>
            </div>
          </div>
        </div>
      )}

      {/* عرض الملفات والمجلدات */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.getFiles.map((file) => (
          <div 
            key={file.path} 
            className="data-container flex flex-col p-4 border rounded"
            onClick={() => file.isDirectory ? navigateToFolder(file.path) : null}
          >
            <div className="flex items-center">
              {file.isDirectory ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              )}
              <span className="font-medium">{file.name}</span>
            </div>
            {file.size && <span className="text-sm text-gray-500 mt-1">({Math.round(file.size / 1024)} KB)</span>}

            {/* زر الحذف */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteItem(file.path);
              }}
              className="mt-2 text-red-500 hover:text-red-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}