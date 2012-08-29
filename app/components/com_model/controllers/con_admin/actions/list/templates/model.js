var BB = require('backbone');

var _model;


module.exports = function(){

    if (!_model){
        _model = BB.model.extend({});
    }
    return _model;
}