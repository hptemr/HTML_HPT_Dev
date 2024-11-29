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
                                    <sch:Practice>
                                        <sch:PracticeID>4</sch:PracticeID>
                                        <sch:PracticeName>Sandbox</sch:PracticeName>
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
                                        <sch:PracticeID>4</sch:PracticeID>
                                        <sch:PracticeName>Sandbox</sch:PracticeName>
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
                                        <sch:PracticeID>4</sch:PracticeID>
                                        <sch:PracticeName>Sandbox</sch:PracticeName>
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


//   const updatePatientIntakeFormPersonalInfo = (patientData, tebraDetails) => {
//     let soapRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.kareo.com/api/schemas/">
//                         <soapenv:Header/>
//                         <soapenv:Body>
//                             <sch:UpdatePatient>
//                                 <sch:UpdatePatientReq>
//                                     <sch:RequestHeader>
//                                     <sch:CustomerKey>${tebraCredentials?.customerKey}</sch:CustomerKey>
//                                     <sch:Password>${tebraCredentials?.password}</sch:Password>
//                                     <sch:User>${tebraCredentials?.user}</sch:User>
//                                     </sch:RequestHeader>
//                                     <sch:Patient>
//                                     <sch:AddressLine1>${patientData.address1?patientData.address1:''}</sch:AddressLine1>
//                                     <sch:City>${patientData.city?patientData.city:''}</sch:City>
//                                     <sch:DateofBirth>${tebraCommon.changeDateFormat(patientData.dob)}</sch:DateofBirth>
//                                     <sch:FirstName>${patientData.firstName}</sch:FirstName>
//                                     <sch:Gender>${patientData.gender}</sch:Gender>
//                                     <sch:HomePhone>${patientData.phoneNumber?patientData.phoneNumber:''}</sch:HomePhone>
//                                     <sch:LastName>${patientData.lastName}</sch:LastName>
//                                     <sch:MaritalStatus>${patientData.maritalStatus=='Married'?'M':'S'}</sch:MaritalStatus>
//                                     <sch:MiddleName>${patientData.middleName?patientData.middleName:''}</sch:MiddleName>
//                                     <sch:MobilePhone>${patientData.cellPhoneNumber?patientData.cellPhoneNumber:''}</sch:MobilePhone>
//                                     <sch:PatientID>${tebraDetails?.PatientID}</sch:PatientID>
//                                     <sch:Practice>
//                                         <sch:PracticeID>4</sch:PracticeID>
//                                         <sch:PracticeName>Sandbox</sch:PracticeName>
//                                     </sch:Practice>
//                                     <sch:State>${patientData.state?patientData.state:''}</sch:State>
//                                     <sch:WorkPhone>${patientData.workExtension?patientData.workExtension:''}</sch:WorkPhone>
//                                     <sch:ZipCode>${patientData.zipcode?patientData.zipcode:''}</sch:ZipCode>
//                                     </sch:Patient>
//                                 </sch:UpdatePatientReq>
//                             </sch:UpdatePatient>
//                         </soapenv:Body>
//                         </soapenv:Envelope>`
    
//       return soapRequest
//   }




