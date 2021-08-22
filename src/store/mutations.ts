import { MutationTree } from 'vuex'
import { MutationTypes } from './type/mutation-types'
import { State } from './state'

export type Mutations<S = State> = {
    [MutationTypes.SET_CALENDER_DATA](state:S,data:Record<string, unknown>):void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.SET_CALENDER_DATA](state,data):void{
        state.calenderData = data;
    },
}