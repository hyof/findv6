var sleep = require('sleep');

var User;
var inited = false;


function confirmConnected() {
    while( !inited ) {
        console.log("waiting...");
        sleep.msleep(1000);
    }
}
exports.init = function() {
    mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/v6info');

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        var UserSchema = mongoose.Schema({
            uid: String,
            uname: String,
            imagePath: String
        });

        User = mongoose.model('User', UserSchema);
        inited = true;
    });
}


exports.save = function(id, name, ipath) {

    confirmConnected();
    var t1 = new User({ uname: name, uid: id, imagePath : ipath });
    User.find({uid : id}, function (err, result) {
        if (result.length == 0) {
            t1.save(function (err, t1) {
                if (err) return console.error(err);
                console.log(t1.uname + " saved");
            });
        }
    })
}

exports.removeAll = function() {
    User.remove({}, (err) => {
        if (err) console.log("removeall error.");
        else console.log("all removed.");

    });
}

exports.remove = function(id) {
    confirmConnected();
    User.remove({uid: id}, (err) => {
        if (err) console.log("removeall error.");
        else console.log(id + " removed.");

    });
}

exports.info = function(callback) {
    confirmConnected();
    User.find(function(err, result) {
        if (callback) callback(null, result);
    });
}
