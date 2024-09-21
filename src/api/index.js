// export const main = 'http://127.0.0.1:8000/'
// export const main = 'https://scrs-mgkb.onrender.com/'
// export const main = 'https://scrss.onrender.com/'
export const main = 'http://scrs.superquizgame.com/'

const url = `${main}api/`;

export const API = {
    ADMIN: {
        LOGIN: url+'admin/login',
        LOGOUT: url+"admin/logout",
        ADDSPONSER: url+'admin/add-sponser',
        EDITSPONSER: url+'admin/edit-sponser/',
        DELETESPONSER: url+'admin/delete-sponser/',
        GETSPONSERS: url+'admin/sponsers'
    },
    ACCOUNT: {
        GETALL: url+'accounts/all',
        GETALLTABLES: url+'accounts/tables',
        GETACCOUNTTABLES: url+"accounts/tables/",
        GETACCOUNT: url+"accounts/",
        GETACCID: url+"accounts/get-accountId/",
        LOGIN: url+"accounts/login",
        LOGOUT: url+"accounts/logout",
        ADD: url+"accounts/",
        UPDATE: url+"accounts/update/",
        UPDATEBYOWNER: url+'accounts/update-by-owner',
        DELETE: url+"accounts/",
        ACTIVATE: url+"accounts/activate/",
        DESACTIVATE: url+"accounts/desactivate/",
        GETINFO: url+"accounts/info",
        GETBYTOKEN: url+"accounts/token/",
        STATEOWNER: url+'accounts/state',
        STATEUSER: url+'accounts/state/',
        FIXEDORDER: url+'accounts/add-fixed-order',
        GETFIXEDORDER: url+'accounts/get-fixed-order'
    },
    UPLOAD: {
        LOGO: url+"uploads/logo",
        PRODUCT: url+"uploads/products"
    },
    SECTION: {
        GETALL: url+'sections/',
        GETALLTOOWNER: url+'sections/to-owner/',
        GETONE: url+'sections/',
        ADD: url+'sections/',
        UPDATE: url+'sections/',
        DELETE: url+'sections/',
    },
    PRODUCT: {
        GETALL: url+'products/',
        GETALLTOOWNER: url+'products/to-owner/',
        GETONE: url+'products/',
        ADD: url+'products/',
        UPDATE: url+'products/',
        DELETE: url+'products/',
    },
    ORDER: {
        GETALL: url+'orders/',
        GETSTATISTICS: url+'orders/statistics',
        GETONE: url+'orders/',
        GETONECART: url+'orders/cart/',
        GETCARTS: url+'orders/carts/',
        ADD: url+'orders/',
        ADDTOCART: url+'orders/add-to-cart/',
        CHANGETIME: url+'orders/change-time/',
        UPDATE: url+'orders/',
        DELETE: url+'orders/',
        DELETECART: url+'orders/cart/',
        DETAILSSTATISTICS: url+'orders/details-statistics',
        TOTALPRICE: url+'orders/total-price',
        READ: url+'orders/read/',
        ALLCARTSBYPAGE: url+'orders/carts-by-page/',
        GETCHECKOUTOFTABLE: url+'orders/all-data-by-table/',
        RESETSTATISTICS: url+'orders/reset',
        READALLCARTS: url+'orders/read-all/',
        DELETEALL: url+'orders/all'
    },
    MESSAGES: {
        GETALL: url+'messages/',
        GETONE: url+'messages/',
        GETCARTS: url+'messages/carts',
        ADDCOMIC: url+'messages/comec/',
        ADDCHECK: url+'messages/check/',
        READ: url+'messages/read/',
        READALL: url+'messages/read-all/',
        DELETE: url+'messages/',
    },
    SERVICES: {
        GETALL: url+'services/',
        GETONE: url+'services/',
        GETACCOUNTS: url+'services/accounts',
        ADD: url+'services/',
        UPDATE: url+'services/',
        ADDACCOUNTS: url+'services/add-accounts/',
        DELETE: url+'services/',
        SHOWACCOUNTS: url+'services/show-accounts/',
        REMOVEACCOUNT: url+'services/remove-accounts/'
    },
    USERS: {
        GETONE: url+'users/',
        GETALL: url+'users/',
        RESET: url+'users/table/',
        ADD: url+'users/token/',
        STATE: url+'users/state-of-user',
        DELETE: url+'users/'
    },
    TOKEN: {
        SAVE: url+'accounts/tokens/save',
        SEND: url+'accounts/tokens/send'
    }
}