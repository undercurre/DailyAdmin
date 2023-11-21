<template>
  <n-modal v-model:show="modalVisible" preset="card" :title="title" class="w-700px">
    <n-form ref="formRef" label-placement="left" :label-width="80" :model="formModel" :rules="rules">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="12" label="任务名" path="username">
          <n-input v-model:value="formModel.name" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="描述" path="description">
          <n-input v-model:value="formModel.description" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="工作时间" path="workTime">
          <n-date-picker v-model:value="tempWorkTime" type="datetime" clearable />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="是否完成" path="completed">
          <n-switch>
            <template #checked>已完成</template>
            <template #unchecked>未完成</template>
          </n-switch>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="备注" path="note">
          <n-input v-model:value="formModel.note" />
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
import { ref, computed, reactive, watch } from 'vue';
import type { FormInst, FormItemRule } from 'naive-ui';
import { createRequiredFormRule } from '@/utils';
import { fetchCreateTask, fetchUpdateTask } from '~/src/service';
import { useAuthStore } from '~/src/store';

const auth = useAuthStore();

const tempWorkTime = ref(new Date().getTime());

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
  editData?: TaskManagement.Task | null;
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
    add: '添加任务',
    edit: '编辑任务'
  };
  return titles[props.type];
});

const formRef = ref<HTMLElement & FormInst>();

type FormModel = ApiManagement.CreateTaskDto;

const formModel = reactive<FormModel>(createDefaultFormModel());

type FormRuleRequiredKey = Extract<keyof FormModel, 'name'>;

const rules: Record<FormRuleRequiredKey, FormItemRule | FormItemRule[]> = {
  name: createRequiredFormRule('请输入任务名')
};

function createDefaultFormModel(): FormModel {
  return {
    name: '',
    description: '',
    workTime: '',
    completed: false,
    note: '',
    user: auth.userInfo.id
  };
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
  formModel.workTime = tempWorkTime.value.toString();
  await formRef.value?.validate();
  if (props.type === 'add') {
    await fetchCreateTask(formModel);
  } else if (props.editData) await fetchUpdateTask(props.editData.id, formModel);
  window.$message?.success('操作成功!');
  closeModal();
}

function init() {}

init();

watch(
  () => props.visible,
  newValue => {
    if (newValue) {
      handleUpdateFormModelByModalType();
    }
  }
);

watch(
  () => props.editData,
  newValue => {
    if (newValue) {
      tempWorkTime.value = new Date(newValue.workTime).getTime();
    }
  }
);
</script>

<style scoped></style>
