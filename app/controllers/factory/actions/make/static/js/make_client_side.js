var NE_MAKE =  {};
$(function(){
    NE_MAKE.add_component = function(root, type){
        $('#new_comp input[name="root"] ').val(root);
        $('#new_comp input[name="type"] ').val(type);
        $('#new_comp .root').text(root);
        $('#new_comp .root_type').text(type);
       // $('#new_comp input[name="comp_name"]').val('(new controller name)');
        $('#new_comp').show();

        return false;
    }
})