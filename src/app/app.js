var _ = require('lodash');
var greet = require('./txt/01-greet.txt');
var trick = require('./txt/02-trick.txt');

window.alert(greet);
_.delay(function() {
    window.alert(trick);
}, 1000);

window.prompt('Are you feeling lucky', 'Do ya punk?');

window.on('DOMWindowClose', function(e) {
    if (window.confirm("Do you really want to leave?")) {
      window.open("exit.html", "Thanks for Visiting!");
  } else {
      e.preventDefault();
  }

});
