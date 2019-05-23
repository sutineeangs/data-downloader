const download = require('./downloader');

test('test#1', () => {
   download("http://www.bloggang.com/data/gunzmyblog/picture/1220435057.jpg", null, (err, res, message) => {
      expect(res).toBe(true);
   });
});

test('test#2', () => {
   download("http://www.bloggang.com/data/gunzmyblog/picture/12235057.jpg", null, (err, res, message) => {
      expect(res).toBe(false);
   });
});

test('test#3', () => {
   download("http://www.bloggang.com/data/gunzmyblog/picture/12235057.jpg", null, (err, res, message) => {
      expect(message).toBe("Failed");
   });
});