
export const filterChange = (filter) => {
    return {
        type: 'CHANGE',
        payload: filter
    }
}

const filterReducer = (state = '', action) => {
    switch (action.type){
        case 'CHANGE': {
            return action.payload
        }
        default: return state
    }
}

export default filterReducer