
interface Props {
    isChecked: boolean;
    setIsChecked: (e: boolean) => void;
}

export function CheckBox({ isChecked, setIsChecked }: Props) {
  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div onClick={handleChange}>
      <input 
        checked={isChecked}
        onChange={handleChange}
        type="checkbox" 
        className="peer sr-only opacity-0" 
      />
      <label className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 py-2 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500">
        <span className="sr-only">Enable</span>
      </label>
    </div>
  );
}