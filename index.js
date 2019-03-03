var Snapdragon = require('snapdragon')
var capture = require('snapdragon-capture')
var captureSet = require('snapdragon-capture-set')
var isInside = require('snapdragon-is-inside')
var fs = require('fs')

var Parser = Snapdragon.Parser
var Compiler = Snapdragon.Compiler

var parser = new Parser()
var compiler = new Compiler()

var input
process.argv.forEach((val, index, arr) => {
    if (val.includes('.bour')) {
        input = val
    }
})

input = fs.readFileSync(input).toString()

var ast = parser

    .use(capture())
    .use(captureSet())

    .captureSet('brace', /^\{/, /^\}/)
    .captureSet('bracket', /^\(/, /^\)/)
    .captureSet('square', /^\[/, /^\]/)

    .captureSet('quote', /^\'/, /^\'/)
    .captureSet('dblquote', /^\"/, /^\"/)
    .captureSet('tick', /^\`/, /^\`/)

    .captureSet('strliteral', /^\$\{?/, /^\}/)

    .capture('newline', /^\n/)
    .capture('comment', /^\/\//)

    .capture('operator', /^\=|\+|\-|\*|\/|\!|(\+\=)|(\+\+)|(\-\=)|(\-\-)\s/)
    .capture('comparison', /^(\=)+\s/)

    .capture('symbol', /^\@/)
    .capture('dot', /^\./)
    .capture('assign', /^\:/)
    .capture('comma', /^\,/)

    .set('space', function () {
        let m = this.match(/^\s+/)
        return
    })

    .set('float', function () {
        let pos = this.position()
        let m = this.match(/^(\d+)\.(\d+)\s/)
        if (!m) return
        return pos({
            type: 'float',
            val: m[0]
        })
    })

    .set('integer', function () {
        let pos = this.position()
        let m = this.match(/^\d+\s/)
        let commad = this.match(/^\d+\,?/)
        if (!m && !commad) return
        if (commad) {
            return pos({
                type: 'integer',
                val: commad[0].slice(0, -1)
            }, {
                type: 'comma',
                value: ','
            })
        } else {
            return pos({
                type: 'integer',
                val: m[0]
            })
        }
    })

    .set('string', function () {
        let pos = this.position()
        let m = this.match(/^[a-zA-Z]+/)
        if (!m) return
        return pos({
            type: 'string',
            val: m[0]
        })
    })

    .parse(input)

console.log(ast)

var res = compiler

    .use(isInside())

    .set('brace', function (node) {
        return this.emit(node.val + ' ')
    })

    .set('bracket', function (node) {
        return this.emit(node.val + ' ')
    })

    .set('square', function (node) {
        return this.emit(node.val + ' ')
    })

    .set('quote', function (node) {
        return this.emit(node.val + ' ')
    })

    .set('dblquote', function (node) {
        return this.emit(node.val + ' ')
    })

    .set('tick', function (node) {
        return this.emit(node.val + ' ')
    })

    .set('strliteral', function (node) {
        return this.emit(node.val + ' ')
    })

    .set('newline', function (node) {
        return this.emit(node.val + ' ')
    })

    .set('comment', function (node) {
        return this.emit(node.val + ' ')
    })

    .set('operator', function (node) {
        return this.emit(node.val + ' ')
    })

    .set('comparison', function (node) {
        return this.emit(node.val + ' ')
    })

    .set('symbol', function (node) {
        return this.emit(node.val + ' ')
    })

    .set('dot', function (node) {
        return this.emit(node.val + ' ')
    })

    .set('assign', function (node) {
        return this.emit(node.val + ' ')
    })

    .set('float', function (node) {
        return this.emit(node.val + ' ')
    })

    .set('integer', function (node) {
        return this.emit(node.val + ' ')
    })

    .set('string', function (node) {
        return this.emit(node.val + ' ')
    })

    .compile(ast)

console.log(res.output)