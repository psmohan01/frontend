import React, { useEffect, useState } from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

export default function CalendarPage(){
  const navigate = useNavigate();
  const [selected, setSelected] = useState('2025-11-25');
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{ loadAvailability(selected); },[selected]);

  async function loadAvailability(date){
    setLoading(true);
    try{
      const res = await fetch(API(`availability/?date=${date}`));
      if(!res.ok) throw new Error('bad');
      const data = await res.json();
      let arr = [];
      if(Array.isArray(data)) arr = data;
      else if(Array.isArray(data.timeSlots)) arr = data.timeSlots;
      else if(Array.isArray(data.availability)) arr = data.availability;
      else arr = [];
      const normalized = arr.map(s => ({ start: s.start || s }));
      setSlots(normalized);
    }catch(e){
      // demo fallback
      const demo=[];
      for(let h=9; h<=15; h++){ demo.push({start:`${selected}T${String(h).padStart(2,'0')}:00:00`}); demo.push({start:`${selected}T${String(h).padStart(2,'0')}:30:00:00`}); }
      setSlots(demo);
    }finally{ setLoading(false); }
  }

  function pick(slot){
    navigate('/book', { state: { date: selected, startISO: slot.start, display: new Date(slot.start).toLocaleTimeString([], {hour:'numeric', minute:'2-digit'}) } });
  }

  const cells = [23,24,25,26,27,28,29,30,1,2,3,4,5,6,7,8,9,10,11,12,13];

  return (
    <div className="wrap">
      <div className="container">
        <div className="left-panel">
          <div style={{width:52,height:52,borderRadius:26,overflow:'hidden',background:'#222'}}>
            <img src="/snapshot.png" style={{width:'100%',height:'100%',objectFit:'cover'}} alt="avatar"/>
          </div>
          <div style={{fontWeight:700,marginTop:12}}>Welfare Health Tech</div>
          <div style={{fontSize:22,fontWeight:700,marginTop:12}}>30 Min Meeting</div>
          <div style={{color:'#a8a8a8',marginTop:10}}>Asia/Kolkata</div>
        </div>

        <div className="calendar-panel">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{fontWeight:700}}>November 2025</div>
            <div style={{color:'#a8a8a8'}}>‹ ›</div>
          </div>
          <div className="grid" style={{marginTop:18}}>
            {cells.map(n=> <div key={n} className={`cell ${String(n)===String(parseInt(selected.split('-')[2])) ? 'active':''}`} onClick={()=>setSelected(`2025-11-${String(n).padStart(2,'0')}`)}>{n}</div>)}
          </div>
        </div>

        <div className="times-panel">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
            <div style={{fontWeight:700}}>Tue 25</div>
            <div style={{color:'#a8a8a8'}}>12h / 24h</div>
          </div>
          <div style={{height:520,overflow:'auto',paddingRight:6}}>
            {loading && <div style={{color:'#a8a8a8'}}>Loading…</div>}
            {!loading && slots.length===0 && <div style={{color:'#a8a8a8'}}>No times</div>}
            {slots.map((s,i)=> (
              <div key={i} className="time-btn" onClick={()=>pick(s)} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',alignItems:'center'}}><div style={{width:10,height:10,borderRadius:5,background:'#00ff9d',marginRight:8}}></div>{new Date(s.start).toLocaleTimeString([], {hour:'numeric',minute:'2-digit'})}</div>
                <div style={{color:'#a8a8a8'}}>Select</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
