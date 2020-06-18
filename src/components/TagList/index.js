import React from 'react';
import './index.less';

class TagList extends React.PureComponent {
    render() {
        const{total}=this.props;
        return (
            <div className="taglist-box">
                <span>
                {`"${sessionStorage.getItem('val')}"共${total}个结果`}
                </span>
                {/* <span>关键词</span> */}
                {/* <ul>
                    <li>爱情</li>
                    <li>花朵</li>
                </ul> */}
               
            </div>
        );
    }
}
export default TagList;