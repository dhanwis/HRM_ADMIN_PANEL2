import React, { useState, useEffect } from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfileStaff = () => {
  const [profileData, setProfileData] = useState(null);

  // Simulated function to fetch user profile data from the backend
  const fetchUserProfile = () => {
    // Simulate API call to fetch user profile data
    const mockProfileData = {
      userName: "John Doe",
      userId: "12345",
      email: "johndoe@example.com",
      phoneNo: "(123) 456-7890",
      dateOfBirth: "1990-01-01",
      roleInCompany: "Manager",
      joinDate: "2020-05-15",
      profilePhoto: "url_to_profile_photo", // Placeholder or default profile photo URL
    };

    // Simulate API call delay with setTimeout
    setTimeout(() => {
      setProfileData(mockProfileData);
    }, 1000); // Adjust delay time as needed
  };

  useEffect(() => {
    // Fetch user profile data when the component mounts
    fetchUserProfile();
  }, []);

  return (
    <Row className="justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Col xs={12} sm={10} md={8} lg={6}>
        <Card className="p-4 shadow-lg rounded">
          <Card.Title className="text-center mb-4">
            <h3 style={{paddingTop:"50px"}}>Profile</h3>
          </Card.Title>
          {profileData && (
            <>
              <div className="text-center mb-4">
                <Image
                  src={profileData.profilePhoto || "https://via.placeholder.com/150"}
                  roundedCircle
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                  className="border border-light"
                />
              </div>
              <div className="text-center">
                <h5 className="mb-3">{profileData.userName}</h5>
                <p className="mb-1">User ID: {profileData.userId}</p>
                <p className="mb-1">Email: {profileData.email}</p>
                <p className="mb-1">Phone No: {profileData.phoneNo}</p>
                <p className="mb-1">Date of Birth: {profileData.dateOfBirth}</p>
                <p className="mb-1">Role: {profileData.roleInCompany}</p>
                <p className="mb-0">Join Date: {profileData.joinDate}</p>
              </div>
            </>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileStaff;
