<template>
  <a-layout-header class="header flex content-space-between items-center">
    <div class="header__logo mr-12">
      <h1 style="color: #fff">Ecommerce</h1>
    </div>
    <div
      class="header-item header__menu flex content-center items-center cursor-pointer"
    >
      <div class="px-4">
        <menu-outlined />
      </div>
      <p>{{ $t('i18nCommon.List') }}</p>
    </div>
    <div class="header-item flex-1 header__search-box">
      <a-input v-bind="searchBoxConfig" class="br-10">
        <template #prefix>
          <search-outlined />
        </template>
      </a-input>
    </div>
    <div class="flex content-space-between">
      <div class="header-item header__contact">
        <phone-outlined
          class="d-block px-4"
          v-bind="{
            rotate: 100,
            style: {
              fontSize: '24px',
            },
          }"
        />
        <div class="item-content">
          <div class="d-block">{{ $t('i18nCommon.CallToBuy') }}</div>

          <div>{{ $t('i18nCommon.CallCenter') }}</div>
        </div>
      </div>
      <div class="header-item header__near-store">
        <environment-outlined
          class="d-block px-4"
          v-bind="{
            style: {
              fontSize: '24px',
            },
          }"
        />
        <div class="item-content">
          <div>{{ $t('i18nCommon.Store') }}</div>
          <div>
            {{ $t('i18nCommon.NearYou') }}
          </div>
        </div>
      </div>
      <div class="header-item header__delivery-tracking">Tra cứu đơn hàng</div>
      <div
        class="header-item header__cart"
        @click="user.FullName ? router.push('/cart') : router.push('/login')"
      >
        <shopping-cart-outlined
          class="d-block px-4"
          v-bind="{
            style: {
              fontSize: '24px',
            },
          }"
        />
        <div>{{ $t('i18nCommon.Cart') }}</div>
        <div class="header__cart-number">{{ cartNumber }}</div>
      </div>
      <div class="header-item header__login flex-column" @click="toggleLogin">
        <user-outlined
          class="d-block px-4"
          v-bind="{
            style: {
              fontSize: '20px',
            },
          }"
        />
        <div v-if="user.FullName">{{ $t('i18nCommon.Logout') }}</div>
        <div>{{ user.FullName ? user.FullName : $t('i18nCommon.Login') }}</div>
      </div>
    </div>
  </a-layout-header>
</template>
<script setup lang="ts" generic="T">
import { SearchEvents } from '@/plugins/event-bus';
import { useUserStore } from '@/store';
import {
  EnvironmentOutlined,
  MenuOutlined,
  PhoneOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import { InputProps } from 'ant-design-vue';
import { Emitter } from 'mitt';
import { computed, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const { user, logOut } = useUserStore();
const bus = inject<Emitter<SearchEvents>>('_bus');
let debounceSearch: any = null;

const searchBoxConfig: InputProps = {
  bordered: true,
  onInput(e) {
    if (debounceSearch) {
      clearTimeout(debounceSearch);
    }
    debounceSearch = setTimeout(() => {
      if (e.target.value) {
        router.push({ path: '', query: { search: e.target.value } });
      } else {
        router.push('/');
      }
    }, 2000);
  },
};
const cartNumber = computed(
  () =>
    user.Cart?.Items?.reduce(
      (total, item) => total + (item?.Quantity ?? 0),
      0
    ) ?? 0
);

function toggleLogin() {
  if (user.FullName) {
    logOut();
  } else {
    router.push('/login');
  }
}
</script>

<style scoped lang="scss">
.header {
  background-color: var(--app-primary-color);
  color: #ffff;
  line-height: 1rem;
  position: fixed;
  z-index: 1;
  width: 100%;

  &-item {
    font-size: 12px;
    height: 42px;
    padding: 4px 8px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 0 4px;
    &:hover {
      background: hsla(0, 0%, 100%, 0.2);
    }
  }
  &__logo {
  }
  &__menu {
    background: hsla(0, 0%, 100%, 0.2);
  }
  &__login {
    background: hsla(0, 0%, 100%, 0.2);
  }
  &__cart {
    position: relative;
    &-number {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 4px;
      border: 2px solid;
      font-size: 16px;
      border-radius: 50%;
    }
  }
}
</style>
