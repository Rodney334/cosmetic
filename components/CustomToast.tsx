import toast from "react-hot-toast";

export const CustomSuccessToast = (text: string, duration?: number) => {
  return toast.success(
    <div>
      <h3 className="font-bold">{text}</h3>
    </div>,
    {
      duration: duration || 2000,
      position: "top-center",
      style: {
        backgroundColor: "#4BB543",
        color: "#fff",
        minWidth: "400px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#4BB543",
      },
    }
  );
};

export const CustomErrorToast = (text: string, duration?: number) => {
  return toast.error(
    <div>
      <h3 className="font-bold">{text}</h3>
    </div>,
    {
      duration: duration || 3000,
      position: "top-center",
      style: {
        backgroundColor: "#DA3030",
        color: "#fff",
        minWidth: "400px",
        borderRadius: "12px",
      },
    }
  );
};
