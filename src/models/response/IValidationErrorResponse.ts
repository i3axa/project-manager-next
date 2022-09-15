export default interface IValidationErrorResponse {
  message: string;
  fields: {
    email?: string | [];
    password?: string | [];
    inviteCode?: string | [];
  };
}
