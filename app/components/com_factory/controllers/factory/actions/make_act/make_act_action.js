var _ = require('underscore');
var util = require('util');
var _DEBUG = true;
var make = require('make');

module.exports = {

    on_validate:function (rs) {
        console.log('making action: %s', util.inspect(rs.req_props));
        this.on_input(rs);
    },

    on_input:function (rs) {
        this.on_process(rs, rs.req_props);
    },

    on_process:function (rs, input) {
        if (_DEBUG) console.log('MAKING ACTIONS: ++++++++ %s', util.inspect(input));
        input.root += '/actions';

        var actions = make.actions(input, input.root);
        actions.forEach(function(act){
            act.render();
        })
        rs.flash('info', util.format('Actions created: %s', input.root));
        rs.go('/make');
    }

}