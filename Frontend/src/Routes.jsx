import {
    BrowserRouter, Route, Routes,
} from 'react-router-dom'

import Layout from './components/layouts/Index'

import ItemUser from './pages/itemUser'
import Login from './pages/Auth/login'
import Register from './pages/Auth/register'
import Authenticated from './middlewares/auth.middleware'
import Index from './pages'
import Test from './pages/test'
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
                <Route path="" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>}/>
                <Route path="/panel" element={(
                    <Authenticated>
                        <Layout />
                    </Authenticated>
                )}>
                    <Route index element={<Index />} />
                    <Route path='/panel/item-user' element={<ItemUser />} />
                    <Route path='/panel/test' element={<Test />} />
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