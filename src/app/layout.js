'use client'

import '@/app/globals.css'
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo-client'
import { useState } from 'react'
import Button from '@/components/Button'
import TextInput from '@/components/TextInput'

export default function RootLayout({ children }) {
  const [currentPath, setCurrentPath] = useState('media')
  const [history, setHistory] = useState(['media'])
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleUpload = () => {
    console.log('تم رفع الملف إلى:', currentPath)
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

  return (
    <html lang="ar" dir="rtl">
      <body className="bg-background">
        <ApolloProvider client={client}>
          <header className="main-header bg-main text-main-text">
            <div className="dir-container">
              {/* أزرار التنقل */}

              <Button 
                className="cir-btn" 
                onClick={handleNavigateBack} 
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
</svg>

              </Button>

              <Button 
                className="cir-btn" 
                onClick={handleNavigateBack} 
              
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
</svg>

              </Button>
            
            </div>

              {/* مدخل المسار */}
              <TextInput
                value={currentPath}
                onChange={(e) => setCurrentPath(e.target.value)}
                className="text-input"
              />

              {/* زر الرفع */}
                <Button 
                className="cir-btn" 
                onClick={handleNavigateBack} 
                iconName="icon-upload" 
                >

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
</svg>

                </Button>
          
          </header>

          <main className="container mx-auto px-4 py-6 mt-[20vh]">
            {children}
          </main>
        </ApolloProvider>
      </body>
    </html>
  )
}