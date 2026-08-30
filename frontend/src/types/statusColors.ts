export const statusColors: Record<
  string,
  { text: string; border: string; bg: string }
> = {
  Applied: {
    text: "text-blue-600",
    border: "border-blue-500",
    bg: "bg-blue-50",
  },
  InterviewScheduled: {
    text: "text-blue-600",
    border: "border-blue-500",
    bg: "bg-blue-50",
  },
  OfferReceived: {
    text: "text-green-600",
    border: "border-green-500",
    bg: "bg-green-50",
  },
  OfferAccepted: {
    text: "text-green-600",
    border: "border-green-500",
    bg: "bg-green-50",
  },
  Rejected: { text: "text-red-600", border: "border-red-500", bg: "bg-red-50" },
  RejectedPostInterview: {
    text: "text-red-600",
    border: "border-red-500",
    bg: "bg-red-50",
  },
  OfferRejected: {
    text: "text-red-600",
    border: "border-red-500",
    bg: "bg-red-50",
  },
  PositionClosed: {
    text: "text-gray-600",
    border: "border-gray-500",
    bg: "bg-gray-50",
  },
};
