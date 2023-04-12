import React from 'react'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { links } from '../utils/constants'
import styled from 'styled-components'
import CartButtons from './CartButtons'
import { useProductsContext } from '../context/products_context'
import { useUserContext } from '../context/user_context'

const Sidebar = () => {
    const { isSidebarOpen, closeSidebar } = useProductsContext()
    const { myUser } = useUserContext()

    return (
        <SidebarContainer>
            <aside className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>
                <div className="sidebar-header">
                    <img src={logo} alt="comfy sloth" className='logo' />
                    <button className="close-btn"
                        onClick={closeSidebar}>
                        <FaTimes />
                    </button>
                </div>
                <ul className="links">
                    {links.map(({ id, text, url }) => {
                        return (
                            <li key={id}>
                                <Link to={url} onClick={closeSidebar}>{text}</Link>
                            </li>
                        )
                    })}
                    {/* dont think a separate checkout menu is necessary */}
                    {myUser && (
                        <li>
                            <Link to='/checkout' onClick={closeSidebar}>checkout</Link>
                        </li>
                    )}
                </ul>
                <CartButtons />
            </aside>
        </SidebarContainer>
    )
}

const SidebarContainer = styled.div`
    text-align: center;
    .sidebar{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--clr-white);
        transition: var(--transition);
        transform: translate(-100%);
        z-index: -1;
    }
    .show-sidebar{
        transform: translate(0);
        z-index: 999;
    }
    .sidebar-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
    }
    .close-btn{
        font-size: 1.5rem;
        background: transparent;
        border-color: transparent;
        color: var(--clr-red-dark);
        transition: var(--transition);
        cursor: pointer;
        margin-top: 0.2rem;
    }
    .close-btn:hover{
        color: var(--clr-red-light);
    }
    .logo{
        justify-self: center;
        height: 45px;
    }
    .links{
        margin-top: 2rem;
    }
    .links a{
        display: block;
        text-align: left;
        font-size: 1rem;
        text-transform: capitalize;
        padding: 1rem 1.5rem;
        color: var(--clr-grey-3);
        transition: var(--transition);
        letter-spacing: var(--spacing);
    }
    .links a:hover{
        padding: 1rem 1.5rem;
        padding-left: 2rem;
        background: var(--clr-grey-10);
        color: var(--clr-grey-2);
    }
    .cart-btn-wrapper{
        display:grid;
        grid-template-columns: 1fr;
        width: 100%;
        .cart-btn, .auth-btn{
            padding: 1rem 1.5rem;
            transition: var(--transition);
        }
        .cart-btn:hover, .auth-btn:hover{
            padding-left: 2rem;
            background: var(--clr-grey-10);
            color: var(--clr-grey-2);
        }
    }
    @media screen and (min-width: 992px){
        .sidebar{
            display: none;
        }
    }
`

export default Sidebar