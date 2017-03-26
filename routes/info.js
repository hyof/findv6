var cheerio = require('cheerio');
var superagent = require('superagent');

exports.get = function (req, res) {

  superagent.get('v.6.cn')
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }

      var $ = cheerio.load(sres.text);
      var items = [];

      $('.pic').each(function (idx, element) {
        var $element = $(element);
        var ev = $element.attr('href');
        if (ev) {
            if (ev.lastIndexOf("/") > 0 && ev.length != ev.lastIndexOf("/")) {
                if (parseInt(ev.substr(ev.lastIndexOf("/") + 1))) {
                    items.push({
                       href: "v.6.cn/"+ev.substr(ev.lastIndexOf("/") + 1)
                    });
                }
            }
         }
       });

   res.render('info', {info:items});
    });
};
