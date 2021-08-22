import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
import {ActionTypes} from './type/action-types';
import {MutationTypes} from './type/mutation-types'
import * as api from '../api/index'

// type AugmentedActionContext = {
//     commit<K extends keyof Mutations>(
//       key: K,
//       payload: Parameters<Mutations[K]>[1]
//     ): ReturnType<Mutations[K]>
//   } & Omit<ActionContext<State, State>, 'commit'>

// export interface Actions {
//     [ActionTypes.GET_CALENDER_DATA](
//       { commit }: AugmentedActionContext,
//       payload: number
//     ): Promise<number>
//   }
  
export const actions: ActionTree<State, State>  = {
    async [ActionTypes.GET_CALENDER_DATA]({ commit },data:Record<string, unknown>) {
        try {
            const result = await api.scheduleFind(data);
            commit(MutationTypes.SET_CALENDER_DATA, result)

        } catch (error) {
            console.log(error);
        }
    },
}
