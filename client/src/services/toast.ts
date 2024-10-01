import { toast } from "react-hot-toast";

export const showSuccess = (msg: string): void => {
    toast.success(msg)
}
export const showError = (msg: string): void => {
    toast.error(msg)
}