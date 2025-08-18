const jwt = require('jsonwebtoken');

const generateToken = ({email,admin}) =>{
    const token = jwt.sign(
        { email,admin},
        'my-secret-key'
    )
    return token;


}

module.exports = generateToken;