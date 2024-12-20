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
                                    <sch:HomePhone>${patientData.phoneNumber?tebraCommon.convertPhoneNumber(patientData.phoneNumber):''}</sch:HomePhone>
                                    <sch:LastName>${patientData.lastName}</sch:LastName>
                                    <sch:MiddleName>${patientData.middleName?patientData.middleName:''}</sch:MiddleName>
                                    <sch:Practice>
                                        <sch:PracticeID>4</sch:PracticeID>
                                        <sch:PracticeName>Sandbox</sch:PracticeName>
                                    </sch:Practice>
                                    <sch:State>${patientData.state?patientData.state:''}</sch:State>
                                    <sch:ZipCode>${patientData.zipcode?patientData.zipcode:''}</sch:ZipCode>
                                    </sch:Patient>
                                </sch:request>
                            </sch:CreatePatient>
                        </soapenv:Body>
                        </soapenv:Envelope>`
    
      return soapRequest
  }


  const updatePatientPersonalInfo = (patientData, tebraDetails) => {
    let mobilePhone =''
    let workPhone =''
    let middleName =''
    if(patientData?.cellPhoneNumber){
        const mobilePhoneXML = `<sch:MobilePhone>${tebraCommon.convertPhoneNumber(patientData?.cellPhoneNumber)}</sch:MobilePhone>`
        mobilePhone = mobilePhoneXML
    }

    if(patientData?.workExtensionNumber){
        const workPhoneXML = `<sch:WorkPhone>${tebraCommon.convertPhoneNumber(patientData?.workExtensionNumber)}</sch:WorkPhone>`
        workPhone = workPhoneXML
    }

    if(patientData?.middleName){
        const middleNameXML = `<sch:MiddleName>${patientData?.middleName}</sch:MiddleName>`
        middleName = middleNameXML
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
                                    <sch:DateofBirth>${tebraCommon.changeDateFormat(patientData.dob)}</sch:DateofBirth>
                                    <sch:FirstName>${patientData.firstName}</sch:FirstName>
                                    <sch:Gender>${patientData.gender}</sch:Gender>
                                    <sch:HomePhone>${patientData.phoneNumber?tebraCommon.convertPhoneNumber(patientData.phoneNumber):''}</sch:HomePhone>
                                    <sch:LastName>${patientData.lastName}</sch:LastName>
                                    <sch:MaritalStatus>${patientData.maritalStatus=='Married'?'M':'S'}</sch:MaritalStatus>
                                    ${middleName}
                                    ${mobilePhone}
                                    <sch:PatientID>${tebraDetails?.PatientID}</sch:PatientID>
                                    <sch:Practice>
                                        <sch:PracticeID>4</sch:PracticeID>
                                        <sch:PracticeName>Sandbox</sch:PracticeName>
                                    </sch:Practice>
                                    ${workPhone}
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
    let mobilePhone =''
    let workPhone =''
    let middleName =''
    if(patientData?.cellPhoneNumber){
        const mobilePhoneXML = `<sch:MobilePhone>${tebraCommon.convertPhoneNumber(patientData?.cellPhoneNumber)}</sch:MobilePhone>`
        mobilePhone = mobilePhoneXML
    }

    if(patientData?.workExtension){
        const workPhoneXML = `<sch:WorkPhone>${tebraCommon.convertPhoneNumber(patientData?.workExtension)}</sch:WorkPhone>`
        workPhone = workPhoneXML
    }

    if(patientData?.middleName){
        const middleNameXML = `<sch:MiddleName>${patientData?.middleName}</sch:MiddleName>`
        middleName = middleNameXML
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
                                    <sch:AddressLine1>${patientData.address1?patientData.address1:''}</sch:AddressLine1>
                                    <sch:City>${patientData.city?patientData.city:''}</sch:City>
                                    <sch:DateofBirth>${tebraCommon.changeDateFormat(patientData.dob)}</sch:DateofBirth>
                                    <sch:FirstName>${patientData.firstName}</sch:FirstName>
                                    <sch:Gender>${patientData.gender}</sch:Gender>
                                    <sch:HomePhone>${patientData.phoneNumber?tebraCommon.convertPhoneNumber(patientData?.phoneNumber):''}</sch:HomePhone>
                                    <sch:LastName>${patientData.lastName}</sch:LastName>
                                    <sch:MaritalStatus>${patientData.maritalStatus=='Married'?'M':'S'}</sch:MaritalStatus>
                                    ${middleName}
                                    ${mobilePhone}
                                    <sch:PatientID>${tebraDetails?.PatientID}</sch:PatientID>
                                    <sch:Practice>
                                        <sch:PracticeID>4</sch:PracticeID>
                                        <sch:PracticeName>Sandbox</sch:PracticeName>
                                    </sch:Practice>
                                    <sch:State>${patientData.state?patientData.state:''}</sch:State>
                                    ${workPhone}
                                    <sch:ZipCode>${patientData.zipcode?patientData.zipcode:''}</sch:ZipCode>
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

    let relatedToEmployment = (insuranceInfo?.injuryRelelatedTo=="Worker's Compensation (WCOMP)")?true:false
    let relatedToAutoAccident = (insuranceInfo?.injuryRelelatedTo=="Motar Vehicle Accident (MVA)")?true:false
    let relatedToOther = (insuranceInfo?.injuryRelelatedTo=="Other Personal Injury")?true:false

    let relationToGuarantor = ''
    if(insuranceInfo?.relationWithPatient){
        let relationToGuarantorData = `<sch:RelationshiptoGuarantor>${insuranceInfo?.relationWithPatient}</sch:RelationshiptoGuarantor>`
        relationToGuarantor = relationToGuarantorData
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
                                                <sch:Condition>
                                                    <sch:RelatedToAutoAccident>${relatedToAutoAccident}</sch:RelatedToAutoAccident>
                                                    <sch:RelatedToEmployment>${relatedToEmployment}</sch:RelatedToEmployment>
                                                    <sch:RelatedToOther>${relatedToOther}</sch:RelatedToOther>
                                                </sch:Condition>
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
                                                            <sch:Gender>${insuranceInfo?.subscriberGender ? insuranceInfo?.subscriberGender:'Unknown'}</sch:Gender>
                                                            <sch:LastName>${insuranceInfo?.subscriberLastName}</sch:LastName>
                                                            <sch:MiddleName>${insuranceInfo?.subscriberMiddleName? insuranceInfo?.subscriberMiddleName:''}</sch:MiddleName>
                                                            <sch:PatientRelationshipToInsured>${insuranceInfo?.subscriberRelationWithPatient? insuranceInfo?.subscriberRelationWithPatient:''}</sch:PatientRelationshipToInsured>
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
                                            ${relationToGuarantor}
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



//   const addBillingTeamPatientInsurance = (insuranceInfo, patientRes, tebraCaseDetails, tebraInsuranceData, adminPayViaInsuranceInfo) => {
//     let sendAdjesterData = ''
//     let sendEmployerData = ''
//     let copayData = ''
//     let highDeductableData = ''
//     if(insuranceInfo?.RP_injuryRelatedTo && insuranceInfo?.RP_injuryRelatedTo=="Worker's Compensation (WCOMP)"){
//         const adjuster = `<sch:Adjuster>
//                             <sch:FirstName>${insuranceInfo?.RP_adjusterName}</sch:FirstName>
//                             <sch:PhoneNumber>${insuranceInfo?.RP_adjusterPhone}</sch:PhoneNumber>
//                         </sch:Adjuster>`
//         sendAdjesterData = adjuster
//     }

