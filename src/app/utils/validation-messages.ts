export const validationMessages = {
    required: (fieldName: string) => `Please enter your ${fieldName}`,
    email: (fieldName: string) => `Please enter a valid ${fieldName}`,
    password: 'Minimum 8 and maximum 16 character, atleast one special character, one numeric & 1 uppercase and lowercase letter',
    passwordMismatch: 'New and confirm password do not match',
    invalidPhoneNumber: 'Invalid phone number format',
    radioButton:'The user should be able to select either of the values.',
    minlength: (fieldName: string, length: number) => `${fieldName} should be at least ${length} characters.`,
    maxlength: (fieldName: string, length: number) => `${fieldName} should not exceed ${length} characters.`,
    pattern: (fieldName: string) => `Invalid input for ${fieldName}. Please check the format.`,
  };