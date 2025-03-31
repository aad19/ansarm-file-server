'use client'
import { useState, useEffect, useRef } from 'react'

export default function Input({ 
  type = 'text',
  value, 
  onChange,
  onPathChange,
  onClick,
  children,
  className,
  icon,
  ...props 
}) {
  const [inputValue, setInputValue] = useState('/')
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (type === 'text') {
      setInputValue(value || '/')
    }
  }, [value, type])

  const handleChange = (e) => {
    if (type === 'text') {
      setInputValue(e.target.value)
      if (onChange) onChange(e)
    } else if (type === 'file') {
      if (onChange) onChange(e)
    }
  }

  const handleKeyDown = (e) => {
    if (type === 'text' && e.key === 'Enter') {
      e.preventDefault()
      if (onPathChange) onPathChange(inputValue)
    }
  }

  const handleClick = (e) => {
    if (type === 'button') {
      if (onClick) onClick(e)
    } else if (type === 'file') {
      fileInputRef.current?.click()
    }
  }

  if (type === 'button' || type === 'file') {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={handleClick}
          className={className}
          {...props}
        >
          {icon && <span className="ml-2">{icon}</span>}
          {children}
        </button>

        {type === 'file' && (
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleChange}
            style={{ display: 'none' }}
            {...props}
          />
        )}
      </div>
    )
  }

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="المسار الحالي"
      className={className}
      {...props}
    />
  )
}