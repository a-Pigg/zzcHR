<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
        <!--登录表单-->
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="phone">
            <el-input
              type="text"
              placeholder="请输入手机号"
              v-model="ruleForm.phone"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pass" >
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="ruleForm.pass"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox label="用户平台使用协议" name="type" v-model="ruleForm.isAgree"></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button style="width:350px;" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <!-- <el-button type="primary" @click="getInfo">点我</el-button> -->
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Login',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        let pattern = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
        pattern.test(value) ? callback() : callback(new Error("手机号格式不正确"));
      }
    };
    return {
      ruleForm: {
        phone: "",
        pass: "",
        isAgree : false,
      },
      rules: {
        // phone: [{ required: true, trigger: "blur", message:'请输入手机号' },{
        //   pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
        //   message: "手机号格式不正确",
        //   trigger: 'blur'
        // }],
        phone: [{ required: true, trigger: "blur", message:'请输入手机号' },{ validator: validatePhone, trigger: "blur"}],
        pass: [{ required: true, trigger: "blur", message:'请输入密码' },{ min: 6, max: 16, message: '密码长度要在 6 到 16 之间', trigger: 'blur' }],
        isAgree: [{ validator: (rule, value, callback) =>{
          //rule：校验规则
          //value：校验的值
          //callback：函数 - promise resolve reject   callback() callback(newError(错误信息))
          value ? callback() : callback(new Error('您必须勾选用户使用协议'))
        }, trigger: "blur"}],
      },
    };
  },
  methods: {
    getInfo(){
      console.log(this.$store.state.user.token)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证通过，开始登录
          alert("submit!");
          this.$store.dispatch('user/login',this.ruleForm)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted(){
    axios({
      // url:'https://heimahr.itheima.net/api/sys/login',
      url:'/api/sys/login', //本地会自动拼接 http://localhost:9528/api/sys/login
      method:'post',
      data:{
        mobile:'13912345678',
        password:'123456'
      }
    })
  }
};
</script>

<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png)
      no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center /
        contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }
    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 20px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color: #606266;
    }
  }
}
// .form{
//   display: flex;
//   flex-direction: column;
//   // justify-content: ;
//   align-items: flex-start;
// }
</style>