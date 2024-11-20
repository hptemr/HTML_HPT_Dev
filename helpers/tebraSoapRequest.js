const { tebraCredentials } = require('./../config/constants')
const tebraCommon = require('../helpers/tebraCommon');

const getPracice = () => {
  let soapRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.kareo.com/api/schemas/">
                            <soapenv:Header/>
                            <soapenv:Body>
                                <sch:GetPractices>
                                    <sch:request>
                                        <sch:RequestHeader>
                                        <sch:CustomerKey>${tebraCredentials?.customerKey}</sch:CustomerKey>
                                        <sch:Password>${tebraCredentials?.password}</sch:Password>
                                        <sch:User>${tebraCredentials?.user}</sch:User>
                                        </sch:RequestHeader>
                                        <sch:Fields>
                                        <sch:PracticeName>true</sch:PracticeName>
                                        </sch:Fields>
                                        <sch:Filter>
                                        <sch:PracticeName></sch:PracticeName>
                                        </sch:Filter>
                                    </sch:request>
                                </sch:GetPractices>
                            </soapenv:Body>
                        </soapenv:Envelope>`
  
    return soapRequest
}

const createPatient = (patientData) => {
    let soapRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.kareo.com/api/schemas/">
                        <soapenv:Header/>
                        <soapenv:Body>
                            <sch:CreatePatient>
                                <sch:request>
                                    <sch:RequestHeader>
                                    <sch:CustomerKey>${tebraCredentials?.customerKey}</sch:CustomerKey>
                                    <sch:Password>${tebraCredentials?.password}</sch:Password>
                                    <sch:User>${tebraCredentials?.user}</sch:User>
                                    </sch:RequestHeader>
                                    <sch:Patient>
                                    <sch:AddressLine1>${patientData.address1?patientData.address1:''}</sch:AddressLine1>
                                    <sch:AddressLine2>${patientData.address2?patientData.address2:''}</sch:AddressLine2>
                                    <sch:City>${patientData.city?patientData.city:''}</sch:City>
                                    <sch:DateofBirth>${tebraCommon.changeDateFormat(patientData.dob)}</sch:DateofBirth>
                                    <sch:EmailAddress>${patientData.email?patientData.email:''}</sch:EmailAddress>
                                    <sch:FirstName>${patientData.firstName}</sch:FirstName>
                                    <sch:Gender>${patientData.gender}</sch:Gender>
                                    <sch:LastName>${patientData.lastName}</sch:LastName>
                                    <sch:MiddleName>${patientData.middleName?patientData.middleName:''}</sch:MiddleName>
                                    <sch:PatientExternalID>${patientData._id}</sch:PatientExternalID>
                                    <sch:Practice>
                                        <sch:PracticeID>1</sch:PracticeID>
                                        <sch:PracticeName>Hamilton Physical Therapy</sch:PracticeName>
                                    </sch:Practice>
                                    <sch:State>${patientData.state?patientData.state:''}</sch:State>
                                    <sch:WorkPhone>${patientData.phoneNumber?patientData.phoneNumber:''}</sch:WorkPhone>
                                    <sch:ZipCode>${patientData.zipcode?patientData.zipcode:''}</sch:ZipCode>
                                    </sch:Patient>
                                </sch:request>
                            </sch:CreatePatient>
                        </soapenv:Body>
                        </soapenv:Envelope>`
    
      return soapRequest
  }


  const updatePatientPersonalInfo = (patientData, tebraDetails) => {
    let soapRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.kareo.com/api/schemas/">
                        <soapenv:Header/>
                        <soapenv:Body>
                            <sch:UpdatePatient>
                                <sch:UpdatePatientReq>
                                    <sch:RequestHeader>
                                    <sch:CustomerKey>${tebraCredentials?.customerKey}</sch:CustomerKey>
                                    <sch:Password>${tebraCredentials?.password}</sch:Password>
                                    <sch:User>${tebraCredentials?.user}</sch:User>
                                    </sch:RequestHeader>
                                    <sch:Patient>
                                    <sch:DateofBirth>${tebraCommon.changeDateFormat(patientData.dob)}</sch:DateofBirth>
                                    <sch:FirstName>${patientData.firstName}</sch:FirstName>
                                    <sch:Gender>${patientData.gender}</sch:Gender>
                                    <sch:HomePhone>${patientData.phoneNumber?patientData.phoneNumber:''}</sch:HomePhone>
                                    <sch:LastName>${patientData.lastName}</sch:LastName>
                                    <sch:MaritalStatus>${patientData.maritalStatus=='Married'?'M':'S'}</sch:MaritalStatus>
                                    <sch:MiddleName>${patientData.middleName?patientData.middleName:''}</sch:MiddleName>
                                    <sch:MobilePhone>${patientData.cellPhoneNumber?patientData.cellPhoneNumber:''}</sch:MobilePhone>
                                    <sch:PatientID>${tebraDetails?.PatientID}</sch:PatientID>
                                    <sch:Practice>
                                        <sch:PracticeID>1</sch:PracticeID>
                                        <sch:PracticeName>Hamilton Physical Therapy</sch:PracticeName>
                                    </sch:Practice>
                                    <sch:WorkPhone>${patientData.workExtensionNumber?patientData.workExtensionNumber:''}</sch:WorkPhone>
                                    </sch:Patient>
                                </sch:UpdatePatientReq>
                            </sch:UpdatePatient>
                        </soapenv:Body>
                        </soapenv:Envelope>`
    
      return soapRequest
  }


  const updatePatientAdditionalInfo = (patientData, tebraDetails) => {
    let soapRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.kareo.com/api/schemas/">
                        <soapenv:Header/>
                        <soapenv:Body>
                            <sch:UpdatePatient>
                                <sch:UpdatePatientReq>
                                    <sch:RequestHeader>
                                    <sch:CustomerKey>${tebraCredentials?.customerKey}</sch:CustomerKey>
                                    <sch:Password>${tebraCredentials?.password}</sch:Password>
                                    <sch:User>${tebraCredentials?.user}</sch:User>
                                    </sch:RequestHeader>
                                    <sch:Patient>
                                    <sch:AddressLine1>${patientData.address1?patientData.address1:''}</sch:AddressLine1>
                                    <sch:AddressLine2>${patientData.address2?patientData.address2:''}</sch:AddressLine2>
                                    <sch:City>${patientData.city?patientData.city:''}</sch:City>
                                    <sch:PatientID>${tebraDetails?.PatientID}</sch:PatientID>
                                    <sch:Practice>
                                        <sch:PracticeID>1</sch:PracticeID>
                                        <sch:PracticeName>Hamilton Physical Therapy</sch:PracticeName>
                                    </sch:Practice>
                                    <sch:State>${patientData.state?patientData.state:''}</sch:State>
                                    <sch:ZipCode>${patientData.zipcode?patientData.zipcode:''}</sch:ZipCode>
                                    </sch:Patient>
                                </sch:UpdatePatientReq>
                            </sch:UpdatePatient>
                        </soapenv:Body>
                        </soapenv:Envelope>`
    
      return soapRequest
  }

module.exports = {
  getPracice,
  createPatient,
  updatePatientPersonalInfo,
  updatePatientAdditionalInfo
};