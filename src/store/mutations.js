export default {
  addPackageList (state, packageMessage) {
    state.packageList.push(packageMessage)
  },
  setPackageList (state, packageList) {
    state.packageList = packageList
  }
}
