// import modules
const args = require('minimist')(process.argv.slice(2));
const _ = require('underscore');
const fs = require('fs');
const getUri = require('get-uri');



// function download(uri: String!, options: Object!)
/* Any other options passed in to the options object will be passed through to 
   the low-level connection creation functions (http.get(), ftp.connect(), etc). */
const download = (uri, options) => {
    getUri(uri, options, (err, res) => {
        if (err) throw err;

        // create directory
        let directory = `./download`
        let filename = `${_.last(uri.split("/"))}`

        fs.mkdir(directory, { recursive: true }, (err) => {
            if (err) throw err;

            //write file to local
            let writeStream = fs.createWriteStream(`${directory}/${filename}`, { flags: 'w' });
            res.pipe(writeStream);
            writeStream.on('close', function () {
                console.log(uri, 'download successful!');
            });
        });
    })
}


const main = () => {

    // read input file
    if (!args['input-file']) return console.error(">>>>> Input file", "null")

    const inputs = require(`${args['input-file']}`)
    const uris = inputs ? (inputs.uris ? inputs.uris : null) : null
    if (!uris) return console.error(">>>>> Input file", "null")
    console.log(">>>>> Input file", args['input-file'])

    // download files by uri list
    for (let i = 0; i <= uris.length - 1; i++) {
        let uri = uris[i];
        try {
            download(uri, null);
        } catch (error) {
            console.error(uri, "download failed")
        }
    }
}
main();