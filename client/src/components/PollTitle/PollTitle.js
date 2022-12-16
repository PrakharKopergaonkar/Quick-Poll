import React, {useState} from 'react'
import {EditOutlined} from '@ant-design/icons'
import { Input, Button } from 'antd';
import classes from './PollTitle.module.css';
export default function PollTitle(props) {
    const [editTitle, setEditTitle] = useState(false);
    return (
        <div className={classes.createPollTitle}>
            {
                editTitle ?
                    <Input
                        placeholder="Enter poll title"
                        value={props.title}
                        onChange={(e) => props.setTitle(e.target.value)}
                        onBlur={() => setEditTitle(false)}
                        className={`${classes.input} ${classes.pollTitle}`}
                        autoFocus
                    /> :
                    <div className={classes.pollTitle} onClick={() => setEditTitle(true)}>
                        {props.title}
                    </div>
            }
            <Button
                icon={<EditOutlined />}
                style={{ marginLeft: "auto" }}
                onClick={() => setEditTitle(true)}
                disabled={editTitle}
            />
        </div>
    )
}
