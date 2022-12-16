import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from 'antd';

import { removeAlert } from '../../actions/alertActions';
import classes from './Alerts.module.css';
export default function Alerts() {
  const alerts = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const onClose = useCallback((id) => {
    dispatch(removeAlert(id))
  }, [dispatch])

  return (
    <div className={classes.alertsContainer}>
      {
        alerts.map(({ id, alertType, msg }) => (
          <Alert
            key={id}
            onClose={() => onClose(id)}
            message={msg} closable type={alertType}
            showIcon
            className={classes.alert}
          />
        ))
      }
    </div>
  )
}
