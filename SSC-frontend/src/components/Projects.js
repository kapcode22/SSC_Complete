import React from 'react'
import DisplayNote from './ProjectItem';
import { useState } from 'react';
import "./projects.css"
import { useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const Note = () => {
  const [notes, setNotes] = useState([])
  const [addNote, setAddNote] = useState({ title: "", content: "", whatsappLink:"" })
  const [id, setId] = useState("")

  const noteRef = collection(db, "spcProjects")

  useEffect(() => {
    const getNotes = async () => {
      const data = await getDocs(noteRef)
      // console.log(data);
      setNotes(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })))
    }
    getNotes()
  }, [noteRef])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddNote({ ...addNote, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(addNote);
    await addDoc(noteRef, addNote)
  }

  const deleteNote = async (id) => {
    // console.log(id);
    const deletenote = doc(noteRef, id)
    await deleteDoc(deletenote)
  }

  const updateNote = async (note) => {
    // console.log(note);
    setAddNote({title: note.title, content: note.content, whatsappLink: note.whatsappLink})
    setId(note.id)
  }

  const updatedNote = async (id) =>{
    console.log(id);
    const updatenote = doc(db, "note", id)
    await updateDoc(updatenote, addNote)
  }

  return (
    <div className="container">
      <form method='post' onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Enter Title..." onChange={handleChange} value={addNote.title} required/>
        <textarea name="content" placeholder='Type Content Here...' onChange={handleChange} value={addNote.content} rows="4" required></textarea>
        <input type="text" name="whatsappLink" placeholder="Enter whatsappLink..." onChange={handleChange} value={addNote.whatsappLink} required/>
        <div style={{ "display": "flex" }}>
          <button type='submit'>submit</button>
          {/* <button style={{marginLeft: "10px"}} type='button' onClick={()=>updatedNote(id)}>update</button> */}
        </div>
      </form>

      <div className='note-container'>
        {notes && notes.map((note) => (
          <DisplayNote title={note.title} content={note.content} whatsappLink={note.whatsappLink} id={note.id} getId={deleteNote} getUpdateNoteId={updateNote} />
        ))}
      </div>
    </div>
  )
}

export default Note;