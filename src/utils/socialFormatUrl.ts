import { SocialMediaType } from '@/types/types';

function socialFormatUrl(platform: SocialMediaType, userInput: string) {
  let pattern;
  let baseUrl;

  switch (platform) {
    case 'LINKEDIN':
      pattern = /(linkedin\.com\/in\/)([\w-]+)/;
      baseUrl = 'https://www.linkedin.com/in/';
      break;
    case 'INSTAGRAM':
      pattern = /(instagram\.com\/)([\w-]+)/;
      baseUrl = 'https://www.instagram.com/';
      break;
    case 'GITHUB':
      pattern = /(github\.com\/)([\w-]+)/;
      baseUrl = 'https://github.com/';
      break;
    default:
      return '지원하지 않는 플랫폼입니다.';
  }

  const match = userInput.match(pattern);

  if (match) {
    const handle = match[2];
    return `${baseUrl}${handle}`;
  }
  return `${baseUrl}${userInput.trim()}`;
}

export default socialFormatUrl;
