import { toast, ToastPosition } from "react-hot-toast";

type ToastComponentType = {
  text: string;
  duration?: number;
  success: boolean;
  position?: ToastPosition;
};

const Message = (text: string) => {
  return (
    <div>
      <h3 className="font-bold">{text}</h3>
    </div>
  );
};

export const CustomToast = ({
  text,
  duration,
  success,
  position,
}: ToastComponentType) => {
  if (success) {
    CustomSuccessToast({ text, duration, position });
  }
  if (!success) {
    CustomErrorToast({ text, duration, position });
  }
};

export const CustomSuccessToast = ({
  text,
  duration,
  position,
}: {
  text: string;
  duration?: number;
  position?: ToastPosition;
}) => {
  return toast.success(Message(text), {
    duration: duration || 1500,
    position: position || "top-center",
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
  });
};

export const CustomErrorToast = ({
  text,
  duration,
  position,
}: {
  text: string;
  duration?: number;
  position?: ToastPosition;
}) => {
  return toast.error(Message(text), {
    duration: duration || 3000,
    position: position || "top-center",
    style: {
      backgroundColor: "#DA3030",
      color: "#fff",
      minWidth: "400px",
      borderRadius: "12px",
    },
  });
};
