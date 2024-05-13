import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import axios from 'axios';

// Custom PasswordInput component with toggleable visibility
const PasswordInput = ({ value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="input-group">
            <input
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                className="form-control"
                placeholder="Password"
                required
            />
            <div className="input-group-append" onClick={togglePasswordVisibility}>
                <span className="input-group-text">
                    {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                </span>
            </div>
        </div>
    );
};

const  FrontResetPassword= () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isApproved, setIsApproved] = useState(false);
    const [isApprovalPending, setIsApprovalPending] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsApprovalPending(true);

        try {
            // Simulate backend approval (replace with actual API call)
            const response = await axios.post('/api/password/reset/request', { newPassword });
            const { approved } = response.data;

            if (approved) {
                setIsApproved(true);
                setIsApprovalPending(false);
            } else {
                setIsApprovalPending(false);
                setError('Password reset request denied by HR.');
            }
        } catch (error) {
            setError('Error submitting password reset request.');
            setIsApprovalPending(false);
        }
    };

    return (
        <Container className="mt-5" style={{ paddingTop: "50px" }}>
            <Row className="justify-content-md-center">
                <Col md="6">
                    <Card className="shadow-sm">
                        <Card.Body>
                            {isApproved ? (
                                <div className="text-center">
                                    <h2>Password Reset Approved</h2>
                                    <p>Your password reset request has been approved.</p>
                                    <p>New Password: {newPassword}</p>
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
                                        <PasswordInput
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="confirmPassword" className="mt-3">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <PasswordInput
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="d-block mx-auto mt-3">
                                        Submit Request
                                    </Button>
                                    <p className="text-center mt-3">
                                        <Link to="/staff/login">Sign In</Link>
                                    </p>
                                </Form>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default FrontResetPassword;

