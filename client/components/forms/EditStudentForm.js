import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateStudent } from '../../store'

class EditStudentForm extends Component {
    constructor (props) {
        super(props)

        const { student, schools } = this.props
        const { firstName, lastName, gpa, school, id} = student
        console.log('EditStudentForm schools are: ', schools)
        
        this.state = {
            firstName,
            lastName,
            gpa, 
            id,
            school, 
            schools
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit (event) {
        event.preventDefault();
        this.props.eventHandler(this.state)

    }

    render () {
        return (
            <div id='StudentForm'>
                <form onSubmit= { this.handleSubmit } >
                    <label className={'formLable'}>
                        First Name
                        <input type='text' name={'firstName'} value={ this.state.firstName } onChange={ this.handleChange }/>
                    </label>
                    <label name={'address'} className={'formLable'} >
                        Last Name
                        <input type='text' name={'lastName'} value={ this.state.lastName } onChange={ this.handleChange }/>
                    </label>
                    <label name={'description'} className={'formLable'} >
                        GPA
                        <input type='number' step='.01' name={'gpa'} value={ this.state.gpa } onChange={ this.handleChange }/>
                    </label>
                    <label name={'description'} className={'formLable'} >
                        ID
                        <input type='text' name={'id'} value={ this.state.id } disabled={ true }/>
                    </label>
                    <label name={'schoolId'} className={'formLable'} >
                        School
                        <select name='schoolId' className={'formLable'} defaultValue={ this.state.school ? this.state.school.id : null } onChange={ this.handleChange }>
                            {this.props.schools.map( _school => {
                                    return (<option key={_school.id}  value={_school.id}>{ _school.name }</option>)
                            })}
                        </select>
                    </label>
                    <input type="submit" value="Update" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.id * 1
    const student = state.students.find(student => {return student.id == id})
    const schools = state.schools
    
    return {
        student, schools
    }
}

const mapDispatchToProps = (dispatch, ownProps) => { 
    return {
        eventHandler: (data)=> {
            dispatch(updateStudent(data))
            ownProps.redirect()
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStudentForm)