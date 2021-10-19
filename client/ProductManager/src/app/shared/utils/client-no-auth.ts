import { HttpParams } from '@angular/common/http';

// Add this to any API that doesn't require authorization to prevent them from calling refresh token
export const CLIENT_NO_AUTH_PARAM_NAME = 'client-no-auth';
export const CLIENT_NO_AUTH_PARAMS = new HttpParams().append(CLIENT_NO_AUTH_PARAM_NAME, true)
