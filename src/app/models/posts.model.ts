export interface Post {
  userId: string;
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  likes: number;
  showComments?: boolean;
  comments: Comment[];


}

export interface Comment {
  _id: string;
  postId: string;
  userId: string;
  text: string;
  user?: string;
}



export interface User {
  _id?: string;
  username: string;
  name: string;
  email: string;
  password: string;
}

