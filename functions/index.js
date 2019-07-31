const functions = require('firebase-functions');
var PDFImage = require("pdf-image").PDFImage;
const admin = require('firebase-admin');
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
//const async = require('async')
const fs = require('fs');
admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.generateThumbnail = functions.storage.object().onFinalize(async (object,context)=> {
    const fileBucket = object.bucket; 
    const filePath = object.name; 
    const contentType = object.contentType; 
    const metageneration = object.metageneration; 

    const fileName = path.basename(filePath)
    const bucket = admin.storage().bucket(fileBucket)
    const tempFilePath = path.join(os.tmpdir(),fileName)
    const metadata = {contentType : contentType}

    console.log(tempFilePath);
    await bucket.file(filePath).download({destination:tempFilePath})
    console.log(fs.existsSync(tempFilePath))
    var x = new PDFImage(tempFilePath)
    console.log(x)
    await x.convertPage(0);
    var coverPath = tempFilePath.replace('.pdf','-0.png')
    console.log(coverPath)
    console.log(fs.existsSync(coverPath))
    console.log('Done')
    return 0;
})