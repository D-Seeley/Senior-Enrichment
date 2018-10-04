import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import SchoolForm from './forms/SchoolForm'

const Schools = ({ schools }) => {
    console.log('Schools ran', schools)

    return (
        <div>
            <h1>Schools</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Description</th> 
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {schools.map(school => {
                        return ( 
                            <tr key={school.id}>
                                <td>{school.id}</td>
                                <td>{school.name}</td>
                                <td>{school.address}</td>
                                <td>{school.description}</td>
                                <td>
                                    <Link to={`Schools/${school.id}`}>edit</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <hr />
            <h2>Add New School</h2>
            <SchoolForm />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        schools: state.schools
    }
}

export default connect(mapStateToProps) (Schools)