import {RECEIVE_KEY} from './mutation-type';

export default {
    [RECEIVE_KEY](state, data){
        state.login =data;
    }
}