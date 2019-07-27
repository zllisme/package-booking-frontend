const axios = require('axios')
const moment = require('moment')
const ip = 'http://127.0.0.1:9090'
const getAllPackage = (callback, errback) => {
  axios.get(ip + '/packageOrders')
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      errback(error)
    })
}

const getPackageByState = (state, callback, errback) => {
  axios.get(ip + '/packageOrders?state=' + state)
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      errback(error)
    })
}

const updatePackageFecthed = (id, callback, errback) => {
  axios.put(ip + '/packages/' + id)
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      errback(error)
    })
}

const addPackage = (pack, callback, errback) => {
  axios({
    method: 'post',
    url: ip + '/packageOrders',
    data: {
      postNumber: pack.postNumber,
      customerName: pack.customerName,
      phoneNumber: pack.phoneNumber
    }
  })
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      errback(error)
    })
}

const updatePackageFetchedTime = (pack, callback, errback) => {
  pack.time = moment(pack.time).format('YYYY-MM-DD')
  axios.put(ip + '/packages/' + pack.postNumber + '?time=' + pack.time + '  ' + pack.time2)
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      errback(error)
    })
}

module.exports = {
  getAllPackage,
  getPackageByState,
  updatePackageFecthed,
  addPackage,
  updatePackageFetchedTime
}
