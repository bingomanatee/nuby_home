module.exports = {

    on_validate:function (rs) {
        var self = this;
        self.on_input(rs)
    },

    on_input:function (rs) {
        var self = this;
        var input = {db: this.models.foo.db};
        self.on_process(rs, input)
    },

    on_process:function (rs, input) {
        var self = this;
        self.on_output(rs, input)
    }

}