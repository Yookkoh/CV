interface AdminFormFieldProps {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
}

export function AdminFormField({
  label,
  name,
  type = "text",
  defaultValue = "",
  placeholder,
  required,
  textarea,
  rows = 4,
}: AdminFormFieldProps) {
  const className =
    "w-full px-3 py-2 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/50";

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={className}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          className={className}
        />
      )}
    </div>
  );
}