//     if(insuranceInfo?.RP_reportedToEmployer && insuranceInfo?.RP_reportedToEmployer=="Yes"){
//         const employer = `<sch:Employer>
//                             <sch:AddressLine1>${insuranceInfo?.EI_employerAddress}</sch:AddressLine1>
//                             <sch:EmployerName>${insuranceInfo?.EI_employerName}</sch:EmployerName>
//                         </sch:Employer>`
//         sendEmployerData = employer
//     }
//     if(insuranceInfo?.PI_copayAmt){
//         const copay = `<sch:Copay>${insuranceInfo?.PI_copayAmt}</sch:Copay>`
//         copayData = copay
//     }

//     if(insuranceInfo?.PI_highDeductible){
//         const highDeductable = `<sch:Deductible>${insuranceInfo?.PI_highDeductible}</sch:Deductible>`
//         highDeductableData = highDeductable
//     }

//     let relatedToEmployment = (insuranceInfo?.RP_injuryRelatedTo=="Worker's Compensation (WCOMP)")?true:false
//     let relatedToAutoAccident = (insuranceInfo?.RP_injuryRelatedTo=="Motar Vehicle Accident (MVA)")?true:false
//     let relatedToOther = (insuranceInfo?.RP_injuryRelatedTo=="Other Personal Injury")?true:false

