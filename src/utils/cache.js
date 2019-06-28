
const ls = window.localStorage

export default {

  set(key, val) {
    if(val && typeof val !== 'string') {
      val = JSON.stringify(val)
    }
    ls.setItem(key, val)
  },
  get(key) {
    let val = ls.getItem(key)
    if(val && typeof val=== 'string') {
      val = JSON.parse(val)
    }
    return val
  },
  rm(key) {
    ls.removeItem(key)
  }
}
