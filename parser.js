var Snapdragon = require('snapdragon')

var capture = require('snapdragon-capture')
var captureSet = require('snapdragon-capture-set')

var Parser = Snapdragon.Parser
var parser = new Parser()

const keywords = [
    'new', 'element', 'style', 'event', 'extends'
]

var commented = false
var quote = false
var dblquote = false
var tick = false
var tabCount = 0

module.exports = parser

    .use(capture())
    .use(captureSet())

    .captureSet('brace', /^\{/, /^\}/)
    .captureSet('bracket', /^\(/, /^\)/)
    .captureSet('square', /^\[/, /^\]/)

    .capture('quote', /^\'/, () => {
        quote = true ? false : true
    })
    .capture('dblquote', /^\"/, () => {
        dblquote = true ? false : true
    })
    .capture('tick', /^\`/, () => {
        tick = true ? false : true
    })

    .captureSet('strliteral', /^\$\{?/, /^\}/)

    .capture('newline', /^\n/, () => {
        commented = false
        tabCount = 0
    })
    .capture('comment', /^\/\//, () => {
        commented = true
    })

    .capture('operator', /^[\=\+\-\*\/\!(\+\=)(\+\+)(\-\=)(\-\-)\<\>]\s/)
    .capture('comparison', /^(\=)+\s/)

    .capture('symbol', /^\@/)
    .capture('dot', /^\./)
    .capture('assign', /^\:/)
    .capture('semicolon', /^\;/, () => {
        tabCount = 0
    })
    .capture('comma', /^\,/)

    .set('space', function () {
        let m = this.match(/^\s+/)
        return
    })

    .set('tab', function () {
        let m = this.match(/^\t/)
        if (m) tabCount++
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
        let m = this.match(/^[a-zA-Z]([\w\-]+)?/)
        if (!m) return
        if (commented) return

        if (quote || dblquote || tick) {
            return pos({
                type: type,
                val: m[0]
            })
        } else {

            for (i = 0; i < keywords.length; i++) {
                if (keywords[i] == m[0]) return pos({
                    type: keywords[i],
                    value: ""
                })
            }

            return pos({
                type: 'name',
                value: m[0]
            })
        }

    })