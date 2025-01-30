import { Timestamp } from "firebase/firestore";

export const formatTimestamp = (timestamp: Timestamp | Date) => {
  if (!timestamp) {
    return {
      formattedDate: "Unknown Date",
      formattedTime: "Unknown Time",
    };
  }

  // 🔥 Convert Firestore Timestamp to JavaScript Date before formatting
  const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;

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
