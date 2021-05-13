import { format, subDays } from "date-fns";

export const compareTwoDate = (date = new Date()) => {
  const toDate = format(new Date(), "MM/dd/yyyy");
  const dateCompare = format(new Date(date), "MM/dd/yyyy");
  const yesterday = format(new Date(subDays(new Date(), 1)), "MM/dd/yyyy");
  if (dateCompare === toDate) {
    return "Today";
  }
  if (dateCompare === yesterday) {
    return "Yesterday";
  }
  return dateCompare;
};
