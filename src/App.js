import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import path from './utils/path'
import {
  Home,
  Login,
  PublicPage,
  FAQ,
  Services,
  Blogs,
  DetailProduct,
  ProductPage,
  FinalRegister,
  ResetPwd
} from './pages/public'
import {
  AdminLayout,
  CreateProduct,
  DashBoard,
  ManagerOrder,
  ManagerProduct,
  ManagerUser
} from './pages/admin'
import { History, LayoutMember, Member, Mycart, WishList } from './pages/member'
import { getCategories } from './store/app/asyncAction';
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from './components'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren } = useSelector(state => state.app)
  useEffect(() => {
    dispatch(getCategories())
  }, [])
  return (
    <div className="font-main h-screen">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<PublicPage />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.OUR_SERVICES} element={<Services />} />
          <Route path={path.FAQS} element={<FAQ />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.PRODUCTS} element={<ProductPage />} />
          <Route path={path.DETAIL_PRODUCT_CATE_PID_TITLE} element={<DetailProduct />} />
          <Route path={path.RESET_PWD} element={<ResetPwd />} />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<DashBoard />} />
          <Route path={path.CREATE_PRODUCT} element={< CreateProduct />} />
          <Route path={path.MANAGE_ORDER} element={<ManagerOrder />} />
          <Route path={path.MANAGE_PRODUCT} element={<ManagerProduct />} />
          <Route path={path.MANAGE_USER} element={<ManagerUser />} />
        </Route>
        <Route path={path.MEMBER} element={<LayoutMember />}>
          <Route path={path.PERSONAL} element={<Member />} />
          <Route path={path.HISTORY} element={<History />} />
          <Route path={path.MY_CART} element={<Mycart />} />
          <Route path={path.WISH_LIST} element={<WishList />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
