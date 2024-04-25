const messages = {
    userMessage:{
        emailExist:'Email already exists',
        userNotFound:'User not found',
        invalidCredentials: 'Invalid username or password',
        emailNotExist:'User with given email does not exist',
        resetPassLink:'password reset link sent to your email account',
        passwordNotMatch:'password does not match with current password',
        inviteSuccess:'Invited successfully',
        suspendedAccount:'User not found. Please contact system admin or support team for more details',
        userBlocked: 'Your account is blocked due to multiple incorrect login attempts. Please contact system admin or support team.',
        inactiveUser:'Your account is not active. Please contact system admin or support team.'
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
        profileUpdate:'Profile update successfully',
        profileDelete:'Profile delete successfully'
    }
};
  
module.exports = messages;