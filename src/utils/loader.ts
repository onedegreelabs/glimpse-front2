import { ImageLoaderProps } from 'next/image';

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  return `${src}?w=${width}&q=${quality || 75}`;
}

// 추후 cloudFront 추가
// https://nextjs.org/docs/app/api-reference/next-config-js/images#aws-cloudfront
