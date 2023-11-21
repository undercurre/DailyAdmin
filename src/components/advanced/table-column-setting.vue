<template>
  <n-popover placement="bottom" trigger="click">
    <template #trigger>
      <n-button size="small" type="primary">
        <icon-ant-design-setting-outlined class="mr-4px text-16px" />
        表格列设置
      </n-button>
    </template>
    <div class="w-180px">
      <vue-draggable v-model:modelValue="list" item-key="key" :animation="duration" handle=".iconHandle">
        <template #item="{ element }">
          <div v-if="element.key" class="h-36px flex-y-center px-12px hover:bg-primary_active">
            <icon-mdi-drag class="iconHandle mr-8px cursor-move text-20px" />
            <n-checkbox v-model:checked="element.checked">
              {{ element.title }}
            </n-checkbox>
          </div>
        </template>
      </vue-draggable>
    </div>
  </n-popover>
</template>

<script setup lang="ts" generic="T">
import { ref, watch } from 'vue';
import VueDraggable from 'vuedraggable';
import type { HookTableColumn } from '@/hooks';

type Column = HookTableColumn<T>;

interface Props {
  columns: Column[];
  duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  duration: 150
});

interface Emits {
  (e: 'update:columns', columns: Column[]): void;
}

const emit = defineEmits<Emits>();

type List = Column & { checked?: boolean };

const list = ref(initList());

function initList(): List[] {
  return props.columns.map(item => ({ ...item, checked: true }));
}

watch(
  list,
  newValue => {
    const newColumns = newValue.filter(item => item.checked);

    const columns: Column[] = newColumns.map(item => {
      const column = { ...item };
      delete column.checked;

      return column;
    }) as Column[];

    emit('update:columns', columns);
  },
  { deep: true }
);
</script>

<style scoped></style>
