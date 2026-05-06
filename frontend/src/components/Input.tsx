type InputProps = {
  query: string;
  onChange: (value: string) => void;
};

const Input = ({ query, onChange }: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return <input type="text" value={query} onChange={handleChange} placeholder="Ask a question about your order, refund, or shipping..." className="border border-blue-400 bg-white rounded-sm p-2 w-full" />;
};

export default Input;
