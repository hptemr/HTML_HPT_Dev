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



  const createCase = (patientRes, caseName, providerData) => {
    let providerName =''
    if(providerData!=null && providerData?.name){
        const provider = `<sch:ReferringProviderFullName>${providerData?.name}</sch:ReferringProviderFullName>`
        providerName = provider
    }

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
                                                ${providerName}
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

  const addPatientInsuranceIntakeForm = (insuranceInfo, patientRes, tebraCaseDetails, emergencyContact) => {
    let sendAdjesterData = ''
    let sendEmployerData = ''
    if(insuranceInfo?.injuryRelelatedTo && insuranceInfo?.injuryRelelatedTo=="Worker's Compensation (WCOMP)"){
        const adjuster = `<sch:Adjuster>
                            <sch:FirstName>${insuranceInfo?.adjusterName}</sch:FirstName>
                            <sch:PhoneNumber>${insuranceInfo?.adjusterPhone}</sch:PhoneNumber>
                        </sch:Adjuster>`
        sendAdjesterData = adjuster
    }

    if(insuranceInfo?.reportedEmployer && insuranceInfo?.reportedEmployer=="Yes"){
        const employer = `<sch:Employer>
                            <sch:AddressLine1>${insuranceInfo?.employerAddress}</sch:AddressLine1>
                            <sch:EmployerName>${insuranceInfo?.employerName}</sch:EmployerName>
                        </sch:Employer>`
        sendEmployerData = employer
    }


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
                                                        ${sendAdjesterData}
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
                                        <sch:EmergencyName>${emergencyContact[0].ec1FirstName} ${emergencyContact[0].ec1LastName}</sch:EmergencyName>
                                        <sch:EmergencyPhone>${tebraCommon.convertPhoneNumber(emergencyContact[0].ec1PhoneNumber)}</sch:EmergencyPhone>
                                        ${sendEmployerData}
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
    let sendAdjesterData = ''
    let sendEmployerData = ''
    let copayData = ''
    let highDeductableData = ''
    if(insuranceInfo?.RP_injuryRelatedTo && insuranceInfo?.RP_injuryRelatedTo=="Worker's Compensation (WCOMP)"){
        const adjuster = `<sch:Adjuster>
                            <sch:FirstName>${insuranceInfo?.RP_adjusterName}</sch:FirstName>
                            <sch:PhoneNumber>${insuranceInfo?.RP_adjusterPhone}</sch:PhoneNumber>
                        </sch:Adjuster>`
        sendAdjesterData = adjuster
    }

    if(insuranceInfo?.RP_reportedToEmployer && insuranceInfo?.RP_reportedToEmployer=="Yes"){
        const employer = `<sch:Employer>
                            <sch:AddressLine1>${insuranceInfo?.EI_employerAddress}</sch:AddressLine1>
                            <sch:EmployerName>${insuranceInfo?.EI_employerName}</sch:EmployerName>
                        </sch:Employer>`
        sendEmployerData = employer
    }
    if(insuranceInfo?.PI_copayAmt){
        const copay = `<sch:Copay>${insuranceInfo?.PI_copayAmt}</sch:Copay>`
        copayData = copay
    }

    if(insuranceInfo?.PI_highDeductible){
        const highDeductable = `<sch:Deductible>${insuranceInfo?.PI_highDeductible}</sch:Deductible>`
        highDeductableData = highDeductable
    }

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
                                                        ${sendAdjesterData}
                                                        <sch:CompanyID>${tebraInsuranceData?.InsurancePolicyCompanyID}</sch:CompanyID>
                                                        ${copayData}
                                                        ${highDeductableData}
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
                                        ${sendEmployerData}
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

  const updateSupportTeamIntakeForm = (insuranceInfo, patientRes, tebraCaseDetails, tebraInsuranceData, emergencyContact) => {
    let sendAdjesterData = ''
    let sendEmployerData = ''
    if(insuranceInfo?.injuryRelelatedTo && insuranceInfo?.injuryRelelatedTo=="Worker's Compensation (WCOMP)"){
        const adjuster = `<sch:Adjuster>
                            <sch:FirstName>${insuranceInfo?.adjusterName}</sch:FirstName>
                            <sch:PhoneNumber>${insuranceInfo?.adjusterPhone}</sch:PhoneNumber>
                        </sch:Adjuster>`
        sendAdjesterData = adjuster
    }

    if(insuranceInfo?.reportedEmployer && insuranceInfo?.reportedEmployer=="Yes"){
        const employer = `<sch:Employer>
                            <sch:AddressLine1>${insuranceInfo?.employerAddress}</sch:AddressLine1>
                            <sch:EmployerName>${insuranceInfo?.employerName}</sch:EmployerName>
                        </sch:Employer>`
        sendEmployerData = employer
    }

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
                                                        ${sendAdjesterData}
                                                        <sch:CompanyID>${tebraInsuranceData?.InsurancePolicyCompanyID}</sch:CompanyID>
                                                        <sch:EffectiveEndDate>${insuranceInfo?.primaryInsuranceToDate ? tebraCommon.changeDateFormat(insuranceInfo?.primaryInsuranceToDate):''}</sch:EffectiveEndDate>
                                                        <sch:EffectiveStartDate>${insuranceInfo?.primaryInsuranceFromDate ? tebraCommon.changeDateFormat(insuranceInfo?.primaryInsuranceFromDate):''}</sch:EffectiveStartDate>
                                                        <sch:InsurancePolicyID>${tebraInsuranceData?.InsurancePolicyID}</sch:InsurancePolicyID>
                                                        <sch:Insured>
                                                            <sch:DateofBirth>${insuranceInfo?.subscriberDob ? tebraCommon.changeDateFormat(insuranceInfo?.subscriberDob):''}</sch:DateofBirth>
                                                            <sch:FirstName>${insuranceInfo?.subscriberFirstName}</sch:FirstName>
                                                            <sch:Gender>${insuranceInfo?.subscriberGender ? insuranceInfo?.subscriberGender:''}</sch:Gender>
                                                            <sch:LastName>${insuranceInfo?.subscriberLastName}</sch:LastName>
                                                            <sch:MiddleName>${insuranceInfo?.subscriberMiddleName? insuranceInfo?.subscriberMiddleName:''}</sch:MiddleName>
                                                            <sch:PatientRelationshipToInsured>Self</sch:PatientRelationshipToInsured>
                                                        </sch:Insured>
                                                        <sch:PlanID>${tebraInsuranceData?.InsurancePolicyPlanID}</sch:PlanID>
                                                        <sch:PlanName>${insuranceInfo?.primaryInsuranceCompany}</sch:PlanName>
                                                        <sch:PolicyGroupNumber>${insuranceInfo?.primaryInsuranceGroup}</sch:PolicyGroupNumber>
                                                        <sch:PolicyNumber>${insuranceInfo?.primaryInsuranceIdPolicy}</sch:PolicyNumber>
                                                    </sch:InsurancePolicyUpdateReq>
                                                </sch:Policies>
                                            </sch:PatientCaseUpdateReq>
                                        </sch:Cases>
                                        <sch:EmergencyName>${emergencyContact[0].ec1FirstName} ${emergencyContact[0].ec1LastName}</sch:EmergencyName>
                                        <sch:EmergencyPhone>${tebraCommon.convertPhoneNumber(emergencyContact[0].ec1PhoneNumber)}</sch:EmergencyPhone>
                                        ${sendEmployerData}
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


  const createEncounter = (patientRes, caseDetails, subjectiveData, allCharges, diaCode) => {
        const serviceLineData = allCharges.map((chargesData) => {
            return `<sch:ServiceLineReq>
                    <sch:DiagnosisCode1>${diaCode?.code}</sch:DiagnosisCode1>
                    <sch:Minutes>${chargesData?.minutes}</sch:Minutes>
                    <sch:ProcedureCode>${chargesData?.cptCode}</sch:ProcedureCode>
                    <sch:ServiceEndDate>${subjectiveData?.note_date ? tebraCommon.changeDateFormat(subjectiveData?.note_date):''}</sch:ServiceEndDate>
                    <sch:ServiceStartDate>${subjectiveData?.note_date ? tebraCommon.changeDateFormat(subjectiveData?.note_date):''}</sch:ServiceStartDate>
                    <sch:UnitCharge>${chargesData?.totalCharge}</sch:UnitCharge>
                    <sch:Units>${chargesData?.units}</sch:Units>
                    </sch:ServiceLineReq>`
                    }).join('\n');

             let finalData = `<sch:ServiceLines>${serviceLineData}</sch:ServiceLines>` 

        console.log("serviceLineData>>>",tebraCommon.formatXML(finalData))

    let soapRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.kareo.com/api/schemas/">
                    <soapenv:Header/>
                        <soapenv:Body>
                            <sch:CreateEncounter>
                                <sch:request>
                                    <sch:RequestHeader>
                                    <sch:CustomerKey>${tebraCredentials?.customerKey}</sch:CustomerKey>
                                    <sch:Password>${tebraCredentials?.password}</sch:Password>
                                    <sch:User>${tebraCredentials?.user}</sch:User>
                                    </sch:RequestHeader>
                                    <sch:Encounter>
                                        <sch:Case>
                                            <sch:CaseID>${caseDetails?.tebraDetails?.CaseID}</sch:CaseID>
                                            <sch:CaseName>${caseDetails?.caseName}</sch:CaseName>
                                            <sch:CasePayerScenario>Insurance</sch:CasePayerScenario>
                                        </sch:Case>
                                        <sch:EncounterStatus>Approved</sch:EncounterStatus>
                                        <sch:Patient>
                                            <sch:FirstName>${patientRes?.firstName}</sch:FirstName>
                                            <sch:LastName>${patientRes?.lastName}</sch:LastName>
                                            <sch:PatientID>${patientRes?.tebraDetails?.PatientID}</sch:PatientID>
                                        </sch:Patient>
                                        <sch:PostDate>${subjectiveData?.note_date ? tebraCommon.changeDateFormat(subjectiveData?.note_date):''}</sch:PostDate>
                                        <sch:Practice>
                                            <sch:PracticeID>4</sch:PracticeID>
                                            <sch:PracticeName>Sandbox</sch:PracticeName>
                                        </sch:Practice>
                                        <sch:RenderingProvider>
                                            <sch:FirstName>Douglas</sch:FirstName>
                                            <sch:LastName>Martin</sch:LastName>
                                            <sch:ProviderID>3243</sch:ProviderID>
                                        </sch:RenderingProvider>
                                        <sch:ServiceEndDate>${subjectiveData?.note_date ? tebraCommon.changeDateFormat(subjectiveData?.note_date):''}</sch:ServiceEndDate>
                                            ${finalData}
                                        <sch:ServiceLocation>
                                            <sch:LocationID>13</sch:LocationID>
                                            <sch:LocationName>Hamilton</sch:LocationName>
                                        </sch:ServiceLocation>
                                        <sch:ServiceStartDate>${subjectiveData?.note_date ? tebraCommon.changeDateFormat(subjectiveData?.note_date):''}</sch:ServiceStartDate>
                                    </sch:Encounter>
                                </sch:request>
                            </sch:CreateEncounter>
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
  addBillingTeamPatientInsurance,
  updateSupportTeamIntakeForm,
  createEncounter
};