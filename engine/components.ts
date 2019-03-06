module Bourgeois.Engine {

    type Position = { x: Number, y: Number }
    type Bounds = { start: Position, end: Position }

    abstract class Component {

        protected position: Position
        protected bounds: Bounds
        protected elementString: string
        protected element: HTMLElement
        protected shadowRoot: ShadowRoot

        constructor(elementString = "div") {
            this.elementString = elementString
            this.create()
        }

        public create() {
            this.element = document.createElement(this.elementString)
            this.shadowRoot = this.element.attachShadow({ mode: 'open' })
        }

        public abstract style(styles)
        public abstract event(events)
        public abstract render()
    }

    class Div extends Component {

        constructor() {
            super()
        }

        style(styles?) {
            styles.forEach((item, value) => {
                this.element.style[item] = value
            })
        }

        event(events?) {
            events.forEach((name, fn) => {
                this.element.addEventListener(name, fn)
            })
        }

        hover(fn) {
            this.element.addEventListener('hover', fn)
        }

        click(fn) {
            this.element.addEventListener('click', fn)
        }

        render() {
            document.body.appendChild(this.element)
        }
    }

    class Blank extends Div {

        constructor() {
            super()
        }
    }

    abstract class Section {

    }

    class Menu extends Section {

    }
}
