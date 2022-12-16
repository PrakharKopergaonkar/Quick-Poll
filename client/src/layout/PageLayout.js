import React from 'react';
import classes from './PageLayout.module.css'
const PageLayout = (Header, Main, Footer) => {
    return (props) => {
        return (
            <div className={classes.PageLayout}>
                {Header && <Header {...props} />}
                <div className={classes.pageContent}>
                    {Main && <Main {...props} />}
                </div>
                {Footer && <Footer {...props} />}
            </div>
        )
    } 
}

export default PageLayout;