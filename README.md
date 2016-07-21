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

y-or-n supports few options that you can pass as a second argument. Default values:

```
const yorn = require('y-or-n')

yorn('Are you OK? y/n', {
  timeout: 0, // ms, 0 means no timeout
  defaultAnswer: false, // read section below
  input: process.stdin, // Readable stream
  output: process.stdout, // Writable stream
  strictNn: false // accept only n or N as false answer
}, function getAnswer (err, answer) {
    if (err) {
        // if user didn't enter anything before timeout
        // then err.code is ETIMEOUT
        assert(err.code === 'ETIMEOUT')
        // and we probably should react somehow anyway, answer
        // is defaultAnswer from options object
    }
})

### opts.defaultAnswer

Value that is used in few cases, namely when timeout is set and expired, when strictNn is set and input is not any of [yYnN].

```

## License

MIT. © 2016, Marinin Tim <mt@marinin.xyz>
