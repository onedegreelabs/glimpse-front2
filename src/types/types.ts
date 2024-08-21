import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

/* eslint-disable @typescript-eslint/indent */
export interface FetchError extends Error {
  status: number;
  errorCode: string;
  message: string;
}

export interface EventInfo {
  id: string;
  title: string;
  startAt: string;
  externalLink: null | URL;
  locationType: 'OFFLINE' | 'ONLINE';
  location: string;
  coverImageUrl: null | URL;
}

export interface ParticipantsSearchParams {
  nav?: 'ALL' | 'FORYOU';
  search?: string;
}

export interface GetParticipantsInfoParams {
  eventId: string;
  take: number;
  accessToken: RequestCookie;
  lastItemId?: number;
}

interface SocialMediaDto {
  id: number;
  type:
    | 'GITHUB'
    | 'MEDIUM'
    | 'FIGMA'
    | 'LINKEDIN'
    | 'DRIBBLE'
    | 'INSTAGRAM'
    | 'FACEBOOK'
    | 'OTHERS';
  url: string;
}

interface JobDto {
  id: number;
  name: string;
}

interface UserProfileDto {
  id: number;
  name: string;
  headLine?: string;
  profileImageUrl?: string;
  email: string;
  socialMedia: SocialMediaDto[];
  jobs: JobDto;
}

interface EventParticipantProfileCardDto {
  id: number;
  isWishlisted: boolean;
  role: 'HOST' | 'GUEST';
  user: UserProfileDto;
}

export interface ParticipantsResponseDto {
  totalItemCount: number;
  participants: EventParticipantProfileCardDto[];
}
