const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    PRODUCTS: ':category',
    DETAIL_PRODUCT_CATE_PID_TITLE: ':category/:pid/:title',
    BLOGS: 'blogs',
    OUR_SERVICES: 'services',
    FAQS: 'faqs',
    FINAL_REGISTER: 'final-register/:status',
    RESET_PWD: 'reset-password/:token',


    //Admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGE_USER: 'manager-user',
    MANAGE_PRODUCT: 'manage-product',
    MANAGE_ORDER: 'manage-order',
    CREATE_PRODUCT: 'create-product',

    //Member
    MEMBER: 'member',
    PERSONAL: 'personal',
    MY_CART: 'my-cart',
    WISH_LIST: 'wish-list',
    HISTORY: 'history',
    DETAIL_CART: 'detail-cart',
    CHECK_OUT: 'check-out'
}

export default path