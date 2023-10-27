import {
    BrowserRouter, Route, Routes,
} from 'react-router-dom'

import Layout from './components/layouts/Index'

import Welcome from './pages/welcome'
import Login from './pages/Auth/login'
import Register from './pages/Auth/register'
import Authenticated from './middlewares/auth.middleware'
// import News from './page/News'
// import Page404 from './page/Page404'
// import Username from './middleware/Username'
// import Home from './page/Home'
// import Projects from './page/Projects'
// import Contacts from './page/Contacts'


export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>}/>
                <Route path="/panel" element={(
                    <Authenticated>
                        <Layout />
                    </Authenticated>
                )}>
                    <Route index element={<Welcome />} />
                    {/* <Route index element={<Home />} />
                    <Route path="/panel/api/news" element={<News />} />
                    <Route path="/panel/projects" element={<Projects />} />
                    <Route path="/panel/contact" element={<Contacts />} /> */}
                </Route> 
                {/* Not Found */}
                {/* <Route path="/404" element={<Page404 />} />
                <Route path="*" element={<Page404 />} /> */}
            </Routes>
        </BrowserRouter>
    )
}