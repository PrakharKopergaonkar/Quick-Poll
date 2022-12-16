import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Tabs } from 'antd';
import classes from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { postLogout } from '../../actions/authActions';

export default function Header() {
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const auth = useSelector((state) => state.auth);
    const location = useLocation();
    const [activeKey, setActiveKey] = useState("");

    useEffect(() => {
        if(location?.pathname === "/") {
            setActiveKey("1");
        } else if(location?.pathname === "/createPoll") {
            setActiveKey("2");
        }
    }, [location])

    const handleTabClick = useCallback((key) => {
        if(key === "1") {
            Navigate("/");
        } else if(key === "2") {
            Navigate("/createPoll")
        }
    }, [Navigate])

    return (
        <div className={classes.HeaderContainer}>
            <div className={classes.HeaderContent}>
                <div className={classes.HeaderTitle} onClick={() => Navigate("/")}>
                    <img src="./images/fingerPoll.jpg" alt="" className={classes.HeaderLogo} />
                    Quick Poll
                </div>
                <div className={classes.HeaderRightContainer}>
                    {
                        location?.pathname !== "/login" && location?.pathname !== "/signup" &&
                        <Tabs activeKey={activeKey} className={classes.HeaderTabs} onTabClick={handleTabClick}>
                            <Tabs.TabPane tab="Polls" key="1"> </Tabs.TabPane>
                            <Tabs.TabPane tab="+ Create Poll" key="2"> </Tabs.TabPane>
                        </Tabs>
                    }
                    {
                        auth?.isAuthenticated ?
                            <Button className={classes.HeaderButton} onClick={() => dispatch(postLogout())}>
                                Logout
                            </Button> :
                            <Button className={classes.HeaderButton} onClick={() => Navigate("/login")}>
                                Sign In
                            </Button>
                    }
                </div>
            </div>
        </div>
    )
}
