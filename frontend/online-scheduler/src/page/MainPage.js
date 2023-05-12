import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {errorNotification, successNotification} from "../Notification";
import {Button, Calendar, Card, Col, DatePicker, Dropdown, Form, Input, Menu, Row, Space, Table} from "antd";
import "./MainPage.css";
import moment from 'moment';
import {UserOutlined} from "@ant-design/icons";


const { Item } = Menu;
function MainPage() {
    const [userEmail, setUserEmail] = useState("");
    const [schedules, setSchedules] = useState([]);
    const [user, setUser] = useState({});
    const [receiveUser, setReceiveUser] = useState({});
    const [viewMode, setViewMode] = useState('table');

    const handleViewModeChange = () => {
        setViewMode((prevMode) => (prevMode === 'table' ? 'calendar' : 'table'));
    };

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const jwtToken = localStorage.getItem("access_token");
                const decodedToken = jwtDecode(jwtToken);
                console.log(decodedToken);
                setUserEmail(decodedToken.sub);

                const schedulerResponse = await axios.get(`/api/schedules/${decodedToken.sub}`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
                console.log("Scheduler response:", schedulerResponse.data);
                setSchedules(schedulerResponse.data);

                const userResponse = await axios.get(`/api/users/${decodedToken.sub}`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
                console.log("User response:", userResponse.data);
                const temp = {
                    id: userResponse.data.id,
                    username: userResponse.data.username,
                    password: userResponse.data.password,
                    email: userResponse.data.email
                };
                setUser(temp);
            } catch (error) {
                console.log(error);
            }
        };

        fetchSchedules();
    }, []);

    const makeAppointment = async (values) => {
        try {
            if (values.startTime >= values.endTime) {
                errorNotification("Appointment Failed", "End time has to be later than start time");
                return;
            }
            const userResponse = await axios.get(`/api/users/${values.email}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            console.log("Make a appointment with User:", userResponse.data);
            const temp = {
                id: userResponse.data.id,
                username: userResponse.data.username,
                password: userResponse.data.password,
                email: userResponse.data.email
            };
            setReceiveUser(temp);

            const response = await axios.post("/api/schedules", {
                user1: user,
                user2: receiveUser,
                startTime: values.startTime,
                endTime: values.endTime
            });
            console.log("Response:", response);
            if (response.status === 200) {
                successNotification("Make a appointment Successful", "Add new appointment!");
            }
        } catch (error) {
            console.error("Error:", error);
            errorNotification("Appointment Failed", "An error occurred. Please check the info and try again later.");
        }
    };

    const columns = [
        {
            title: 'Meeting with',
            dataIndex: ['user1', 'username'],
            key: 'user',
            render: (username, record) =>
                record.user2.email === userEmail ? record.user1.email : record.user2.email,
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (startTime) => moment(startTime).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: 'End Time',
            dataIndex: 'endTime',
            key: 'endTime',
            render: (endTime) => moment(endTime).format('YYYY-MM-DD HH:mm:ss'),
        },
    ];

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        window.location.reload();
    };

    const ScheduleCalendar = ({ schedules }) => {
        // Function to customize date cell rendering
        const dateCellRender = (date) => {
            // Filter schedules for the current date
            const filteredSchedules = schedules.filter(
                (schedule) => date.isSame(schedule.startTime, 'day')
            );

            // Render the schedules in the cell
            return (
                <ul>
                    {filteredSchedules.map((schedule) => (
                        <li key={schedule.id}>
                            Meeting with:
                            <ul>
                                {schedule.user1.username === userEmail ? (
                                    <li>{schedule.user2.username}</li>) : (
                                    <li>{schedule.user1.username}</li>)}
                            </ul>
                            <ul>From {moment(schedule.startTime).format('YYYY-MM-DD HH:mm:ss')}</ul>
                            <ul>To {moment(schedule.endTime).format('YYYY-MM-DD HH:mm:ss')}</ul>
                        </li>
                    ))}
                </ul>
            );
        };
        return <Calendar dateCellRender={dateCellRender} />;
    };

    const handleMenuClick = (menuItem) => {
        if (menuItem.key === 'logout') {
            handleLogout();
        }
    };

    const userMenu = (
        <Menu onClick={handleMenuClick}>
            <Item key="email">
                <span>Email: {userEmail}</span>
            </Item>
            <Item key="logout">
                <span>Logout</span>
            </Item>
        </Menu>
    );

    return (
        <div style={{ backgroundColor: '#f5f5f5', padding: '16px' }}>

            <Space style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ color: '#1890ff' }}>Online schedule system</h1>
                <Dropdown overlay={userMenu} placement="bottomRight">
                    <a href="#" style={{ fontSize: '28px', marginLeft: 'auto', marginRight: '16px',color: '#1890ff' }}>
                        <UserOutlined />
                    </a>
                </Dropdown>
            </Space>
            <Card title="Make New Appointment" style={{ backgroundColor: '#fff', marginBottom: '16px' }}>
            <Form layout="horizontal" onFinish={makeAppointment}>
                <Row>
                    <Col style={{ marginRight: '16px' }} span={6}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your email',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col style={{ marginRight: '16px' }}  span={5}>
                        <Form.Item
                            label="Start Time"
                            name="startTime"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select the start time',
                                },
                            ]}
                        >
                            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="End Time"
                            name="endTime"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select the end time',
                                },
                            ]}
                        >
                            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Make Appointment
                    </Button>
                </Form.Item>
            </Form>
            </Card>

            <Card title={<Row align="middle">
                <Col span={20}>
                    <Card.Meta title="Schedule View" style={{ color: '#1890ff' }} />
                </Col>
                <Col span={4} style={{ textAlign: 'right' }}>
                    <Button type="primary" onClick={handleViewModeChange}>
                        {viewMode === 'table' ? 'Switch to Calendar' : 'Switch to Table'}
                    </Button>
                </Col>
            </Row>} style={{ backgroundColor: '#fff' }}>
                <div>
                {viewMode === 'table' ? (
                    <Table dataSource={schedules} columns={columns} />
                ) : (
                    <ScheduleCalendar schedules={schedules} />
                )}
                </div>
            </Card>
        </div>
    );
}


export default MainPage;
