var test = require('tape')
var fromString = require('from2-string')
var stream = require('stream')


test('happy path test', function (t) {
    t.plan(3)
    const yorn = require('./')

    const input = fromString('y')
    const output = new stream.PassThrough

    output.on('data', function(data) {
        t.equal(data.toString(), 'Placeholder ', 'correct output with additional space')
    })

    yorn('Placeholder', {
        input,
        output
    }, function (err, result) {
        t.notOk(err, 'there should be no error')
        t.equal(result, true, 'y becomes true')
    })
})

test('timeout', t => {
    t.plan(2)
    const yorn = require('./')

    const input = fromString('')
    const output = new stream.PassThrough

    var failTimer = setTimeout(function() {
        t.fail('should already be cancelled')
    }, 400)

    yorn('Placeholder', {
        input, output,
        timeout: 200
    }, function(err, answer) {
        clearTimeout(failTimer)
        t.ok(err, 'error is present')
        t.equal(err.code, 'ETIMEOUT', 'error has an expected code')
    })
})

test('handleAnswer', t => {
    const yorn = require('./')
    const handleAnswer = yorn.handleAnswer
    t.test('handleAnswer calls back with true on yY', t => {
        t.plan(2)
        handleAnswer('y', (err, answer) => t.ok(answer))
        handleAnswer('Y', (err, answer) => t.ok(answer))
    })
    t.test('handleAnswer calls back with false on nN', t => {
        t.plan(2)
        handleAnswer('n', (err, answer) => t.notOk(answer))
        handleAnswer('N', (err, answer) => t.notOk(answer))
    })
    t.test('handleAnswer calls back with false on unknown input', t => {
        t.plan(1)
        handleAnswer('a', (err, answer) => t.notOk(answer))
    })
    t.test('handleAnswer calls back with default answer on unknown input with strictNn opts', t => {
        t.plan(1)
        const defaultAnswer = { unknownInput: true }
        handleAnswer('a', (err, answer) => t.equal(answer, defaultAnswer), {
            defaultAnswer,
            strictNn: true,
        })
    })
})

test('defaultAnswer on unknown', t => {
    const yorn = require('./')

    t.plan(2)

    const input = fromString('qwe')
    const output = new stream.PassThrough

    yorn('Placeholder', {
        input, output,
        defaultAnswer: true,
        strictNn: true,
    }, (err, answer) => {
        t.notOk(err, 'there should be no error')
        t.equal(answer, true, 'should pass defaultAnswer')
    })
})
