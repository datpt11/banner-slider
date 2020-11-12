import type * as CSS from 'csstype';

export type CSSProperties = CSS.Properties<string | number>;

export interface YoutubeListThumbs {
  default: {
    url: string;
    width: number;
    height: number;
  };
  medium: {
    url: string;
    width: number;
    height: number;
  };
  high?: {
    url: string;
    width: number;
    height: number;
  };
  standard: {
    url: string;
    width: number;
    height: number;
  };
  maxres?: {
    url: string;
    width: number;
    height: number;
  };
}

export interface YoutubeListVideoItem {
  kind: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: YoutubeListThumbs;
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    localized: {
      title: string;
      description: string;
    };
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    projection: string;
    videoId: string;
  };
}

export interface YoutubeListVideo {
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YoutubeListVideoItem[];
}

export interface YoutubeParams {
  key: string;
  id?: string;
  part: string;
  playlistId?: string;
  maxResults?: number;
}
