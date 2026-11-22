import Skeleton from "@/components/common/skeleton";
import { EventCard } from "@/components/events/eventCard";
import api from "@/lib/axios";
import axios from "axios";
import { addMilliseconds } from "date-fns";
import {
  Calendar,
  ChevronDown,
  Cross,
  CrossIcon,
  ListRestart,
  MapPin,
  Pin,
  Redo,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useInView } from "react-intersection-observer";

export default function ExplorePage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedPriceFormat, setSelectedPriceFormat] = useState("all");
  const [selectedStatusFormat, setSelectedStatusFormat] = useState("all");
  const [selectedSortFormat, setSelectedSortFormat] = useState("earliest");
  const [pagination, setPagination] = useState({ page: 1, hasMore: true });

  const { ref: observerRef, inView } = useInView({ threshold: 0.5 });
  console.log(inView);

  let cities = [
    { value: "all", text: "All locations" },
    { value: "bengaluru", text: "Bengaluru" },
    { value: "delhi", text: "Delhi" },
    { value: "pune", text: "Pune" },
    { value: "hyderabad", text: "Hyderabad" },
    { value: "mumbai", text: "Mumbai" },
    { value: "jaipur", text: "Jaipur" },
  ];
  let priceFormats = [
    { value: "all", text: "All" },
    { value: "free", text: "Free" },
    { value: "paid", text: "Paid" },
  ];
  let statusFormats = [
    { value: "all", text: "All formats" },
    { value: "online", text: "Online" },
    { value: "offline", text: "In-person" },
    { value: "hybrid", text: "Hybrid" },
  ];
  // let filters = {priceFormat,statusFormat,city}
  // console.log(filters);

  let sortFormats = [
    { value: "earliest", text: "Earliest First" },
    { value: "latest", text: "Latest First" },
    { value: "price-L2H", text: "Price: Low to High" },
    { value: "price-H2L", text: "Price: High to Low" },
    { value: "title-A2Z", text: "Title: A - Z" },
  ];

  async function fetchEvents(page) {
    page == 1 ? setIsLoading(true) : setIsLoadingMore(true);
    try {
      setIsLoading(true);
      let { data: newEvents, pagination } = await api.get(
        `/api/events?page=${page}`,
      );

      page == 1
        ? setEvents(newEvents)
        : setEvents((prev) => [...prev, ...newEvents]);

      setPagination(pagination);
      setIsLoading(false);
      setIsLoadingMore(false);

      // console.log(pagination);
      // console.log(events);
    } catch (error) {}
  }

  useEffect(() => {
    fetchEvents(1);
  }, []);

  useEffect(() => {
    if (!isLoading && inView && !isLoadingMore && pagination.hasMore) {
      let timer = setTimeout(() => {
        fetchEvents(pagination.page + 1);
      }, 500);
      return ()=>clearTimeout(timer)
    }
  }, [inView]);

  function handleCityChange(e) {
    setSelectedCity(e.target.value);
  }
  function handleSortFormatChange(e) {
    setSelectedSortFormat(e.target.value);
  }
  function handlePriceFormatChange(e) {
    e.target.value && setSelectedPriceFormat(e.target.value);
  }
  function handleStatusFormatChange(e) {
    e.target.value && setSelectedStatusFormat(e.target.value);
  }
  function handleReset(e) {
    // filters = {...filters,city:"all",statusFormat:"all",priceFormat:"all"}
    // console.log(filters);
    setSelectedCity("all");
    setSelectedPriceFormat("all");
    setSelectedStatusFormat("all");
    setSelectedSortFormat("earliest");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111] tracking-tight">
          Explore Curated Gatherings
        </h1>
        <p className="text-sm text-stone-600">
          Discover summits, masterclasses, acoustic shows, and retreats across
          India
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Top Search & Primary Filters Row */}
        <div className="bg-white rounded-2xl border border-[#EBE8DF] p-3 shadow-subtle flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <span className="text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 text-xs">
              <Search className="w-4 h-4" />
            </span>
            <form>
              <input
                type="text"
                name="search"
                placeholder="Search by topic, category, artist, city, or venue..."
                className="w-full pl-9 pr-9 py-2 text-sm rounded-xl bg-[#FAF9F5] border border-[#DDD9CE] focus:bg-white focus:border-[#E65100] focus:ring-2 focus:ring-[#E65100]/20 text-[#111] placeholder-stone-400 outline-none transition-all"
              />
            </form>
          </div>

          <div className="relative min-w-37.5">
            <span className="text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs">
              <MapPin className="w-4 h-4" />
            </span>
            <select
              onChange={handleCityChange}
              name="city"
              value={selectedCity}
              className="w-full pl-8 pr-7 py-2 text-xs font-medium rounded-xl bg-[#FAF9F5] border border-[#DDD9CE] focus:border-[#E65100] outline-none text-stone-800 appearance-none cursor-pointer"
            >
              {cities.map(({ value, text }) => {
                return (
                  <option key={value} value={value}>
                    {text}
                  </option>
                );
              })}
            </select>
            <span className="text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs">
              <ChevronDown className="w-4 h-4" />
            </span>
          </div>

          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl border transition-all cursor-pointer select-none bg-[#FAF9F5] border-[#DDD9CE] text-stone-700 hover:bg-stone-100"
            >
              <span>
                {" "}
                <Calendar className="w-4 h-4" />{" "}
              </span>
              <span>Filter by Date</span>
              <span className="text-stone-400 text-xs">
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>
          </div>

          <div className="relative min-w-35">
            <select
              onChange={handleSortFormatChange}
              name="sort"
              value={selectedSortFormat}
              className="w-full pl-8 pr-7 py-2 text-xs font-medium rounded-xl bg-[#FAF9F5] border border-[#DDD9CE] focus:border-[#E65100] outline-none text-stone-800 appearance-none cursor-pointer"
            >
              {sortFormats.map(({ value, text }) => {
                return (
                  <option key={value} value={value}>
                    {text}
                  </option>
                );
              })}
            </select>
            <span className="text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs">
              <ChevronDown className="w-4 h-4" />
            </span>
          </div>

          <button
            onClick={handleReset}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors shrink-0 cursor-pointer"
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
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-[#1a1a1a] text-white shadow-sm"
          >
            <span>All Disciplines</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-white/20 text-white">
              42
            </span>
          </button>

          <button
            type="button"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-600 border border-[#E2DFD4]"
          >
            <span>Technology & AI</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-stone-100 text-stone-500">
              14
            </span>
          </button>

          <button
            type="button"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-600 border border-[#E2DFD4]"
          >
            <span>Live Music & Concerts</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-stone-100 text-stone-500">
              9
            </span>
          </button>

          <button
            type="button"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-600 border border-[#E2DFD4]"
          >
            <span>Startups & Venture Capital</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-stone-100 text-stone-500">
              8
            </span>
          </button>

          <button
            type="button"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-600 border border-[#E2DFD4]"
          >
            <span>Fitness & Marathons</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-stone-100 text-stone-500">
              5
            </span>
          </button>

          <button
            type="button"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 bg-white hover:bg-stone-100 text-stone-600 border border-[#E2DFD4]"
          >
            <span>Arts & Culture</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-stone-100 text-stone-500">
              4
            </span>
          </button>
        </div>

        {/* Format & Pricing Pills */}
        <div className="flex items-center justify-between text-xs text-stone-500 flex-wrap gap-2 pt-1">
          <div
            className="flex items-center gap-2 flex-wrap"
            onClick={handleStatusFormatChange}
          >
            <span className="font-semibold text-stone-700">Format:</span>
            {statusFormats.map(({ text, value }, i) => {
              return (
                <button
                  key={i}
                  type="button"
                  value={value}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-medium capitalize transition-all cursor-pointer ${selectedStatusFormat == value ? " bg-stone-800 text-white border-stone-800" : "bg-white border-[#DDD9CE] text-stone-600 hover:bg-stone-50"}`}
                >
                  {text}
                </button>
              );
            })}
          </div>

          <div
            className="flex items-center gap-2"
            onClick={handlePriceFormatChange}
          >
            <span className="font-semibold text-stone-700">Admission:</span>
            {priceFormats.map(({ text, value }, i) => {
              return (
                <button
                  key={i}
                  type="button"
                  value={value}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all cursor-pointer ${selectedPriceFormat == value ? "bg-stone-800 text-white border-stone-800" : " bg-white border-[#DDD9CE] text-stone-600 hover:bg-stone-50"}`}
                >
                  {text}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Header with Active Filter Tags */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500 pt-2 border-b border-[#EBE8DF] pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span>
            Showing <strong className="text-stone-800">4</strong> events of 42
          </span>

          {selectedCity != "all" && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 text-[#C2410C] border border-orange-200">
              <span>
                <MapPin className="h-4 w-4" />
              </span>
              <span>
                City: {cities.find((city) => city.value == selectedCity).text}
              </span>
              <button
                type="button"
                className="hover:text-rose-700 ml-0.5 cursor-pointer"
                aria-label="Remove city filter"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          )}

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-200">
            <span className="text-[#E65100]">🏷️</span>
            <span>Category: Technology & AI</span>
            <button
              type="button"
              className="hover:text-rose-700 ml-0.5 cursor-pointer"
              aria-label="Remove category filter"
            >
              <X className="h-4 w-4" />
            </button>
          </span>
        </div>
      </div>

      {/* Events Grid */}
      <div className="space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading && !isLoadingMore
            ? [...Array(8)].map((_, i) => <Skeleton key={i} />)
            : events.map((event) => {
                return <EventCard key={event.id || event._id} event={event} />;
              })}
        </div>

        {/* Bottom indicator */}
        <div ref={observerRef} className="py-6 flex justify-center ">
          {pagination.hasMore && (
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <span className="w-4 h-4 border-2 border-[#E65100] border-t-transparent rounded-full animate-spin" />
              <span>Unfolding more community gatherings...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
