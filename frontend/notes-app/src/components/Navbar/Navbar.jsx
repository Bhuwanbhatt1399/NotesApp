import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'



const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setsearchQuery] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const onLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

 const handleSearch = () => {
  if (searchQuery) {
    onSearchNote(searchQuery);
  }
};


//   useEffect(() => {
//   if (searchQuery) {
//     onSearchNote(searchQuery);
//   }
// }, [searchQuery]);

  const onClearSearch = () => {
    setsearchQuery("");
    handleClearSearch();
  };

  return (
    <div className='bg-white flex items-cnter justify-between px-6 py-2 drop-shadow'>
      <h2 className='text-xl font-medium text-black py-2'>Notes</h2>
      {isLoggedIn && (
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => setsearchQuery(target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      )}

      {isLoggedIn && (
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      )}

    </div>
  )
}

export default Navbar
