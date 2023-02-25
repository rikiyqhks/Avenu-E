/* ↓React Imports ALL */
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* ↓Components Import ALL */
const Header = lazy(() => import('./components/Layouts/Header'));
const Footer = lazy(() => import('./components/Layouts/Footer'));
const Subheader = lazy(() => import('./components/Layouts/Subheader'));
const SearchBar = lazy(() => import('./components/Layouts/SearchBar'));
const ToTop = lazy(() => import('./utils/ToTop'));
const ScrollToTop = lazy(() => import('./utils/ScrollToTop'));
const Home = lazy(() => import('./components/Home'));
const Company = lazy(() => import('./components/Company'));
const Register = lazy(() => import('./components/Account/Register'));
const Login = lazy(() => import('./components/Account/Login'));
const ForgotPs = lazy(() => import('./components/Account/ForgotPs'));
const Profile = lazy(() => import('./components/Account/Profile'));
const EditProfile = lazy(() => import('./components/Account/EditProfile'));
const EditMetadata = lazy(() => import('./components/Account/EditMetadata'));
const Bookmarks = lazy(() => import('./components/Account/Bookmarks'));
const PostedDatas = lazy(() => import('./components/Account/PostedDatas'));
const ResetEmail = lazy(() => import('./components/Account/reset/Email'));
const ResetPassword = lazy(() => import('./components/Account/reset/Password'));
const SNS = lazy(() => import('./components/Account/reset/Sns'));
const Package = lazy(() => import('./components/Packages/Package'));
const PackagePost = lazy(() => import('./components/Packages/PackagePost'));
const PackageDetail = lazy(() => import('./components/Packages/PackageDetail'));
const Scrap = lazy(() => import('./components/Scraps/Scraps'));
const ScrapPost = lazy(() => import('./components/Scraps/ScrapPost'));
const ScrapDetail = lazy(() => import('./components/Scraps/ScrapDetail'));
const ScrapSearched = lazy(() => import('./components/Scraps/ScrapSearched'));
const Inquiry = lazy(() => import('./components/Inquiry/Inquiry'));
const InquiryManagementForm = lazy(() => import('./components/Inquiry/InquiryManagementForm'));
const InquiryConfirm = lazy(() => import('./components/Inquiry/InquiryConfirm'));
const InquiryThanks = lazy(() => import('./components/Inquiry/InquiryThanks'));
const Admin = lazy(() => import('./components/Admin'));
const Term = lazy(() => import('./components/Helps/Term'));
const Help = lazy(() => import('./components/Helps/Help'));
const Format = lazy(() => import('./components/Helps/Format'));
const Privacypolicy = lazy(() => import('./components/Helps/Privacypolicy'));

/* ↓Routing Settings */
export const Routers = (props) => {
    return (
        <Router>
            <Suspense>
                <Header user={props.user} />
                <Subheader user={props.user} />
                <SearchBar />
                <ToTop />
                <ScrollToTop />
                <Routes>
                    <Route path='/' element={<Home user={props.user} />}/>
                    <Route path='/company' element={<Company />}/>
                    <Route path='/register' element={<Register />}/>
                    <Route path='/login' element={<Login user={props.user} />}/>
                    <Route path='/password/reset' element={<ForgotPs user={props.user} />}/>
                    <Route path='/profile' element={<Profile user={props.user} />}/>
                    <Route path='/profile/edit' element={<EditProfile user={props.user} />}/>
                    <Route path='/profile/metadata' element={<EditMetadata user={props.user} />}/>
                    <Route path='/profile/metadata/bookmarks' element={<Bookmarks user={props.user} />}/>
                    <Route path='/profile/metadata/post-datas' element={<PostedDatas user={props.user} />}/>
                    <Route path='/profile/reset/email' element={<ResetEmail user={props.user} />}/>
                    <Route path='/profile/reset/sns' element={<SNS user={props.user} />}/>
                    <Route path='/profile/reset/password' element={<ResetPassword user={props.user} />}/>
                    <Route path='/package' element={<Package user={props.user} />}/>
                    <Route path='/package/post' element={<PackagePost user={props.user} />}/>
                    <Route path='/package/detail' element={<PackageDetail user={props.user} />}/>
                    <Route path='/scraps' element={<Scrap user={props.user} />}/>
                    <Route path='/scraps/post' element={<ScrapPost user={props.user} />}/>
                    <Route path='/scraps/detail' element={<ScrapDetail user={props.user} />}/>
                    <Route path='/scraps/result' element={<ScrapSearched user={props.user} />}/>
                    <Route path='/inquiry' element={<Inquiry user={props.user} />}/>
                    <Route path='/inquiry/confirm' element={<InquiryConfirm user={props.user} />}/>
                    <Route path='/inquiry/thanks' element={<InquiryThanks user={props.user} />}/>
                    <Route path='/admin' element={<Admin user={props.user} />}/>
                    <Route path='/term' element={<Term />}/>
                    <Route path='/privacypolicy' element={<Privacypolicy />}/>
                    <Route path='/help' element={<Help />}/>
                    <Route path='/help/format' element={<Format />}/>
                    <Route path='/admin/inquiry/list' element={<InquiryManagementForm user={props.user} />}/>
                </Routes>
                <Footer user={props.user} />
            </Suspense>
        </Router>
    );
};