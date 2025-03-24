
'use client'
import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'

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

export default function Home() {
  const { loading, error, data } = useQuery(GET_FILES, {
    variables: { path: '' }
  })

  if (loading) return <p>جاري التحميل...</p>
  if (error) return <p>حدث خطأ: {error.message}</p>

  return (
    <div>
      {data.getFiles.map(file => (
        <div key={file.path} className="p-2">
          {file.isDirectory ? '📁' : '📄'} {file.name}
          {file.size && <span className="text-sm text-gray-500"> ({file.size} bytes)</span>}
        </div>
      ))}
    </div>
  )
}