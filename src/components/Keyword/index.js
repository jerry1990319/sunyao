import React from 'react';
import './index.less';
class Keyword extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: Object.entries(props.data),
      clicked: false,
      choose: 0,
      isShow: false,
      categoryBox: 100
    };
  }
  componentDidMount() {
    const { list } = this.state;
    const data = [];
    list.map((item, index) => {
      data.push(
        {
          key: index,
          ...item
        }
      )
      return data;
    })
    this.setState({
      list: data
    });
    const categoryBox = document.getElementById('categoryBox').offsetWidth;
    this.setState({
      categoryBox
    })
  }
  getDetails = async (item) => {
    await sessionStorage.setItem('val', item);
    window.location.href = "/list";
  }
  handeSeeMore = (key, index) => {
    const { clicked } = this.state;
    this.setState({
      clicked: !clicked,
      choose: index
    });
  }
  render() {
    const { clicked, choose, list, categoryBox } = this.state;
    return (
      <ul>
        {
          list.map((item, index) => {
            return (
              <li className='category-box'>
                <span className="details-category">{item[0]}</span>
                <li className='category-list' style={{ height: choose === item.key && clicked ? "auto" : "40px" }}>
                  {
                    item[1].map((item) => {
                      return (
                        <span className="category-text" id="categoryList" onClick={(e) => this.getDetails(item)}>{item}</span>
                      )
                    })
                  }
                  {
                    Number(item[1].length * 100) > Number(categoryBox) ? (<span className={choose === item.key && clicked ? "packup" : "more"} onClick={() => this.handeSeeMore(item.key, index)} />) : null
                  }
                </li>
              </li>
            )
          })
        }
      </ul>
    );
  }
}
export default Keyword;