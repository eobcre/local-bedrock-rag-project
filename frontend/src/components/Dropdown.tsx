import { Icon } from "@iconify/react";

type Option = {
  label: string;
  value: string | number;
};

type DropdownProps = {
  name: string;
  value: string | number;
  options: Option[];
  onChange: (value: string) => void;
};

const Dropdown = ({ name, value, options, onChange }: DropdownProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative flex items-center gap-3">
      <select value={value} onChange={handleChange} className="top appearance-none">
        <option value="" disabled>
          {name}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <Icon icon="ri:arrow-drop-down-line" className="absolute right-1 top-1/2 -translate-y-1/2 text-[#303030] pointer-events-none w-10 h-10" />
    </div>
  );
};

export default Dropdown;
