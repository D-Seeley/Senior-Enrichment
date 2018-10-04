import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import StudentForm from './forms/StudentForm'

const Students = ({ students }) => {
    console.log(students)

    function sortGpa (elA, elB) {
        return elA.gpa < elB.gpa
    }
   
    return (
        <div>
            <h1>Students</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Lastname</th>
                        <th>Firstname</th> 
                        <th>School</th>
                        <th>GPA</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {students.sort(sortGpa).map(student => {
                        return ( 
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.lastName}</td>
                                <td>{student.firstName}</td>
                                <td>{student.school ? student.school.name : '----'}</td>
                                <td>{student.gpa}</td>
                                <td>
                                    <Link to={`Students/${student.id}`}>edit</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <hr />
            
            <h2>Add New Student</h2>
            <StudentForm />
        </div>
    )
}

const mapStateToProps = (state) => {
    return { students: state.students }
}

export default connect(mapStateToProps)(Students)