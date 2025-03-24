'use client'
import Icon from '@/components/Icon'

export default function Button({ 
  children, 
  onClick, 
  className = '', 
  iconName 
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      {/* عرض الأيقونة فقط إذا تم تمرير iconName */}
      {iconName && <Icon name={iconName} />}
      {children}
    </button>
  )
}