class PromiseTick extends Promise {
    constructor(fn) {
        const tick = (...args) => this._tick ? this._tick(...args) : null;
        const fnTicked = (res, rej) => fn(
            (...args) => {
                this._tick = null;
                return res(...args);
            },
            (...args) => {
                this._tick = null;
                return rej(...args);
            },
            tick
        );
        super(fnTicked);
    }
    
    tick(fn) {
        this._tick = fn;
        return this;
    }
    
    then(res, rej, tick) {
        if (tick) {
            this.tick(tick);
        }
        return super.then(res, rej);
    }
}

export default PromiseTick;

