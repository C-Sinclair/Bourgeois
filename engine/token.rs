enum TokenType {
    punctuation,
    string,
    keyword,
    whitespace,
    number
}

pub struct Token {
    type: TokenType
}



// https://blog.scottlogic.com/2019/05/17/webassembly-compiler.html