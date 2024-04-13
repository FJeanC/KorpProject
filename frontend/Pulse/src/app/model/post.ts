import { User } from "./user";

export class Post {
    id!: number;
    userId!: number;
    content!: string;
    createdAt!: Date;
    user!: User;
  }