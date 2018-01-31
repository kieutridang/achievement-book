

let checkValidate = {
    checkAvatar: function(avatar, required, validations) {
        if (required && avatar == '../../../public/default-profile-pic.png') 
            return validations.message;
        return null;
    },
    checkText: function(value, validations){
        value = value.split(' ').filter(function(c){ return c != ''}).join(' ');
        for (var i = 0; i < validations.length; ++i){
            let regExp = new RegExp(validations[i].regExp);
            if (regExp.test(value) != validations[i].valid){
                return validations[i].message;
            }
        }
        return null;
    },
    checkSingleChoice: function(choices, required, validations){
        if (required && choices.length == 0) return validations.message;
        return null;
    },
    checkMultipleChoice: function(choices, required, validations){
        if (required && choices.length == 0) return validations.message;
        return null;
    }
}


export {checkValidate}