export const validationMessages = {
    required: (fieldName: string) => `${fieldName} is required`,
    email: (fieldName: string) => `Please enter a valid ${fieldName}`,
    password: 'Minimum 8 and maximum 16 character, atleast one special character, one numeric & 1 uppercase and lowercase letter',
    passwordMismatch: 'New and confirm password do not match',
    invalidPhoneNumber: 'Invalid phone number format'
    // minlength: (fieldName: string, length: number) => `${fieldName} should be at least ${length} characters.`,
    // maxlength: (fieldName: string, length: number) => `${fieldName} should not exceed ${length} characters.`,
    // pattern: (fieldName: string) => `Invalid input for ${fieldName}. Please check the format.`,
  };