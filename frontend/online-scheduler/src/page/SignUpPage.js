import React, {useState} from "react";
import axios from "axios";
import {errorNotification, successNotification} from "../Notification";
import {Button, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import { Icon } from '@iconify/react';
import "./LoginPage.css";
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";

function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async () => {
        const response = await axios.post("/api/users", {
            username,
            email,
            password,
        });
        console.log(response)
        if(response.status === 200){
            successNotification("Sign Up Successful", `Welcome!`);
            const jwtToken = response.headers["authorization"];
            localStorage.setItem("access_token", jwtToken);
            const decodedToken = jwtDecode(jwtToken);
            console.log(decodedToken);
            navigate("/scheduler");
        }
        else errorNotification("Sign Failed", "Please try again");
    };

    return (
        <div className="login-page">
        <card className="login-card"  title="Sign Up" bordered={false}>
        <Form
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={handleSubmit}
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
                       type="username"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       placeholder="Username" />
            </Form.Item>

            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Email!',
                    },
                ]}
            >
                <Input
                    prefix={<Icon icon="ant-design:mail-outlined" />}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
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
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Sign Up
                </Button>
            </Form.Item>
        </Form>
        </card>
        </div>
    );
}

export default SignUpPage;