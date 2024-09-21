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
  | 'OTHERS'
  | 'TELEGRAM';

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
  tags: Tag[];
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

export interface SocialMedia {
  type: string;
  url: string;
}

export interface BaseRegisterInputs {
  image: File | null;
  name: string;
  intro: string;
  jobTitle: string;
  belong: string;
  socialMedia: SocialMedia[];
}

export interface RegisterInputs
  extends Omit<BaseRegisterInputs, 'jobCategory' | 'socialMedia'> {
  WEBSITE: string;
  INSTAGRAM: string;
  LINKEDIN: string;
  GITHUB: string;
  TELEGRAM: string;
  OTHERS: string;
  jobCategoryId: number | null;
  tagIds: Tag[];
}

export interface RegisterFormDataDto
  extends Omit<BaseRegisterInputs, 'jobCategory'> {
  jobCategory: number;
}

export interface SigninFormInputs {
  email: string;
}

export interface VerificationCode {
  [key: string]: string;
}

export interface LoginDto {
  email: string;
  code: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface AuthToken {
  email: string;
  iat: number;
  exp: number;
}

export type BasicInfoList =
  | 'name'
  | 'intro'
  | 'jobTitle'
  | 'jobCategoryId'
  | 'belong';

export type AdditionalInfoList =
  | 'tagIds'
  | 'GITHUB'
  | 'INSTAGRAM'
  | 'LINKEDIN'
  | 'WEBSITE'
  | 'OTHERS';

export interface UserInfo {
  id: number;
  email: string;
  name: string;
  profileImageUrl: string | null;
  socialMedia: SocialMediaDto[];
  jobCategory: JobCategorie;
  jobTitle: string;
  belong: string | null;
  intro: string;
  tags: Tag[];
}

export interface EventRegisterInputs {
  intro: string;
  tagIds: Tag[];
}

export interface EventRegisterDto {
  eventId: string;
  intro: string;
  tagIds: number[];
}
