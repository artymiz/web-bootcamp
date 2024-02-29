import React, { useState, useEffect } from 'react';
import Header from './Header';
import Note from './Note';
import CreateItemBox from './CreateItemBox';
import Footer from './Footer';

export default function App() {
  const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
  let [notes, setNotes] = useState(storedNotes);

  function createNote(newNote) {
    setNotes(prevValue => {
      return [...prevValue, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevValue => {
      return prevValue.filter((_, index) => { return index !== id; });
    });
  }

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <div>
      <Header />
      <CreateItemBox onAdd={createNote} />
      {
        notes.map((note, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={note.title}
              content={note.content}
              onDelete={deleteNote}
            />
          );
        })
      }
      <Footer />
    </div>
  );
}

