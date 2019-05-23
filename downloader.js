// import modules
const _ = require('underscore');
const fs = require('fs');
const getUri = require('get-uri');



// function download(uri: String!, options: Object!)
/* Any other options passed in to the options object will be passed through to 
   the low-level connection creation functions (http.get(), ftp.connect(), etc). */
const download = (uri, options, callback) => {
    getUri(uri, options, (err, res) => {
        if (err) return callback(err);

        // create directory
        let directory = `./download`
        let filename = `${_.last(uri.split("/"))}`

        fs.mkdir(directory, { recursive: true }, (err) => {
            if (err) return callback(err);

            //write file to local
            let writeStream = fs.createWriteStream(`${directory}/${filename}`, { flags: 'w' });
            res.pipe(writeStream);
            writeStream.on('close', function () {
                callback(null, true)
            });
        });
    })
}
module.exports = download;