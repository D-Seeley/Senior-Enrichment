import React from 'react'
import { connect } from 'react-redux'
import { deleteStudent } from '../store'

import EditStudentForm from './forms/EditStudentForm'

const Student = (props) => {
    const {student, id, redirect } = props

    return student ? (
        <div>
            <EditStudentForm id= { id } redirect={ redirect } />
            <button onClick= {()=> props.deleteStudent(id)}>
                Delete Student
            </button>
                
        </div>
    ) : null
}

const matchStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id * 1
    const student = state.students.find((student)=> { return student.id == id })
    
    return {
        student,
        id,
        redirect: ()=> ownProps.history.push('/Students')
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteStudent: (id)=> {
            dispatch(deleteStudent(id))
            ownProps.history.push('/Students')
        }
    }
}

export default connect(matchStateToProps, mapDispatchToProps)(Student)