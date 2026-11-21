export { cn } from "cn";
import {
  differenceInMinutes,
  format,
  formatDistanceToNow,
  parseISO,
} from "date-fns";
export function formatPrice(price, currency) {
  let value = Number(price);

  if (!value) return "Free";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(price);
}
export function formatEventDate(dateInput) {
  // console.log(typeof dateInput);
  // console.log(dateInput);
  // console.log(parseISO(dateInput));
  // console.log( format(dateInput,"EE, dd MMM, yyyy \n hh:mm a"));
  return format(dateInput, "EE, dd MMM, yyyy ");
}
export function formatTimeRange(start, end) {
  return `${format(start, "hh:mm a")} - ${format(end, "hh:mm a  (z)")} `;
}

export function findDiffTime(dateInput) {
  /*
  const targetDate = parseISO(dateInput);
  const diffMinutes = differenceInMinutes(targetDate, new Date());

  if (diffMinutes === 0) {
    return "Just now";
  }

  const isPast = diffMinutes < 0;
  const suffix = isPast ? "ago" : "remaining";
  const absMinutes = Math.abs(diffMinutes);

  const days = Math.floor(absMinutes / 1440);
  if (days >= 1) {
    return `${days} ${days === 1 ? "day" : "days"} ${suffix}`;
  }

  const hours = Math.floor(absMinutes / 60);
  if (hours >= 1) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ${suffix}`;
  }

  return `${absMinutes} ${absMinutes === 1 ? "minute" : "minutes"} ${suffix}`;
  */
 
  return formatDistanceToNow(dateInput, { addSuffix: true });
}
