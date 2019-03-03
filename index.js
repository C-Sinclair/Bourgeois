var Snapdragon = require('snapdragon')
var capture = require('snapdragon-capture')
var captureSet = require('snapdragon-capture-set')
var isInside = require('snapdragon-is-inside')

var Parser = Snapdragon.Parser
var Compiler = Snapdragon.Compiler

var parser = new Parser()
var compiler = new Compiler()

var ast = parser

    .use(capture())
    .use(captureSet())

    .captureSet('brace', /^\{/, /^\}/)
    .captureSet('bracket', /^\(/, /^\)/)
    .captureSet('square', /^\[/, /^\]/)

    .set('space', function () {
        var m = this.match(/^\s+/)
        return
    })

    .set('string', function () {
        var pos = this.position();
        var m = this.match(/^[a-zA-Z]+/);
        if (!m) return;
        return pos({
            type: 'string',
            val: m[0]
        })
    })

    .parse("strings are great")

console.log(ast)

var res = compiler

    .use(isInside())

    .set('string', function (node) {
        return this.emit(node.val + ' ')
    })

    .compile(ast)

console.log(res.output)