
// export type DocumentStyleType = "Fiction" | "Nonfiction" | "Poetry";
export type StatusType = "under_review" | "accepted" | "rejected";

export enum DocumentStyleType {
  FICTION = "Fiction",
  NONFICTION = "Nonfiction",
  POETRY = "Poetry",
}

export interface SubmissionType {
  id: number;
  title: string;
  user_id: number;
  accepted: boolean;
  status: StatusType;
  flag: boolean;
  comments: number[];
  ratings: number[];
}

export interface DocumentType extends SubmissionType {
  style: DocumentStyleType;
  file: string; // TODO: Change once actually using file
}

export interface ArtworkType extends SubmissionType {
  image_file_name: string;
}

export type UserRole = "Submitter" | "Editor" | "Admin";

export interface UserType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
}

export interface SubmitterType extends UserType {
  school: string;
  teacher: string;
  grade: number;
  bio: string;
  documents: number[];
  artworks: number[];
}

export interface EditorType extends UserType {
  comments: number[];
  ratings: number[];
}

// TODO: artwork vs written?

interface BaseCommentType {
  id: number;
  comment_text: string;
  document_id: number;
  user_id: number; // TODO: artwork id?
  title_suggestion: boolean;
}

export interface CommentType extends BaseCommentType {
  created_at: Date;
}

// Because the backend can't store a JS Date, the created_at type is different
// and must be parsed
export interface WireCommentType extends BaseCommentType {
  created_at: string;
}

export interface RatingType {
  id: number;
  rating_val: number;
  document_id?: number;
  artowrk_id?: number;
  user_id: number;
}