import React from 'react'
import { connect } from 'react-redux'
import { deleteSchool } from '../store'

const School = (props) => {
    const {school, id, deleteSchool } = props
    console.log(props)

    return school ? (
        <div>
            <button onClick= {()=> props.deleteSchool(id)}>
                x
            </button>
            <div>
                <h2>{school.name}</h2>
                <p><i>{school.address}</i></p>
                <p>{school.description}</p>
            </div>
                
        </div>
    ) : null
}

const matchStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id * 1
    const school = state.schools.find((school)=> { return school.id == id })
    
    return {
        school: school,
        id: id
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteSchool: (id)=> {
            dispatch(deleteSchool(id))
            ownProps.history.push('/Schools')

        }
    }
}

export default connect(matchStateToProps, mapDispatchToProps)(School)

 