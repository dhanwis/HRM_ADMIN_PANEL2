import React, { useState, useEffect } from 'react';
import './Uploadnotes.css';

const Uploadnote = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]); // Replace with your category list
  const [uploadedNotes, setUploadedNotes] = useState([]);

  useEffect(() => {
    // Fetch uploaded notes from the server
    const fetchUploadedNotes = async () => {
      try {
        const response = await fetch('/uploaded-notes');
        if (!response.ok) {
          throw new Error('Error fetching uploaded notes.');
        }
        const data = await response.json();
        setUploadedNotes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUploadedNotes();
  }, []);

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile || !category || !description) {
      alert('Please select a PDF, choose a category, and provide a description.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('category', category);
    formData.append('description', description);

    // Replace with your backend API endpoint for uploading notes
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      alert('Error uploading file.');
      return;
    }

    setSelectedFile(null);
    setCategory('');
    setDescription('');
    onUpload(category); // Trigger callback to update student list
  };

  return (
    <div className="upload-note-container">
      <form className="upload-note-form" onSubmit={handleSubmit}>
        <input className="upload-note-input" type="file" accept=".pdf" onChange={handleChange} required />
        <select className="upload-note-input" value={category} onChange={handleCategoryChange} required>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input className="upload-note-input" type="text" value={description} onChange={handleDescriptionChange} placeholder="Description" required />
        <button className="upload-note-button" type="submit">Upload</button>
      </form>
      <div className="uploaded-notes-container">
        <h2>Uploaded Notes</h2>
        <ul>
          {uploadedNotes.map((note) => (
            <li key={note.id} className="uploaded-note-item">
              <span>{note.category} - {note.description}</span>
              <a className="uploaded-note-link" href={note.url} download>Download</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Uploadnote;
