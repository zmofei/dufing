exports.res304 = function(req, res) {
  res.writeHead(304, {
      'Content-Type': 'text/html; charset=UTF-8'
  });
  res.end('304 Not Modified');
}

exports.res403 = function(req, res) {
  res.writeHead(403, {
      'Content-Type': 'text/html; charset=UTF-8'
  });
  res.end('403 Forbidden');
}

exports.res404 = function(req, res) {
  res.writeHead(404, {
      'Content-Type': 'text/html; charset=UTF-8'
  });
  res.end('404 Not Found!');
};
