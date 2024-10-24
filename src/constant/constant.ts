export const PARTICIPANTS_TAKE = 10;

export const HIDE_GRADIENT_PATHNAME = ['/signup', '/signin', '/profile-edit'];

export const URL_REGEX =
  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:[0-9]{1,5})?(\/[^\s]*)?$/;

export const SOCIAL_MEDIA_KEYS = [
  'WEBSITE',
  'GITHUB',
  'LINKEDIN',
  'INSTAGRAM',
  'TELEGRAM',
  'OTHERS',
  'OTHERS2',
  'OTHERS3',
] as const;

export const DEFAULT_VERIFICATION_CODE_TIME = 180;

export const DEFAULT_RESEND_TIME = 60;

export const MAX_FILE_SIZE_MB = 5;

export const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT_DOMAIN;

export const JWT_REFRESH_SECRET =
  process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET;

export const JWT_ACCESS_SECRET =
  process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN_SECRET;

export const REDIRECT_URL = '/8d6fdb11-f7cf-4771-a172-71d6da10d72c/all';
