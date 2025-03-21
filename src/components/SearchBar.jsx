import { FaSearch } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useRef } from "react";
const SearchBar = () => {
  const inputRef = useRef(null);

  // handler used to set focus inside the search bar when the search icon is clicked
  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <div className="relative w-[200px] rounded-2xl bg-white h-[30px] 
    ">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        className="w-full h-full placeholder:text-black placeholder:text-sm pl-3 pr-10 text-sm bg-white text-black rounded-md focus:outline-none "
      />
      <IoIosSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black " onClick={handleFocus} />
    </div>
  );
};

export default SearchBar;
