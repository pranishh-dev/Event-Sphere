 import {
      setQuery,
      setSelectedCity,
      setSelectedPriceFormat,
      setSelectedSortFormat,
      setSelectedStatusFormat,
    } from "@/store/slices/filterSlice";
    import {
      ArrowUpDownIcon,
      Calendar,
      ChevronDown,
      MapPin,
      RotateCcw,
      Search,
    } from "lucide-react";
    import React from "react";
    import { useDispatch, useSelector } from "react-redux";
    
    export const FilterBar = ({
      cities,
      priceFormats,
      statusFormats,
      sortFormats,
    }) => {
      const dispatch = useDispatch();
      const query = useSelector((state) => state.filters.query);
      const selectedCity = useSelector((state) => state.filters.city);
      const selectedPriceFormat = useSelector((state) => state.filters.priceFormat);
      const selectedStatusFormat = useSelector(
        (state) => state.filters.statusFormat,
      );
      const selectedSortFormat = useSelector((state) => state.filters.sortFormat);
    
      function handleCityChange(e) {
        dispatch(setSelectedCity(e.target.value));
      }
    
      function handleSortFormatChange(e) {
        dispatch(setSelectedSortFormat(e.target.value));
      }
    
      function handlePriceFormatChange(val) {
        dispatch(setSelectedPriceFormat(val));
      }
    
      function handleStatusFormatChange(val) {
        dispatch(setSelectedStatusFormat(val));
      }
    
      function handleReset() {
        dispatch(setQuery(""));
        dispatch(setSelectedCity("all"));
        dispatch(setSelectedPriceFormat("all"));
        dispatch(setSelectedStatusFormat("all"));
        dispatch(setSelectedSortFormat("latest"));
      }
    
      return (
        <div className="space-y-4">
          {/* Top Search & Primary Filters Row */}
          <div className="bg-white rounded-2xl border border-[#EBE8DF] p-3 shadow-subtle flex
          flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1">
              <span className="text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2
              text-xs">
                <Search className="w-4 h-4" />
              </span>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  name="search"
                  value={query}
                  onChange={(e) => dispatch(setQuery(e.target.value))}
                  placeholder="Search by topic, category, artist, city, or venue..."
                  className="w-full pl-9 pr-9 py-2 text-sm rounded-xl bg-[#FAF9F5] border
                  border-[#DDD9CE] focus:bg-white focus:border-[#E65100] focus:ring-2
                  focus:ring-[#E65100]/20 text-[#111] placeholder-stone-400 outline-none
                  transition-all"
                />
              </form>
            </div>
    
            <div className="relative min-w-37.5">
              <span className="text-stone-400 absolute left-3 top-1/2 -translate-y-1/2
              pointer-events-none text-xs">
                <MapPin className="w-4 h-4" />
              </span>
              <select
                onChange={handleCityChange}
                name="city"
                value={selectedCity}
                className="w-full pl-8 pr-7 py-2 text-xs font-medium rounded-xl bg-[#FAF9F5]
                border border-[#DDD9CE] focus:border-[#E65100] outline-none text-stone-800
                appearance-none cursor-pointer"
              >
                {cities.map(({ value, text }) => {
                  return (
                    <option key={value} value={value}>
                      {text}
                    </option>
                  );
                })}
              </select>
              <span className="text-stone-400 absolute right-3 top-1/2 -translate-y-1/2
              pointer-events-none text-xs">
                <ChevronDown className="w-4 h-4" />
              </span>
            </div>
    
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl
                border transition-all cursor-pointer select-none bg-[#FAF9F5] border-[#DDD9CE]
                text-stone-700 hover:bg-stone-100"
              >
                <span>
                  <Calendar className="w-4 h-4" />
                </span>
                <span>Filter by Date</span>
                <span className="text-stone-400 text-xs">
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
            </div>
    
            <div className="relative min-w-35">
              <span className="text-stone-400 absolute left-3 top-1/2 -translate-y-1/2
              pointer-events-none text-xs">
                <ArrowUpDownIcon className="w-4 h-4" />
              </span>
              <select
                onChange={handleSortFormatChange}
                name="sort"
                value={selectedSortFormat}
                className="w-full pl-8 pr-7 py-2 text-xs font-medium rounded-xl bg-[#FAF9F5]
                border border-[#DDD9CE] focus:border-[#E65100] outline-none text-stone-800
                appearance-none cursor-pointer"
              >
                {sortFormats.map(({ value, text }) => {
                  return (
                    <option key={value} value={value}>
                      {text}
                    </option>
                  );
                })}
              </select>
              <span className="text-stone-400 absolute right-3 top-1/2 -translate-y-1/2
              pointer-events-none text-xs">
                <ChevronDown className="w-4 h-4" />
              </span>
            </div>
    
            <button
              onClick={handleReset}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium
              text-rose-600 hover:bg-rose-50 rounded-xl transition-colors shrink-0
              cursor-pointer"
            >
              <span>
                <RotateCcw className="h-4 w-4" />
              </span>
              <span>Reset</span>
            </button>
          </div>
    
          {/* Categories horizontal pill bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap
              transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-[#1a1a1a]
              text-white shadow-sm"
            >
              <span>All Disciplines</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-white/20
              text-white">
                42
              </span>
            </button>
    
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap
              transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-white
              hover:bg-stone-100 text-stone-600 border border-[#E2DFD4]"
            >
              <span>Technology & AI</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-stone-100
              text-stone-500">
                14
              </span>
            </button>
    
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap
              transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-white
              hover:bg-stone-100 text-stone-600 border border-[#E2DFD4]"
            >
              <span>Live Music & Concerts</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-stone-100
              text-stone-500">
                9
              </span>
            </button>
    
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap
              transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-white
              hover:bg-stone-100 text-stone-600 border border-[#E2DFD4]"
            >
              <span>Startups & Venture Capital</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-stone-100
              text-stone-500">
                8
              </span>
            </button>
    
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap
              transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-white
              hover:bg-stone-100 text-stone-600 border border-[#E2DFD4]"
            >
              <span>Fitness & Marathons</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-stone-100
              text-stone-500">
                5
              </span>
            </button>
    
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap
              transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-white
              hover:bg-stone-100 text-stone-600 border border-[#E2DFD4]"
            >
              <span>Arts & Culture</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-stone-100
              text-stone-500">
                4
              </span>
            </button>
          </div>
    
          {/* Format & Pricing Pills */}
          <div className="flex items-center justify-between text-xs text-stone-500 flex-wrap
          gap-2 pt-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-stone-700">Format:</span>
              {statusFormats.map(({ text, value }, i) => {
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleStatusFormatChange(value)}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-medium capitalize
                    transition-all cursor-pointer ${
                      selectedStatusFormat === value
                        ? "bg-stone-800 text-white border-stone-800"
                        : "bg-white border-[#DDD9CE] text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    {text}
                  </button>
                );
              })}
            </div>
    
            <div className="flex items-center gap-2">
              <span className="font-semibold text-stone-700">Admission:</span>
              {priceFormats.map(({ text, value }, i) => {
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handlePriceFormatChange(value)}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-medium
                    transition-all cursor-pointer ${
                      selectedPriceFormat === value
                        ? "bg-stone-800 text-white border-stone-800"
                        : "bg-white border-[#DDD9CE] text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    {text}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      );
    };