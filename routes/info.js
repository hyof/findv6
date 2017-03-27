var cheerio = require('cheerio');
var superagent = require('superagent');
var async = require('async');
var db = require('../db/mongo');

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
                if (parseInt(ev.substr(ev.lastIndexOf("/") + 1)) &&
                    $element.children().first().children()) {
                    items.push({
                       href: "v.6.cn/"+ev.substr(ev.lastIndexOf("/") + 1)
                    });
                    db.save(ev.substr(ev.lastIndexOf("/") + 1), $element.children().first().children().attr("alt"), $element.children().first().children().attr("src2"));
                }
            }
         }
       });

     res.render('info', {info:items});
    });
};

exports.display = function (req, res) {

    async.waterfall([
        function(callback){
            db.info(callback);
        },
        function(result, callback) {
            res.render('display', {info:result});
            callback(null, 'done');
        }], function (err, result) {
            console.log(result);
        });
}
