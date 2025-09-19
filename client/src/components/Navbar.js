import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../slices/searchSlice';

const Navbar = ({ onLogout, onSearch }) => {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setFilters({
      ...filters,
      [e.target.name]: e.target.value
    }));
  };

  const handleSearch = () => {
    if (typeof onSearch === 'function') {
      onSearch(filters);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <div className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">
          RentEase
        </div>

        {/* Filters + Buttons */}
        <div className="flex flex-wrap items-center gap-2 ml-auto vs:flex-col vs:items-start vs:w-full">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={filters.city}
            onChange={handleChange}
            className="w-28 border rounded px-2 py-1 vs:w-full focus:ring-2 focus:ring-white outline-none"
          />
          <input
            type="number"
            name="rentMin"
            placeholder="Min Rent"
            value={filters.rentMin}
            onChange={handleChange}
            className="w-28 border rounded px-2 py-1 vs:w-full focus:ring-2 focus:ring-white outline-none"
          />
          <input
            type="number"
            name="rentMax"
            placeholder="Max Rent"
            value={filters.rentMax}
            onChange={handleChange}
            className="w-28 border rounded px-2 py-1 vs:w-full focus:ring-2 focus:ring-white outline-none"
          />
          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="w-26 border rounded px-2 py-1 vs:w-full focus:ring-2 focus:ring-white outline-none"
          >
            <option value="">All Types</option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
          </select>

          <button
            onClick={handleSearch}
            className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 shadow-md transition vs:w-full"
          >
            Search
          </button>

          <button
            onClick={onLogout}
            className="text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-indigo-600 transition vs:w-full"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
