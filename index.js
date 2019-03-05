const fs = require('fs')
const parser = require('./parser')
const compiler = require('./compiler')

var input
process.argv.forEach((val, index, arr) => {
    if (val.includes('.bour')) {
        input = val
    }
})
input = fs.readFileSync(input).toString()
// console.log(input)

const ast = parser.parse(input)
const res = compiler.compile(ast)

console.log(res.output)