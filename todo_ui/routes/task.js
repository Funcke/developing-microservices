var express = require('express');
var router = express.Router();
var request = require('request');

var TODO_TASK_SVC = process.env.TODO_TASK_SVC;

router.get('/dashboard', function(req, res, next) {
  if (!req.session.user_signed_in == true) {
    res.redirect('/user/signin')
    return;  
  }
    url =  TODO_TASK_SVC + "/list_tasks?task_user_id=" + req.session.user_id;

  request({
    url: url,
    json: true
  },
  function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.render('task', { title: 'Todo', values: body });
      return;
    }
  })
});

router.post('/add_task', function(req, res, next) {
  if (!req.session.user_signed_in == true) {
    res.redirect('/user/signin')
    return;  
  }
  
  task_name = req.body.task_name;

  if (task_name == undefined || task_name == "undefined" || task_name == "") {
    res.redirect('/task/dashboard');
    return;
  }

  url = TODO_TASK_SVC + "/add_task?task_user_id=" + req.session.user_id + "&task_name=" + task_name;

  request({
    url: url,
    json: true
  },
  function (error, response, body) {
    res.redirect('/task/dashboard');
  })
});

router.post('/delete_task', function(req, res, next) {
  if (!req.session.user_signed_in == true) {
    res.redirect('/user/signin')
    return;  
  }
  
  task_id = req.body.task_id;

  url = TODO_TASK_SVC + "/delete_task?task_id=" + task_id;

  request({
    url: url,
    json: true
  },
  function (error, response, body) {
    res.redirect('/task/dashboard');
  })
});

module.exports = router;
