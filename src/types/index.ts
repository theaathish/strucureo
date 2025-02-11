import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface Job {
  id: string;
  title: string;
  description: string;
  createdAt: Date | Timestamp;
  ref: DocumentReference; // Make ref required and properly typed
}

export interface Application {
  applicantEmail: string;
  note: string;
  createdAt: Date | Timestamp;
}

export interface FirebaseError {
  code: string;
  message: string;
}
