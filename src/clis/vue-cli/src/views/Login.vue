<template>
  <div class="login">
    <div class="login__card">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        size="big"
        label-width="100px"
        class="login__ruleForm"
      >
        <el-form-item class="login__title">
          <h1>登录</h1>
        </el-form-item>
        <el-form-item
          label="账号:"
          prop="name"
        >
          <el-input
            v-model.trim="ruleForm.name"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码:"
          prop="password"
        >
          <el-input
            show-password
            v-model.trim="ruleForm.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            class="login__button"
            type="primary"
            @click="login('ruleForm')"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    ruleForm: {
      name: 'admin',
      password: 'admin'
    },
    rules: {
      name: [{ required: true, message: '请输入账号', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    }
  }),
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.commit('SET_USER', this.ruleForm);
          this.$store.commit('SET_ROLES', [this.ruleForm.name]);
          this.$router.push('/');
        }
        return true;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "variable";
.login {
  padding-top: 100px;
  text-align: center;
  height: 100vh;
  color: rgb(238, 238, 238);
  background: rgb(45, 58, 75);
}

.login__card {
  margin: 0 auto;
  width: 709px;
  height: 352px;

  padding-top: 66px;

  .login__title {
    letter-spacing: 10px;
    margin: 20px 0 30px;
  }
}

.login__ruleForm {
  margin: 0 auto;
  display: inline-block;
  transform: translate(-45px);
}

.login__button {
  font-size: 13px !important;
  letter-spacing: 10px;
}
</style>

<style lang="scss">
$width: 400px;
.login__ruleForm {
  .el-form-item__label {
    font-size: 16px;
    font-weight: bold;
    color: rgb(238, 238, 238);
  }

  .el-input__inner {
    color: rgb(238, 238, 238);
    width: $width;
    background: rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.1);
  }

  .login__button {
    width: $width;
  }
}
</style>
