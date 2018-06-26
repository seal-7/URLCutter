# URL Cutter
A URL shortening web service, which provides short aliases for redirection of long URLs.

## How does it work?
Short alias provided by the user is used as a key and the long url which needs to be shortned is used as value. This provides us with a hash map kind of database where we can query for the key and get the long urls and redirect user to it.


# Install locally:

Note: Remember to start mongodb as a service.

    git clone https://github.com/seal-7/URLCutter.git
    cd URLCutter
    npm install
    sudo npm start
    Open http://localhost:3000 in your browser.
     
Here we need sudo as the server will be starting on port 80 which requires sudo privileges. Port can be changes in URLCutter/bin/www file.

## Usage Example

startCrawling function will be taking 2 parameters,first is the url to be crawled and second is the number of concurrent requests.

```js
var crawler = require('./crawler');

crawler.startCrawling('http://google.com/', 5);
```

To see through the data crawler has collected:
    
    redis-cli
Get all keys:

    127.0.0.1:6379>KEYS *
    
Get all urls and count of occurance:

    127.0.0.1:6379>HGETALL medium.com
    
Get all urls and params:

    127.0.0.1:6379>HGETALL medium.com_params
    
Learn more commands from https://redis.io/commands

