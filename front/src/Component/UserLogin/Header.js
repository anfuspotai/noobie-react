import React from 'react'

const Header = (props) => {
    return (
        <div className="row">
            <div style={{background:'black',height:'15rem'}}>
                <h1>{props.mainHeading}</h1>
            </div>
        </div>
    )
}

export default Header
