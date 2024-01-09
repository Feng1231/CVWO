import { BooleanLiteral } from "typescript";

export interface AppProps{
    title: string;
}

export interface ButtonPage{
    page: string;
}

export interface ConfirmDialogProps{
    message: string;
    onSubmit: any;
    close: any;
}

export interface SignInProps{
    username: string;
    password: string;
}
export interface SignUpProps extends SignInProps {
    confirmPassword: string;
}
export interface UserProps {
    id: number;
    username: string;
    token: string;
    admin_level: number;
}

export interface ExpandPostProps extends PostProps {
    expandPostOpen: boolean;
    handleClosePost: () => void;
    scroll: "body" | "paper" | undefined;
}

export interface CategoryProps {
    category: {
        category_id: number;
        name: string;
        created_at: Date;
    }
}
export interface PostProps {
    post: {
      post_id: number;   
      body: string;
      title: string;
      category_id: number;
      is_pinned: boolean;
      author_id: number;
      created_at: Date;
    };
  }

export class User {
    id: number;
    username: string;
    token: string;
    admin_level: number;
    constructor(id: number, username: string, token: string, admin_level: number){
        this.id = id;
        this.username = username;
        this.token = token;
        this.admin_level = admin_level;  
        }
}

export class Category {
    category_id: number;
    name: string;
    created_at: Date;

    constructor(category_id: number, name: string, created_at: Date) {
        this.category_id = category_id;
        this.name = name;
        this.created_at = created_at;
    }
}
export class Post {
    post_id: number;   
    body: string;
    title: string;
    category_id: number;
    is_pinned: boolean;
    author_id: number;
    created_at: Date;

    constructor(post_id: number, body: string, title: string, 
        category_id: number, is_pinned: boolean, author_id:number, created_at: Date) {
      this.post_id = post_id;
      this.body = body;
      this.title = title;
      this.category_id = category_id;
      this.is_pinned = is_pinned;
      this.author_id = author_id;
      this.created_at= created_at;
    }
}
