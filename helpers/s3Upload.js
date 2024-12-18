const fs = require('fs')
const AWS = require('aws-sdk')
const constants = require('./../config/constants')
const path = require("path")

const s3 = new AWS.S3({
  accessKeyId: constants.s3Details.awsKey,
  secretAccessKey: constants.s3Details.awsSecret
});

const uploadFileOld = (filename, filePath) => {
  let imgFullPath = path.join(__dirname, '../', filePath, filename)
  return new Promise(function (resolve, reject) {
    if (fs.existsSync(imgFullPath)) {
      fs.readFile(imgFullPath, (err, data) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        const params = {
          Bucket: constants.s3Details.bucketName,
          Key: filename,
          Body: data,
          ACL: "public-read"
        }
        s3.upload(params, function (s3Err, data) {
          if (s3Err) {
            console.log(s3Err)
            return s3Err
          } else {
            fs.unlink(imgFullPath, (err) => {
              if (err) {
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


const uploadFile = (filename, path, mimetype) => {
  return new Promise(function (resolve, reject) {
    let per = 0;
    if (fs.existsSync(__dirname + '/../tmp/' + filename)) {
      fs.readFile(__dirname + '/../tmp/' + filename, async (err, data) => {
        if (err) {
          console.log('upload File>>>>>>>>>', err)
          reject(err)
        }
        const params = {
          Bucket: constants.s3Details.bucketName,
          Key: path + filename,
          ContentType: mimetype ? mimetype : 'text/plain',
          Body: data,
          ACL: "public-read",
          //ACL: "bucket-owner-full-control"
        }

        var upload = s3.upload(params, function (s3Err, data) {
          try {
            if (s3Err) {
              console.log("----------upload error----------", s3Err)
              return s3Err
            } else {
              console.log(`File uploaded successfully at ${data.Location}`)
              fs.unlink(__dirname + '/../tmp/' + filename, (err) => {
                if (err) {
                  reject(err)
                }
                else {
                  console.log("File removed from local")
                }
                resolve(data);
              })
            }
          } catch (e) {
            console.log("----------Error----------", e)
          }
        }).on('httpUploadProgress', function (evt) {
          console.log("----------file uploaded----------")
          let response = {
            per: Math.round((evt.loaded * 100) / evt.total),
            size: evt.total
          }
          resolve(response);
          //Emit Here your events 
        }).send(function (err, data) {
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

const uploadPrivateFile = (filename, path, mimetype) => {
  return new Promise(function (resolve, reject) {
    let per = 0;
    if (fs.existsSync(__dirname + '/../tmp/' + filename)) {
      fs.readFile(__dirname + '/../tmp/' + filename, async (err, data) => {
        if (err) {
          console.log('uploadPrivateFile>>>>>>>>>', err)
          reject(err)
        }
        const params = {
          Bucket: constants.s3Details.bucketName,
          Key: path + filename,
          ContentType: mimetype ? mimetype : 'text/plain',
          Body: data,
         // ACL: "public-read",
          ACL: "bucket-owner-full-control"
        }

        var upload = s3.upload(params, function (s3Err, data) {
          try {
            if (s3Err) {
              console.log("----------upload error----------", s3Err)
              return s3Err
            } else {
              console.log(`File uploaded successfully at ${data.Location}`)
              fs.unlink(__dirname + '/../tmp/' + filename, (err) => {
                if (err) {
                  reject(err)
                }
                else {
                  console.log("File removed from local")
                }
                resolve(data);
              })
            }
          } catch (e) {
            console.log("----------Error----------", e)
          }
        }).on('httpUploadProgress', function (evt) {
          console.log("----------file uploaded----------")
          let response = {
            per: Math.round((evt.loaded * 100) / evt.total),
            size: evt.total
          }
          resolve(response);
          //Emit Here your events 
        }).send(function (err, data) {
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
  const params = { Bucket: constants.s3Details.bucketName, Delete: fileObject }
  let resMsg = false;
  try {
    s3.deleteObjects(params).promise()
    resMsg = true;
  } catch (err) {
    resMsg = false;//"ERROR in file Deleting : " + JSON.stringify(err);
    console.log("0", "ERROR in file Deleting : " + path + filename + JSON.stringify(err))
  }
  return resMsg;
}

//Delete single file
const deleteFile = async (path, filename) => {
  let filePath = path + filename;

  const params = { Bucket: constants.s3Details.bucketName, Key: filePath }
  let resMsg = false;
  try {
    await s3.headObject(params).promise()
    try {
      s3.deleteObject(params).promise()
      console.log("File Deleted from S3 "+filePath )
      resMsg = true;
    } catch (err) {
      resMsg = false;//"ERROR in file Deleting : " + JSON.stringify(err);
      console.log("0", "ERROR in file Deleting : " + path + filename + JSON.stringify(err))
    }
  } catch (err) {
    resMsg = false;
    console.log("00", "File not Found ERROR : " + path + filename + err.code)
  }
  return resMsg;
}

const getFile = (path, callback) => {
  const url = s3.getSignedUrl('getObject', {
    Bucket: constants.s3Details.bucketName,
    Key: path,
    Expires: 10,
  });
  return url
};

//upload file to s3 by manoj
const uploadFileNew = (params) => {
  console.log("*********uploadFileNew params********",params)
  return new Promise(function (resolve, reject) {
    var options = { partSize: 10 * 1024 * 1024, queueSize: 1 };
    s3.upload(params, options, async (err, data) => {
      if (err) {
        console.log("*********uploadFileNew Error********", err)
        resolve(false);
      } else {
        console.log("*********uploadFileNew Done********",data)
        resolve(true);
      }
    })
  })
}

//delete file from s3
const deleteObjectNew = (params) => {
  return new Promise(function (resolve, reject) {
    s3.deleteObject({
      Bucket: params.bucketName,
      Key: params.filePath,
    }, function (err, data) {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    })
  })
}

//preview file from s3
const previewDocumentFile = (path) => {
  return new Promise(async function (resolve, reject) {
    let url = await s3.getSignedUrl('getObject', {
      Bucket: constants.s3Details.bucketName,
      Key: path,
      Expires: 36660 * 5
    })
    resolve(url)
  })
}

const checkDirectoryExist = (Id) =>{
  return new Promise(function (resolve, reject) {
  var awsParams = {
    Bucket: constants.s3Details.bucketName,
    Key: constants.s3Details.documentsFolderPath+Id+'/',
  };
  s3.getObject(awsParams, (err, data) => {
    console.log(data)
    if(data==null){
      var params = { 
        Bucket: constants.s3Details.bucketName, 
        Key: constants.s3Details.documentsFolderPath+Id+'/'
      };
      s3.putObject(params).promise();
      resolve(true)
    }else{
      resolve(true)
    }
  });
  })
}

const uploadDocumentToS3 = (filename, path) => {
  return new Promise(function (resolve, reject) {
    if (fs.existsSync(__dirname + '/../tmp/' + filename)) {
      fs.readFile(__dirname + '/../tmp/' + filename, (err, data) => {
        if (err) {
          reject(err)
        }
        const params = {
          Bucket: constants.s3Details.bucketName,
          Key: path + filename,
          Body: data,
          ACL: 'public-read'
        }
        var options = { partSize: 10 * 1024 * 1024, queueSize: 1 };
        s3.upload(params,options, function (s3Err, data) {
          if (s3Err) {
            return s3Err
          } else {
            console.log(`File uploaded successfully at ${data.Location}`)
            fs.unlink(__dirname + '/../tmp/' + filename, (err) => {
              if (err) {
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
      reject("Some error occured.")
    }
})
}

const renameFileInS3 = (key, newkey) => {
  return new Promise(async function (resolve, reject) {
    try {
      // Copy object
      const copyParams = {
        Bucket: constants.s3Details.bucketName,
        CopySource: `/${constants.s3Details.bucketName}/${key}`,
        Key: newkey
      };
      const copyResult = await s3.copyObject(copyParams).promise();
      var options = {
        Bucket: constants.s3Details.bucketName,
        Key: key
      }
      s3.deleteObject(options, async function (err, data) {
        resolve(true);
      })
    } catch (error) {
      console.error('Copy Error', error);
      resolve(false);
    }
  })
}

module.exports = {
  s3,
  uploadFile,
  uploadPrivateFile,
  deleteFile,
  deleteFiles,
  uploadFileNew,
  deleteObjectNew,
  previewDocumentFile,
  checkDirectoryExist,
  uploadDocumentToS3,
  renameFileInS3
}
