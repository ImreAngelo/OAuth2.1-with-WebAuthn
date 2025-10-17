import type { Setter } from 'solid-js';
import type { State } from '../';
export interface StatePropsType { 
    setState: Setter<State> 
}

import style from './states.module.css';
export { style };