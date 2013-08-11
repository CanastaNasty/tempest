// Generated by CoffeeScript 1.6.3
(function() {
  module.exports = {
    accessToken: null,
    auth: function() {
      var url;
      url = 'https://github.com/login/oauth/authorize?client_id=bc46af967c926ba4ff87&scope=gist,user:email';
      return window.location = url;
    },
    onload: function() {
      var code, _ref,
        _this = this;
      if (code = (_ref = window.location.href.match(/\?code=(.*)/)) != null ? _ref[1] : void 0) {
        $.getJSON("https://hamljr-auth.herokuapp.com/authenticate/" + code, function(data) {
          var token;
          if (token = data.token) {
            _this.authToken = token;
            return localStorage.authToken = token;
          }
        });
      }
      if (localStorage.authToken) {
        return this.accessToken = localStorage.authToken;
      }
    },
    update: function(id, data, callback) {
      var url;
      url = "https://api.github.com/gists/" + id;
      if (this.accessToken) {
        url += "?access_token=" + this.accessToken;
      }
      return $.ajax({
        url: url,
        type: "PATCH",
        dataType: 'json',
        data: data,
        success: callback
      });
    },
    create: function(data, callback) {
      var url;
      url = "https://api.github.com/gists";
      if (this.accessToken) {
        url += "?access_token=" + this.accessToken;
      }
      return $.ajax({
        url: url,
        type: "POST",
        dataType: 'json',
        data: data,
        success: callback
      });
    },
    get: function(id, callback) {
      var data;
      if (this.accessToken) {
        data = {
          access_token: this.accessToken
        };
      } else {
        data = {};
      }
      return $.getJSON("https://api.github.com/gists/" + id, data, callback);
    },
    load: function(id, _arg) {
      var callback, file;
      file = _arg.file, callback = _arg.callback;
      if (file == null) {
        file = "build.js";
      }
      return this.get(id, function(data) {
        Function(data.files[file])();
        return callback();
      });
    }
  };

}).call(this);