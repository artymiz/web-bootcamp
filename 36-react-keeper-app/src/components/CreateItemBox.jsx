import React, { useState } from 'react';

export default function CreateItemBox({ onAdd }) {
  let [note, setNote] = useState({ title: '', content: '' });

  function handleChange(event) {
    let { name, value } = event.target;
    setNote(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  function submit(event) {
    event.preventDefault();
    if (note.title === '' || note.content === '') {
      return;
    }
    onAdd(note);
    setNote({ title: '', content: '' });
  }

  return (
    <div>
      <form>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={note.title}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          onChange={handleChange}
          value={note.content}
        />
        <button onClick={submit}>Add</button>
      </form>
    </div>
  );
}

