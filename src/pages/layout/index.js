import React from 'react';
import Header from '@/components/Header';


class BasicLayout extends React.PureComponent {
    render() {
        const { children } = this.props;
        const { location: { pathname } } = children.props;
        const isShow = pathname.toString() === '/' ? false : true;
        return (
            <div className="container">
                <Header isShow={isShow} />
                {children}
            </div>
        );
    }
}
export default BasicLayout;