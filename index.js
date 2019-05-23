// import modules
const args = require('minimist')(process.argv.slice(2));
const download = require('./downloader');


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
            download(uri, null, (err, res)=>{
                if(err) throw err;
                if(res) console.log(uri, 'download successful!');
            });
        } catch (error) {
            console.error(uri, "download failed")
        }
    }
}
main();