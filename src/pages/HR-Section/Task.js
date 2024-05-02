import React, { useState } from 'react';

function TaskForm() {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        startDate: '',
        endDate: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
    };

    return (
        <div>
            <h2>Task Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="id">ID:</label><br />
                <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} /><br />
                
                <label htmlFor="title">Task Title:</label><br />
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} /><br />
                
                <label htmlFor="startDate">Start Date:</label><br />
                <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} /><br />
                
                <label htmlFor="endDate">End Date:</label><br />
                <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} /><br />
                
                <label htmlFor="description">Task Description:</label><br />
                <textarea id="description" name="description" rows="4" cols="50" value={formData.description} onChange={handleChange}></textarea><br />
                
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default TaskForm;
