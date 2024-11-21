<script lang="ts" setup>
import type { LoginAndRegisterParams, VbenFormSchema } from '@vben/common-ui';

import { computed, onMounted, ref, useTemplateRef } from 'vue';

import { AuthenticationLogin, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { omit } from 'lodash-es';

import { tenantList, type TenantResp } from '#/api';
import { captchaImage, type CaptchaResponse } from '#/api/core/captcha';
import { useAuthStore } from '#/store';

import OAuthLogin from './oauth-login.vue';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();

const loginFormRef = useTemplateRef('loginFormRef');

const captchaInfo = ref<CaptchaResponse>({
  captchaEnabled: false,
  img: '',
  uuid: '',
});

async function loadCaptcha() {
  const resp = await captchaImage();
  if (resp.captchaEnabled) {
    const blob = new Blob([resp.img], { type: 'image/svg+xml' });
    const blobUrl = URL.createObjectURL(blob);
    resp.img = blobUrl;
  }
  captchaInfo.value = resp;
}

const tenantInfo = ref<TenantResp>({
  tenantEnabled: false,
  voList: [],
});

async function loadTenant() {
  const resp = await tenantList();
  tenantInfo.value = resp;
  // 选中第一个租户
  if (resp.tenantEnabled && resp.voList.length > 0) {
    const firstTenantId = resp.voList[0]!.tenantId;
    loginFormRef.value?.getFormApi().setFieldValue('tenantId', firstTenantId);
  }
}

onMounted(async () => {
  await Promise.all([loadCaptcha()]);
});

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenSelect',
      componentProps: {
        class: 'bg-background h-[40px] focus:border-primary',
        contentClass: 'max-h-[256px] overflow-y-auto',
        options: tenantInfo.value.voList?.map((item) => ({
          label: item.companyName,
          value: item.tenantId,
        })),
        placeholder: $t('authentication.selectAccount'),
      },
      defaultValue: '000000',
      dependencies: {
        if: () => tenantInfo.value.tenantEnabled,
        // 这里大致上是watch的一个效果
        componentProps: (model) => {
          localStorage.setItem(
            '__oauth_tenant_id',
            model?.tenantId ?? '000000',
          );
          return {};
        },
        triggerFields: ['', 'tenantId'],
      },
      fieldName: 'tenantId',
      label: $t('authentication.selectAccount'),
      rules: z.string().min(1, { message: $t('authentication.selectAccount') }),
    },
    {
      component: 'VbenInput',
      componentProps: {
        class: 'focus:border-primary',
        placeholder: $t('authentication.usernameTip'),
      },
      defaultValue: 'admin',
      fieldName: 'username',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        class: 'focus:border-primary',
        placeholder: $t('authentication.password'),
      },
      defaultValue: 'admin123',
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: z.string().min(5, { message: $t('authentication.passwordTip') }),
    },
    {
      component: 'VbenInputCaptcha',
      componentProps: {
        captcha: captchaInfo.value.img,
        class: 'focus:border-primary',
        onCaptchaClick: loadCaptcha,
        placeholder: $t('authentication.code'),
      },
      dependencies: {
        if: () => captchaInfo.value.captchaEnabled,
        triggerFields: [''],
      },
      fieldName: 'code',
      label: $t('authentication.code'),
      rules: z.string().min(1, { message: $t('authentication.codeTip') }),
    },
  ];
});

async function handleAccountLogin(values: LoginAndRegisterParams) {
  try {
    const requestParam: any = omit(values, ['code']);
    // 验证码
    if (captchaInfo.value.captchaEnabled) {
      requestParam.code = values.code;
      requestParam.uuid = captchaInfo.value.uuid;
    }
    // 登录
    await authStore.authLogin(requestParam);
  } catch (error) {
    console.error(error);
    // 处理验证码错误
    if (error instanceof Error) {
      // 刷新验证码
      loginFormRef.value?.getFormApi().setFieldValue('code', '');
      await loadCaptcha();
    }
  }
}
</script>

<template>
  <AuthenticationLogin
    ref="loginFormRef"
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    :show-register="false"
    :show-third-party-login="true"
    @submit="handleAccountLogin"
  >
    <!-- 可通过show-third-party-login控制是否显示第三方登录 -->
    <template #third-party-login>
      <OAuthLogin />
    </template>
  </AuthenticationLogin>
</template>
