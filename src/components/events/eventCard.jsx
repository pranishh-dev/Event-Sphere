import { formatEventDate, formatPrice } from "@/lib/utils";
import { checkIndexFav, toggleFavourite } from "@/store/slices/favouritesSlice";
import {
  Bookmark,
  BookmarkCheck,
  BookmarkCheckIcon,
  BookmarkPlus,
  BookmarkX,
  Calendar,
} from "lucide-react";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "sonner";
export const EventCard = ({ event }) => {
  const {
    id,
    image,
    title,
    city,
    format,
    currency,
    category,
    price,
    startDate,
    slug,
  } = event;

  // console.log(event);
  const dispatch = useDispatch();

  const favouriteItems = useSelector((state) => state.favourites.items);
  const isFav = useMemo(
    () => (event ? checkIndexFav(favouriteItems, event) >= 0 : false),
    [favouriteItems, event],
  );

  function handleSave(e) {
    try {
      e.preventDefault()
      if (!event) return;

      if (isFav) {
        toast.info(`${title} removed from favourites!`);
      } else {
        toast.success(`${title} saved to favourites!`);
      }

      dispatch(toggleFavourite(event));
    } catch (error) {
      toast.error("Failed to save to favourites!");
    }
  }

  return (
    <Link
      to={`/events/${slug}-${id}`}
      className="group bg-white rounded-2xl border border-[#EAE7DC] overflow-hidden flex flex-col justify-between shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.08)] hover:border-[#D5D0C2] hover:-translate-y-0.5 transition-all duration-300"
    >
      <div>
        <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/70 text-white backdrop-blur-md shadow-sm">
              {category?.name}
            </span>
            <button
              onClick={handleSave}
              type="button"
              className="pointer-events-auto w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-black/5 flex items-center justify-center text-stone-700 text-xs"
            >
              <span>
                <Bookmark className={`w-4 h-4 ${isFav && "fill-orange-400 text-orange-600"}`} />
              </span>
            </button>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#C2410C]">
            <span>
              <Calendar className="w-4 h-4" />
            </span>
            <span>{formatEventDate(startDate)}</span>
            <span className="text-stone-300 font-normal">•</span>
            <span className="text-stone-500 font-normal truncate">{city}</span>
          </div>
          <h3 className="font-bold text-base text-[#111] leading-snug line-clamp-2 group-hover:text-[#E65100] transition-colors">
            {title}
          </h3>
        </div>
      </div>

      <div className="px-4 pb-4 pt-3 border-t border-[#F2EFE8] flex items-center justify-between text-xs mt-1">
        <span className="capitalize text-stone-500 font-medium">{format}</span>
        <span className="text-sm font-bold text-stone-900">
          {formatPrice(price, currency)}
        </span>
      </div>
    </Link>
  );
};
