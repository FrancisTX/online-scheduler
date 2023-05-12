import React, { useState } from "react";
import axios from "axios";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import {errorNotification, successNotification} from "../Notification";
import "./LoginPage.css";
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        try {
            const response = await axios.post("/api/auth/login", {
                email: values.username,
                password: values.password,
            });
            console.log("Response:", response);
            if (response.status === 200) {
                console.log(response.data["token"]);
                const jwtToken = response.data["token"];
                localStorage.setItem("access_token", jwtToken);
                /**
                const decodedToken = jwtDecode(jwtToken);
                console.log(decodedToken);
                **/
                successNotification("Login Successful", "Welcome back!");
                navigate("/scheduler");
            }
        } catch (error) {
            console.error("Error:", error);
            if (error.response.status === 403) {
                console.log(error.response.data);
                errorNotification("Login Failed", "Please check your credentials and try again");
            }else {
                errorNotification("Login Failed", "An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="login-page">
            <card className="login-card"  title="Login" bordered={false} style={{backgroundColor: '#f0f2f5'}}>
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={handleSubmit}
            style={{margin: '16px' }}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />}
                       type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button style={{ marginRight: '16px' }} type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <a href="/signup">register now</a>!
            </Form.Item>
        </Form>
            </card>
        </div>
    );
};

export default LoginPage;
