var BB = require('backbone');

var ModelClass;
var CollectionClass

module.exports = function () {

   if (!ModelClass) {
       ModelClass = BB.Model.extend({

   defaults: {

     "name": "--",

     "created": "10",

     "updated": "undefined",

     "notes": "undefined",

     "value": "undefined",

     }


       });

       CollectionClass = BB.Collection.extend({model:ModelClass}, {})
   }
   return {
       "name":"bar",
       ModelClass:ModelClass,
       CollecctionClass: CollectionClass,
       db: new CollectionClass([])
   };
}