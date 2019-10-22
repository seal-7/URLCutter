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
    Open http://localhost in your browser.
     
Here we need sudo as the server will be starting on port 80 which requires sudo privileges. Port can be changes in URLCutter/bin/www file.

