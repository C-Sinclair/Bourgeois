const Snapdragon = require('snapdragon')
const Compiler = Snapdragon.Compiler
var compiler = new Compiler()

module.exports = compiler

    .set('brace', function (node) {
        for (i = 0; i < node.nodes.length; i++) {
            let n = node.nodes[i]
            if (n.type == "brace.open" || n.type == "brace.close") {
                this.emit(n.val)
            } else {
                this.emit(n.value)
            }
        }
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
        this.emit('/n')
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
        this.emit(node.value + " ")
    })

    .set('name', function (node) {
        this.emit(node.value + ' ')
    })

    .set('element', function (node) {
        this.emit('class ')
    })

    .set('extends', function (node) {
        this.emit('extends ')
    })

    .set('new', function (node) {
        this.emit('new ')
    })

    .set('style', function (node) {
        this.emit(node.val + ' ')
    })

    .set('event', function (node) {
        this.emit(node.val + ' ')
    })