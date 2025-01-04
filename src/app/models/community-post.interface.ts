interface CommunityPost {
    id: string;
    title: string;
    content: string;
    imageUrl?: string; // Optional for photos
    author: string;
    date: Date;
  }
  
  export interface Comment {
    id: string; // Unique ID for the comment
    author: string; // Commenter's name
    content: string; // Comment content
    date: Date; // Date of the comment
  }
  