import { Spin } from 'antd';
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import classes from './Loader.module.css';
export default function Loader() {
    const loading = useSelector((state) => state.loading);
    return (
        <Fragment>
            {
                loading ?
                    <div className={classes.loadingContainer}>
                        <Spin className={classes.loader} size="large"/>
                        <p style={{color:"white"}}>  Loading ...  </p>
                    </div>
                    : null
            }
        </Fragment>
    )
}
