import { Timestamp } from "firebase/firestore";

export const formatTimestamp = (timestamp: Timestamp) => {
  if (!timestamp) {
    return {
      formattedDate: "Unknown Date",
      formattedTime: "Unknown Time",
    };
  }

  const date = timestamp.toDate();
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { formattedDate, formattedTime };
};
