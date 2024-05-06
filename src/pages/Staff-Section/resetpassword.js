import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isApproved, setIsApproved] = useState(false);
    const [isApprovalPending, setIsApprovalPending] = useState(false);

    const handleReset = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsApprovalPending(true); // Request HR approval
        // Simulate backend approval (replace with actual API call)
        approvePasswordReset(newPassword)
            .then(() => {
                setIsApproved(true);
                setIsApprovalPending(false);
            })
            .catch((error) => {
                setError('Error approving password reset');
                setIsApprovalPending(false);
            });
    };

    const approvePasswordReset = async (newPassword) => {
        // Example: Make a POST request to your backend API for HR approval
        try {
            const response = await axios.post('/api/password/reset/approve', { newPassword });
            console.log('HR Approved Password Reset', response.data);
            alert('Password reset request approved!');
        } catch (error) {
            throw new Error('Failed to approve password reset');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center mb-3">
                <Col md="6">
                    {isApproved ? (
                        <div>
                            <h2 className="text-center">Password Reset Approved</h2>
                            <p className="text-center">Your password reset request has been approved.</p>
                            <p className="text-center">New Password: {newPassword}</p>
                        </div>
                    ) : isApprovalPending ? (
                        <div className="text-center">
                            <h3>HR Approval Pending</h3>
                            <p>Please wait for HR approval...</p>
                        </div>
                    ) : (
                        <Form onSubmit={handleReset}>
                            <h2 className="text-center mb-3">Reset Password</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form.Group controlId="newPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="d-block mx-auto">
                                Submit Request
                            </Button>
                            <p className="text-center mt-3">
                                <Link to="/staff/login">Sign In</Link>
                            </p>
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ResetPassword;
