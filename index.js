
module.exports = function (msg, opts, cb) {
    if (typeof opts === 'function') {
        cb = opts
        opts = null
    }

    opts = opts || {}
    opts.input = opts.input || process.stdin
    opts.output = opts.output || process.stdout
    opts.defaultAnswer = opts.defaultAnswer || false
    opts.timeout = opts.timeout || 0

    opts.output.write(msg + ' ')

    var answer = opts.defaultAnswer
    var stillAsking = true;

    if (opts.timeout) {
        var timeoutTimer = setTimeout(function stopAsking () {
            clearTimeout(waitTimer)
            stillAsking = false
        }, opts.timeout)
    }

    var waitTimer = setTimeout(function wait () {
        answer = opts.input.read(1)

        if (stillAsking && answer == null) {
            /* no answer, but we do have time */
            setTimeout(wait, 50)

        } else if (stillAsking) {
            /* ok, got an answer */
            handleAnswer(answer, cb)

        } else {
            /* timeout, bailing out */
            var err = new Error('User did not provide an answer in expected timeframe')
            err.code = 'ETIMEOUT'
            cb(err, !!opts.defaultAnswer)
        }
    }, 0)
}

function handleAnswer(answer, cb) {
    if (answer.toString().toLowerCase() == 'y') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports.handleAnswer = handleAnswer
