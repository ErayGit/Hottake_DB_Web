import { Inject, Injectable } from "@angular/core";
import { take } from "rxjs";
import { TuiAlertService } from "@taiga-ui/core";
export enum pushTypes {
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
}
@Injectable({
  providedIn: "root",
})
/**
 * Service Class for displaying push-notifications
 */
export class PushService {
  topLine!: string;
  icon!: string;
  color!: string;
  success!: string;
  error!: string;
  info!: string;
  warning!: string;
  close!: string;

  constructor(
    @Inject(TuiAlertService) protected readonly alert: TuiAlertService,
  ) {}

  sendPush(type: pushTypes, content: string = "", pushText?: string) {
        if (type === pushTypes.ERROR) {
          this.topLine = this.error;
        } else if (type === pushTypes.INFO) {
          this.topLine = this.info;
        } else if (type === pushTypes.SUCCESS) {
          this.topLine = this.success;
        } else if (type === pushTypes.WARNING) {
          this.topLine = this.warning;
        }

    this.alert
      .open(pushText ?? "", {
        //@ts-ignore
        status: type,
        label: this.topLine,
        autoClose: true,
        hasCloseButton: true,
        hasIcon: true,
      })
      .pipe(take(1))
      .subscribe();
  }
}
