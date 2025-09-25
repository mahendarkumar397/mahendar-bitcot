import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ContactList from './Components/ContactList/ContactList'
import AddContact from './Components/AddContact/AddContact'
import EditContact from './Components/EditContact/EditContact'
import ViewDetails from './Components/ViewDetails/ViewDetails'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/edit/:id" element={<EditContact />} />
        <Route path="/view/:id" element={<ViewDetails />} />
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
