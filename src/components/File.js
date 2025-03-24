'use client' 

export default function File({ name, size }) {
  return (
    <div className="data-container">

        <span className="text-8xl">📄</span>
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-gray-500">{(size / 1024).toFixed(2)}KB</p>
        </div>
      </div>
  )
}