const updatePatientIntakeFormPersonalInfo = (patientData, tebraDetails) => {
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
                                        <sch:PracticeID>4</sch:PracticeID>
                                        <sch:PracticeName>Sandbox</sch:PracticeName>
                                    </sch:Practice>
                                    <sch:WorkPhone>${patientData.workExtension?patientData.workExtension:''}</sch:WorkPhone>
                                    </sch:Patient>
                                </sch:UpdatePatientReq>
                            </sch:UpdatePatient>
                        </soapenv:Body>
                        </soapenv:Envelope>`
    
      return soapRequest
  }



  const createCase = (patientRes, caseName) => {
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
                                        <sch:Cases>
                                            <sch:PatientCaseUpdateReq>
                                                <sch:CaseName>${caseName}</sch:CaseName>
                                                <sch:ReferringProviderFullName>Doug Martin</sch:ReferringProviderFullName>
                                                <sch:ReferringProviderID>01</sch:ReferringProviderID>
                                            </sch:PatientCaseUpdateReq>
                                        </sch:Cases>
                                        <sch:PatientID>${patientRes?.tebraDetails.PatientID}</sch:PatientID>
                                        <sch:Practice>
                                            <sch:PracticeID>4</sch:PracticeID>
                                            <sch:PracticeName>Sandbox</sch:PracticeName>
                                        </sch:Practice>
                                        </sch:Patient>
                                    </sch:UpdatePatientReq>
                                </sch:UpdatePatient>
                            </soapenv:Body>
                        </soapenv:Envelope>`
    
      return soapRequest
  }

  const addPatientInsuranceIntakeForm = (insuranceInfo, patientRes, tebraCaseDetails) => {
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
                                        <sch:Cases>
                                            <sch:PatientCaseUpdateReq>
                                                <sch:CaseID>${tebraCaseDetails?.CaseID}</sch:CaseID>
                                                <sch:PayerScenario>Insurance</sch:PayerScenario>
                                                <sch:Policies>
                                                    <sch:InsurancePolicyUpdateReq>
                                                        <sch:Active>${true}</sch:Active>
                                                        <sch:EffectiveEndDate>${insuranceInfo?.primaryInsuranceToDate ? tebraCommon.changeDateFormat(insuranceInfo?.primaryInsuranceToDate):''}</sch:EffectiveEndDate>
                                                        <sch:EffectiveStartDate>${insuranceInfo?.primaryInsuranceFromDate ? tebraCommon.changeDateFormat(insuranceInfo?.primaryInsuranceFromDate):''}</sch:EffectiveStartDate>
                                                        <sch:Insured>
                                                            <sch:DateofBirth>${insuranceInfo?.subscriberDob ? tebraCommon.changeDateFormat(insuranceInfo?.subscriberDob):''}</sch:DateofBirth>
                                                            <sch:FirstName>${insuranceInfo?.subscriberFirstName}</sch:FirstName>
                                                            <sch:Gender>${insuranceInfo?.subscriberGender ? insuranceInfo?.subscriberGender:''}</sch:Gender>
                                                            <sch:LastName>${insuranceInfo?.subscriberLastName}</sch:LastName>
                                                            <sch:MiddleName>${insuranceInfo?.subscriberMiddleName? insuranceInfo?.subscriberMiddleName:''}</sch:MiddleName>
                                                            <sch:PatientRelationshipToInsured>Self</sch:PatientRelationshipToInsured>
                                                        </sch:Insured>
                                                        <sch:PlanName>${insuranceInfo?.primaryInsuranceCompany}</sch:PlanName>
                                                        <sch:PolicyGroupNumber>${insuranceInfo?.primaryInsuranceGroup}</sch:PolicyGroupNumber>
                                                        <sch:PolicyNumber>${insuranceInfo?.primaryInsuranceIdPolicy}</sch:PolicyNumber>
                                                    </sch:InsurancePolicyUpdateReq>
                                                </sch:Policies>
                                            </sch:PatientCaseUpdateReq>
                                        </sch:Cases>
                                        <sch:Guarantor>
                                            <sch:DifferentThanPatient>true</sch:DifferentThanPatient>
                                            <sch:FirstName>${insuranceInfo?.firstName}</sch:FirstName>
                                            <sch:LastName>${insuranceInfo?.lastName}</sch:LastName>
                                            <sch:MiddleName>${insuranceInfo?.middleName ? insuranceInfo?.middleName:''}</sch:MiddleName>
                                            <sch:RelationshiptoGuarantor>Spouse</sch:RelationshiptoGuarantor>
                                        </sch:Guarantor>
                                        <sch:PatientID>${patientRes?.tebraDetails.PatientID}</sch:PatientID>
                                        <sch:Practice>
                                            <sch:PracticeID>4</sch:PracticeID>
                                            <sch:PracticeName>Sandbox</sch:PracticeName>
                                        </sch:Practice>
                                        </sch:Patient>
                                    </sch:UpdatePatientReq>
                                </sch:UpdatePatient>
                            </soapenv:Body>
                        </soapenv:Envelope>`
    
      return soapRequest
  }

  const manageAuthorization = (authorizationData, patientRes, tebraCaseDetails, tebraInsuranceData) => {
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
                                        <sch:Cases>
                                            <sch:PatientCaseUpdateReq>
                                            <sch:Authorizations>
                                                <sch:InsurancePolicyAuthorizationUpdateReq>
                                                    <sch:EndDate>${tebraCommon.changeDateFormat(authorizationData?.authorizationToDate)}</sch:EndDate>
                                                    <sch:InsurancePlanID>${tebraInsuranceData?.InsurancePolicyPlanID}</sch:InsurancePlanID>
                                                    <sch:InsurancePolicyID>${tebraInsuranceData?.InsurancePolicyID}</sch:InsurancePolicyID>
                                                    <sch:Number>${authorizationData?.authorizationNumber}</sch:Number>
                                                    <sch:NumberOfVisits>${authorizationData?.authorizationVisit}</sch:NumberOfVisits>
                                                    <sch:StartDate>${tebraCommon.changeDateFormat(authorizationData?.authorizationFromDate)}</sch:StartDate>
                                                </sch:InsurancePolicyAuthorizationUpdateReq>
                                            </sch:Authorizations>
                                            <sch:CaseID>${tebraCaseDetails?.CaseID}</sch:CaseID>
                                            </sch:PatientCaseUpdateReq>
                                        </sch:Cases>
                                        <sch:PatientID>${patientRes?.tebraDetails.PatientID}</sch:PatientID>
                                        <sch:Practice>
                                            <sch:PracticeID>4</sch:PracticeID>
                                            <sch:PracticeName>Sandbox</sch:PracticeName>
                                        </sch:Practice>
                                        </sch:Patient>
                                    </sch:UpdatePatientReq>
                                </sch:UpdatePatient>
                            </soapenv:Body>
                        </soapenv:Envelope>`
    
      return soapRequest
  }



  const addBillingTeamPatientInsurance = (insuranceInfo, patientRes, tebraCaseDetails, tebraInsuranceData) => {
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
                                        <sch:Cases>
                                            <sch:PatientCaseUpdateReq>
                                                <sch:CaseID>${tebraCaseDetails?.CaseID}</sch:CaseID>
                                                <sch:PayerScenario>Insurance</sch:PayerScenario>
                                                <sch:Policies>
                                                    <sch:InsurancePolicyUpdateReq>
                                                        <sch:Active>${true}</sch:Active>
                                                        <sch:CompanyID>${tebraInsuranceData?.InsurancePolicyCompanyID}</sch:CompanyID>
                                                        <sch:EffectiveEndDate>${insuranceInfo?.PI_endDate ? tebraCommon.changeDateFormat(insuranceInfo?.PI_endDate):''}</sch:EffectiveEndDate>
                                                        <sch:EffectiveStartDate>${insuranceInfo?.PI_effectiveDate ? tebraCommon.changeDateFormat(insuranceInfo?.PI_effectiveDate):''}</sch:EffectiveStartDate>
                                                        <sch:InsurancePolicyID>${tebraInsuranceData?.InsurancePolicyID}</sch:InsurancePolicyID>
                                                        <sch:PlanID>${tebraInsuranceData?.InsurancePolicyPlanID}</sch:PlanID>
                                                        <sch:PlanName>${insuranceInfo?.primaryInsurance}</sch:PlanName>
                                                        <sch:PolicyGroupNumber>${insuranceInfo?.PI_group}</sch:PolicyGroupNumber>
                                                        <sch:PolicyNumber>${insuranceInfo?.PI_idPolicy}</sch:PolicyNumber>
                                                    </sch:InsurancePolicyUpdateReq>
                                                </sch:Policies>
                                            </sch:PatientCaseUpdateReq>
                                        </sch:Cases>
                                        <sch:Guarantor>
                                            <sch:DifferentThanPatient>true</sch:DifferentThanPatient>
                                            <sch:FirstName>${insuranceInfo?.RP_firstName}</sch:FirstName>
                                            <sch:LastName>${insuranceInfo?.RP_lastName}</sch:LastName>
                                            <sch:MiddleName>${insuranceInfo?.RP_middleName ? insuranceInfo?.RP_middleName:''}</sch:MiddleName>
                                            <sch:RelationshiptoGuarantor>Spouse</sch:RelationshiptoGuarantor>
                                        </sch:Guarantor>
                                        <sch:PatientID>${patientRes?.tebraDetails.PatientID}</sch:PatientID>
                                        <sch:Practice>
                                            <sch:PracticeID>4</sch:PracticeID>
                                            <sch:PracticeName>Sandbox</sch:PracticeName>
                                        </sch:Practice>
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
  updatePatientAdditionalInfo,
  createCase,
  addPatientInsuranceIntakeForm,
  updatePatientIntakeFormPersonalInfo,
  manageAuthorization,
  addBillingTeamPatientInsurance
};