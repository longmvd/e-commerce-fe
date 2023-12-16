<template>
  <div class="form-wrapper">
    <div class="text-bold fs-20 mb-20">
      {{
        mode == FormMode.Login
          ? t('i18nCommon.Login')
          : t('i18nCommon.Register')
      }}
    </div>
    <a-form
      ref="orderForm"
      :layout="formLayout"
      :model="formModel"
      v-bind="formConfig"
    >
      <a-form-item
        v-if="mode == FormMode.Register"
        :label="$t('i18nCommon.FullName')"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        name="FullName"
      >
        <a-input
          :placeholder="$t('i18nCommon.InputValue')"
          v-model:value="formModel.FullName"
        />
      </a-form-item>
      <a-form-item
        v-if="mode == FormMode.Register"
        :label="$t('i18nCommon.Email')"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        name="Email"
      >
        <a-input
          :placeholder="$t('i18nCommon.InputValue')"
          v-model:value="formModel.Email"
        />
      </a-form-item>
      <a-form-item
        v-if="mode == FormMode.Register"
        :label="$t('i18nCommon.PhoneNumber')"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        name="PhoneNumber"
      >
        <a-input
          :placeholder="$t('i18nCommon.InputValue')"
          v-model:value="formModel.PhoneNumber"
        />
      </a-form-item>
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
          type="password"
          :placeholder="$t('i18nCommon.InputValue')"
          v-model:value="formModel.Password"
        />
      </a-form-item>
      <a-form-item
        v-if="mode == FormMode.Register"
        :label="$t('i18nCommon.ConfirmPassword')"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        name="ConfirmPassword"
      >
        <a-input
          type="password"
          :placeholder="$t('i18nCommon.ConfirmPassword')"
          v-model:value="(formModel as RegisterRequest).ConfirmPassword "
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <div
          v-html="t('i18nCommon.HaventAccountYet')"
          v-if="mode == FormMode.Login"
        ></div>
        <div v-html="t('i18nCommon.HaveAccount')" v-else></div>
      </a-form-item>
      <a-form-item
        :wrapper-col="{
          offset: 0,
        }"
      >
        <div class="flex content-end">
          <a-button
            type="primary"
            v-bind="submitButtonConfig"
            v-if="mode == FormMode.Login"
          >
            {{ $t('i18nCommon.Login') }}
          </a-button>
          <a-button v-else type="primary" v-bind="submitButtonConfig">
            {{ $t('i18nCommon.Register') }}
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import authApi from '@/apis/auth/auth-api';
import userApi from '@/apis/user/user-api';
import { useCookie } from '@/composable/clientStorage/useCookie';
import { check } from '@/composable/http/use-response';
import { parseJwt } from '@/composable/jwt/useJwt';
import { ObjectType } from '@/entities';
import { LoginRequest, RegisterRequest } from '@/entities/auth/auth';
import { User } from '@/entities/user/user';
import i18n from '@/i18n';
import { useUserStore } from '@/store';
import { ButtonProps, FormProps, notification } from 'ant-design-vue';
import { Rule } from 'ant-design-vue/lib/form';
import { computed, onMounted, onUpdated, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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

enum FormMode {
  Register = 1,
  Login = 2,
}

const mode = ref<FormMode>(FormMode.Login);
const route = useRoute();
watch(
  () => route.name,
  (val) => {
    mode.value = FormMode[val as any] as any;
  },
  { immediate: true }
);
// let x = 1;
// setInterval(() => {
//   if (x % 2 == 0) {
//     router.push('/login');
//   } else {
//     router.push('/register');
//   }
//   x++;
//   console.log('jojoj');
// }, 2000);

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

const formModel = reactive<(LoginRequest | RegisterRequest) & User>({
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
  Email: [
    {
      required: true,
      message: t('i18nCommon.RequiredMessage', {
        fieldName: t('i18nCommon.Email'),
      }),
      trigger: 'change',
    },
  ],
  FullName: [
    {
      required: true,
      message: t('i18nCommon.RequiredMessage', {
        fieldName: t('i18nCommon.FullName'),
      }),
      trigger: 'change',
    },
  ],
  PhoneNumber: [
    {
      required: true,
      message: t('i18nCommon.RequiredMessage', {
        fieldName: t('i18nCommon.PhoneNumber'),
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
  ConfirmPassword: [
    {
      required: true,
      message: t('i18nCommon.ConfirmPasswordFailed'),
      trigger: 'change',
      validator: validatePass,
    },
  ] as Rule[],
};

async function validatePass(_rule: Rule, value: string) {
  if (value === '') {
    return Promise.reject('Không để trống');
  } else if (value !== formModel.Password) {
    return Promise.reject('Mật khẩu không khớp!');
  } else {
    return Promise.resolve();
  }
}

const formConfig = reactive<FormProps>({
  rules: rules,
  onFinish: async (e) => {
    // submitButtonConfig.loading = true;
    if (mode.value == FormMode.Register) {
      register(e);
    } else {
      const res = await authApi.login(e);
      const { isSuccess, data } = check(res);
      if (isSuccess) {
        if (data.IsSuccess) {
          const userData = parseJwt(data.Data.Token);
          setCookie('Bearer', data.Data.Token, new Date(userData.exp * 1000));
          setUserID(userData.UserID);
          initData();
          getCartInfo();
          setValue('FullName', userData.FullName);

          window.location.reload();
          router.push('/');
        } else {
          notification.error({
            message: 'Tài khoản hoặc mật khẩu không tồn tại',
            duration: 3000,
          });
        }
      }
    }
  },
  // model: formModel,
});

async function register(model: User) {
  let sendModel: ObjectType = {};
  Object.entries(model).forEach(([key, value]) => {
    if (key != 'ConfirmPassword') {
      sendModel[key] = value;
    }
  });
  const res = await userApi.add(sendModel);
  const { isSuccess, data } = check(res);
  if (isSuccess) {
    notification.success({
      message: t('i18nCommon.RegisterSuccessfully'),
      duration: 2000,
    });
    router.push('/login');
  }
}

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
