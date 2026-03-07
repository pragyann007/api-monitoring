
class SecurityUtils {
    static PASSWORD_CHECKS = {
        minLength:process.env.PASSWORD_MIN_LENGTH || 8 ,
        requireUpperCase:(process.env.PASSWORD_UPPERCASE || "true") == "true",
        requireLowerCase:(process.env.PASSWORD_LOWERCASE || "true") == "true" ,
        requireNumbers: (process.env.PASSWORD_NUMBERS|| "true") == "true" ,
        requireSymbols: (process.env.PASSWORD_SYMBOLS|| "true") == "true" ,

    }

    static validatePassword(password){

        const errors =  [];

        const requirements = this.PASSWORD_CHECKS ;

        if(!password){
            return{
                sucess:false,
                errors:["Password is required .."]
            }
        }

        if(password.length < requirements.minLength){
        
                errors.push(`Password must be greater than ${requirements.minLength} chars  `)
           
        }

        if (requirements.requireLowerCase && !/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }

        if (requirements.requireLowerCase && !/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }

        if (requirements.requireNumbers && !/[0-9]/.test(password)) {
            errors.push('Password must contain at least one number');
        }

        if (requirements.requireLowerCase && !/[^A-Za-z0-9]/.test(password)) {
            errors.push('Password must contain at least one special character');
        }

        const weakPasswrods = [
             'password', '123456', 'qwerty', 'admin', 'letmein',
            'password123', 'admin123', '12345678', 'welcome'
        ]

        if(weakPasswrods.includes(password.toLowerCase())){
            errors.push("Passwors is vey weak and easily guessable ..")
        }


        return {
            sucess:errors.length ===0,
            errors
        }

    }


}

export default SecurityUtils 