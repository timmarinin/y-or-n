y-or-n
======

Get y/n from user on terminal in callback. That's it.

## Usage

Install it from npm via `npm i y-or-n`. After that, you're ready to go:

```
const yorn = require('y-or-n')

yorn('Is it dark?', function(err, answer) {
    // answer is Boolean, true || false.
})
```

## Options

y-or-n supports few options that you can pass as a second argument, like this:

```
const yorn = require('y-or-n')

yorn('Are you OK? y/n', {
  timeout: 5000, // ms, defaults to 0, no timeout
  defaultAnswer: true, // will be used in case of timeout, defaults to false
  input: process.stdin, // defaults to process.stdin
  output: process.stdout, // defaults to process.stdout
}, function getAnswer (err, answer) {
    if (err) {
        // if user didn't enter anything before timeout
        // then err.code is ETIMEOUT
        assert(err.code === 'ETIMEOUT')
        // and we probably should react somehow anyway, answer
        // is defaultAnswer from options object
    }
})
```

## License

MIT. © 2016, Marinin Tim <mt@marinin.xyz>
