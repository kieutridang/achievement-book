

let validations = {
    name: [
        { regExp: '^.{0,7}$', message: 'Your name must be at least 8 character', valid: false },
        { regExp: '(^| )[a-z]', message: 'Your name need capitalized', valid: false }
    ],
    gender: {
        message: 'You must choose one'
    },
    department : {
        message: 'You must choose at least one department'
    }
}

export {validations}