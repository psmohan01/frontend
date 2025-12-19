import React from 'react'
export default function Modal({ open, onClose, children }){
  if(!open) return null;
  return (
    <div className="modal-backdrop" onClick={(e)=>{ if(e.target.className==='modal-backdrop') onClose(); }}>
      <div className="modal-card">{children}</div>
    </div>
  )
}
