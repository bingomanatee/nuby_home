var util = require('util');

module.exports = {


/* ****** GET ****** */

on_get_validate: function (rs){
	var self = this;
	self.on_get_input(rs)
},

on_get_input: function (rs){
	var self = this;
	var input = rs.req_props;
	self.on_get_process(rs, input)
},

on_get_process: function (rs,input){
	var self = this;
	self.on_output(rs,input)
},

/* ****** POST ****** */

on_post_validate: function (rs){
	var self = this;
	self.on_post_input(rs)
},

on_post_input: function (rs){
	var self = this;
	var foo = rs.req_props.foo;
	self.on_post_process(rs, foo)
},

on_post_process: function (rs,foo){
	var self = this;
    var foo_model = this.models.foo;

    var new_foo = new foo_model.ModelClass(foo);
    console.log('new foo: %s', util.inspect(new_foo, true));
    foo_model.db.add(new_foo);
    rs.flash('info', 'added foo ' + foo.name);
    rs.go('/test_model/tmone/alpha');
},

/* ****** PUT ****** */

on_put_validate: function (rs){
	var self = this;
	self.on_put_input(rs)
},

on_put_input: function (rs){
	var self = this;
	var input = rs.req_props;
	self.on_put_process(rs, input)
},

on_put_process: function (rs,input){
	var self = this;
	rs.send(input)
},

/* ****** DELETE ****** */

on_delete_validate: function (rs){
	var self = this;
	self.on_delete_input(rs)
},

on_delete_input: function (rs){
	var self = this;
	var input = rs.req_props;
	self.on_delete_process(rs, input)
},

on_delete_process: function (rs,input){
	var self = this;
	rs.send(input)
},

    a:'a' // last comma
}