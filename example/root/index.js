var render = function(req, res){
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Welcome to mSite\n');
}

module.exports = render;
