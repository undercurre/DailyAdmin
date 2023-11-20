export function adapterOfFetchTaskList(data: ApiManagement.Task[] | null): TaskManagement.Task[] {
  if (!data) return [];

  return data.map((item, index) => {
    const task: TaskManagement.Task = {
      index: index + 1,
      key: item.id.toString(),
      ...item
    };

    return task;
  });
}
