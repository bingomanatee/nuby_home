module.exports = {

on_validate: function (rs){
	var self = this;
	self.on_input(rs)
},

on_input: function (rs){
	var self = this;
	var input = rs.req_props;
	self.on_process(rs, input)
},

on_process: function (rs,input){
	var self = this;
	self.on_output(rs,input)
},

/* ****** GET ****** */

/* ****** POST ****** */

/* ****** PUT ****** */

/* ****** DELETE ****** */

    a:'a' // last comma
}