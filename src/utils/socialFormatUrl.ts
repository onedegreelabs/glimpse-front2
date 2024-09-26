import { SocialMediaType } from '@/types/types';

function socialFormatUrl(platform: SocialMediaType, userInput: string) {
  let pattern;
  let baseUrl;

  let formattedInput = userInput;

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
      if (!/^https?:\/\//i.test(formattedInput)) {
        formattedInput = `https://${formattedInput}`;
      }
      return formattedInput;
  }

  const match = formattedInput.match(pattern);

  if (match) {
    const handle = match[2];
    return `${baseUrl}${handle}`;
  }

  return `${baseUrl}${formattedInput.trim()}`;
}

export default socialFormatUrl;
