<template>
  <div class="system-info">
    <div class="project-name">{{ title }}</div>
    <div class="user-info">
      <a-space class="set-up" :size="size">
        <user-outlined style="font-size: 18px" />
        <a-dropdown>
          <a class="ant-dropdown-link">{{ userInfo.userName }}</a>
          <template #overlay>
            <a-menu @click="dropHandel">
              <!-- <a-menu-item key="1"> 个人中心</a-menu-item> -->
              <a-menu-item key="2"> 退出登录 </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-space>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { UserOutlined } from "@ant-design/icons-vue";
import { MenuProps } from "ant-design-vue";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
const route = useRoute();
const store = useStore();
const size = ref(15);
const title = computed(() => {
  return import.meta.env.VITE_PROGECT_TITLE;
});
const dropHandel: MenuProps["onClick"] = ({ key }) => {
  if (key === "2") {
    store.dispatch("login/logout");
  }
};
const userInfo = computed(() => store.state.login.user);
</script>
<style scoped lang="less">
.system-info {
  width: 100%;
  line-height: 48px;
  height: 48px;
  background-color: #242e44;
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: hidden;

  .project-name {
    font-size: 16px;
    font-weight: bold;
  }

  .user-info {
    .set-up {
      cursor: pointer;
      .ant-dropdown-link {
        color: #ffffff;
      }
    }
  }
}
</style>
