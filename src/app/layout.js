'use client'

import '@/app/globals.css'
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo-client'
import { useState, createContext } from 'react'
import Input from '@/components/Input'

// إنشاء سياق لمشاركة حالة المسار بين المكونات
export const FileContext = createContext(null)

export default function RootLayout({ children }) {
  const [currentPath, setCurrentPath] = useState('')
  const [history, setHistory] = useState([''])
  const [currentIndex, setCurrentIndex] = useState(0)

  // تحديث المسار والتاريخ
  const navigateToPath = (path) => {
    setCurrentPath(path)
    const newHistory = [...history.slice(0, currentIndex + 1), path]
    setHistory(newHistory)
    setCurrentIndex(newHistory.length - 1)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      console.log('تم اختيار الملف:', file.name)
      // سيتم معالجة رفع الملف في صفحة page.js
    }
  }
  const handleNavigateBack = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      setCurrentPath(history[newIndex])
    }
  }

  const handleNavigateForward = () => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      setCurrentPath(history[newIndex])
    }
  }

  // قيمة السياق التي سيتم مشاركتها
  const contextValue = {
    currentPath,
    setCurrentPath: navigateToPath,
    history,
    currentIndex,
    handleFileUpload
  }
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-background">
        <ApolloProvider client={client}>
          <FileContext.Provider value={contextValue}>
            <header className="main-header bg-main text-main-text">
              <div className="dir-container">
                {/* أزرار التنقل */}
                <Input 
                  type="button" 
                  onClick={handleNavigateForward} 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  }
                  className="cir-btn"
                />

                <Input 
                  type="button" 
                  onClick={handleNavigateBack} 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                  }
                  className="cir-btn"
                />
              </div>

              {/* مدخل المسار */}
              <Input
                type="text"
                value={currentPath}
                onChange={(e) => setCurrentPath(e.target.value)}
                onPathChange={navigateToPath}
                className="text-input"
              />

              {/* زر الرفع */}
              <Input 
                type="file" 
                onChange={handleFileUpload}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                  </svg>
                }
                className="seq-btn"
              />
            </header>

            <main className="container mx-auto px-4 py-6 mt-[20vh]">
              {children}
            </main>
          </FileContext.Provider>
        </ApolloProvider>
      </body>
    </html>
  )
}