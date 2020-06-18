import React from 'react';
import { ImageUrl } from '../../utils/index';
import './index.less';
class Hotlabels extends React.PureComponent {
    handelResult = (item) => {
        if (this.props.handelResult) {
            this.props.handelResult(item)
        }
    }
    onTitle = (title) => {
        sessionStorage.setItem('val', title);
        setTimeout(() => {
            window.location.href = '/list';
        }, 1000)
    }
    render() {
        const { datarouse } = this.props;
        const data = JSON.parse(datarouse[1]);
        return (
            <div className="lable-box">
                <h1 onClick={() => { this.onTitle(datarouse[0]) }}>{datarouse[0]}</h1>
                <div className="images-box">
                    {
                        data.map((item, index) => {
                            return (
                                <div className="special-img" key={item.elementId}>
                                    <img src={`${ImageUrl}/${item.elementId}.png`} onClick={() => { this.handelResult(item) }} onError={e => {
                                        e.target.src = `${ImageUrl}/wansili22,571.png`
                                    }} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}
export default Hotlabels;