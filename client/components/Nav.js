import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Nav = () => {
    
    return (
        <nav>   
            <Link to='/'> Home </Link>
            <Link to='/Schools'> Schools </Link>
            <Link to='/Students'> Students </Link>
        </nav> 
    )
    
}

const mapStateToProps = () => {
    return {}
}

export default connect(mapStateToProps)(Nav)