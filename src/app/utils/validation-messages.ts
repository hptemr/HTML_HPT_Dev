export const validationMessages = {
 required:(fieldName: string) => `Please enter ${fieldName}`,
    validEmail:'The email address seems to be incorrect',
  email: (fieldName: string) => `Please enter a valid ${fieldName}`,
    password: 'Minimum 8 and maximum 16 character, atleast one special character, one numeric & 1 uppercase and lowercase letter',
    passwordMismatch: 'The passwords do not match. Please try again',
    confirmPassword:'Please confirm your password',
  invalidPhoneNumber: 'Invalid phone number format',
    alphabeticChar:(fieldName: string) =>`Please enter a valid ${fieldName}`,
    newPasswordRequired:'Please set a password for your account',
  minlength: (fieldName: string, length: number) => `${fieldName} should be at least ${length} characters.`,
  maxlength: (fieldName: string, length: number) => `${fieldName} should not exceed ${length} characters.`,
  pattern: (fieldName: string) => `Invalid input for ${fieldName}. Please check the format.`,
  noRecords: 'No records found!',
  radioButton:'Gender is required'
};