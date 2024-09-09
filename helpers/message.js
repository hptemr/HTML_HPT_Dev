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
        emailAlreadyRegister: 'The email address entered is registered with us. Please enter another email address or sign in with this one',
        loginCounterMessage: "You have already logged in two devices, please logout any one of them and try again!",
        patientSignup:'Patient account has been created successfully',
        patientEmailExist:'Your Patient account already created. Please log in instead.',
        adminEmailExist:'You have already signup as admin user.',
        profileImageRemoved:"Your profile image has been removed successfully",
        profileImageChanged:"Your profile image has been changed successfully",
        enterCurrentPassword: 'You have enter current password',
        resendInvite: 'Invite resend successfully',
        revokeInvite: 'Invoke invite successfully',
        npiExists:"NPI already exist",
        ssnExists:"SSN already exist",
        licenseExists:"License already exist",
        deleteUser: 'Your account is deleted. Please contact system admin or support team.',
        providerDelete: 'User delete successfully'
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
        passwordChange: "Password has been changed successfully!",
        emailTemplate404: 'Template not found in the system', 
        csvFileHeaderMissing: "CSV file is missing required headers or contains invalid headers."
    },
    commonMessage: {
        created: 'created successfully',
        internalServerError: 'Internal server error',
        wentWrong: 'Something went wrong',
        profileUpdate: 'Profile update successfully',
        profileDelete: 'Profile delete successfully',
    },
    appointmentMessage: {
        accepted: 'Appointment has been accepted successfully',
        cancelled: 'Appointment has been cancelled successfully',
        updated: 'Appointment has been updated successfully',
        rescheduled: 'Appointment has been rescheduled successfully',
        created: 'Appointment has been created successfully',
        requestCreated: 'Appointment request has been sent successfully',
        alreadyRequestCreated: 'Appointment request already sent!',
        resolved: 'Appointment request has been resolved successfully',
    },
    emergencyContactsMessage: {
        created: 'Contact details have been created successfully!',
        updated: 'Contact details has been updated successfully',
        deleted: 'Contact details has been deleted successfully',
    },
    insuranceMessage: {
        created: 'insurance data has been created successfully',
        updated: 'insurance data has been updated successfully',
    },
    documentMessage: {
        exist: ' already exists',
        directoryUpdated: 'Directory has been updated successfully',
    }
};

module.exports = messages;