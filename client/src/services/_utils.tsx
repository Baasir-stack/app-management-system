/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const prepareHeaders = (headers: any, { getState }: any): void => {
  const token = getState().auth.token
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  return headers
}

interface ValidatePasswordParams {
  _: unknown; // You can replace 'unknown' with a more specific type if needed.
  value: string;
  callback: (value?: string) => void;
}

export const validatePassword = (
  params: ValidatePasswordParams
): void => {
  const { value, callback } = params;

  // Check if the password is a string
  if (typeof value !== 'string') {
    callback('Password must be a string');
    return;
  }
  
  // Check if the password is empty
  if (value.trim() === '') {
    callback('Password is required');
    return;
  }

  // Check the minimum length
  if (value.length < 10) {
    callback('Password must be at least 10 characters long');
    return;
  }

  // If all checks pass, call the callback with no error
  callback(); // Valid password
};
