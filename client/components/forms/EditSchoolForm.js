import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSchool } from '../../store'

class EditSchoolForm extends Component {
    constructor (props) {
        super(props)

        this.state = {
            name: '',
            address: '',
            description: ''
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
            <div id='SchoolForm'>
                <form onSubmit= { this.handleSubmit } >
                    <label className={'formLable'}>
                        School Name
                        <input type='text' name={'name'} value={ this.state.name } onChange={ this.handleChange }/>
                    </label>
                    <label name={'address'} className={'formLable'} >
                        School Address
                        <input type='text' name={'address'} value={ this.state.address } onChange={ this.handleChange }/>
                    </label>
                    <label name={'description'} className={'formLable'} >
                        School Description
                        <input type='text' name={'description'} value={ this.state.description } onChange={ this.handleChange }/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({ 
    eventHandler: (data)=> dispatch(createSchool(data)) 
})

export default connect(null, mapDispatchToProps)(EditSchoolForm)


////////////////////////////////
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateStudent } from '../../store'

class EditStudentForm extends Component {
    constructor (props) {
        super(props)

        const { firstName, lastName, gpa, id} = props.student
        // console.log('EditStudentForm student is: ', props.student)
        
        this.state = {
            firstName,
            lastName,
            gpa, 
            id
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
        // console.log('State when button clicked is: ', this.state)
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
                    <input type="submit" value="Update" />
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({ 
    eventHandler: (data)=> dispatch(updateStudent(data)) 
})

export default connect(null, mapDispatchToProps)(EditStudentForm)