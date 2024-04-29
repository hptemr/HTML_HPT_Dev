
let serverUrlEnv= ""
let serverAuthUrl = ""
let bucketName = "hpt.dev"
let endpoint =  "localhost:8080";
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
  userProfileFolderPath:"profile-images/",
}
export const webTitle = "HPT"
export const serverUrl = serverUrlEnv
export const serverUrlAuth = serverAuthUrl
export const pageSize = 10
export const pageSizeOptions =[5, 10, 20, 25]