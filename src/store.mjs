import { Component } from './component.mjs';

export function createStore(reducer) {
    let state;
    let listeners = [];

    function getState() {
        return state;
    }

    function subscribe(listener) {
        listeners.push(listener);
        console.log('subbed!', listeners)
        return function unsubscribe() {
            listeners.splice(listeners.indexOf(listener), 1);
        }
    }

    function dispatch(action) {
        state = reducer(state, action);
        console.log(listeners)
        listeners.forEach(listener => listener.update());
    }

    dispatch({});

    return { dispatch, subscribe, getState };
}

export function connect(store) {
    return class StoreComponent extends Component {
        constructor(props) {
            super(props);

            this.unsubscribe = store.subscribe(this);
            this.dispatch = store.dispatch;

            this.update();
        }

        update() {
            const props = Object.keys(this.props);
            const storeState = store.getState();

            if (props.length > 0) {
                props.forEach(prop => {
                    const storeProp = storeState[prop];

                    if(this.props[prop] !== storeProp) {
                        this.props[prop] = storeProp;
                    }
                });
            }
            else {
                Object.assign(this.props, storeState);
            }
        }
    }
}
