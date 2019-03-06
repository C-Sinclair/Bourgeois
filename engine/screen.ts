module Bourgeois.Engine {

    class Screen {

        width: Number
        height: Number

        constructor() {

            this.width = window.innerWidth
            this.height = window.innerHeight

            window.addEventListener('resize', () => {
                this.width = window.innerWidth
                this.height = window.innerHeight
            })
        }



    }

}