//     let relationToGuarantor = ''
//     if(insuranceInfo?.RP_relationWithPatient){
//         let relationToGuarantorData = `<sch:RelationshiptoGuarantor>${insuranceInfo?.RP_relationWithPatient}</sch:RelationshiptoGuarantor>`
//         relationToGuarantor = relationToGuarantorData
//     }

//     let insuredData = ''
//     if(adminPayViaInsuranceInfo && adminPayViaInsuranceInfo?.subscriberRelationWithPatient){
//         let insuredDataXML =`<sch:Insured>
// 							<sch:PatientRelationshipToInsured>${adminPayViaInsuranceInfo?.subscriberRelationWithPatient}</sch:PatientRelationshipToInsured>
// 						</sch:Insured>`
//         insuredData = insuredDataXML           
//     }

//     let soapRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.kareo.com/api/schemas/">
//                             <soapenv:Header/>
//                             <soapenv:Body>
//                                 <sch:UpdatePatient>
//                                     <sch:UpdatePatientReq>
//                                         <sch:RequestHeader>
//                                         <sch:CustomerKey>${tebraCredentials?.customerKey}</sch:CustomerKey>
//                                         <sch:Password>${tebraCredentials?.password}</sch:Password>
//                                         <sch:User>${tebraCredentials?.user}</sch:User>
//                                         </sch:RequestHeader>
//                                         <sch:Patient>
//                                         <sch:Cases>
//                                             <sch:PatientCaseUpdateReq>
//                                                 <sch:CaseID>${tebraCaseDetails?.CaseID}</sch:CaseID>
//                                                 <sch:Condition>
//                                                     <sch:RelatedToAutoAccident>${relatedToAutoAccident}</sch:RelatedToAutoAccident>
//                                                     <sch:RelatedToEmployment>${relatedToEmployment}</sch:RelatedToEmployment>
//                                                     <sch:RelatedToOther>${relatedToOther}</sch:RelatedToOther>
//                                                 </sch:Condition>
//                                                 <sch:PayerScenario>Insurance</sch:PayerScenario>
//                                                 <sch:Policies>
//                                                     <sch:InsurancePolicyUpdateReq>
//                                                         <sch:Active>${true}</sch:Active>
//                                                         ${sendAdjesterData}
//                                                         <sch:CompanyID>${tebraInsuranceData?.InsurancePolicyCompanyID}</sch:CompanyID>
//                                                         ${copayData}
//                                                         ${highDeductableData}
//                                                         <sch:EffectiveEndDate>${insuranceInfo?.PI_endDate ? tebraCommon.changeDateFormat(insuranceInfo?.PI_endDate):''}</sch:EffectiveEndDate>
//                                                         <sch:EffectiveStartDate>${insuranceInfo?.PI_effectiveDate ? tebraCommon.changeDateFormat(insuranceInfo?.PI_effectiveDate):''}</sch:EffectiveStartDate>
//                                                         <sch:InsurancePolicyID>${tebraInsuranceData?.InsurancePolicyID}</sch:InsurancePolicyID>
//                                                         ${insuredData}
//                                                         <sch:PlanID>${tebraInsuranceData?.InsurancePolicyPlanID}</sch:PlanID>
//                                                         <sch:PlanName>${insuranceInfo?.primaryInsurance}</sch:PlanName>
//                                                         <sch:PolicyGroupNumber>${insuranceInfo?.PI_group}</sch:PolicyGroupNumber>
//                                                         <sch:PolicyNumber>${insuranceInfo?.PI_idPolicy}</sch:PolicyNumber>
//                                                     </sch:InsurancePolicyUpdateReq>
//                                                 </sch:Policies>
//                                             </sch:PatientCaseUpdateReq>
//                                         </sch:Cases>
//                                         ${sendEmployerData}
//                                         <sch:Guarantor>
//                                             <sch:DifferentThanPatient>true</sch:DifferentThanPatient>
//                                             <sch:FirstName>${insuranceInfo?.RP_firstName}</sch:FirstName>
//                                             <sch:LastName>${insuranceInfo?.RP_lastName}</sch:LastName>
//                                             <sch:MiddleName>${insuranceInfo?.RP_middleName ? insuranceInfo?.RP_middleName:''}</sch:MiddleName>
//                                             ${relationToGuarantor}
//                                         </sch:Guarantor>
//                                         <sch:PatientID>${patientRes?.tebraDetails.PatientID}</sch:PatientID>
//                                         <sch:Practice>
//                                             <sch:PracticeID>4</sch:PracticeID>
//                                             <sch:PracticeName>Sandbox</sch:PracticeName>
//                                         </sch:Practice>
//                                         </sch:Patient>
//                                     </sch:UpdatePatientReq>
//                                 </sch:UpdatePatient>
//                             </soapenv:Body>
//                         </soapenv:Envelope>`
    
