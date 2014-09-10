'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var util = require('util');
var ngUtil = require('../util');
var ScriptBase = require('../script-base.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.promptClientService = function () {
  var done = this.async();

  var prompts = [
    {
      type    : 'input',
      name    : 'service',
      message : 'Would you like a client side service with this server?',
      default : 'Y/n' // Default to current folder name
    },{
      type    : 'input',
      name    : 'name',
      message : 'What is the name of this server?',
      default : this.arguments // Default to current folder name
    },{
      type    : 'input',
      name    : 'servicePort',
      message : 'What port would you like this server to run on?',
      default : 3000 // Default to current folder name
    }

  ]
  this.prompt(prompts, function (props) {
    if(props.service === 'Y/n' || props.service === 'y' || props.service === 'Y'){
      this.composeWith('ng-component:service', {arguments: this.arguments}, { local: require.resolve('generator-ng-component/service') });
    }
    if(props.servicePort){
      this.servicePort = props.servicePort;
    }
    done();
  }.bind(this));
};

Generator.generateNgComponent = function(){
  this.prompt([
      {
        type: "list",
        name: "ngComponent",
        default: 1,
        message: "What type of angular component would you like to connect with?",
        choices: ["route", "service"],
        filter: function( val ) { return val.toLowerCase(); }
      }
      ], function (answers) {
        this.filters[answers.script] = true;
        this.filters[answers.markup] = true;
        this.filters[answers.stylesheet] = true;
        this.filters[answers.router] = true;
        this.filters.bootstrap = !!answers.bootstrap;
        this.filters.uibootstrap =  !!answers.uibootstrap;
      cb();
      }.bind(this));
}

Generator.prototype.generateServer = function () {
  var dest = 'servers/'+this.arguments;
  this.sourceRoot(path.join(__dirname, './templates'));
  ngUtil.processDirectory(this, '.', dest);
};

module.exports = Generator;



// 'use strict';
// var path = require('path');
// var yeoman = require('yeoman-generator');
// var util = require('util');
// var ngUtil = require('../util');
// var ScriptBase = require('../script-base.js');

// var Generator = module.exports = function Generator() {
//   ScriptBase.apply(this, arguments);
// };

// util.inherits(Generator, ScriptBase);

// Generator.prototype.askFor = function askFor() {

//   var done = this.async();
//   var name = this.name;

//   var base = this.config.get('routesBase') || '/api/';
//   if(base.charAt(base.length-1) !== '/') {
//     base = base + '/';
//   }

//   // pluralization defaults to true for backwards compat
//   if (this.config.get('pluralizeRoutes') !== false) {
//     name = name + 's';
//   }

//   var prompts = [
//     {
//       name: 'route',
//       message: 'What will the url of your endpoint to be?',
//       default: base + name
//     }
//   ];

//   this.prompt(prompts, function (props) {
//     if(props.route.charAt(0) !== '/') {
//       props.route = '/' + props.route;
//     }

//     this.route = props.route;
//     done();
//   }.bind(this));
// };

// Generator.prototype.registerEndpoint = function registerEndpoint() {
//   if(this.config.get('insertRoutes')) {
//     var routeConfig = {
//       file: this.config.get('registerRoutesFile'),
//       needle: this.config.get('routesNeedle'),
//       splicable: [
//         "app.use(\'" + this.route +"\', require(\'./api/" + this.name + "\'));"
//       ]
//     };
//     ngUtil.rewriteFile(routeConfig);
//   }

//   if (this.filters.socketio) {
//     if(this.config.get('insertSockets')) {
//       var socketConfig = {
//         file: this.config.get('registerSocketsFile'),
//         needle: this.config.get('socketsNeedle'),
//         splicable: [
//           "require(\'../api/" + this.name + '/' + this.name + ".socket\').register(socket);"
//         ]
//       };
//       ngUtil.rewriteFile(socketConfig);
//     }
//   }
// };

// Generator.prototype.createFiles = function createFiles() {
//   var dest = this.config.get('endpointDirectory') || 'server/api/' + this.name;
//   this.sourceRoot(path.join(__dirname, './templates'));
//   ngUtil.processDirectory(this, '.', dest);
// };

