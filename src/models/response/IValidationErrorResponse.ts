export default interface IValidationErrorResponse {
  message: string;
  fields: {
    email?: string | string[];
    password?: string | string[];
  };
}
