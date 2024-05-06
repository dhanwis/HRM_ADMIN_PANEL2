import React, { useState } from "react";
import { Upload, Button, Input, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const NotesSharing = () => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      const uploadedFile = info.file.originFileObj;
      setFile(uploadedFile);
      message.success(`File "${uploadedFile.name}" uploaded successfully!`);
    } else if (info.file.status === "error") {
      message.error("File upload failed.");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleShare = () => {
    if (!file || !description) {
      message.error("Please upload a file and provide a description.");
      return;
    }

    // Simulated backend API endpoint (replace with your actual endpoint)
    const backendEndpoint = "https://api.example.com/shareNotes";

    // Simulated data to send to backend
    const data = {
      fileName: file.name,
      description: description,
    };

    fetch(backendEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          message.success("File shared successfully!");
          setDescription(""); // Clear description input
          setFile(null); // Clear uploaded file
        } else {
          message.error("Failed to share file. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error sharing file:", error);
        message.error("An error occurred. Please try again.");
      });
  };

  return (
    <div>
      <h2>Notes Sharing to Team Lead Members</h2>
      <Upload onChange={handleFileChange} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Upload File</Button>
      </Upload>
      {file && (
        <p>
          Uploaded File: <strong>{file.name}</strong>
          <Button
            type="text"
            icon={<UploadOutlined />}
            onClick={handleRemoveFile}
          >
            Remove
          </Button>
        </p>
      )}
      <TextArea
        placeholder="Enter a detailed description..."
        value={description}
        onChange={handleDescriptionChange}
        autoSize={{ minRows: 3, maxRows: 6 }} // Auto size textarea based on content
        style={{ margin: "16px 0" }}
      />
      <Button type="primary" onClick={handleShare}>
        Share
      </Button>
    </div>
  );
};

export default NotesSharing;
