import React, { useCallback, useMemo, useState } from 'react'
import Header from '../../components/Header/Header'
import PageLayout from '../../layout/PageLayout'
import { Button, Input, Row, Col } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import classes from './CreatePoll.module.css';
import PollTitle from '../../components/PollTitle/PollTitle';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { createPollAPI } from '../../config/API';
import { useNavigate } from 'react-router-dom';
import { setAlert } from '../../actions/alertActions';
import PieChart from '../../components/PieChart/PieChart';
import { successCreatedPoll } from '../../config/successMessage';


function CreatePoll() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("QuickPoll");
  const { userID } = useSelector((state) => state.auth);
  const [options, setOptions] = useState([
    { title: "option1", value: 100, color: "#A020F0" }
  ])


  const [optionTitle, setOptionTitle] = useState("");
  const [optionColor, setOptionColor] = useState("#00FF00");
  const [optionValue, setOptionValue] = useState("");

  const disableAddOption = useMemo(() => {
    return optionTitle.trim().length === 0 ||
      optionColor.trim().length === 0 ||
      optionValue.trim().length === 0
  }, [optionTitle, optionColor, optionValue])

  const addOption = useCallback(() => {
    setOptions([...options, { title: optionTitle, color: optionColor, value: optionValue }])
  }, [optionTitle, optionColor, optionValue, options])

  const editOptionColor = useCallback((color, index) => {
    setOptions((options) => options.map(((option, currIndex) => {
      if (currIndex === index) {
        return {
          ...option,
          color
        }
      }
      return option
    })))
  }, [])

  const editOptionValue = useCallback((value, index) => {
    setOptions((options) => options.map(((option, currIndex) => {
      if (currIndex === index) {
        return {
          ...option,
          value
        }
      }
      return option
    })))
  }, [])

  const deleteOption = useCallback((index) => {
    setOptions((option) => option.filter((option, currIndex) => currIndex !== index))
  }, [])

  const handleCreatePoll = useCallback(async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("tokenLivePoll")}` },
      };
      await axios.post(createPollAPI, { title, userID, options }, config)
      dispatch(setAlert(successCreatedPoll, "success"))
      navigate("/");
    } catch (error) {
      const { errors, message } = error.response.data;
      if (Array.isArray(errors)) {
        errors.forEach((err) => {
          dispatch(setAlert(err.msg, "error"))
        })
      } else {
        dispatch(setAlert(message, "error"))
      }
    }
  }, [title, options, userID, dispatch, navigate])

  return (
    <div className={classes.createPollContainer}>
      <PollTitle
        title={title}
        setTitle={setTitle}
      />
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 14 }}>
          <div className={classes.addOption}>
            <Input
              type="text"
              placeholder='option name'
              className={classes.optionInput}
              value={optionTitle}
              onChange={(e) => setOptionTitle(e.target.value)}
            />
            <Input
              type="number"
              placeholder='count'
              className={classes.optionInput}
              value={optionValue}
              onChange={(e) => setOptionValue(e.target.value)}
            />
            <input
              type="color"
              className={classes.optionInput}
              value={optionColor}
              onChange={(e) => setOptionColor(e.target.value)}
            />
            <Button
              icon={<PlusOutlined />}
              disabled={disableAddOption}
              onClick={addOption}
            />
          </div>
          <div className={classes.optionsClass}>
            {
              options.map((option, index) => (
                <div key={index} className={classes.optionContainer}>
                  <div style={{ width: "100%" }}>
                    {option.title}
                  </div>
                  <input
                    type="color"
                    // className={classes.optionInput}
                    value={option.color}
                    onChange={(e) => editOptionColor(e.target.value, index)}
                    style={{ width: "100%" }}
                  />
                  <Input
                    type="number"
                    placeholder='count'
                    // className={classes.optionInput}
                    value={option.value}
                    onChange={(e) => editOptionValue(e.target.value, index)}
                    style={{ width: "100%" }}
                  />
                  <Button
                    icon={<DeleteOutlined />}
                    className={classes.deleteButtonClass}
                    onClick={() => deleteOption(index)}
                  />
                </div>
              ))
            }
          </div>
          <Button onClick={handleCreatePoll} icon={<PlusOutlined />} > Create Poll </Button>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 10 }}>
          <PieChart options={options}/>
        </Col>
      </Row>
    </div>
  )
}

export default PageLayout(Header, CreatePoll);