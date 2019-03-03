var Snapdragon = require('snapdragon')
var captureSet = require('snapdragon-capture-set')

var Parser = Snapdragon.Parser
var Compiler = Snapdragon.Compiler

var parser = new Parser()
var compiler = new Compiler()

var ast = parser
    .use(captureSet())
    .captureSet('brace', /^\{/, /^\}/)
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

var res = compiler.compile(ast)

console.log(res.output)