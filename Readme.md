# winwhich

A [`which`](https://en.wikipedia.org/wiki/Which_(Unix))-like command line tool for Windows, built on node. Due to the availability of the built-in `where.exe` this is kind of superfluous.

By enabling debug output (`set DEBUG=*`) prior to running it you can at least find non-existent folders and duplicate entries in your `PATH`.

## Installation
* Install node and npm (I'd recommend [nvm-windows](https://github.com/coreybutler/nvm-windows) for this)
* Clone this repository
* Open a command prompt in the cloned folder
* `npm install --global --production`
* Afterwards you can delete the cloned folder