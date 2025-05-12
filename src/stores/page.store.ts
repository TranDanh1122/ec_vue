import { defineStore } from "pinia"

interface PageStore {
    currentParam: string
}
interface PageStoreActions {
    setParam: (param: string) => void
}
interface PageStoreGetters extends Record<string, any> {

}
export const pageStore = defineStore<'PageParam', PageStore, PageStoreGetters, PageStoreActions>('PageParam', {
    state: () => ({
        currentParam: ""
    }),
    actions: {
        setParam(param: string) {
            this.currentParam = param
        }
    }
})