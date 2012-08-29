var _ = require('underscore');
var util = require('util');
var _DEBUG = true;
var nuby_factory = require('nuby-factory');

function _controller(com, name, actions) {

    var route_prefix = util.format("/%s/%s", com.name, name);
    var con = new nuby_factory.Controller({name:name, config: {name: name, route_prefix: route_prefix}}, com);

    _.each(actions, function (action_info) {
        var action = new nuby_factory.Action({name:action_info.name}, con);
        switch (action_info.method) {
            case '*':
                action.add_get('*/' + name, nuby_factory.method_factory.actions('get'));
                action.add_put('*/' + name, nuby_factory.method_factory.actions('put'));
                action.add_post('*/' + name, nuby_factory.method_factory.actions('post'));
                action.add_delete('*/' + name, nuby_factory.method_factory.actions('delete'));
                break;

            /* *********** NOTE *************** *
            NOTE - if we are not adding multiple actions, they all qualify as 'on' methods
             */
            default:
                var get_actions = nuby_factory.method_factory.actions('on');
                console.log('get actions: %s *************', get_actions);
                action.add_on('*/' + action_info.name, get_actions);
                action.config.method = action_info.method;
                break;
        }

        console.log(' =============== post action customization ========== %s', util.inspect(action));
    });
    return con;
}

function _actions_for(n, input) {
    var out = [];

    for (var i = 1; i <= 4; ++i) {
        var act_name_key = util.format('con_%s_action_%s', n, i);
        var method_key = act_name_key + '_method';
        if (input[act_name_key]) {
            out.push({name:input[act_name_key],
                method:input[method_key]});
        }
    }
    console.log('found data on controlller %s: %s',  n, util.inspect(out));
    return out;
}

module.exports = {

    on_validate:function (rs) {
        if (rs.has_content('comp_name')) {
            this.on_input(rs);
        } else {
            rs.flash('error', 'You must supply a name for your new component');
            rs.go('/make');
        }
    },

    on_input:function (rs) {
        this.on_process(rs, rs.req_props);

    },

    on_process:function (rs, input) {
        if (_DEBUG) console.log(util.inspect(input));

        var com = new nuby_factory.Component({name:input.comp_name, file_path:input.root + '/components'});

        if (input.controller1) {
            var con1 = _controller(com, input.controller1, _actions_for(1, input));
        }
        if (input.controller2) {
            var con2 = _controller(com, input.controller2, _actions_for(2, input));
        }
        if (input.controller3) {
            var con3 = _controller(com, input.controller3, _actions_for(3, input));
        }

        com.render(function () {
            rs.flash('info', util.format('Component %s created', com.get_path()));
            rs.go('/make');
        });
    }

}