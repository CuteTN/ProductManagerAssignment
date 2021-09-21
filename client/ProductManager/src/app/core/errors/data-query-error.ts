import { AppError } from "./app-error";

export enum DataQueryErrorTypes {
  NotFound,
  BadRequest,
  ServerError,
  UnknownError,
}

export class DataQueryError extends AppError {
  constructor(originalError: any, public type: DataQueryErrorTypes = DataQueryErrorTypes.UnknownError) {
    super(originalError);
  }
}