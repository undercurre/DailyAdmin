<template>
  <n-modal v-model:show="modalVisible" preset="card" :title="title" class="w-700px">
    <n-form ref="formRef" label-placement="left" :label-width="80" :model="formModel" :rules="rules">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="12" label="用户名" path="username">
          <n-input v-model:value="formModel.username" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="密码" path="password">
          <n-input
            v-model:value="formModel.password"
            type="password"
            show-password-on="click"
            placeholder="请输入密码"
          />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="确认密码" path="confirmPassword">
          <n-input
            v-model:value="formModel.confirmPassword"
            type="password"
            show-password-on="click"
            placeholder="请再次输入密码"
          />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="昵称" path="nickName">
          <n-input v-model:value="formModel.nickName" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="姓名" path="realName">
          <n-input v-model:value="formModel.realName" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="性别" path="sex">
          <n-radio-group v-model:value="formModel.sex">
            <n-radio value="男">男</n-radio>
            <n-radio value="女">女</n-radio>
          </n-radio-group>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="状态" path="status">
          <n-switch v-model:value="formModel.status" :checked-value="1" :unchecked-value="0" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="所属角色" path="roleIds">
          <n-select v-model:value="formModel.roleIds" :options="sysRoleOptions" />
        </n-form-item-grid-item>
      </n-grid>
      <n-space class="w-full pt-16px" :size="24" justify="end">
        <n-button class="w-72px" @click="closeModal">取消</n-button>
        <n-button class="w-72px" type="primary" @click="handleSubmit">确定</n-button>
      </n-space>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, toRefs } from 'vue';
import type { Ref } from 'vue';
import type { FormInst, FormItemRule, SelectOption } from 'naive-ui';
import { fetchAllSysRole } from '@/service';
import { formRules, createRequiredFormRule, getConfirmPwdRule } from '@/utils';

/**
 * 弹窗类型
 * add: 新增
 * edit: 编辑
 */
export type ModalType = 'add' | 'edit';

interface Props {
  /** 弹窗可见性 */
  visible: boolean;
  /**
   * 弹窗类型
   * add: 新增
   * edit: 编辑
   */
  type?: ModalType;
  /** 编辑的表格行数据 */
  editData?: ApiSys.SysUser | null;
}

defineOptions({ name: 'TableActionModal' });

const props = withDefaults(defineProps<Props>(), {
  type: 'add',
  editData: null
});

interface Emits {
  (e: 'update:visible', visible: boolean): void;
}

const emit = defineEmits<Emits>();

const modalVisible = computed({
  get() {
    return props.visible;
  },
  set(visible) {
    emit('update:visible', visible);
  }
});
const closeModal = () => {
  modalVisible.value = false;
};

const title = computed(() => {
  const titles: Record<ModalType, string> = {
    add: '添加用户',
    edit: '编辑用户'
  };
  return titles[props.type];
});

const formRef = ref<HTMLElement & FormInst>();

type FormModel = Pick<
  ApiSys.CreateSysUserParams,
  'id' | 'username' | 'password' | 'nickName' | 'realName' | 'sex' | 'status' | 'roleIds'
> & {
  confirmPassword: string;
};

const formModel = reactive<FormModel>(createDefaultFormModel());

type FormRuleRequiredKey = Extract<keyof FormModel, 'username' | 'password' | 'confirmPassword'>;

const rules: Record<FormRuleRequiredKey, FormItemRule | FormItemRule[]> = {
  username: createRequiredFormRule('请输入用户名'),
  password: formRules.pwd,
  confirmPassword: getConfirmPwdRule(toRefs(formModel).password)
};

function createDefaultFormModel(): FormModel {
  return {
    id: -1,
    username: '',
    password: '',
    confirmPassword: '',
    nickName: '',
    realName: '',
    sex: '男',
    status: 1,
    roleIds: []
  };
}

const sysRoleOptions: Ref<SelectOption[]> = ref([]);

async function getSysRoles() {
  const { data } = await fetchAllSysRole();
  if (data) {
    sysRoleOptions.value = data.map(item => {
      return {
        label: `${item.name}(${item.alias})`,
        value: item.id
      };
    });
  }
}

function handleUpdateFormModel(model: Partial<FormModel>) {
  Object.assign(formModel, model);
}

function handleUpdateFormModelByModalType() {
  const handlers: Record<ModalType, () => void> = {
    add: () => {
      const defaultFormModel = createDefaultFormModel();
      handleUpdateFormModel(defaultFormModel);
    },
    edit: () => {
      if (props.editData) {
        handleUpdateFormModel(props.editData);
      }
    }
  };

  handlers[props.type]();
}

async function handleSubmit() {
  await formRef.value?.validate();
  window.$message?.success('新增成功!');
  closeModal();
}

function init() {
  getSysRoles();
}

init();

watch(
  () => props.visible,
  newValue => {
    if (newValue) {
      handleUpdateFormModelByModalType();
    }
  }
);
</script>

<style scoped></style>
