import { AppProps } from '../../App.types'
import { FC } from 'react';
const Header: FC<AppProps> = ({ title }) => {
    return (
    <>
        <title>{ title }</title>
    </>
    )
}

export default Header;