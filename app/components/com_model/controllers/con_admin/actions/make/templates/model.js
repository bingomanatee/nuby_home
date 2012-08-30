var BB = require('backbone');

var ModelClass;
var CollectionClass

module.exports = function () {

   if (!ModelClass) {
       ModelClass = BB.Model.extend({

<% if (fields){ %>   defaults: {
<% fields.forEach(function(f){%>
     "<%= f[0] %>": "<%= f[1] ? f[1] : '' %>",
<% }) %>
     }
<% } %>

       });

       CollectionClass = BB.Collection.extend({model:ModelClass}, {})
   }
   return {
       "name":"<%= name %>",
       ModelClass:ModelClass,
       CollecctionClass: CollectionClass,
       db: new CollectionClass([])
   };
}