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
                iconName="icon-arrow-left" 
              />

              <Button 
                className="cir-btn" 
                onClick={handleNavigateBack} 
                iconName="icon-arrow-right" 
              />
            
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
                />
          
          </header>

          <main className="container mx-auto px-4 py-6 mt-[20vh]">
            {children}
          </main>
        </ApolloProvider>
      </body>
    </html>
  )
}