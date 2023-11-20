declare namespace ApiManagement {
  type TaskAttributes = {
    name: string;
    workTime: string;
    completed: boolean;
    description: string;
    note: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };

  interface Task {
    id: number;
    attributes: TaskAttributes;
  }

  interface CreateTaskDto extends Omit<TaskAttributes, 'createdAt' | 'updatedAt' | 'publishedAt'> {
    user: number;
  }

  type UpdateTaskDto = Partial<CreateTaskDto>;
}

declare namespace TaskManagement {
  interface Task extends ApiManagement.Task {
    /** 序号 */
    index: number;
    /** 表格的key（id） */
    key: string;
  }
}
