<template>
  <div class="message-container">
    <div class="filter-button-container">
      <Button @click="all" type="default">All</Button>
      <Button @click="filter(1)" type="default">已预约</Button>
      <Button @click="filter(2)" type="default">已取件</Button>
      <Button @click="filter(0)" type="default">未取件</Button>
    </div>
    <Table stripe :columns="columns" :data="showData">
      <template slot-scope="{ row }" slot="action">
        <Button v-show="! (row.state == '已取件')" type="primary" size="small" style="margin-right: 5px" @click="fetch(row)">确认收货</Button>
      </template>
    </Table>
    <div class="message-page"><Page @on-change="pageChange" :total="dataLength" show-sizer /></div>
  </div>
</template>

<script>
import getData from '../assets/api/getData'
export default {
  data () {
    return {
      columns: [
        {
            title: '运单号',
            key: 'trackingNum'
        },
        {
            title: '收件人',
            key: 'name'
        },
        {
            title: '电话',
            key: 'phone'
        },
        {
            title: '状态',
            key: 'state'
        },
        {
            title: '预约时间',
            key: 'appointTime'
        },
        {
            title: 'Action',
            slot: 'action',
            width: 150,
            align: 'center'
        }
      ],
      data: [],
      stateCode: -1,
      dataLength: 0,
      showData: []
    }
  },
  methods: {
    fetch (row) {
      let vm = this
      getData.updatePackageFecthed(row.id, function (data) {
        if (vm.stateCode == -1) {
          vm.fetchAllData()
        } else {
          vm.filter(vm.stateCode)
        }
      }, function (err) {})
    },
    updateData (data) {
      let vm = this
      vm.$store.commit('setPackageList', data)
      data.map((item) => {
        vm.data.push({
          id: item.id,
          postNumber: item.postNumber,
          customer: item.customerName,
          phoneNumber: item.phoneNumber,
          state: item.state == 0 ? '未取件' : (item.state == 1 ? '已预约' : '已取件'),
          time: item.time
        })
      })
      vm.dataLength = data.length
      this.pageChange(1)
    },
    fetchAllData () {
      let vm = this;
      vm.data = []
      getData.getAllPackage(function (data) {
        vm.updateData(data)
        }, 
        function(err) {
          console.log(err)
      })
    },
    all () {
      this.fetchAllData()
    },
    filter (statecode) {
      let vm = this;
      this.stateCode = statecode
      vm.data = []
      getData.getPackageByState(statecode, function (data) {
        vm.updateData(data)
        }, 
        function(err) {
          console.log(err)
      })
    },
    pageChange (page) {
      let vm = this
      vm.showData = []
      vm.data.map((item, index) => {
        if (index > (page -1) *10 && index < page * 10 ) {
          vm.showData.push(item)
        }
      })
    }
  },
  mounted () {
    this.fetchAllData()
  }
}
</script>

<style scoped>
  @import url('../assets/css/packageMessage.css');
</style>