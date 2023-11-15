<template>
  <div class="page-full">
    <n-card class="h-full card">
      <div class="h-full flex-col">
        <n-space class="h-48px" justify="space-between">
          <n-space>
            <n-button type="primary" ghost @click="handleAddTable">
              <icon-ic-round-plus class="text-20px" />
            </n-button>
            <n-button type="error" ghost>
              <icon-ic-round-delete class="text-20px" />
            </n-button>
          </n-space>
          <n-space align="center" :size="18">
            <n-button size="small" type="primary" @click="getData">
              <icon-mdi-refresh class="mr-4px text-16px" :class="{ 'animate-spin': loading }" />
              刷新表格
            </n-button>
            <table-column-setting v-model:columns="columns" />
          </n-space>
        </n-space>
        <n-data-table
          class="flex-1-hidden"
          :columns="columns"
          :data="data"
          flex-height
          :loading="loading"
          :pagination="pagination"
          :row-key="item => item.id"
        />
        <table-action-modal v-model:visible="visible" :type="modalType" :edit-data="editData" />
      </div>
    </n-card>
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue';
import { NSpace, NPopconfirm, NButton } from 'naive-ui';
import { fetchSysUserByPage } from '@/service';
import { useHookTable, useBoolean } from '@/hooks';
import TableActionModal from './components/table-action-modal.vue';
import type { ModalType } from './components/table-action-modal.vue';

const { data, loading, columns, pagination, getData } = useHookTable(fetchSysUserByPage, {
  apiParams: {
    page: 1,
    pageSize: 10
  },
  transformer: d => ({
    data: d.records,
    pageNum: d.current,
    pageSize: d.size,
    total: d.total
  }),
  columns: () => [
    {
      type: 'selection',
      align: 'center'
    },
    {
      key: 'username',
      title: '用户名',
      align: 'center'
    },
    {
      key: 'status',
      title: '状态',
      align: 'center',
      render(row) {
        return (
          <div>
            <span>{row.status === 1 ? '已激活' : '未激活'}</span>
          </div>
        );
      }
    },
    {
      key: 'email',
      title: '邮箱',
      align: 'center'
    },
    {
      key: 'action',
      title: '操作',
      align: 'center',
      width: 120,
      render(row) {
        return (
          <div class="flex gap-6px">
            <NButton size={'small'} onClick={() => handleEditTable(row.id)}>
              编辑
            </NButton>
            <NPopconfirm onPositiveClick={() => handleDeleteTable(row.id)}>
              {{
                default: () => '确认删除',
                trigger: () => <NButton size={'small'}>删除</NButton>
              }}
            </NPopconfirm>
          </div>
        );
      }
    }
  ]
});

const { bool: visible, setTrue: openModal } = useBoolean();

const modalType = ref<ModalType>('add');

function setModalType(type: ModalType) {
  modalType.value = type;
}

const editData = ref<ApiSys.SysUser | null>(null);

function setEditData(item: ApiSys.SysUser | null) {
  editData.value = item;
}

function handleAddTable() {
  openModal();
  setModalType('add');
}

function handleEditTable(id: number) {
  const findItem = data.value.find(item => item.id === id);
  if (findItem) {
    setEditData(findItem);
  }
  setModalType('edit');
  openModal();
}

function handleDeleteTable(id: number) {
  console.log(id);
}
</script>

<style scoped></style>
