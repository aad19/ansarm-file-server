'use client' 

export default function Folder({ name, onClick }) {
  return (
    <div
      onClick={onClick}
      className="data-container"
    >
      <div className="flex items-center gap-2">
        <span className="text-8xl">📁</span>
        <p className="text-sm font-medium">{name}</p>
      </div>
    </div>
  )
}