import Skeleton from "@/components/common/skeleton";
import { EventCard } from "@/components/events/eventCard";
import api from "@/lib/axios";
import { MapPin, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FilterBar } from "@/components/filterBar";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCity } from "@/store/slices/filterSlice";

export default function ExplorePage() {
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    hasMore: true,
    total: 0,
  });

  const { ref: observerRef, inView } = useInView({ threshold: 0.5 });

  const selectedCity = useSelector((state) => state.filters.city);
  const filters = useSelector((state) => state.filters);

  const cities = [
    { value: "all", text: "All locations" },
    { value: "bengaluru", text: "Bengaluru" },
    { value: "delhi", text: "Delhi" },
    { value: "pune", text: "Pune" },
    { value: "hyderabad", text: "Hyderabad" },
    { value: "mumbai", text: "Mumbai" },
    { value: "jaipur", text: "Jaipur" },
  ];

  const priceFormats = [
    { isPaid: "all", text: "All", value: "all" },
    { isPaid: false, text: "Free", value: "free" },
    { isPaid: true, text: "Paid", value: "paid" },
  ];

  const statusFormats = [
    { value: "all", text: "All formats" },
    { value: "online", text: "Online" },
    { value: "in-person", text: "In-person" },
    { value: "hybrid", text: "Hybrid" },
  ];

  const sortFormats = [
    { value: "latest", text: "Latest First" },
    { value: "earliest", text: "Earliest First" },
    { value: "price-L2H", text: "Price: Low to High" },
    { value: "price-H2L", text: "Price: High to Low" },
    { value: "title-A2Z", text: "Title: A - Z" },
  ];

  const fetchEvents = useCallback(
    async (page) => {
      const params = { page };
      const { query, priceFormat, statusFormat, sortFormat, city } = filters;

      // Price filter (API expects boolean isPaid: true or false)
      if (priceFormat === "free") {
        params.isPaid = false;
      } else if (priceFormat === "paid") {
        params.isPaid = true;
      }

      //city filter
      if (city && city != "all") {
        params.city = city;
      }

      if (sortFormat === "earliest") {
        params.sort = "date";
        params.order = "asc";
      }
      if (sortFormat === "latest") {
        params.sort = "date";
        params.order = "desc";
      }
      if (sortFormat === "price-H2L") {
        params.sort = "price";
        params.order = "desc";
      }
      if (sortFormat === "price-L2H") {
        params.sort = "price";
        params.order = "asc";
      }
      if (sortFormat === "title-A2Z") {
        params.sort = "title";
        params.order = "asc";
      }

      //format filter
      if (statusFormat && statusFormat !== "all") {
        params.format = statusFormat;
      }

      if (page === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      try {
        const res = await api.get(`/api/events`, { params });

        const newEvents = res.data || [];
        const newPagination = res.pagination || {
          page,
          hasMore: false,
          total: 0,
        };

        if (page === 1) {
          setEvents(newEvents);
        } else {
          setEvents((prev) => [...prev, ...newEvents]);
        }

        setPagination(newPagination);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [filters],
  );

  //  Fetch initial events and re-fetch when filters change
  useEffect(() => {
    fetchEvents(1);
  }, [fetchEvents]);

  // Infinite scroll trigger
  useEffect(() => {
    if (!isLoading && inView && !isLoadingMore && pagination.hasMore) {
      const timer = setTimeout(() => {
        fetchEvents(pagination.page + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [
    inView,
    isLoading,
    isLoadingMore,
    pagination.hasMore,
    pagination.page,
    fetchEvents,
  ]);

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
      <FilterBar
        cities={cities}
        sortFormats={sortFormats}
        priceFormats={priceFormats}
        statusFormats={statusFormats}
      />

      {/* Results Header with Active Filter Tags */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3
          text-xs text-stone-500 pt-2 border-b border-[#EBE8DF] pb-3"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span>
            Showing <strong className="text-stone-800">{events.length}</strong>{" "}
            events of {pagination.total ?? 0}
          </span>

          {selectedCity !== "all" && (
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                text-xs font-semibold bg-orange-50 text-[#C2410C] border border-orange-200"
            >
              <span>
                <MapPin className="h-4 w-4" />
              </span>
              <span>
                City:{" "}
                {cities.find((city) => city.value === selectedCity)?.text ||
                  selectedCity}
              </span>
              <button
                type="button"
                onClick={() => dispatch(setSelectedCity("all"))}
                className="hover:text-rose-700 ml-0.5 cursor-pointer"
                aria-label="Remove city filter"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          )}

          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
              text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-200"
          >
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
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            gap-6"
        >
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
              <span
                className="w-4 h-4 border-2 border-[#E65100] border-t-transparent
                  rounded-full animate-spin"
              />
              <span>Unfolding more community gatherings...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
