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
  search?: string;
}

export type SocialMediaType =
  | 'WEBSITE'
  | 'GITHUB'
  | 'LINKEDIN'
  | 'INSTAGRAM'
  | 'OTHERS';

export interface SocialMediaDto {
  id: number;
  type: SocialMediaType;
  url: string;
}

interface JobDto {
  id: number;
  korName: string;
  engName: string;
}

interface UserProfileDto {
  id: number;
  name: string;
  profileImageUrl?: string;
  socialMedia: SocialMediaDto[];
  jobCategory: JobDto;
  jobTitle: string;
  belong: string;
  email: string;
}

export interface EventParticipantProfileCardDto {
  id: number;
  isWishlisted: boolean;
  role: 'HOST' | 'GUEST';
  intro?: string | null;
  user: UserProfileDto;
}

export interface ParticipantsResponseDto {
  totalItemCount: number;
  participants: EventParticipantProfileCardDto[];
}

export interface CuratedParticipantDto extends EventParticipantProfileCardDto {
  score: number;
  enComment: string;
  krComment: string;
}

export interface CurationsResponseDto {
  totalAttempts: number;
  todayAttempts: number;
  latestCuratedAt: number;
  participants: CuratedParticipantDto[];
}

export interface TokenInfo {
  userId: number;
  name: string;
  email: string;
  method: string;
  role: string;
  iat: number;
  exp: number;
}

export interface JobCategorie {
  id: number;
  korName: string;
  engName: string;
}

interface JobCategory {
  id: number;
}

export interface SocialMedia {
  type: string;
  url: string;
}

export interface BaseRegisterInputs {
  image: string;
  name: string;
  intro: string;
  jobTitle: string;
  belong: string;
  socialMedia: SocialMedia[];
}

export interface RegisterInputs
  extends Omit<BaseRegisterInputs, 'jobCategory'> {
  jobCategory: JobCategory | null;
}

export interface RegisterFormDataDto
  extends Omit<BaseRegisterInputs, 'jobCategory'> {
  jobCategory: JobCategory;
}
