exports.render = function(req, res){
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Welcome to test\n');
}
