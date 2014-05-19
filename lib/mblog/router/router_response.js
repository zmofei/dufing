exports.res304 = function(req, res) {
  res.writeHead(304, {});
  res.end('Not Modified 304');
}

exports.res403 = function(req, res) {
  res.writeHead(403, {});
  res.end('403 Forbidden');
}

exports.res404 = function(req, res) {
  res.writeHead(404, {});
  res.end('404 not found!');
};