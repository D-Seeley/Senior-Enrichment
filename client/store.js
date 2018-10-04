import Redux, { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'

//Constant Templates
const UPLOAD_DATA = 'UPLOAD_DATA'
const DELETE_SCHOOL = 'DELETE_SCHOOL'
const CREATE_SCHOOL = 'CREATE_SCHOOL'
const CREATE_STUDENT = 'CREATE_STUDENT'
const DELETE_STUDENT = 'DELETE_STUDENT'
const UPDATE_STUDENT = 'UPDATE_STUDENT'

//Action Creators
export const _uploadData = (data) => ({
    type: UPLOAD_DATA,
    data
})

const _createSchool = (school) => ({
    type: CREATE_SCHOOL,
    school
})

const _deleteSchool = (id) => ({
    type: DELETE_SCHOOL,
    id
})

const _createStudent = (student) => ({
    type: CREATE_STUDENT,
    student
})

const _deleteStudent = (id) => ({
    type: DELETE_STUDENT,
    id
})

const _updateStudent = (student) => ({
    type: UPDATE_STUDENT, 
    student
})

//Thunk Creators
export const createSchool = (data) => {
    const {name, address, description} = data
    const schoolData = {
        name, 
        address, 
        description
    }
    console.log('createSchool was called')
    return (dispatch) => {
        axios.post('/api/schools', schoolData)
        .then(res => res.data)
        .then((school)=> dispatch(_createSchool(school)))
    }
}

export const deleteSchool = (id) => {
    return (dispatch) => {
      axios.delete(`/api/schools/${id}`)
        .then(()=> dispatch(_deleteSchool(id)))
    }
}

export const createStudent = (data) => {
    const {firstName, lastName, gpa, schoolId} = data
    const studentData = {
        firstName, 
        lastName, 
        gpa,
        schoolId
    }
    console.log('createStudent was called')
    return (dispatch) => {
        axios.post('/api/students', studentData)
        .then(res => res.data)
        .then((student)=> dispatch(_createStudent(student)))
    }
}

export const deleteStudent = (id) => {
    return (dispatch) => {
      axios.delete(`/api/students/${id}`)
        .then(()=> dispatch(_deleteStudent(id)))
    }
}

export const updateStudent = (student) => {
    return (dispatch) => {
        axios.put(`/api/students/${student.id}`, student)
            .then(response => response.data)
            .then(_student => dispatch(_updateStudent(_student)))
    }}


const initialState = {
    schools: [],
    students: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_DATA:
            state = {
                schools: action.data.schools,
                students: action.data.students
            }
        break
        case CREATE_SCHOOL:
         state = { students: state.students, schools: 
            [...state.schools, action.school]
        }
        break
        case DELETE_SCHOOL:
            state = { students: state.students, schools: 
                 state.schools.filter(el => (el.id !== action.id)
                )
             }
        break
        case CREATE_STUDENT:
            state = { schools: state.schools, students: 
                [...state.students, action.student]
            }
        break
        case DELETE_STUDENT:
            state = { 
                schools: state.schools, 
                students:
                    state.students.filter(el => { return (el.id !== action.id)})
            }
        break
        case UPDATE_STUDENT:
            const idx = state.students.findIndex(el => el.id == action.student.id)
            state.students[idx] = action.student
        break
    }


    return state
}

const store = createStore( reducer, applyMiddleware(thunk) );

//Not sure what this line of code does, was in a project. 
//window.reduxStore = store

export default store