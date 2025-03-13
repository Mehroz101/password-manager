export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);

  // If edited recently (less than 24 hours ago)
  if (diffInMinutes < 1) return "just now";
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  if (diffInHours < 24) return `${diffInHours} hours ago`;

  // If older, format as "24-feb-2025 2:44pm"
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }).toLowerCase();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const amPm = hours >= 12 ? "pm" : "am";

  hours = hours % 12 || 12; // Convert to 12-hour format

  return `${day}-${month}-${year} ${hours}:${minutes}${amPm}`;
};

export const getGreeting = (): string => {
  const hours = new Date().getHours();

  if (hours >= 5 && hours < 12) {
    return "Good Morning! 🌅";
  } else if (hours >= 12 && hours < 18) {
    return "Good Afternoon! ☀️";
  } else {
    return "Good Evening!  🌙";
  }
};
