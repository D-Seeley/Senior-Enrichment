import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'
import store, { _uploadData } from '../store'

//Import Components
import Schools from './Schools'
import Nav from './Nav'
import SchoolForm from './forms/SchoolForm'
import School from './School'
import Students from './Students'
import Student from './Student'

export default class App extends Component {
    constructor() {
        super()
    }

    componentDidMount ()  {
        let schools, students

        axios.get('/api/schools')
            .then(res => res.data)
            .then(_schools => schools = _schools)
                .then(()=> axios.get('/api/students'))
                .then(res => res.data)
                .then(_students => {
                    students = _students
                    return { schools, students }
                })
                .then(data => store.dispatch(_uploadData(data)))
    }

    render() {
        return (
            <div>
                {/* <h1>The App to Be</h1> */}
                <Nav />
                <hr />
                <Switch>
                    <Route exact path='/' render= { ()=> <p>Welcome</p> } />
                    <Route exact path='/Schools' component= { Schools } />
                    <Route path='/Schools/:id' component=  { School } />
                    <Route exact path='/Students' component= { Students } />
                    <Route path='/Students/:id' component= { Student } />

                </Switch>
            </div>
        )
    }
}