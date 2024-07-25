import React, { useState, useEffect } from "react";
import { Upload, Button, Input, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import setbackg from "../../assets/images/bgall.png";
import axios from "axios";
import { baseUrl, baseUrlHr } from "../../url";
const { TextArea } = Input;
const { Option } = Select;

const NotesSharing = () => {
  const [title, setTitle] = useState(""); // New state for title
  const [description, setDescription] = useState("");
  // const [studentName, setStudentName] = useState("");
  const [file, setFile] = useState(null);
  const [section, setSection] = useState("");
  const [sections, setSections] = useState([]);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    // Fetch sections from the backend
    const fetchSections = async () => {
      try {
        const response = await fetch(`${baseUrl}/intern-reg/`);

        if (response.ok) {
          const data = await response.json();
          console.log("std", data);
          setSections(data);
        } else {
          message.error("Failed to fetch sections.");
        }
      } catch (error) {
        console.error("Error fetching sections:", error);
        message.error("An error occurred while fetching sections.");
      }
    };

    fetchSections();
  }, []);

  const handleFileChange = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      setFile(info.file.originFileObj);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    message.success("File removed successfully");
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSectionChange = (value) => {
    setSection(value);
  };

  const handleShare = async () => {
    if (!file || !title || !description || !section) {
      message.error(
        "Please fill in all fields and upload a file before sharing."
      );
      return;
    }

    const formData = new FormData();
    formData.append("student_name", section);
    formData.append("title", title);
    formData.append("description", description);
    formData.append(`note_upload`, file);

    let x = await axios.post(`${baseUrlHr}/staff/noteshare/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    });

    if (x.status === 201) {
      message.success("Notes shared successfully!");
      setFile(null);
      setTitle("");
      setDescription("");
      setDescription("");
      setSection("");
    }
  };

  return (
    <div style={{ marginTop: "50px", backgroundImage: `url(${setbackg})` }}>
      <div style={{ paddingTop: "50px" }}>
        <h2 style={{ marginBottom: 40 }}>Notes Sharing to Intern</h2>

        <div style={{ marginBottom: 20 }}>
          <Upload
            onChange={handleFileChange}
            showUploadList={false}
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess("ok");
              }, 0);
            }}
          >
            <Button icon={<UploadOutlined />}>Upload File</Button>
          </Upload>
        </div>

        {file && (
          <p>
            Uploaded File: <strong>{file.name}</strong>{" "}
            <Button
              type="text"
              icon={<UploadOutlined />}
              onClick={handleRemoveFile}
            >
              Remove
            </Button>
          </p>
        )}

        <div style={{ marginBottom: 30 }}>
          <Input
            placeholder="Enter a title for your notes"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <div style={{ marginBottom: 30 }}>
          <TextArea
            placeholder="Enter a detailed description..."
            value={description}
            onChange={handleDescriptionChange}
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </div>

        <div style={{ marginBottom: 30 }}>
          <Select
            placeholder="Select a student section"
            value={section}
            onChange={handleSectionChange}
            style={{ width: 200 }}
          >
            <option value="">Select a student</option>
            {sections.map((sec) => (
              <Option key={sec.id} value={sec.username}>
                {sec.username}
              </Option>
            ))}
          </Select>
        </div>

        <div style={{ marginBottom: 30 }}>
          <Button type="primary" onClick={handleShare}>
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotesSharing;
