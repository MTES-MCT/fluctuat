export class ResultHelper {
  errorMsg: string;
  pending: boolean;

  error(error: string) {
    this.pending = false;
    this.errorMsg = error;
  }

  waiting() {
    this.errorMsg = undefined;
    this.pending = true;
  }

  success() {
    this.errorMsg = undefined;
    this.pending = false;
  }
}
