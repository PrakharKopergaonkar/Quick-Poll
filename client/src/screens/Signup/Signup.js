import React, { useCallback } from 'react';
import { Input, Button, Form } from 'antd';
import PageLayout from '../../layout/PageLayout';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classes from './Signup.module.css';
import { postSignUp } from '../../actions/authActions';
function Signup() {
  const dispatch = useDispatch();

  const onFinish = useCallback((value) => {
    dispatch(postSignUp(value))
  }, [dispatch])

  return (
    <div className={classes.signupContainer}>
      <div className={classes.signupHeader}>
        Sign up to Quick Poll
      </div>
      <div className={classes.signupInputForm}>
        <Form
          layout='vertical'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          style={{ width: "100%" }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input your Name!',
              },
            ]}
          >
            <Input
              placeholder=""
              type='text'
            // value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
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
          <Form.Item
            name="confirm password"
            label="Confirm Password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              })
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
            <Button
              type="primary"
              style={{ width: "100%" }}
              htmlType="submit"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
      <br />
      <div className={classes.signupLoginTab}>
        Already having account ? &nbsp; <Link to="/login" style={{ marginLeft: "auto", textDecoration: "none" }}> Login </Link>
      </div>
    </div>
  );
}

export default PageLayout(null, Signup)
