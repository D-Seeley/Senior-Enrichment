import React, { Component } from 'react'
import { connect } from 'react-redux'
// import School from './School';
import { createSchool } from '../../store'

class SchoolForm extends Component {
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

export default connect(null, mapDispatchToProps)(SchoolForm)