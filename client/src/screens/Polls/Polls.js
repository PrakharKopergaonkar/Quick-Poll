import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePoll, getAllPolls } from '../../actions/pollActions';
import Header from '../../components/Header/Header';
import PieChart from '../../components/PieChart/PieChart';
import PageLayout from '../../layout/PageLayout';
import classes from './Polls.module.css';
function Polls() {
  const dispatch = useDispatch();
  const { polls } = useSelector((state) => state.polls)
  const { userID } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllPolls(userID));
  }, [dispatch, userID])

  const handleDeletePoll = useCallback((id) => {
    const flag = window.confirm("Are you sure to delete the poll ?")
    if (flag) {
      dispatch(deletePoll(id))
    }
  }, [dispatch])

  return (
    <div>
      <Row gutter={16}>
        {
          polls.map((poll, index) => (
            <Col
              xl={{ span: 8 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              key={index}
              className={classes.pollContainer}
            >
              <Card
                title={poll.title}
                actions={[
                  <EditOutlined />,
                  <DeleteOutlined onClick={() => handleDeletePoll(poll?._id)} />
                ]}
                size="small"
                className={classes.pollCards}
              >
                <PieChart
                  options={poll.options}
                  className={classes.pieChart}
                  radius={40}
                />
              </Card>
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

export default PageLayout(Header, Polls)