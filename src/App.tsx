import { useState, useCallback, useEffect }  from 'react';
import './assets/css/App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Profile from './pages/Profile';
import MyPosts from './pages/MyPosts';
import Modal from './components/Miscellaneous/Modal';
import CategoryPage from './pages/CategoryPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { UserProps } from './App.types';
import { userLogout, userSignedIn } from './components/Miscellaneous/apiRequests';
import Cookies from 'js-cookie';
import AdminPanel from './pages/AdminPanel';

export function RefreshPage() {
    window.location.reload();
}

const App = () => {
    const [user, setUser] = useState({ logged_in: false });
    const [errors, setErrors] = useState<string|string[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleModal = useCallback((errors:string|string[] = []) => {
        setErrors(errors);
    }, [setErrors]);

    useEffect(() => {
        setShowModal(errors.length > 0);
      }, [errors]);

    const handleLogin = (user: UserProps) => {
        setUser(user);
        Cookies.set('token', user.token, { expires: 7, path: '/' })
    };

    const handleLogout = () => {
        userLogout()
          .then(response => {
            if ('errors' in response && !response.success) handleModal(response.errors);
            setUser({ logged_in: false });
          });
        Cookies.remove('token');
    };


    // Check if user is logged in
    useEffect(() => {
        userSignedIn()
        .then(response => {
            if ('user' in response && response.success) setUser(response.user);
            if ('errors' in response && !response.success) handleModal(response.errors);
            setLoading(false);
        });
    }, [handleModal]);

    return loading 
    ? <> </>
    : (
        <div>
        <Router>
            <Routes>
                {/* <Route index element={<SignIn handleModal={handleModal} handleLogin={handleLogin} />} /> */}
                <Route index element={<Home user={user} handleLogout={handleLogout} handleModal={handleModal} />} />
                <Route path='/MyPosts' element={<MyPosts user={user} handleModal={handleModal} handleLogout={handleLogout} />} />
                <Route path='/SignIn' element={<SignIn handleModal={handleModal} handleLogin={handleLogin} />} />
                <Route path='/SignUp' element={<SignUp handleModal={handleModal}/>} />
                <Route path="/users/:id" children element= {<Profile user={user} handleModal={handleModal} handleLogout={handleLogout}/>}/>
                <Route path='/:category' element= {<CategoryPage user={user} handleModal={handleModal} handleLogout={handleLogout} />} />
                <Route path='/admin' element = {<AdminPanel user={user} handleModal={handleModal} handleLogout={handleLogout}/>} />
                <Route path='*' element={<NoPage statusCode={404} />} />
            </Routes>
        </Router>
        
        {showModal && <Modal errors={errors} handleModal={handleModal} />}
        </div>
    );
    
}
export default App;








