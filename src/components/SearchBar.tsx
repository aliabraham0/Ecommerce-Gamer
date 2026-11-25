
interface SearchBarProps {
  search: string;
  onSearch: (value: string) => void;
}

export const SearchBar = ({ search, onSearch }: SearchBarProps) => {
  return (
    <input
      className="bg-slate-800 border border-violet-400 rounded-md px-3 py-2 text-white placeholder:text-gray-400 outline-none focus:border-sky-400"
      placeholder="Buscar juego..."
      type="text"
      value={search}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};
