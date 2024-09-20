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
  const validateUploadProviderFile = (row, npiSet) =>{
    const errors = [];
    const phoneNumberRegex = /^\d{10}$/; // Validate phone numbers (numeric and 10 digits)
    const npiRegex = /^\d{10}$/; // Validate Doctor NPI (numeric and 10 digits)
    const nameRegex = /^[a-zA-Z\s]+$/; // Validate Doctor Name (character only)
    // const alphaNumeric = /^[a-zA-Z0-9]+$/; // Alphanumeric input
    const alphaNumeric = /^[a-zA-Z0-9 ]*$/

    // Doctor Credentials Validation
    if (!row["Credentials"]) errors.push("Doctor Credentials is required");
    if (row["Credentials"].length > 10) errors.push('Doctor Credentials not more than 10 characters');
    if (!alphaNumeric.test(row["Credentials"])) errors.push("Doctor Credentials must contain only alphanumeric character");

    // Doctor Name Validation
    if (!row["Name"]) errors.push("Doctor Name is required");
    if (row["Name"].length > 50) errors.push('Doctor Name not more than 50 characters');
    if (!nameRegex.test(row["Name"])) errors.push("Doctor Name must contain only letters");

    // Doctor NPI Validation
    if (!row["NPI"]) errors.push("Doctor NPI is required");
    if (!npiRegex.test(row["NPI"])) errors.push("Doctor NPI must be 10 digits and numeric");
    // Check for duplicate NPI in the file
    if (npiSet.has(row["NPI"])) {
      errors.push(`Duplicate NPI found: ${row["NPI"]}`);
    } else {
      npiSet.add(row["NPI"]); // Add NPI to the set if it's unique
    }

    // Address Validation
    if (!row["Address"]) errors.push("Address is required");
    if (row["Address"].length > 500) errors.push('Address not more than 500 characters');

    // PhoneNumber Validation
    if (!row["phoneNumber"]) errors.push("Phone Number is required");
    if (!phoneNumberRegex.test(row["phoneNumber"])) errors.push("Phone Number must be 10 digits and numeric");

    // FaxNumber Validation
    if (!row["faxNumber"]) errors.push("Fax Number is required");
    if (!phoneNumberRegex.test(row["faxNumber"])) errors.push("Fax Number must be 10 digits and numeric");

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
  const validateUploadInsuranceFile = (row, payerIDSet) =>{
    const phoneNumberRegex = /^\d{10}$/; // Validate phone numbers (numeric and 10 digits)
    const requiredInsuranceType = ['Medicare','Medicaid','Tricare','CHAMPVA','Group Health Plan','Other']; // Required Insurance Type
    const requiredBillingType = ['AMA','CMS'];
    const errors = [];

    // Insurance Name Validation
    if (!row["insuranceName"]) errors.push("Insurance Name is required");

    // Insurance Type Validation
    if (!row["insuranceType"]) errors.push("Insurance Type is required");
    if (!requiredInsuranceType.includes(row["insuranceType"])) errors.push('Please add valid insurance type');

    // Payer ID Validation
    if (!row["payerID"]) errors.push("Payer ID is required");
    if (row["payerID"].length > 10) errors.push('Payer ID not more than 10 characters');
    // Check for duplicate Payer Id in the file
    if (payerIDSet.has(row["payerID"])) {
      errors.push(`Duplicate Payer ID found: ${row["payerID"]}`);
    } else {
      payerIDSet.add(row["payerID"]); // Add Payer Id to the set if it's unique
    }

    // Insurance Address Validation
    if (!row["insuranceAddress"]) errors.push("Insurance Address is required");
    if (row["insuranceAddress"].length > 250) errors.push('Insurance Address not more than 10 characters');
    
    // Phone Number Validation
    if (!row["phoneNumber"]) errors.push("Phone Number is required");
    if (!phoneNumberRegex.test(row["phoneNumber"])) errors.push("Phone Number must be 10 digits and numeric");

    // Billing Type Validation
    if (!row["billingType"]) errors.push("Billing Type is required");
    if (!requiredBillingType.includes(row["billingType"])) errors.push('Please add valid billing type');

    return errors;
  }

  // Helper function to clean numeric input (trim spaces and remove internal spaces)
  function cleanNumericInput(input) {
    if (input) {
      return input.replace(/\s+/g, '').trim();
    }
    return input;
  }

  function trimString(str) {
    if (str) {
      return str.trim();
    }
    return str;
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
    validateUploadInsuranceFile,
    cleanNumericInput,
    trimString
};