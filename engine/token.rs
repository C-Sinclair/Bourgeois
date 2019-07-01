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

enum TOKEN_TYPE {
    punctuation,
    string,
    name
}

struct Token {
    type: TOKEN_TYPE
}