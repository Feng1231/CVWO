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