export { cn } from "cn";
import {format,parseISO} from "date-fns"
export function formatPrice(price, currency) {
  let value = Number(price);

  if (!value) return "Free";
  
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    maximumFractionDigits:0
  }).format(price);
}
export function formatEventDate(dateInput){
  // console.log(typeof dateInput);
  // console.log(dateInput);
  // console.log(parseISO(dateInput));
  // console.log( format(dateInput,"EE, dd MMM, yyyy \n hh:mm a"));
  return format(dateInput,"EE, dd MMM, yyyy (XXXXX)")
}
