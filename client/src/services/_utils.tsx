/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const prepareHeaders = (headers: any, { getState }: any): void => {
  const token = getState().auth.token
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  return headers
}

interface ValidatePasswordParams {
  _: unknown; 
  value: string;
  callback: (value?: string) => void;
}

export const validatePassword = (
  params: ValidatePasswordParams
): void => {
  const { value, callback } = params;

  if (typeof value !== 'string') {
    callback('Password must be a string');
    return;
  }
  
  if (value.trim() === '') {
    callback('Password is required');
    return;
  }

  if (value.length < 10) {
    callback('Password must be at least 10 characters long');
    return;
  }

  callback(); 
};
