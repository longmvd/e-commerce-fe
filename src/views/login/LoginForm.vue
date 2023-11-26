<template>
  <div class="form-wrapper">
    <a-form
      ref="orderForm"
      :layout="formLayout"
      :model="formModel"
      v-bind="formConfig"
    >
      <a-form-item
        :label="$t('i18nCommon.UserName')"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        name="UserName"
      >
        <a-input
          :placeholder="$t('i18nCommon.InputValue')"
          v-model:value="formModel.UserName"
        />
      </a-form-item>
      <a-form-item
        :label="$t('i18nCommon.Password')"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        name="Password"
      >
        <a-input
          :placeholder="$t('i18nCommon.InputValue')"
          v-model:value="formModel.Password"
        />
      </a-form-item>
      <a-form-item
        :wrapper-col="{
          offset: 0,
        }"
      >
        <div class="flex content-end"></div>
        <a-button type="primary" v-bind="submitButtonConfig">
          {{ $t('i18nCommon.Login') }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import authApi from '@/apis/auth/auth-api';
import { useCookie } from '@/composable/clientStorage/useCookie';
import { check } from '@/composable/http/use-response';
import { parseJwt } from '@/composable/jwt/useJwt';
import { LoginRequest } from '@/entities/auth/auth';
import i18n from '@/i18n';
import { useUserStore } from '@/store';
import { ButtonProps, FormProps } from 'ant-design-vue';
import { computed, onMounted, onUpdated, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const t = i18n.global.t;
const { setCookie } = useCookie();
//#region form configuration
const formLayout = ref('vertical');
const formItemLayout = computed(() => {
  return formLayout.value === 'horizontal'
    ? {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      }
    : {};
});

const submitButtonConfig = reactive<ButtonProps>({
  htmlType: 'submit',
  loading: false,
  // onClick() {
  //   orderForm.value
  //     ?.validate()
  //     .then(() => {
  //       console.log('values', formModel, toRaw(formModel));
  //     })
  //     .catch((error) => {
  //       console.log('error', error);
  //     });
  // },
});

const formModel = reactive<LoginRequest>({
  UserName: '',
  Password: '',
});
const { user, setUserID, setValue, initData, getCartInfo } = useUserStore();

const router = useRouter();

const rules: Record<string, any> = {
  UserName: [
    {
      required: true,
      message: t('i18nCommon.RequiredMessage', {
        fieldName: t('i18nCommon.UserName'),
      }),
      trigger: 'change',
    },
  ],
  Password: [
    {
      required: true,
      message: t('i18nCommon.RequiredMessage', {
        fieldName: t('i18nCommon.Password'),
      }),
      trigger: 'change',
    },
  ],
};

const formConfig = reactive<FormProps>({
  onValuesChange(e) {
    console.log(e);
  },
  rules: rules,
  onSubmit(e) {
    console.log(e);
  },

  onFinish: async (e) => {
    // submitButtonConfig.loading = true;
    const res = await authApi.login(e);
    const { isSuccess, data } = check(res);
    if (isSuccess) {
      setCookie('Bearer', data.Data.Token);
      const userData = parseJwt(data.Data.Token);
      setUserID(userData.UserID);
      initData();
      getCartInfo();
      setValue('FullName', userData.FullName);

      window.location.reload();
      router.push('/');
    }
  },
  // model: formModel,
});

onUpdated(() => {
  if (user.FullName) {
    router.push('/');
  }
});
onMounted(() => {
  if (user.FullName) {
    router.push('/');
  }
});

//#endregion
</script>

<style scoped></style>
