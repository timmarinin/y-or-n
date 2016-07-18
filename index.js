
module.exports = function (msg, opts, cb) {
    if (typeof opts === 'function') {
        cb = opts
        opts = null
    }

    opts = opts || {
        input: process.stdin,
        output: process.stdout
    }

    opts.input.pause()

    opts.output.write(msg + ' ')

    var answer = 'n'

    setTimeout(function wait () {
        answer = opts.input.read(1)

        if (answer == null) setTimeout(wait, 50)
        else {
            opts.input.resume()
            if (answer.toString().toLowerCase() == 'y') {
                cb(null, true)
            } else {
                cb(null, false)
            }
        }
    }, 0)
}
