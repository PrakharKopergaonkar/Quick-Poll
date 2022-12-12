import React from 'react';
import classes from './PageLayout.module.css'
const PageLayout = (Header, Main, Footer) => {
    return (props) => {
        return (
            <div className={classes.PageLayout}>
                {Header && <Header {...props} />}
                {Main && <Main {...props} />}
                {Footer && <Footer {...props} />}
            </div>
        )
    }
}

export default PageLayout;