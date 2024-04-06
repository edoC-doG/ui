import icons from "./icons";
import path from "./path";

export const navigation = [
    {
        id: 4,
        value: 'HOME',
        path: `/${path.HOME}`
    },
    {
        id: 1,
        value: 'PRODUCTS',
        path: `/${path.PRODUCTS}`
    },
    {
        id: 2,
        value: 'BLOGS',
        path: `/${path.BLOGS}`
    },
    {
        id: 3,
        value: 'OUR SERVICES',
        path: `/${path.OUR_SERVICES}`
    },
    {
        id: 5,
        value: 'FAQS',
        path: `/${path.FAQS}`
    },
]

const { RiTruckFill, BsShieldShaded, BsReplyFill, FaTty, AiFillGift, HiHome, MdGroups, LiaSitemapSolid } = icons

export const prodExtraInf = [
    {
        id: 1,
        title: 'Guarantee',
        sub: 'Quality Checked',
        icons: <BsShieldShaded />
    },
    {
        id: 2,
        title: 'Free Shipping',
        sub: 'Free On All Products',
        icons: <RiTruckFill />
    },
    {
        id: 3,
        title: 'Special Gift Cards',
        sub: 'Special Gift Cards',
        icons: <AiFillGift />
    }, {
        id: 4,
        title: 'Free Return',
        sub: 'Within 7 Days',
        icons: <BsReplyFill />
    }, {
        id: 5,
        title: 'Consultancy',
        sub: 'Lifetime 24/7/356',
        icons: <FaTty />
    }
]

export const tabsProd = [
    {
        id: 1, name: 'DESCRIPTION', content: `Processor: Intel, Core i7 Skylake
    Memory: DDR4 4 GB
    Display: 15.6" - 1366x768
    Graphic: NVIDIA® GeForce® 940M, 4 GB
    Storage: HDD, 1 TB
    Camera: 1 MP
    Networking: 802.11 b/g/n
    Battery: Li-Ion 2 cell
    Dimensions: 383 x 243 x 22.5 cmM
    Weight: 2 kg` },
    {
        id: 2, name: 'WARRANTY', content: `WARRANTY INFORMATION
        LIMITED WARRANTIES
        Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:
        
        Frames Used In Upholstered and Leather Products
        Limited Lifetime Warranty
        A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.` },
    {
        id: 3, name: 'DELIVERY', content: `PURCHASING & DELIVERY
        Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
        Picking up at the store
        Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
        Delivery
        Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
        In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.` },
    {
        id: 4, name: 'PAYMENT', content: `PURCHASING & DELIVERY
    Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
    Picking up at the store
    Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
    Delivery
    In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`},
]

export const colors = [
    'black',
    'down',
    'gray',
    'white',
    'yellow',
    'orange',
    'purple',
    'green',
    'blue'
]

export const sorts = [
    {
        id: 1,
        value: '',
        text: 'Featured'
    },
    {
        id: 2,
        value: '-sold',
        text: 'Best Selling'
    },
    {
        id: 3,
        value: '-title',
        text: 'Alphabetically, A-Z'
    },
    {
        id: 4,
        value: 'title',
        text: 'Alphabetically, Z-A'
    },
    {
        id: 5,
        value: '-price',
        text: 'Price, high to low'
    },
    {
        id: 6,
        value: 'price',
        text: 'Price, low to high'
    },
    {
        id: 7,
        value: '-createdAt',
        text: 'Date, new to old'
    },
    {
        id: 8,
        value: 'createdAt',
        text: 'Date, old to new'
    },
]

export const voteOption = [
    {
        id: 1,
        text: 'Terrible'
    },
    {
        id: 2,
        text: 'Bad'
    },
    {
        id: 3,
        text: 'Neutral'
    },
    {
        id: 4,
        text: 'Good'
    },
    {
        id: 5,
        text: 'Perfect'
    },
]

export const sideBarAdmin = [
    {
        id: 1,
        type: 'SINGLE',
        text: 'Dashboard',
        path: `/${path.ADMIN}/${path.DASHBOARD}`,
        icons: <HiHome />
    },
    {
        id: 2,
        type: 'SINGLE',
        text: 'Manage users',
        path: `/${path.ADMIN}/${path.MANAGE_USER}`,
        icons: <MdGroups />
    },
    {
        id: 3,
        type: 'PARENT',
        text: 'Manager products',
        icons: <MdGroups />,
        submenu: [
            {
                text: 'Create Products',
                path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`,
            },
            {
                text: 'Manage Products',
                path: `/${path.ADMIN}/${path.MANAGE_PRODUCT}`,
            },

        ]
    },
    {
        id: 4,
        type: 'SINGLE',
        text: 'Manage orders',
        path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
        icons: <LiaSitemapSolid />
    },

]

export const roleList = [
    {
        code: 2000,
        value: 'Admin'
    },
    {
        code: 2003,
        value: 'User'
    }
]

export const blockStatus = [
    {
        code: true,
        value: 'Blocked'
    },
    {
        code: false,
        value: 'Active'
    }
]