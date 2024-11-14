const { tebraCredentials } = require('./../config/constants')

const getPracice = () => {
  let soapRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://www.kareo.com/api/schemas/">
                            <soapenv:Header/>
                            <soapenv:Body>
                                <sch:GetPractices>
                                    <sch:request>
                                        <sch:RequestHeader>
                                        <sch:CustomerKey>${tebraCredentials.customerKey}</sch:CustomerKey>
                                        <sch:Password>${tebraCredentials.password}</sch:Password>
                                        <sch:User>${tebraCredentials.user}</sch:User>
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

module.exports = {
  getPracice
};