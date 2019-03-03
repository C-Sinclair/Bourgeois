const Lexer = require('snapdragon-lexer')

// var input
// process.argv.forEach((val, index, arr) => {
//     if (val != 'node' && val != 'lexer') {
//         input = val
//         break
//     }
// })

const input = "Here is a // test 1892 2819.1218 // 212 121.121 var naming = yes "

const lexer = new Lexer()
lexer.ast = {
    type: 'root',
    nodes: []
}
let stack = []
let comment = false
let declaring = false

function resetFlags() {
    comment = false
    declaring = false
}

lexer.on('token', token => {
    console.log(token)
    switch (token.type) {
        case 'declaration':
            declaring = true
        case 'comment':
            comment = true
        case 'newline':
            resetFlags()
        case 'space':
    }
    lexer.advance()
})

lexer
    .capture('space', /^\s+/)
    .capture('break', /^\n{2,}/)
    .capture('newline', /^\n/)
    .capture('comment', /^\/\//)
    .capture('operator', /^\=|\+|\-|\*|\/|\!|(\+\=)|(\+\+)|(\-\=)|(\-\-)\s/)
    .capture('comparison', /^(\=)+\s/)
    .capture('string', /^[a-zA-Z]+/, token => {
        if (lexer.isInside('quotes') || lexer.isInside('dblQuotes') || lexer.isInside('ticks')) {
            token.type = "string"
        } else if (declaring) {
            token.type = "name"
        } else {
            token.type = "declaration"
        }
        return token
    })
    .capture('integer', /^\d+\s/, () => {
        if (!lexer.isInside('quotes') || !lexer.isInside('dblQuotes') || !lexer.isInside('ticks')) {
            return token
        }
    })
    .capture('float', /^(\d+)\.(\d+)\s/, () => {
        if (!lexer.isInside('quotes') || !lexer.isInside('dblQuotes') || !lexer.isInside('ticks')) {
            let previous = lexer.prev()
            previous.type = 'float'
            previous.value += token.value
        }
    })

let tokens = lexer.lex(input)
console.log(tokens)
return tokens