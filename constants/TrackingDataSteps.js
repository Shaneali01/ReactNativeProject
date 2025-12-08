const trackingData = {
  orderId: "ODR: 854374",
  productName: "iPhone 15 Pro Max",
  from: "DXB Dubai",
  to: "LHR Lahore",
  steps: [
    {
      status: "Purchasing",
      date: "July 20, 2025 | 03:45 pm",
      completed: true,
      icon: "cart",
    },
    {
      status: "Purchased",
      date: "July 22, 2025 | 03:45 pm",
      completed: true,
      icon: "bag-check",
    },
    {
      status: "In-transit",
      date: "July 25, 2025 | 03:45 pm",
      completed: true,
      icon: "airplane",
    },
    {
      status: "Arrived",
      date: "July 25, 2025 | 03:45 pm",
      completed: true,
      icon: "location",
    },
    {
      status: "Dispatched",
      date: "July 27, 2025 | 03:45 pm",
      completed: false,
      icon: "cube",
    },
    {
      status: "Received",
      date: "July 20, 2025 | 03:45 pm",
      completed: false,
      icon: "checkmark-circle",
    },
    {
      status: "Completed",
      date: "July 20, 2025 | 03:45 pm",
      completed: false,
      icon: "thumbs-up",
    },
  ],
};
export default trackingData;
const getStepColor = (icon) => {
  switch (icon) {
    case "cart":
      return "#FFA726";
    case "bag-check":
      return "#29B6F6";
    case "airplane":
      return "#42A5F5";
    case "location":
      return "#AB47BC";
    case "cube":
      return "#EF5350";
    case "checkmark-circle":
      return "#66BB6A";
    case "thumbs-up":
      return "#9E9E9E";
    default:
      return "#999";
  }
};
export { getStepColor };
