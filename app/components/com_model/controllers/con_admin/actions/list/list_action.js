var _ = require('underscore');
var util = require('util');

var _DEBUG = true;

module.exports = {

    on_validate:function (rs) {
        var self = this;
        self.on_input(rs)
    },

    on_input:function (rs) {
        var self = this;
        var con = this.framework.frame_controllers();
        var comp = this.framework.get_components();
        var models = this.framework.get_resources('model');
        self.on_process(rs, models, con, comp);
    },

    on_process:function (rs, models, con, comp) {
        var self = this;
        
        /* ************* FILTER OUT CONTENT OF THIS MODULE **************** */
        console.log(util.inspect(this));

        var my_comp_path = self.parent.parent.path;
        var ci = my_comp_path.lastIndexOf('com_model') + 'com_model'.length;
        
        my_comp_path = my_comp_path.substring(0, ci);
        console.log('my_comp_path: %s', my_comp_path);
        
        var RE = new RegExp('^' + my_comp_path);
        function rf (con){
                    return RE.test(con.path);
                }
        
        var con = _.reject(con, rf);
        var comp = _.reject(comp, rf);

        function _element_basic_details(item) {
           return {
               name: item.name,
               path: item.path.substring(self.framework.path.length),
               CLASS: item.CLASS
           }
        }

        var data = {
            models:models,
            con:_.map(con, _element_basic_details),
            comp:_.map(comp, _element_basic_details)
        };

        console.log('list data: %s', util.inspect(data));
        self.on_output(rs, data);
    },

    /* ****** GET ****** */

    /* ****** POST ****** */

    /* ****** PUT ****** */

    /* ****** DELETE ****** */

    a:'a' // last comma
}
