import URLMark from '@/app/(auth)/signup/_components/URLMark';
import {
  FacebookSVG,
  GoogleSVG,
  InstagramSVG,
  LineSVG,
  LinkedinSVG,
  PinterestSVG,
  SkypeSVG,
  TwitterSVG,
  YoutubeSVG,
  GithubSVG,
  TelegramSVG,
  WebSVG,
} from '@/icons/index';
import React from 'react';

type SocialIconTypes =
  | 'GITHUB'
  | 'FACEBOOK'
  | 'GOOGLE'
  | 'INSTAGRAM'
  | 'LINE'
  | 'LINKEDIN'
  | 'PINTEREST'
  | 'SKYPE'
  | 'TWITTER'
  | 'YOUTUBE'
  | 'TELEGRAM'
  | 'OTHERS'
  | 'WEBSITE';

const socialIcons: Record<
  SocialIconTypes,
  | React.ReactNode
  | ((props: { bgSize?: string; svgSize?: string }) => JSX.Element)
> = {
  GITHUB: <GithubSVG />,
  FACEBOOK: <FacebookSVG />,
  GOOGLE: <GoogleSVG />,
  INSTAGRAM: <InstagramSVG />,
  LINE: <LineSVG />,
  LINKEDIN: <LinkedinSVG />,
  PINTEREST: <PinterestSVG />,
  SKYPE: <SkypeSVG />,
  TWITTER: <TwitterSVG />,
  YOUTUBE: <YoutubeSVG />,
  TELEGRAM: <TelegramSVG />,
  OTHERS: URLMark,
  WEBSITE: <WebSVG />,
};

function GetSocialIcon(type: SocialIconTypes, size: string, urlSize: string) {
  const IconComponent = socialIcons[type];

  if (IconComponent) {
    return type === 'OTHERS' ? (
      <URLMark bgSize={size} svgSize={urlSize} />
    ) : (
      React.cloneElement(IconComponent as React.ReactElement, {
        className: size,
      })
    );
  }

  return null;
}

export default GetSocialIcon;
