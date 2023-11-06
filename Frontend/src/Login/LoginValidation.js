function LoginValidation(values){

    let error = {}
        //const email_pattern = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
        //const password_pattern = /^([@#](?=[^aeiou]{7,13}$)(?=[[:alnum:]]{7,13}$)(?=.*[A-Z]{8,}.*$).+)$/

        if (values.email === '') {
            error.email = "Email should not be empty"
        }
        // else if(!email_pattern.test(values.email)) {
        //     error.email = "Email didn't match"
        // }
        else {
            error.email = ''
        }

        if(values.password === ''){
            error.password = 'Password should not be empty.'
        }
        // else if(!password_pattern.test (values.password)){
        //     error.password = "Password didn't match"
        // }

        else{
            error.password = '';
        }

        return error;
            
}

export default LoginValidation;