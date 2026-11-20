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
  return format(dateInput,"EE, dd MMM, yyyy ")
}

// {
//     "_id": "6ae2488f8b435f97684841d4",
//     "title": "React Developers Summit 2027",
//     "slug": "react-developers-summit-2027",
//     "description": "Dive deep into React 19 innovations, React Server Components, Vite 6 builds, and advanced state architecture with lead contributors from Meta and the open-source community.",
//     "category": {
//         "_id": "6ae2488f8b435f97684841cd",
//         "name": "Technology",
//         "slug": "technology",
//         "icon": "cpu",
//         "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
//     },
//     "city": "Bengaluru",
//     "venue": "Koramangala Convention Centre, 80 Feet Road",
//     "format": "in-person",
//     "meetLink": "",
//     "startDate": "2027-02-15T04:00:00.000Z",
//     "endDate": "2027-02-15T12:30:00.000Z",
//     "isPaid": true,
//     "price": 999,
//     "currency": "INR",
//     "capacity": 400,
//     "registeredCount": 188,
//     "image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
//     "averageRating": 4.5,
//     "numReviews": 2,
//     "featured": true,
//     "status": "published",
//     "verificationStatus": "approved",
//     "rejectionReason": "",
//     "organizer": {
//         "_id": "6ae2488b8b435f97684841a7",
//         "name": "Aarav Sharma",
//         "email": "aarav.sharma@techsphere.io",
//         "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
//         "phone": "+91 98765 11002",
//         "bio": "Director of Developer Relations and organizer for national tech summits and hackathons.",
//         "organization": "TechSphere Community",
//         "organizerRating": 4.6,
//         "totalOrganizerReviews": 20
//     },
//     "tags": [
//         "React",
//         "JavaScript",
//         "Frontend",
//         "WebDev"
//     ],
//     "__v": 0,
//     "createdAt": "2026-10-28T19:10:07.288Z",
//     "updatedAt": "2026-10-28T19:10:08.031Z",
//     "isFree": false,
//     "isSoldOut": false,
//     "isPast": false,
//     "id": "6ae2488f8b435f97684841d4"
// }