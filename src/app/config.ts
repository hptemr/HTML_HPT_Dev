
let serverUrlEnv= ""
let serverAuthUrl = ""
let bucketName = ""
let awsKey = ""
let awsSecret = ""
let endpoint = ""
if(window.location.hostname.indexOf("localhost") > -1){
  serverUrlEnv  = "http://localhost:3000"
  serverAuthUrl = "http://localhost:4200"
  endpoint = "localhost:3000";
} else if(window.location.hostname.indexOf("dev") > -1){
  serverUrlEnv = ""
  endpoint = "";
  serverAuthUrl = serverUrlEnv
 
}else{

}
export const s3Details = {
  url : "https://s3.us-east-2.amazonaws.com/"+bucketName,
  //awsserverUrl : "https://"+bucketName+".s3.amazonaws.com/",
  awss3PublicUrl : "https://"+bucketName+".s3.amazonaws.com",
  awsserverUrl : "https://"+bucketName+".s3.us-east-2.amazonaws.com/",
  bucketName: bucketName,
  awsKey: awsKey,
  awsSecret: awsSecret,
  userProfileFolderPath:"user-profile-image/",
}
export const webTitle = "HPT"
export const serverUrl = serverUrlEnv
export const serverUrlAuth = serverAuthUrl
