import { BooleanLiteral } from "typescript";

export interface AppProps{
    title?: string;
}

export interface ButtonPage{
    page: string;
}

export interface ModalProps {
    errors: string | string[];
    handleModal: (errors?: string | string[]) => void;
}

export interface ConfirmDialogProps{
    message: string;
    onSubmit: any;
    close: any;
}

export interface SignInProps {
    handleModal: (errors?: string | string[]) => void;
    handleLogin: (user: UserProps) => void;
}

export interface SignUpProps {
    handleModal: (errors?: string | string[]) => void;
}


export interface UserSignInProps {
    username: string,
    password: string
}
export interface UserSignUpProps extends UserSignInProps {
    password_confirmation: string;
}
export interface UserProps {
    id: number;
    username: string;
    token: string;
    admin_level: number;
    logged_in: boolean;
}

export interface HomeProps {
    user: UserProps | {logged_in: boolean};
    handleLogout: () => void;
    handleModal: (errors?: string | string[]) => void;
}

export interface PinnedPostProps {
    user: UserProps | {logged_in: boolean};
    post: PostProps;
    handleModal: (errors?: string | string[]) => void;

}
export interface NonPinnedPostProps {
    user: UserProps | {logged_in: boolean};
    post: PostProps;
    handleModal: (errors?: string | string[]) => void;

}
export interface NoPageProps {
    statusCode: number;
}

export interface PrimarySearchAppBarProps {
    user: UserProps | {logged_in: boolean};
    categories: CategoryProps[];
    handleLogout: () => void;
    handleModal: (errors?: string | string[]) => void;

}

export interface MenuListCompositionProps {
    user: UserProps | {logged_in: boolean};
    categories: CategoryProps[];
    handleModal: (errors?: string | string[]) => void;
}

export interface ProfilePageAppBarProps {
    user: UserProps | {logged_in: boolean};
}

export interface ProfilePageBodyProps {
    user: UserProps | {logged_in: boolean};
}

export interface AddPostProps {
    user: UserProps | {logged_in: boolean};
    categories: CategoryProps[];
    handleModal: (errors?: string | string[]) => void;

}

export interface EditPostProps {
    user: UserProps | {logged_in: boolean};
    post: PostProps;
    handleModal: (errors?: string | string[]) => void;

}

export interface AddCommentProps {
    user: UserProps | {logged_in: boolean};
    post: PostProps;
    handleModal: (errors?: string | string[]) => void;
}
export interface MyPostsProps {
    user: UserProps | { logged_in: boolean };
    handleModal: (errors?: string | string[]) => void;
    handleLogout: () => void;

}

export interface CategoryPageProps {
    user: UserProps | { logged_in: boolean };
    handleModal: (errors?: string | string[]) => void;
    handleLogout: () => void;
}

export interface AddCategoryProps {
    user: UserProps | {logged_in: boolean};
    handleModal: (errors?: string | string[]) => void;

}

export interface RenameCategoryProps {
    user: UserProps | {logged_in: boolean};
    categories: CategoryProps[];
    handleModal: (errors?: string | string[]) => void;
}
export interface DeleteCategoryProps {
    user: UserProps | {logged_in: boolean};
    categories: CategoryProps[];
    handleModal: (errors?: string | string[]) => void;
}

export interface FullPostProps {
    post: PostProps;
    expandPostOpen: boolean;
    handleClosePost: () => void;
    scroll: "body" | "paper" | undefined;
    user: UserProps | { logged_in: boolean };    
    handleModal: (errors?: string | string[]) => void;

}

export interface CategoryProps {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    posts: PostProps[];
}

export interface CategoryNewProps {
    name: string;
}

export interface CategoryEditProps {
    id: number;
    name: string;
}


export interface PostProps {
      id: number;   
      title: string;
      body: string;
      category_id: number;
      is_pinned: boolean;
      user_id: number;
      created_at: Date;
      updated_at: Date;
      author: string;
      category: string;
}

export interface PostNewProps {
    title: string;
    body: string;
    category_id: number;
    user_id: number;
}

export interface PostEditProps {
    postID: number;
    post: {
        title: string;
        body: string;
    }

}

export interface CommentNewProps {
    body: string;
    user_id: number;
    comment_id: number;
    post_id: number;
}

export interface CommentEditProps {
    body: string;
    id: number;
    user_id: number;
    post_id: number;
}

export interface CommentProps {
    id: number;
    body: string;
    user_id: number;
    comment_id: number;
    post_id: number;
    created_at: Date;
    updated_at: Date;
}
export interface ProfileProps {
    user: UserProps | { logged_in: boolean };

    handleModal: (errors?: string | string[]) => void;
    handleLogout: () => void;
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

export interface CategoryProps {
    user: UserProps | { logged_in: boolean };
    handleModal: (errors?: string | string[]) => void;
    handleLogout: () => void;
}
export class Category1 {
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
