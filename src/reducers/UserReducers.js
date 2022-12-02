export const userListReducer = (state = {users: []}, action) => {
    switch (action.type) {
        case 'USER_LIST_REQUEST':
            return { loading: true ,users: []}
        case 'USER_LIST_SUCCESS':
            return {loading: false , users: action.payload}
        case 'USER_LIST_FAIL':
            return {loading:false , error: action.payload}
        default:
            return state
    }
}
export const userSingleReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case 'USER_SINGLE_REQUEST':
            return { loading: true ,user: {}}
        case 'USER_SINGLE_SUCCESS':
            return {loading: false , user: action.payload}
        case 'USER_SINGLE_FAIL':
            return {loading:false , error: action.payload}
        default:
            return state
    }
}