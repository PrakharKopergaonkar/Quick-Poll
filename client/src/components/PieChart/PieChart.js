import React, { Fragment, useMemo } from 'react'
import { PieChart as Pie } from 'react-minimal-pie-chart';
export default function PieChart({ options, className, radius }) {
    const totalValue = useMemo(() => {
        return options.reduce((prev, curr) => {
            return Number(prev) + Number(curr.value)
        }, 0);
    }, [options])

    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <div style={{display:"flex", gap:"10px", justifyContent:"center"}}>
                {
                    options.map((option, index) => (
                        <Fragment key={index}>
                            <div style={{height:"20px", backgroundColor:option.color, width:"20px"}}> 
                            </div>
                            {option.title}
                        </Fragment>
                    ))
                }
            </div>
            <Pie
                data={options}
                totalValue={totalValue}
                radius={radius ? radius : 35}
                className={className}
            />
        </div>
    )
}
