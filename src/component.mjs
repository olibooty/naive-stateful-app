export class Component {
    constructor(props) {
        this.state = {};
        this.props = {};

        Object.assign(this.props, props);
    }

    getState() {
        return this.state;
    }

    setState(obj) {
        if (Array.isArray(obj) || typeof obj !== 'object') {
            throw new TypeError('value must be an object');
        }
        else {
            Object.assign(this.state, obj);
        }
    }
}
