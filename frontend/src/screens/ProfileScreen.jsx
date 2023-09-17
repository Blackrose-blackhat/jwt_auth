import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { PulseLoader } from 'react-spinners';
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import FormContainer from '../components/FormContainer'
const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);
    const [updateProfile, { isLoading }] = useUpdateUserMutation();
    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);

    }, [userInfo.setName, userInfo, setEmail]);

    const HandleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
        }
        else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success('Profile updated')
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }
    return (
        <FormContainer>
            <h1>Update Profile</h1>

            <Form onSubmit={HandleSubmit}>
                <Form.Group className='my-4' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter your name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-4' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-4' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='my-4' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='confirmPassword'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {isLoading ? <PulseLoader margin={5} color="#005bf7" /> : <Button type='submit' variant='primary' className='mt-3'>
                    Update

                </Button>}


            </Form>
        </FormContainer>
    )
}

export default ProfileScreen