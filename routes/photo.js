var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;

exports.list = function(req, res){ res.render('photo', {
  title: 'Photos',
  photos: photos });
};

exports.list = function(req, res, next){
  Photo.find({}, function(err, photos){
    if (err) return next(err);
    res.render('photo', {
      title: 'Photos',
      photos: photos
    });
  });
};

exports.form = function(req, res){
  res.render('photo/upload', {
    title: 'Photo upload' 
  });
};

exports.submit = function (dir) {
  return function(req, res, next){
    console.log('dir=>'+dir);
    var img = req.files.photo.image;
    var name = req.body.photo.name || img.name;
    var path = join(dir, img.name);
    console.log('img=>'+img.path+',name=>'+path);

    // fs.writeFile( path,fs.createWriteStream(img.path) ,function(err){
   fs.rename(img.path, path ,function(err){
      if (err) return next(err);

      Photo.create({
        name: name,
        path: img.name
      }, function(err) {
        if (err) return next(err);
        res.redirect('/');
      });
    });
  };
};

exports.download = function(dir){
  return function(req, res, next){
    var id = req.params.id;
    Photo.findById(id, function(err, photo){
      if (err) return next(err);
      var path = join(dir, photo.path);
      res.download(path, photo.name+'.jpeg');
    });
  };
};
