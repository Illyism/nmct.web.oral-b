Getting Started
---------------

Get [node](http://nodejs.org/) (from [package-manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)) and [npm](https://www.npmjs.org/) if not installed together.

You'll also need [grunt](http://gruntjs.com/) to compile less, build coffeescript, jade and run a watcher for livereload.

```shell
  > npm install
  > npm install -g grunt-cli 

  And to compile, just run
  > grunt

  To build, run
  > grunt build
```

`Grunt build` is a grunt task to minify javascript, stylesheets and HTML.