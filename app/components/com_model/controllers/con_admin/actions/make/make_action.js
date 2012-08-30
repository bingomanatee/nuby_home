var ejs = require('ejs');
var fs = require('fs');
var util = require('util');
var _DEBUG = true;
var _ = require('underscore');
var wrench = require('wrench');

var _model_template = '';

module.exports = {

    /* ****** GET ****** */

    on_get_validate:function (rs) {
        var self = this;
        self.on_get_input(rs)
    },

    on_get_input:function (rs) {
        var self = this;
        var input = rs.req_props;
        self.on_get_process(rs, input)
    },

    on_get_process:function (rs, input) {
        var self = this;
        self.on_output(rs, input)
    },

    /* ****** POST ****** */

    on_post_validate:function (rs) {
        console.log('--------- makin copies -------------')
        var self = this;
        self.on_post_input(rs)
    },

    on_post_input:function (rs) {
        var self = this;
        var input = rs.req_props;
        if (_DEBUG){
            console.log('raw input: %s', util.format(input));
        }

        var fields = _.zip(input.field, input.default_value)

        if (!_model_template) {
            fs.readFile(__dirname + '/templates/model.js', 'utf8', function (err, content) {
                _model_template = ejs.compile(content);
                self.on_post_process(rs, input.model_name, input.dest, fields);
            })
        } else {
            self.on_post_process(rs, input.model_name, input.dest, fields);
        }
    },

    on_post_process:function (rs, name, dest, fields) {
        var self = this;
        var data = {dest: dest, model: _model_template({name: name, fields: fields})};
        if (_DEBUG){
            console.log(util.format(data));
        }
        // not waiting for callback because installation is asynchronous anyawy
        var model_dir = self.framework.path + '/' + dest + '/resources/models';
        wrench.mkdirSyncRecursive(model_dir, 0775);
        fs.writeFile( model_dir + '/' + name + '.js', data.model, function(){
            self.on_output(rs,data);
        });

    },

    /* ****** PUT ****** */

    on_put_validate:function (rs) {
        var self = this;
        self.on_put_input(rs)
    },

    on_put_input:function (rs) {
        var self = this;
        var input = rs.req_props;
        self.on_put_process(rs, input)
    },

    on_put_process:function (rs, input) {
        var self = this;
        rs.send(input)
    },

    /* ****** DELETE ****** */

    on_delete_validate:function (rs) {
        var self = this;
        self.on_delete_input(rs)
    },

    on_delete_input:function (rs) {
        var self = this;
        var input = rs.req_props;
        self.on_delete_process(rs, input)
    },

    on_delete_process:function (rs, input) {
        var self = this;
        rs.send(input)
    },

    a:'a' // last comma
}