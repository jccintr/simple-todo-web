import { priorityDotClass, PRIORITY_OPTIONS } from '../utils/priority';

export default function PrioritySelector({ value, onChange }) {
  return (
    <div className="flex gap-2">
      {PRIORITY_OPTIONS.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
              selected
                ? `${priorityDotClass(option.value)} border-transparent text-white`
                : 'border-border bg-surface text-text hover:border-primary'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
