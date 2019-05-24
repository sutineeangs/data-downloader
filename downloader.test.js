const download = require('./downloader');

test('test#01 - successfully download data using http protocol', () => {
   download("http://www.bloggang.com/data/gunzmyblog/picture/1220435057.jpg", null, (err, res, message) => {
      expect(res).toBe(true);
   });
});

test('test#02 - successfully download data using ftp protocol', () => {
   download("ftp://anonymous:miemail%40gmail.com@speedtest.tele2.net/100KB.zip", null, (err, res, message) => {
      expect(res).toBe(true);
   });
});

test('test#03 - failed download data using not exist uri', () => {
   download("http://www.bloggang.com/data/gunzmyblog/picture/12235057.jpg", null, (err, res, message) => {
      expect(res).toBe(false);
   });
});

test('test#04 - failed download data using invalid uri', () => {
   download("abc://pop.com/abc.json", null, (err, res, message) => {
      expect(res).toBe(false);
   });
});

test('test#05 - successfully download data and save file to ./download/js_output.asp', () => {
   download("https://www.w3schools.com/js/js_output.asp", null, (err, res, message) => {
      expect(message).toBe("./download/js_output.asp");
   });
});






