import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStudent } from '../../store'

class StudentForm extends Component {
    constructor (props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            gpa: 0,
            schoolId: 1
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (event) {
        console.log('the event target value is: ', event.target.name, event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit (event) {
        event.preventDefault();
        console.log(event.target.schoolId.value)
        this.props.eventHandler(this.state)
    }

    render () {
        return (
            <div id='StudentForm'>
                <form onSubmit= { this.handleSubmit } >
                    <label className={'formLable'}>
                        First Name
                        <input type='text' name={'firstName'} value={ this.state.name } onChange={ this.handleChange }/>
                    </label>
                    <label name={'lastName'} className={'formLable'} >
                        Last Name
                        <input type='text' name={'lastName'} value={ this.state.address } onChange={ this.handleChange }/>
                    </label>
                    <label name={'gpa'} className={'formLable'} >
                        GPA
                        <input type='text' name={'gpa'} value={ this.state.description } onChange={ this.handleChange }/>
                    </label>
                    <label name={'schoolId'} className={'formLable'} >
                        School
                        <select name='schoolId' className={'formLable'} onChange={ this.handleChange }>
                            {this.props.schools.map( school => {
                                    return (<option key={school.id} value={school.id}>{ school.name }</option>)
                            })}
                        </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

const mapStatetoProps = (state) => ({
    schools: state.schools
})

const mapDispatchToProps = (dispatch) => ({ 
    eventHandler: (data)=> dispatch(createStudent(data)) 
})

export default connect(mapStatetoProps, mapDispatchToProps)(StudentForm)