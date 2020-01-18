
const ls = window.localStorage

export default {

    set(key: string, val: any): void {
        if(val && typeof val !== 'string') {
            val = JSON.stringify(val)
        }
        ls.setItem(key, val)
    },
    get(key: string): any {
        let val = ls.getItem(key)
        if(val && typeof val=== 'string') {
            val = JSON.parse(val)
        }
        return val
    },
    rm(key: string): void {
        ls.removeItem(key)
    }
}
