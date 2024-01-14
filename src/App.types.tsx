// Types declarations

// misc props
export interface AppProps{
    title?: string;
}

export interface ModalProps {
    errors: string | string[];
    handleModal: (errors?: string | string[]) => void;
}

// backend data props //////////////////////////////////////////////////////////////////////////////////////////
export interface UserProps {
    id: number;
    username: string;
    token: string;
    admin_level: number;
    logged_in: boolean;
}

export interface CategoryOnlyProps {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export interface CategoryProps extends CategoryOnlyProps{
    posts: PostProps[];
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

export interface CommentProps {
    id: number;
    body: string;
    user_id: number;
    comment_id: number;
    post_id: number;
    created_at: Date;
    updated_at: Date;
    author: string;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Pages Props ////////////////////////////////////////////////////////////////////////////////////////////////
export interface AdminPanelProps {
    user: UserProps | {logged_in: boolean};
    handleModal: (errors?: string | string[]) => void;
    handleLogout: () => void;

}

export interface CategoryPageProps {
    user: UserProps | { logged_in: boolean };
    handleModal: (errors?: string | string[]) => void;
    handleLogout: () => void;
}

export interface HomeProps {
    user: UserProps | {logged_in: boolean};
    handleLogout: () => void;
    handleModal: (errors?: string | string[]) => void;
}

export interface MyPostsProps {
    user: UserProps | { logged_in: boolean };
    handleModal: (errors?: string | string[]) => void;
    handleLogout: () => void;

}

export interface NoPageProps {
    statusCode: number;
}

export interface ProfileProps {
    user: UserProps | { logged_in: boolean };
    handleModal: (errors?: string | string[]) => void;
    handleLogout: () => void;
}

export interface SignInProps {
    handleModal: (errors?: string | string[]) => void;
    handleLogin: (user: UserProps) => void;
}

export interface SignUpProps {
    handleModal: (errors?: string | string[]) => void;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface UserSignInProps {
    username: string,
    password: string
}

export interface UserSignUpProps extends UserSignInProps {
    password_confirmation: string;
}

// Components Props ///////////////////////////////////////////////////////////////////////////////////////////

    // Forum Components ///////////////////////
    export interface PrimarySearchAppBarProps {
        user: UserProps | {logged_in: boolean};
        categories: CategoryProps[];
        handleLogout: () => void;
        handleModal: (errors?: string | string[]) => void;
        handleSearchPost: (search:string) => void;

    }

    export interface MenuListCompositionProps {
        user: UserProps | {logged_in: boolean};
        categories: CategoryProps[];
        handleModal: (errors?: string | string[]) => void;
    }
    ///////////////////////////////////////////

    // Profile components//////////////////////
    export interface ProfilePageAppBarProps {
        user: UserProps | {logged_in: boolean};
        handleLogout: () => void;

    }

    export interface ProfilePageBodyProps {
        user: UserProps | {logged_in: boolean};
        handleModal: (errors?: string | string[]) => void;
        handleLogout: () => void;

    }
    ///////////////////////////////////////////

    // Post components ////////////////////////
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

    export interface FullPostProps {
        post: PostProps;
        expandPostOpen: boolean;
        handleClosePost: () => void;
        scroll: "body" | "paper" | undefined;
        user: UserProps | { logged_in: boolean };    
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
    ///////////////////////////////////////////

    // Comment components props ///////////////
    export interface AddCommentProps {
        user: UserProps | {logged_in: boolean};
        postID: number;
        handleModal: (errors?: string | string[]) => void;
        commentID?: number;
    }

    export interface EditCommentProps {
        user: UserProps | {logged_in: boolean};
        postID: number;
        handleModal: (errors?: string | string[]) => void;
        comment: CommentProps;

    }
    export interface CommentSectionProps {
        user: UserProps | {logged_in: boolean};
        post: PostProps;
        comments: CommentProps[];
        handleModal: (errors?: string | string[]) => void;
    }

    export interface CommentDisplayProps {
        key: number
        user: UserProps | {logged_in: boolean};
        comments: CommentProps[];
        comment: CommentProps;
        handleModal: (errors?: string | string[]) => void;
    }
    ///////////////////////////////////////////

    // Category component props ///////////////

    export interface AddCategoryProps {
        user: UserProps | {logged_in: boolean};
        handleModal: (errors?: string | string[]) => void;

    }

    export interface RenameCategoryProps {
        user: UserProps | {logged_in: boolean};
        categories: CategoryOnlyProps[];
        handleModal: (errors?: string | string[]) => void;
    }
    export interface DeleteCategoryProps {
        user: UserProps | {logged_in: boolean};
        categories: CategoryOnlyProps[];
        handleModal: (errors?: string | string[]) => void;
    }
    //////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////



// apiRequests functions type /////////////////////////////////////////////////////////////////////////////////
export interface CategoryNewProps {
    name: string;
}

export interface CategoryEditProps {
    id: number;
    name: string;
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
    comment_id?: number;
    post_id: number;
}

export interface CommentEditProps {
    body: string;
    id: number;
    user_id: number;
    post_id: number;
}

export interface changePasswordProps {
    old_password: string;
    password: string;
    password_confirmation: string;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////


