const download = require('./downloader');

test('test#1', () => {
   download("uri", null, (err, res) => {
      expect(res).toBe(false);
   });
});