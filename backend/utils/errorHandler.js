function errorMessage(error) {
    let message = "";
    // Note : More Error Codes would be added as per our requirements.
    switch (error.code) {
        case 'ENOTFOUND':
            message = "Host Connection Error.";
            break;
        case 'ECONNREFUSED':
            message = "Connection Refused.";
            break;
        case '403':
            message = "Server is Refusing to Respond to your Request.";
            break;
        case '404':
            message = "Requested Resource could not be Found.";
            break;
        case '500':
            message = "Internal Server Error.";
            break;

        case 'JOIFALSE':
            message = error.message;
            break;
        case 'JWTFALSE':
            message = "Session expired, please login again !!!";
            break;
        case 'TOKENFALSE':
            message = "Login failed!!!";
            break;
        case 'LOGINFALSE':
            message = "Your mail Id is not valid !";
            break;
        case 'SEQFALSEINSERT':
            message = "Insertion/Updation in the table failed !";
            break;
        case 'INVALIDID':
            message = "Requested data not found !";
            break;
        case 'NORECORD':
            message = "No record found for this data";
            break;
        case 'UNIQUEVIOLATION':
            message = "Name must be unique";
            break;
        case 'USERALREADYEXISTS':
            message = "Name must be unique";
            break;

        case 'UNAUTHORIZEDACCESS':
            message = "Unauthorized Access";
            break;
        default:
            message = "Message not found.";
    }
    return message;
}

module.exports = errorMessage;