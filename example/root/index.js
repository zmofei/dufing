var render = function(req, res) {
    this.jade({
        data: {
            title: 'abc'
        }
    })
}

module.exports = render;
