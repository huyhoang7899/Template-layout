const shortid = require('shortid');
const db = require('../db');

module.exports.index = function(req, res) {
  res.render('transaction/index', {
    transactions: db.get('transactions').value()
  });
}

module.exports.create = function(req, res) {
  res.render('transaction/create', {
    users: db.get('users').value(),
    books: db.get('books').value()
  });
}

module.exports.update = function(req, res) {
  var id = req.params.id;
  res.render('transaction/update', {
    transaction: db.get('transactions').find({ id: id }).value()
  });
}

module.exports.delete = function(req, res) {
  var id = req.params.id;
  db.get('transactions').remove({ id: id }).write();
  res.redirect('back');
}

module.exports.postCreate = function(req, res) {
  req.body.id = shortid.generate();
  req.body.isComplete = false;
  db.get('transactions').push(req.body).write();
  res.redirect('/transactions');
}

module.exports.postUpdate = function(req, res) {
  var id = req.body.id;
  db.get('transactions').find({ id: id }).assign({ userId: req.body.userId }, { bookId: req.body.bookId }).write()
  res.redirect('/transactions');
}

module.exports.complete = function(req, res) {
  var id = req.params.id;
  db.get('transactions').find({ id: id }).assign({ isComplete: true }).write()
  res.redirect('/transactions');
}