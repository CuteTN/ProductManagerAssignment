import { GlobalConfig } from "ngx-toastr";

export const APP_TOAST_CONFIG: Partial<GlobalConfig> = {
  tapToDismiss: true,
  newestOnTop: true,
  timeOut: 2000,
  extendedTimeOut: 500,
  disableTimeOut: false,
  positionClass: "toast-bottom-right"
}