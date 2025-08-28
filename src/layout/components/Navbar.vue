<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 头像 -->
          <img v-if="avatar" :src="avatar" class="user-avatar" />
          <!-- name.slice(0,1) -->
          <span v-else class="username">{{ name?.charAt(0) }}</span>
          <!-- 用户名称 -->
          <span class="name">{{ name }}</span>
          <i class="el-icon-setting"></i>
        </div>

        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/a-Pigg/zzcHR">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <el-dropdown-item @click.native="showDialog = true"
            >修改密码</el-dropdown-item
          >
          <!-- native事件修饰符 -->
          <!-- 注册组件的根元素的原生事件 -->
          <el-dropdown-item @click.native="logout">
            <span style="display: block">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 放置dialog -->
    <el-dialog
      title="修改密码"
      :visible.sync="showDialog"
      :modal-append-to-body="false"
      @close="cancelSubmit"
      width="500px"
    >
      <el-form :model="form" :rules="rules" ref="form" label-width="120PX">
        <el-form-item label="旧密码" prop="oldPassword" >
          <el-input size="small" type="password" show-password v-model="form.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword" >
          <el-input size="small" type="password" show-password v-model="form.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="checkPassword" >
          <el-input size="small" type="password" show-password v-model="form.checkPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="submitForm('form')"
          >确认修改</el-button>
          <el-button size="mini" @click="cancelSubmit">取 消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { updatePassAPI } from '@/api/user';

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    return {
      showDialog: false,
      form: {
        oldPassword: "",
        newPassword: "",
        checkPassword: "",
      },
      rules: {
        oldPassword: [
          { required: true, trigger: "blur", message: "旧密码不能为空" },
          {},
        ],
        newPassword: [
          { required: true, trigger: "blur", message: "新密码不能为空" },
          { min: 6, max: 16, message: '新密码长度要在 6 到 16 之间', trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, trigger: "blur", message: "重复密码不能为空" },
          { validator: (rule, value, callback)=>{
            if(value.length < 6 || value.length > 16){
              callback(new Error('重复密码长度要在 6 到 16 之间'))
            }
            else if(value != this.form.newPassword){
              callback(new Error('重复密码和新密码输入不一致'))
            }else{
              callback()
            }
          }, trigger:'blur' }
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["sidebar", "name", "avatar"]),
  },
  methods: {
    submitForm(formName){
      this.$refs.form.validate(async (valid)=>{
        if(valid){
          // alert('校验通过')
          // console.log(this.form.oldPassword,this.newPassword)
          let {oldPassword,newPassword} = this.form
          let res = await updatePassAPI({oldPassword,newPassword})
          // console.log(res)
          //  重置表单
          this.$refs.form.resetFields()
          this.$message({
            type:'success',
            message: '修改密码成功'
          })
          //  关闭弹层
          this.showDialog = false
        }
      })
    },
    cancelSubmit(){
      this.$refs.form.resetFields()
      //  关闭弹层
      this.showDialog = false
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      // 模板的逻辑
      // await this.$store.dispatch("user/logout");
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`);

      //调用退出登录action
      await this.$store.dispatch("user/logout");
      //跳转到登录页面
      this.$router.push("/login");

      this.$message({
        type: "success",
        message: "退出登录成功",
      });
    },
  },
  mounted() {
    console.log("路由信息:", this.$route);
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        display: flex;
        justify-content: center;
        align-items: center;

        .username {
          background-color: #04c9b1;
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 50%;
          color: white;
          margin-right: 4px;
        }

        .name {
          margin-right: 10px;
          // margin-left: 20px;
          font-size: 16px;
          color: #383c4e;
        }

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .el-icon-setting {
          cursor: pointer;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
