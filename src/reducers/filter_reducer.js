import {
    LOAD_PRODUCTS,
    SET_LISTVIEW,
    SET_GRIDVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS:
            let maxPrice = Math.max(...(action.payload.map(p => p.price)))
            return {
                ...state,
                all_products: [...action.payload],
                filtered_products: [...action.payload],
                filters: {
                    ...state.filters,
                    max_price: maxPrice,
                    price: maxPrice,
                }
            }
        case SET_GRIDVIEW:
            return {
                ...state,
                grid_view: true,
            }
        case SET_LISTVIEW:
            return {
                ...state,
                grid_view: false,
            }
        case UPDATE_SORT:
            return {
                ...state,
                sort: action.payload
            }
        case SORT_PRODUCTS:
            const { sort, filtered_products } = state
            let tempProducts = [...filtered_products]
            if (sort === 'price-lowest') {
                tempProducts = tempProducts.sort((a, b) => a.price - b.price)
            }
            if (sort === 'price-highest') {
                tempProducts = tempProducts.sort((a, b) => b.price - a.price)
            }
            if (sort === 'name-a') {
                tempProducts = tempProducts.sort((a, b) => {
                    return a.name.localeCompare(b.name)
                })
            }
            if (sort === 'name-z') {
                tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name))
            }
            return {
                ...state,
                filtered_products: tempProducts
            }
        case UPDATE_FILTERS:
            const { name, value } = action.payload
            return {
                ...state, filters: { ...state.filters, [name]: value }
            }
        case CLEAR_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: '',
                    company: 'all',
                    category: 'all',
                    color: 'all',
                    price: state.filters.max_price,
                    shopping: false,
                }
            }
        case FILTER_PRODUCTS:
            const { all_products } = state
            const { text, category, company, color, price, shipping } = state.filters

            let tempAllProducts = [...all_products]

            if (text) {
                tempAllProducts = tempAllProducts.filter(product => product.name.toLowerCase().startsWith(text))
            }
            if (category !== 'all') {
                tempAllProducts = tempAllProducts.filter(product => product.category === category)
            }
            if (company !== 'all') {
                tempAllProducts = tempAllProducts.filter(product => product.company === company)
            }
            if (color !== 'all') {
                tempAllProducts = tempAllProducts.filter(product => {
                    return product.colors.find(c => c === color)
                })
            }
            tempAllProducts = tempAllProducts.filter(product => product.price <= price)
            if (shipping) {
                tempAllProducts = tempAllProducts.filter(product => product.shipping === true)
            }
            return { ...state, filtered_products: tempAllProducts }
        default:
            return { ...state }
    }
}

export default filter_reducer