var BB = require('backbone');

var ModelClass;
var CollectionClass

module.exports = function () {

    if (!ModelClass) {
        ModelClass = BB.Model.extend({
            defaults:{

                name:"new foo",
                count:0

            }

        });

        CollectionClass = BB.Collection.extend({model:ModelClass}, {})
    }
    return {
        "name":"foo",
        ModelClass:ModelClass,
        CollecctionClass: CollectionClass,
        db: new CollectionClass([])
    };
}