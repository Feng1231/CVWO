import { RefreshPage } from "../App";
import { SignInProps, SignUpProps } from "../App.types";



export function checkValidPostCreation(data: FormData) {
    const title = data.get('title');
    const body = data.get('body');
    if (title && body) {
        alert('ok!');
        RefreshPage();
        //need to connect to DB
        
    } else {
        alert('input post/content');
    }
}

export function checkValidPasswordEdit(data: FormData) {
    const oldPassword = data.get('oldPassword');
    const newPassword = data.get('newPassword');
    const confirmPassword = data.get('confirmPassword');

    if (oldPassword && newPassword && confirmPassword) {
        if (oldPassword === '123c') {
            //connect to db
            if (oldPassword === newPassword) {
                alert("Please ensure new password keyed in is not the same as old password");
            }
            else if (newPassword === confirmPassword) {
                alert("password changed! Please log in again.");
                document.location.href='/SignIn';
            } else {
                alert("Please ensure new passwords keyed in are identical");
            }
        } else {
            alert("incorrect old password");
        }
    } else {
        alert("please fill in all input fields");
    }
}