<template>
  <div>
    <section class="login-wrap">
      <div class="login-form">
        <p style="text-align: center">
          <img src="../../assets/images/logo.png" style="height: 5vh" alt="" />
        </p>
        <h3>{{ title }}</h3>
        <a-form
          :model="loginForm"
          label-position="right"
          label-width="80px"
          @finish="onSubmit"
          class="demo-loginUserForm"
        >
          <!-- <p class="loginstitle">账号密码登录</p> -->
          <a-form-item
            label=""
            name="username"
            :rules="[{ required: true, message: '账号不能为空' }]"
          >
            <a-input
              size="large"
              v-model:value="loginForm.username"
              placeholder="账户"
            />
          </a-form-item>
          <a-form-item
            label=""
            name="password"
            :rules="[{ required: true, message: '密码不能为空' }]"
            @keyup.enter.native="onSubmit"
          >
            <a-input-password
              size="large"
              v-model:value="loginForm.password"
              placeholder="密码"
            />
          </a-form-item>
          <a-button
            html-type="submit"
            type="primary"
            class="loginSumit"
            size="large"
            >登录</a-button
          >
        </a-form>
      </div>
      <!--<canvas id="J_loginBackground"></canvas>-->
    </section>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reactive } from "@vue/reactivity";
import { computed } from "vue";
const store = useStore();
const loginForm = reactive<{ username: string; password: string }>({
  username: "",
  password: "",
});
const title = computed(() => {
  return import.meta.env.VITE_PROGECT_TITLE;
});
const onSubmit = () => {
  store.dispatch("login/login", loginForm);
};
</script>

<style scoped lang="less">
.loginSumit {
  // background-color: #07c4a8 !important;
  border: 0px !important;
  width: 100%;
  color: #fff !important;
  letter-spacing: 1rem;
  height: 40px;
}

.login-wrap {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/images/bg.jpg");
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;

  canvas {
    width: 100%;
    height: 100%;
    position: absolute;
  }
}

.login-form {
  position: absolute;
  z-index: 1;
  top: -20%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 550px;
  height: 280px;
  font-size: 14px;
  border-radius: 8px;

  img {
    margin: 0 auto;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 44px;
    padding: 12px 0;
    font-weight: normal;
    font-size: 22px;
    text-align: center;
    font-size: 30px;
    color: #fff;
    font-family: "pf";
  }

  .field {
    display: block;
    margin: 0 auto;
    padding: 6px 0;
  }

  .loginstitle {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 32px;
    margin-bottom: 10px;
  }

  .demo-loginUserForm {
    width: 76%;
    margin: 0 auto;
  }

  :deep(.ant-form-item-label > label) {
    color: #fff !important;
  }
}
</style>
