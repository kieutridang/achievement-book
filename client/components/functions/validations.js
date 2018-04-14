

let validations = {
    avatar: {
        message: "You must upload your profile picture"
    },
    username: [
        { regExp: '^.+', message: "Username is required", valid: true },
        { regExp: '^.{0,5}$', message: 'Username is at least 6 characters', valid: false }
    ],
    password: [
        { regExp: '^.+', message: "Password is required", valid: true },
        { regExp: '^.{0,5}$', message: 'Password is at least 6 characters', valid: false }
    ],
    name: [
        { regExp: '^.+', message: "Full name is required", valid: true },
        { regExp: '(^| )[a-z]', message: 'Your name need capitalized', valid: false }
    ],
    email: [
        { regExp: '^.+', message: "Email is required", valid: true },
        { regExp: '^[a-z0-9\\.]*[a-z0-9]@[a-z]+\\.([a-z]+\\.)*[a-z0-9]+$', message: 'Email is not valid', valid: true }
    ],
    DOB: [
        { regExp: '^.+', message: 'Not valid date', valid: true }   
    ],
    gender: {
        message: 'You must choose your gender'
    },
    department : {
        message: 'You must choose at least one department'
    }
}

export {validations}