const messages = {
    userMessage: {
        emailExist: 'Email already exists',
        userNotFound: 'User not found',
        invalidCredentials: 'Invalid username or password',
        emailNotExist: 'The email address entered is not registered with us',
        resetPassLink: 'password reset link sent to your email account',
        passwordNotMatch: 'The password entered does not match the current password',
        inviteSuccess: 'Invited successfully',
        suspendedAccount: 'User not found. Please contact system admin or support team for more details',
        userBlocked: 'Your account is blocked due to multiple incorrect login attempts. Please contact system admin or support team.',
        inactiveUser: 'Your account is not active. Please contact system admin or support team.',
        emailAlreadyRegister: 'The email address entered is not registered with us. Please enter another email address or sign in with this one',
        loginCounterMessage: "You have already logged in two devices, please logout any one of them and try again!",
    },
    infoMessage: {
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
    commonMessage: {
        created: 'created successfully',
        internalServerError: 'Internal server error',
        wentWrong: 'Something went wrong',
        profileUpdate: 'Profile update successfully',
        profileDelete: 'Profile delete successfully'
    },
};

module.exports = messages;