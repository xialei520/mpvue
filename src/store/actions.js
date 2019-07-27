import {RECEIVE_KEY} from './mutation-type';
export default {
    getLogin(context, data){
        //触发对应的mutation

        context.commit(RECEIVE_KEY, data)
    
    }
}