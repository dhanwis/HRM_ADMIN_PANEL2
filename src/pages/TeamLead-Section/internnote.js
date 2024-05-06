import React, { useState, useEffect } from 'react';

const Uploadnote = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState('');
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile || !category) {
      alert('Please select a PDF and choose a category.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('category', category);

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
    onUpload(category); // Trigger callback to update student list
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf" onChange={handleChange} required />
        <select value={category} onChange={handleCategoryChange} required>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button type="submit">Upload</button>
      </form>
      <div>
        <h2>Uploaded Notes</h2>
        <ul>
          {uploadedNotes.map((note) => (
            <li key={note.id}>
              {note.category} - <a href={note.url} download>Download</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Uploadnote;
