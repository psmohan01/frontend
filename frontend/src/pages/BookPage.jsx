import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import API from '../api'
import Modal from '../components/Modal'

export default function BookPage(){
  const { state } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(null);

  if(!state) return <div style={{padding:40}}>No booking selected. <button onClick={()=>navigate('/')}>Back</button></div>

  const { date, startISO, display } = state;

  async function onSubmit(e){
    e.preventDefault();
    setOpen(true);
    setStatus({ loading: true });
    const start = new Date(startISO);
    const end = new Date(start.getTime() + 30*60000);
    const payload = { name, email, notes, display, startISO: start.toISOString(), endISO: end.toISOString(), date };
    try{
      const res = await fetch(API('create/'), { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      const body = await res.json();
      if(!res.ok) throw new Error(body.error || 'Booking failed');
      setStatus({ success: true, data: body });
    }catch(err){
      setStatus({ error: true, msg: err.message });
    }
  }

  return (
    <div style={{padding:20}}>
      <div className="booking-container">
        <div className="left">
          <h3>Welfare Health Tech</h3>
          <h2>30 Min Meeting</h2>
          <div className="muted">📅 {date} • {display}</div>
          <div className="muted">📹 Google Meet (will be created)</div>
        </div>

        <form className="form" onSubmit={onSubmit}>
          <label>Your name *</label>
          <input value={name} onChange={e=>setName(e.target.value)} required />
          <label>Email address *</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <label>Additional notes</label>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} />
          <div style={{display:'flex',gap:12,marginTop:16}}>
            <button type="button" className="btn secondary" onClick={()=>navigate(-1)}>Back</button>
            <button type="submit" className="btn primary">Confirm</button>
          </div>
        </form>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)}>
        <div style={{padding:12}}>
          {status?.loading && <div>Creating booking...</div>}
          {status?.success && (
            <div>
              <div style={{fontWeight:700,color:'#0f0'}}>Success</div>
              <div style={{marginTop:8}}>Booking created! Confirmation sent via email.</div>
              <div style={{marginTop:12}}><button className="btn" onClick={()=>{ setOpen(false); navigate('/'); }}>Done</button></div>
            </div>
          )}
          {status?.error && <div style={{color:'#ff6b6b'}}>{status.msg}</div>}
        </div>
      </Modal>
    </div>
  )
}