//       return soapRequest
//   }



const  addBillingTeamPatientNewInsurance = (insuranceInfo, patientRes, tebraCaseDetails, tebraInsuranceData, adminPayViaInsuranceInfo) => {
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

    let relatedToEmployment = (insuranceInfo?.RP_injuryRelatedTo=="Worker's Compensation (WCOMP)")?true:false
    let relatedToAutoAccident = (insuranceInfo?.RP_injuryRelatedTo=="Motar Vehicle Accident (MVA)")?true:false
    let relatedToOther = (insuranceInfo?.RP_injuryRelatedTo=="Other Personal Injury")?true:false

    let relationToGuarantor = ''
    if(insuranceInfo?.RP_relationWithPatient){
        let relationToGuarantorData = `<sch:RelationshiptoGuarantor>${insuranceInfo?.RP_relationWithPatient}</sch:RelationshiptoGuarantor>`
        relationToGuarantor = relationToGuarantorData
    }

    let insuredData = ''
    if(adminPayViaInsuranceInfo && adminPayViaInsuranceInfo?.subscriberRelationWithPatient){
        let insuredDataXML =`<sch:Insured>
							<sch:PatientRelationshipToInsured>${adminPayViaInsuranceInfo?.subscriberRelationWithPatient}</sch:PatientRelationshipToInsured>
						</sch:Insured>`
        insuredData = insuredDataXML           
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
                                                <sch:Condition>
                                                    <sch:RelatedToAutoAccident>${relatedToAutoAccident}</sch:RelatedToAutoAccident>
                                                    <sch:RelatedToEmployment>${relatedToEmployment}</sch:RelatedToEmployment>
                                                    <sch:RelatedToOther>${relatedToOther}</sch:RelatedToOther>
                                                </sch:Condition>
                                                <sch:PayerScenario>Insurance</sch:PayerScenario>
                                                <sch:Policies>
                                                    <sch:InsurancePolicyUpdateReq>
                                                        <sch:Active>${true}</sch:Active>
                                                        ${sendAdjesterData}
                                                        ${copayData}
                                                        ${highDeductableData}
                                                        <sch:EffectiveEndDate>${insuranceInfo?.PI_endDate ? tebraCommon.changeDateFormat(insuranceInfo?.PI_endDate):''}</sch:EffectiveEndDate>
                                                        <sch:EffectiveStartDate>${insuranceInfo?.PI_effectiveDate ? tebraCommon.changeDateFormat(insuranceInfo?.PI_effectiveDate):''}</sch:EffectiveStartDate>
                                                        ${insuredData}
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
                                            ${relationToGuarantor}
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



  

  const addBillingTeamPatientExistingInsurance = (insuranceInfo, patientRes, tebraCaseDetails, tebraInsuranceData, adminPayViaInsuranceInfo) => {
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

    let relatedToEmployment = (insuranceInfo?.RP_injuryRelatedTo=="Worker's Compensation (WCOMP)")?true:false
    let relatedToAutoAccident = (insuranceInfo?.RP_injuryRelatedTo=="Motar Vehicle Accident (MVA)")?true:false
    let relatedToOther = (insuranceInfo?.RP_injuryRelatedTo=="Other Personal Injury")?true:false

    let relationToGuarantor = ''
    if(insuranceInfo?.RP_relationWithPatient){
        let relationToGuarantorData = `<sch:RelationshiptoGuarantor>${insuranceInfo?.RP_relationWithPatient}</sch:RelationshiptoGuarantor>`
        relationToGuarantor = relationToGuarantorData
    }

    let insuredData = ''
    if(adminPayViaInsuranceInfo && adminPayViaInsuranceInfo?.subscriberRelationWithPatient){
        let insuredDataXML =`<sch:Insured>
							<sch:PatientRelationshipToInsured>${adminPayViaInsuranceInfo?.subscriberRelationWithPatient}</sch:PatientRelationshipToInsured>
						</sch:Insured>`
        insuredData = insuredDataXML           
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
                                                <sch:Condition>
                                                    <sch:RelatedToAutoAccident>${relatedToAutoAccident}</sch:RelatedToAutoAccident>
                                                    <sch:RelatedToEmployment>${relatedToEmployment}</sch:RelatedToEmployment>
                                                    <sch:RelatedToOther>${relatedToOther}</sch:RelatedToOther>
                                                </sch:Condition>
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
                                                        ${insuredData}
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
                                            ${relationToGuarantor}
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

    let relatedToEmployment = (insuranceInfo?.injuryRelelatedTo=="Worker's Compensation (WCOMP)")?true:false
    let relatedToAutoAccident = (insuranceInfo?.injuryRelelatedTo=="Motar Vehicle Accident (MVA)")?true:false
    let relatedToOther = (insuranceInfo?.injuryRelelatedTo=="Other Personal Injury")?true:false

    let relationToGuarantor = ''
    if(insuranceInfo?.relationWithPatient){
        let relationToGuarantorData = `<sch:RelationshiptoGuarantor>${insuranceInfo?.relationWithPatient}</sch:RelationshiptoGuarantor>`
        relationToGuarantor = relationToGuarantorData
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
                                                <sch:Condition>
                                                    <sch:RelatedToAutoAccident>${relatedToAutoAccident}</sch:RelatedToAutoAccident>
                                                    <sch:RelatedToEmployment>${relatedToEmployment}</sch:RelatedToEmployment>
                                                    <sch:RelatedToOther>${relatedToOther}</sch:RelatedToOther>
                                                </sch:Condition>
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
                                                            <sch:Gender>${insuranceInfo?.subscriberGender ? insuranceInfo?.subscriberGender:'Unknown'}</sch:Gender>
                                                            <sch:LastName>${insuranceInfo?.subscriberLastName}</sch:LastName>
                                                            <sch:MiddleName>${insuranceInfo?.subscriberMiddleName? insuranceInfo?.subscriberMiddleName:''}</sch:MiddleName>
                                                            <sch:PatientRelationshipToInsured>${insuranceInfo?.subscriberRelationWithPatient? insuranceInfo?.subscriberRelationWithPatient:''}</sch:PatientRelationshipToInsured>
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
                                            ${relationToGuarantor}
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


  const createEncounter = (resultData, subjectiveData, allCharges, diaCode) => {
        let patientRes = resultData?.patientDetails
        let caseDetails = resultData?.caseDetails
        let payVia = 'Insurance'
        if(resultData?.payVia == 'Selfpay') { 
            payVia = 'Self Pay' 
        }

        const serviceLineData = allCharges.map((chargesData) => {
            let minutesData = ''
            if(chargesData?.minutes){
                minutesData = `<sch:Minutes>${chargesData?.minutes}</sch:Minutes>`
            }
            return `<sch:ServiceLineReq>
                    <sch:DiagnosisCode1>${diaCode?.code}</sch:DiagnosisCode1>
                    ${minutesData}
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
                                            <sch:CasePayerScenario>${payVia}</sch:CasePayerScenario>
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
                                            <sch:FirstName>Doug</sch:FirstName>
                                            <sch:LastName>Martin</sch:LastName>
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


  const addPatientSelfPayIntakeForm = (patientRes, tebraCaseDetails, emergencyContact) => {

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
                                                <sch:PayerScenario>Self Pay</sch:PayerScenario>
                                            </sch:PatientCaseUpdateReq>
                                        </sch:Cases>
                                        <sch:EmergencyName>${emergencyContact[0].ec1FirstName} ${emergencyContact[0].ec1LastName}</sch:EmergencyName>
                                        <sch:EmergencyPhone>${tebraCommon.convertPhoneNumber(emergencyContact[0].ec1PhoneNumber)}</sch:EmergencyPhone>
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


  const addSupportTeamSelfPayIntakeForm = (patientRes, caseFound, emergencyContact) => {
    let tebraCaseDetails = caseFound?.tebraDetails
    let tebraInsuranceDetails = caseFound?.tebraInsuranceData
    let insuranceData = ''
    if(caseFound?.insuranceAddedOnTebra){
        let insuranceXMLData = `<sch:Policies>
                                    <sch:InsurancePolicyUpdateReq>
                                        <sch:Active>false</sch:Active>
                                        <sch:CompanyID>${tebraInsuranceDetails?.InsurancePolicyCompanyID}</sch:CompanyID>
                                        <sch:InsurancePolicyID>${tebraInsuranceDetails?.InsurancePolicyID}</sch:InsurancePolicyID>
                                        <sch:PlanID>${tebraInsuranceDetails?.InsurancePolicyPlanID}</sch:PlanID>
                                    </sch:InsurancePolicyUpdateReq>
                                </sch:Policies>`
        insuranceData = insuranceXMLData
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
                                                <sch:PayerScenario>Self Pay</sch:PayerScenario>
                                                ${insuranceData}
                                            </sch:PatientCaseUpdateReq>
                                        </sch:Cases>
                                        <sch:EmergencyName>${emergencyContact[0].ec1FirstName} ${emergencyContact[0].ec1LastName}</sch:EmergencyName>
                                        <sch:EmergencyPhone>${tebraCommon.convertPhoneNumber(emergencyContact[0].ec1PhoneNumber)}</sch:EmergencyPhone>
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
  addBillingTeamPatientExistingInsurance,
  addBillingTeamPatientNewInsurance,
  updateSupportTeamIntakeForm,
  createEncounter,
  addPatientSelfPayIntakeForm,
  addSupportTeamSelfPayIntakeForm
};