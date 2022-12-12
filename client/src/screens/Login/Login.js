import React, { useCallback} from 'react';
import { Input, Button, Form } from 'antd';
import PageLayout from '../../layout/PageLayout';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classes from './Login.module.css';
import { postLogin } from '../../actions/authActions';
function Login() {
const dispatch = useDispatch();

const onFinish = useCallback((value) => {
    dispatch(postLogin(value))
}, [dispatch])

return (
    <div className={classes.loginContainer}>
        <div className={classes.loginHeader}>
            Sign in to Quick Poll
        </div>
        <div className={classes.loginInputForm}>
            <Form
                layout='vertical'
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                style={{ width: "100%" }}
            >
                <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                >
                    <Input
                        placeholder=""
                        type='email'
                    // value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        placeholder=""
                        type='password'
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Link to="/forgetPassword" style={{ marginLeft: "auto" }}>
                        Forget Password ?
                    </Link>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        style={{ width: "100%" }}
                        htmlType="submit"
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
        <br />
        <div className={classes.loginRegisterTab}>
            New to Quick Poll ? &nbsp; <Link to="/signup" style={{ marginLeft: "auto", textDecoration: "none" }}> Create an account </Link>
        </div>
    </div>
);
}

export default PageLayout(null, Login)
