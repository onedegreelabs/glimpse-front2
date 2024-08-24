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

export interface GetParticipantsInfoParams {
  eventId: string;
  take: number;
  lastItemId: number;
}

export interface SocialMediaDto {
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
  profileImageUrl?: string;
}

export interface EventParticipantProfileCardDto {
  id: number;
  isWishlisted: boolean;
  role: 'HOST' | 'GUEST';
  email: string;
  name: string;
  intro?: string;
  jobs: JobDto[];
  user: UserProfileDto;
  socialMedia: SocialMediaDto[];
}

export interface ParticipantsResponseDto {
  totalItemCount: number;
  participants: EventParticipantProfileCardDto[];
}
