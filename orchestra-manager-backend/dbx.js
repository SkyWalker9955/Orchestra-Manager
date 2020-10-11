var fetch = require('isomorphic-fetch');
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: '39InYAWapJAAAAAAAAAAD9jFHr7ubO9oykDYfj5H19ctbrjPgHXUxZqZm0YRHQ7g', fetch: fetch });


dbx.filesGetTemporaryLink({
    path: "/Pieces/W.A.Mozart-Eine.Kleine,K.525/Viola/Viola.pdf"
}).then(function(response) {console.log(response.link)
})
.catch(function(err) {
console.log(err);
('Error downloading file using the Dropbox API');
});
