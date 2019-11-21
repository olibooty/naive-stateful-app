import { createStore, connect } from './store.mjs';

function reducer(state = { count: 0 }, action) {
    switch (action.type) {
        case 'INC':
            return {
                ...state,
                count: state.count += 1
            };

        default:
            return state;
    }
}

const store = createStore(reducer);

const Component = connect(store);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            double: 0,
        }
    }

    count() {
        return this.props.count;
    }

    double() {
        const d = this.props.count * 2;
        console.log(d)
        this.setState({ double: d });
    }

    increment() {
        this.dispatch({ type: 'INC' });
    }

    // render() {

    // }
}

const app = new App();

function createElement(node, text, target = document) {
    const element = document.createElement(node);

    let textElement;
    if (text) {
        textElement = document.createTextNode(text);
        element.appendChild(textElement);
    }

    // target.appendChild(element);
    return element;
}

// const root = document.getElementById('root');

// const counter = createElement('p', app.props.count)
// const btn = createElement('button', 'click');

// root.appendChild(counter)
// root.appendChild(btn)

// btn.addEventListener('click', () => {
//     app.increment();
//     console.log(app)
// });

console.log('store state', store.getState())
console.log('props', app.props)
console.log('state', app.state)

app.increment()
app.double()
console.log('store state', store.getState())
console.log('props', app.props)
console.log('state', app.state)

app.increment()
app.double()
console.log('store state', store.getState())
console.log('props', app.props)
console.log('state', app.state)
