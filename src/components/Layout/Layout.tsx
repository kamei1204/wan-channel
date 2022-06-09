import React from 'react'
import Navbar from '../Navbar/Navbar'

type Props = {
    children:any
}

const Layout:React.FC<Props> = ({children}) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    )
}

export default Layout
        