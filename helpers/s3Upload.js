const fs = require('fs')
const AWS = require('aws-sdk')
const constants =  require('./../config/constants')
const path = require("path")

const s3 = new AWS.S3({
  accessKeyId: constants.s3Details.awsKey,
  secretAccessKey: constants.s3Details.awsSecret
});

const uploadFile = (filename, filePath) => {
  console.log("filename => ", filename)
  let imgFullPath = path.join(__dirname, '../', filePath, filename)
  console.log("imgFullPath => ",imgFullPath)
  return new Promise(function(resolve, reject) {

    if (fs.existsSync(imgFullPath)) {
      console.log("File exists")
     fs.readFile(imgFullPath, (err, data) => {
       if (err){
         console.log(err)
         reject(err)
       }
       const params = {
          Bucket: constants.s3Details.bucketName,
          Key: filename,
          Body: data,
          ACL: "public-read"
       }
       console.log("Reading file")
       s3.upload(params, function(s3Err, data) {
         if (s3Err) {
           console.log(s3Err)
           return s3Err
         } else {
           console.log(`File uploaded successfully at ${data.Location}`)
           fs.unlink(imgFullPath, (err) => {
             if (err){
               reject(err)
             }
             else {
               console.log("File removed from local")
             }
             resolve(data);
           })
         }
       })
     })
    } else {
      console.log("file not found")
      reject("Some error occured.")
    }
  })
}


const uploadPrivateFile = (filename, path,mimetype) => {
 // console.log(__dirname,' >>>>>>> uploadPrivateFile>>>>>>>>>',filename,'###################',path,'>>>>>>>>',mimetype)
  return new Promise(function(resolve, reject) {
    let per = 0;
    if (fs.existsSync(__dirname + '/../tmp/'+filename)) {
      console.log("File exists")
     fs.readFile(__dirname + '/../tmp/' + filename, async (err, data) => {
       if (err){
         console.log('uploadPrivateFile>>>>>>>>>',err)
         reject(err)
       }
      //let fileType = await FileType.fromBuffer(data)
      //console.log('>#############>>>>>>','############>>>>>>>',constants.s3Details.bucketName,')
       //ContentEncoding:"base64",
       const params = {         
          Bucket: constants.s3Details.bucketName,
          Key: path + filename,
          ContentType: mimetype ? mimetype : 'text/plain',
          Body: data,
          //ACL: "public-read",
          //ACL: "bucket-owner-full-control"
       }
  
      console.log("Reading Private file",params)
      var upload =  s3.upload(params, function(s3Err, data) {
        try{

        
        console.log(">>>>>>>>>>upload",upload)
         if (s3Err) {
           console.log("----------upload error----------")
           console.log(s3Err)
           return s3Err
         } else {
           console.log(`File uploaded successfully at ${data.Location}`)
           fs.unlink(__dirname + '/../tmp/' + filename, (err) => {
             if (err){
               reject(err)
             }
             else {
               console.log("File removed from local")
             }
             resolve(data);
           })
         }
        }catch(e){
          console.log("----------Error----------",e)
        }
        }).on('httpUploadProgress', function(evt) {
          console.log("----------file uploaded----------")
        let response = {
          per: Math.round((evt.loaded * 100) / evt.total),
          size: evt.total
        }
        resolve(response);
        //Emit Here your events 
      }).send(function(err, data) {
        // console.log('send data finally===> ',data);
        // return data;        
      });
     })
    } else {
      consoel.log("--------rejected---------")
      reject("Some error occured.")
    }
   // return per;
  })
}



//Delete Multiple files
const deleteFiles = (filearray, path) => {
  let fileObject = [];
  fileObject["Objects"] = filearray;
  const params = {Bucket: constants.s3Details.bucketName,Delete:fileObject}
  let resMsg = false;
         try {
            s3.deleteObjects(params).promise()
            resMsg = true;     
         } catch (err) {
           resMsg = false;//"ERROR in file Deleting : " + JSON.stringify(err);
           console.log("0","ERROR in file Deleting : " +path+filename+ JSON.stringify(err))
         }
     return resMsg;
}

//Delete single file
const deleteFile = async (path,filename) => {
  let filePath = path+filename;
 
  const params = {Bucket: constants.s3Details.bucketName,Key:filePath}
  let resMsg = false;
     try {
        await s3.headObject(params).promise()
         try {
            s3.deleteObject(params).promise()
            resMsg = true;     
         } catch (err) {
           resMsg = false;//"ERROR in file Deleting : " + JSON.stringify(err);
           console.log("0","ERROR in file Deleting : " +path+filename+ JSON.stringify(err))
         }
     } catch (err) {
             resMsg = false;
             console.log("00","File not Found ERROR : " +path+filename+ err.code)
     }
     return resMsg;
}

const getFile = (path, callback) => {
  const url = s3.getSignedUrl('getObject', {
    Bucket: constants.s3Details.bucketName,
    Key: path,
    Expires:10,
  });
  return url
};

module.exports = { uploadFile,uploadPrivateFile,deleteFile,deleteFiles,s3}