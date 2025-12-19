import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CalendarPage from './pages/CalendarPage'
import BookPage from './pages/BookPage'

export default function App(){
  return (
    <Routes>
      <Route path='/' element={<CalendarPage/>} />
      <Route path='/book' element={<BookPage/>} />
    </Routes>
  )
}
