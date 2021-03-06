/**
 * Created by andycall on 15/5/7.
 */
/**
 * Process multipart file streams
 */
var Busboy = require('busboy'),
    fs = require('fs-extra'),
    path = require('path'),
    os = require('os'),
    crypto = require('crypto');

function busBoy(req, res, next){
    var busboy,
        stream,
        tmpDir;

    if(! (req.method && /post/i.test(req.method)) ){
        return next();
    }

    busboy = new Busboy({headers : req.headers});
    tmpDir = os.tmpDir();

    req.files = req.files || {};
    req.body = req.body || {};


    busboy.on('file', function( fieldname, file, filename, encoding, minetype) {
        var filePath,
            tmpFileName,
            md5 = crypto.createHash('md5');

        if(! filename){
            return file.resume();
        }

        md5.update(filename, 'utf-8');
        tmpFileName = (new Date()).getTime() + md5.digest('hex');
        filePath = path.join(tmpDir, tmpFileName || 'temp.tmp');
        file.on('end', function(){
            req.files[fieldname] = {
                type : minetype,
                encoding : encoding,
                name : filename,
                path : filePath
            };
        });


        file.on('error', function(error) {
            console.log('Error', "Something went wrong uploading the file", error);
        });
        stream = fs.createWriteStream(filePath);
        stream.on('error', function(error) {
            console.log('Error: ', "Something went wrong uploading the file", error);
        });
        file.pipe(stream);
    });

    busboy.on('error', function( error ) {
        console.log('Error', 'Something went wrong parsing the form', error);
        res.status(500).send({code: 500, message : "Could not parse upload completely."});
    });

    busboy.on('field', function(fieldname, val){
        req.body[fieldname] = val;
    });

    busboy.on('finish', function(){
        next();
    });

    req.pipe(busboy);

}

module.exports = busBoy;
module.exports.type = "middleware";