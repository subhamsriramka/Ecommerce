import React from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import axios from 'axios'
import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE,
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
    isSidebarOpen: false,
    products_loading: true,
    products_error: false,
    products: [],
    featured_products: [],
    single_product_loading: true,
    single_product_error: false,
    single_product: {},
}

const ProductContext = React.createContext()

export const ProductsProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    const openSidebar = () => {
        dispatch({ type: SIDEBAR_OPEN })
    }

    const closeSidebar = () => {
        dispatch({ type: SIDEBAR_CLOSE })
    }

    const fetchProducts = async (url) => {
        dispatch({ type: GET_PRODUCTS_BEGIN })
        try {
            const response = await axios.get(url)
            const products = response.data
            dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
        } catch (error) {
            dispatch({ type: GET_PRODUCTS_ERROR })
        }
    }

    const fetchSingleProduct = async (url) => {
        dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
        try {
            const response = await axios.get(url)
            const singleProduct = response.data
            dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })
        } catch (error) {
            dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
        }
    }

    React.useEffect(() => {
        fetchProducts(url)
        // fetchSingleProduct(`https://course-api.com/react-store-single-product?id=recZkNf2kwmdBcqd0`)
    }, [])

    return (
        <ProductContext.Provider value={{
            ...state,
            openSidebar,
            closeSidebar,
            fetchSingleProduct
        }}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProductsContext = () => {
    return React.useContext(ProductContext)
}