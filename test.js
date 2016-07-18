var test = require('tape')
var fromString = require('from2-string')
var stream = require('stream')


test('it should get boolean in callback on y', function (t) {
    t.plan(2)
    const yorn = require('./')

    const input = fromString('y')
    const output = new stream.PassThrough

    yorn('Placeholder', {
        input,
        output
    }, function (err, result) {
        t.notOk(err, 'there should be no error')
        t.ok(result)
    })
})
