import { toast } from "react-toastify"

export type ToastCreator = typeof toast

export function useToast(): ToastCreator {
  return toast
}
