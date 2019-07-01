struct Context {
    id: f64,
    content: (),
    parent: Context
}
impl Context {
    fn new() -> Context {
        let c = Context {
            id: Random_number
        }
        ContextStack::add(c)
        return c;
    }
}

struct ContextStack {

}
impl ContextStack {
    fn add(c: Context) {

    }
}

enum ContextBound {
    OPEN,
    CLOSE
}
impl ContextBound {
    fn open() -> f64 {
        let mut c = Context::new()

    }
    fn close(id: f64) {
        
    }
}

enum TokenType {
    punctuation,
    string,
    keyword,
    whitespace,
    number
}

struct Token {
    type: TokenType
}

pub fn main() -> Vec<Token> {
    // get file input

    // loop over chars

    // run match 


}

main()

// https://blog.scottlogic.com/2019/05/17/webassembly-compiler.html