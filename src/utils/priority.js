export const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Baixa' },
  { value: 'medium', label: 'Média' },
  { value: 'high', label: 'Alta' },
];

export function priorityDotClass(priority) {
  if (priority === 'high') return 'bg-priority-high';
  if (priority === 'medium') return 'bg-priority-medium';
  return 'bg-priority-low';
}

export function priorityLabel(priority) {
  return PRIORITY_OPTIONS.find((o) => o.value === priority)?.label ?? priority;
}
