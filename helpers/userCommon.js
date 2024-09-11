const User = require('../models/userModel');
const role = require('../models/roleModel');
const Patient = require('../models/patientModel');

const userGetByEmail = async (email) => {
    const existingUser = await User.findOne({ email });
    return existingUser
}

const userGetById = async (_id) => {
    const userData = await User.findOne({ _id });
    return userData
} 

const roleByCode = async (code) => {
    const locationData = await role.findOne({ code });
    return locationData
} 

const patientGetById = async (_id) => {
    const userData = await Patient.findOne({ _id });
    return userData
} 

const patientGetByEmail = async (email) => {
    const existingUser = await Patient.findOne({ email });
    return existingUser
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password validation
function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
}

// Name validation
function validateName(name) {
    const nameRegex = /^[A-Za-z]+$/;
    return nameRegex.test(name) && name.length >= 2 && name.length <= 50;
}

 // Validate the presence of all required headers of uploaded provider file
 const validateUploadProviderFileHeader = (headers) =>{
    const requiredHeaders = [
      'Name',
      'Credentials',
      'Address',
      'phoneNumber',
      'faxNumber',
      'NPI'
    ];
    const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header));
    return missingHeaders.length === 0;
  }

  // Validation uploaded provider file rows
  const validateUploadProviderFile = (row) =>{
    const errors = [];
    // Check required fields
    if (!row["Name"]) errors.push("Doctor Name is required");
    if (!row["Credentials"]) errors.push("Doctor Credentials is required");
    if (!row["Address"]) errors.push("Address is required");
    if (!row["phoneNumber"]) errors.push("Phone Number is required");
    if (!row["faxNumber"]) errors.push("Fax Number is required");
    if (!row["NPI"]) errors.push("Doctor NPI is required");
    
    // Validate phone numbers (numeric and 11 digits)
    const phoneNumberRegex = /^\d{11}$/;
    if (!phoneNumberRegex.test(row["phoneNumber"])) errors.push("Phone Number must be 11 digits and numeric");
    if (!phoneNumberRegex.test(row["faxNumber"])) errors.push("Fax Number must be 11 digits and numeric");

    // Validate Doctor NPI (numeric and 10 digits)
    const npiRegex = /^\d{10}$/;
    if (!npiRegex.test(row["NPI"])) errors.push("Doctor NPI must be 10 digits and numeric");

    // Validate Doctor Name (character only)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(row["Name"])) errors.push("Doctor Name must contain only letters");

    // Alphanumeric input
    const alphaNumeric = /^[a-zA-Z0-9]+$/
    if (!alphaNumeric.test(row["Credentials"])) errors.push("Doctor Credentials must contain only alphanumeric character");

    // Max length
    if (row["Name"].length > 50) errors.push('Doctor Name not more than 50 characters');
    if (row["Credentials"].length > 10) errors.push('Doctor Credentials not more than 10 characters');
    if (row["Address"].length > 500) errors.push('Address not more than 10 characters');

    return errors;
  }

// Validate the presence of all required headers of uploaded insurance file
 const validateUploadInsuranceFileHeader = (headers) =>{
    const requiredHeaders = [
      'insuranceName',
      'insuranceType',
      'insuranceAddress',
      'payerID',
      'phoneNumber',
      'billingType'
    ];
    const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header));
    return missingHeaders.length === 0;
  }

  // Validation uploaded insurance file rows
  const validateUploadInsuranceFile = (row) =>{
    const errors = [];
    // Check required fields
    if (!row["insuranceName"]) errors.push("Insurance Name is required");
    if (!row["insuranceType"]) errors.push("Insurance Type is required");
    if (!row["insuranceAddress"]) errors.push("Insurance Address is required");
    if (!row["payerID"]) errors.push("Payer ID is required");
    if (!row["phoneNumber"]) errors.push("Phone Number is required");
    if (!row["billingType"]) errors.push("Billing Type is required");
    
    // Validate phone numbers (numeric and 11 digits)
    const phoneNumberRegex = /^\d{11}$/;
    if (!phoneNumberRegex.test(row["phoneNumber"])) errors.push("Phone Number must be 11 digits and numeric");

    // Max length
    if (row["payerID"].length > 10) errors.push('Payer ID not more than 10 characters');
    if (row["insuranceAddress"].length > 250) errors.push('Insurance Address not more than 10 characters');

    // Required Insurance Type
    const requiredInsuranceType = ['Medicare','Medicaid','Tricare','CHAMPVA','Group Health Plan','Other'];
    if (!requiredInsuranceType.includes(row["insuranceType"])) errors.push('Please select valid insurance type');
    const requiredBillingType = ['AMA','CMS'];
    if (!requiredBillingType.includes(row["billingType"])) errors.push('Please select valid billing type');

    return errors;
  }


module.exports = {
    userGetByEmail,
    userGetById,
    roleByCode,
    patientGetByEmail,
    patientGetById,
    validateEmail,
    validatePassword,
    validateName,
    validateUploadProviderFileHeader,
    validateUploadProviderFile,
    validateUploadInsuranceFileHeader,
    validateUploadInsuranceFile
};