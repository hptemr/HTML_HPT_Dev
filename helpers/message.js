const messages = {
    userMessage:{
        emailExist:'Email already exists',
        userNotFound:'User not found',
        invalidCredentials: 'Invalid username or password',
        emailNotExist:'User with given email does not exist',
        resetPassLink:'password reset link sent to your email account',
        passwordNotMatch:'password does not match with current password',
        inviteSuccess:'invited successfully'
    },
    infoMessage:{
        updated: 'Updated successfully',
        deleted: 'Deleted successfully',
        emailSent: 'Email sent successfully',
        passwordReset: 'Password reset successfully',
        login: 'Login successfully',
        linkExpired: 'Oops your link has expired',
        linkInvalid: 'Link is invalid',
        linkValid: 'Link is valid',
        passwordChange: "Password has been changed successfully!"
    },
    commonMessage:{
        created: 'created successfully',
        internalServerError: 'Internal server error',
        wentWrong: 'Something went wrong',
        profileUpdate:'Profile update successfully'
    }
};
  
module.exports = messages;