<template>
  <div class="page-full">
    <n-card class="h-full card">
      <div class="h-full flex-col">
        <n-space class="h-48px" justify="space-between">
          <n-space>
            <n-button type="primary" ghost @click="handleAddTable">
              <icon-ic-round-plus class="text-20px" />
              添加
            </n-button>
            <!-- <n-button type="error" ghost>
              <icon-ic-round-delete class="text-20px" />
              批量删除
            </n-button> -->
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
import { ref, watch } from 'vue';
import { NSpace, NPopconfirm, NButton } from 'naive-ui';
import { fetchTaskList, fetchDeleteTask } from '@/service';
import { useHookTable, useBoolean } from '@/hooks';
import TableActionModal from './components/table-action-modal.vue';
import type { ModalType } from './components/table-action-modal.vue';

const { data, loading, columns, pagination, getData } = useHookTable(fetchTaskList, {
  apiParams: {
    page: 1,
    pageSize: 10
  },
  transformer: d => ({
    data: d.data,
    pageNum: d.meta.pagination.page,
    pageSize: d.meta.pagination.pageSize,
    total: d.meta.pagination.total
  }),
  columns: () => [
    // {
    //   type: 'selection',
    //   align: 'center'
    // },
    {
      key: 'name',
      title: '任务名',
      align: 'center'
    },
    {
      key: 'completed',
      title: '完成状态',
      align: 'center',
      render(row) {
        return (
          <div>
            <span>{row.completed ? '已完成' : '未完成'}</span>
          </div>
        );
      }
    },
    {
      key: 'workTime',
      title: '倒计时',
      align: 'center',
      render(row) {
        let count = new Date(row.workTime).getTime() - new Date().getTime();
        count = count > 0 ? count : 0;
        return (
          <div>
            <n-countdown duration={count} active={true} />
          </div>
        );
      }
    },
    {
      key: 'description',
      title: '描述',
      align: 'center'
    },
    {
      key: 'note',
      title: '备注',
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

const editData = ref<TaskManagement.Task | null>(null);

function setEditData(item: TaskManagement.Task | null) {
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

async function handleDeleteTable(id: number) {
  await fetchDeleteTask(id);
  getData();
}

watch(visible, (newValue, oldValue) => {
  if (oldValue === true && newValue === false) {
    getData();
  }
});
</script>

<style scoped></style>
