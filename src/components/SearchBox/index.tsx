export default function SearchBox({ placeholder, searchTerm, onChangeHandler } : any) {
  return(
    <input
      type="search"
      placeholder={placeholder}
      onChange={onChangeHandler}
      className="mb-4 p-2 text-gray-900 border border-gray-300 rounded"
    />
  )
}