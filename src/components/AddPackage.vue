<template>
<div class="form">
<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
  <FormItem label="运单号" prop="trackingNum">
    <Input type="number" v-model="formCustom.trackingNum"/>
  </FormItem>
  <FormItem label="收件人" prop="name">
    <Input  v-model="formCustom.name"/>
  </FormItem>
  <FormItem label="电话" prop="phone">
    <Input type="text" v-model="formCustom.phone"/>
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
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(' Please enter your phone number '))
      } else if (value.length != 11) {
        callback(new Error(' Please enter 11 length phone number '))
      }
      else {
        callback();
      }
    };
    const validateTrackingNum = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(' Please enter your post number '))
      } else if ((new String(value)).length != 8) {
        callback(new Error(' Please enter 8 length post number '))
      }
      else {
        callback();
      }
    };                        
    return {
      formCustom: {
        trackingNum: '',
        name: '',
        phone: ''
      },
      ruleCustom: {
        phoneNumber: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        postNumber: [
          { validator: validateTrackingNum, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      let vm = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          getData.addPackage(vm.formCustom, function (data) {vm.$Message.success('添加成功'); vm.handleReset('formCustom')}, function (err) {vm.$Message.error('运单号已存在')})
        } else {
          this.$Message.error('Fail!')
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
