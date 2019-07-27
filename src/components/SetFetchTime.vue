<template>
<div class="form">
<Form ref="formCustom" :model="formCustom"  :label-width="80">
  <FormItem label="运单号" prop="postNumber">
    <Input type="number" v-model="formCustom.postNumber"/>
  </FormItem>
  <FormItem label="预约时间" prop='time'>
    <DatePicker class="fetch-date-picker" v-model="formCustom.time" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
    <TimePicker
    :disabled-hours="[0,1,2,3,4,5,6,7,8,21,22,23]"
    v-model="formCustom.time2" type="time" placeholder="Select time" style="width: 168px"></TimePicker>
  </FormItem>
  <FormItem>
    <Button type="primary" @click="handleSubmit('formCustom')">Submit</Button>
    <Button @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>
  </FormItem>
</Form>
</div>
    
</template>
<script>
import getData from '../assets/api/getData'
export default {
data () {            
  return {
    formCustom: {
      postNumber: '',
      time: '',
      time2: ''
    }
  }
},
methods: {
  handleSubmit (name) {
    let vm = this;
    this.$refs[name].validate((valid) => {
      if (valid) {
        getData.updatePackageFetchedTime(vm.formCustom, 
          function (data) {
            if (data.id) {
              vm.$Message.success( '预约成功' )
              vm.handleReset( 'formCustom' )
            } else if (data.id == -1) {
              vm.$Message.error( '时间错误' )
            }
            else {
              vm.$Message.error( '已预约或已取件!' )
            }
          },
          function (err) { vm.$Message.error( '查无此运单' );console.log(err) })
      } else {
        this.$Message.error( 'Fail!' )
      }
    })
  },
  handleReset (name) {
    this.$refs[name].resetFields()
  }
}
}
</script>

<style scoped>
@import url('../assets/css/add.css');
</style>
