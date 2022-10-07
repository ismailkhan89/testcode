import { validate } from 'validate.js'

const constraints = {
    username: {
      presence : true,
    },
    email: {
      presence: {
        message: "address is required"
      },
      email: true
    },
    Lpassword: {
      presence: {
        message: "is required"
      },
    },
    password: {
      presence: {
        message: "is required"
      },
      length: {
        minimum: 5,
        maximum: 20,
        message: 'must be at least 5 characters'
      }
    },
    confirmPassword: {
      presence: {
        message: "is required"
      },
    equality: "password",
    length: {
      minimum: 5,
      maximum: 20,
      message: 'Your password must be at least 5 characters'
    }
  },
  
  number : {
    presence: {
      message: "is required"
    },
    length: {
      minimum: 5,
      maximum: 20,
      message: function(value) {
        if(value.length < 5){
          return 'length should be minimum 5';
        }
        if(value.length > 15){
          return 'length should be maximum 15';
        }
      },
    }
  },
  summary: {
    presence : true,
  },
  description: {
    presence : true,
  },
  dueDate: {
    presence : true,
  },
}
export const validateFunc = (value, constraint) => {
    return validate(value, { [constraint]: constraints[constraint] });
}