// import modules
const args = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const getUri = require('get-uri');



// function download(uri: String!)
const download = (uri) => {
    getUri(uri, (err, res) => {
        if (err) throw err;

        // create directory 
        let directory = `./download/${res.parsed.hostname}`
        let filename = `${res.parsed.pathname.replace(/\//g, "_")}`
        fs.mkdir(directory, { recursive: true }, (err) => {
            if (err) throw err;

            //write file to local
            let writeStream = fs.createWriteStream(`${directory}/${filename}`, { flags: 'w' });
            res.pipe(writeStream);
            writeStream.on('close', function () {
                console.log(`${directory}/${filename}`, 'download successful!');
            });
        });
    })
}


const main = () => {

    // read input file
    if (!args['input-file']) return console.error(">>>>> Input file", "null")

    const inputs = require(`${args['input-file']}`)
    const uris = inputs ? (inputs.uris ? inputs.uris : null) : null
    if(!uris) return console.error(">>>>> Input file", "null")
    console.log(">>>>> Input file", args['input-file'])

    // download files by uri list
    for (let i = 0; i <= uris.length - 1; i++) {
        let uri = uris[i];
        try {
            download(uri);
        } catch (error) {
            console.error(uri, "download failed")
        }
    }
}
main();