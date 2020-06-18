import React from 'react';
import { Table, Checkbox, Button } from 'antd';
import TagList from '@/components/TagList';
import http from '../../utils/http';
import helper from '../../utils/helper';
import { downAttendanceList, ImageUrl, Download } from '../../utils/index';
import './list.less';
function initData(data) {
    const newData = data.map((item) => {
        item.key = item.elementId;
        return item;
    });
    return newData;
}
class List extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            pageSize: 20,
            pageNumber: 1,
            TraceId: 'TestNLU',
            Text: !sessionStorage.getItem('val') ? "" : sessionStorage.getItem('val'),
            listdata: [],
            disabled: false,
            loading: true,
            PageList: [],
            checked: false,
            emptyText:' '
            
        };
    }
    componentDidMount() {
        this.getPatternsearcQuery()
    }
    onSelectChange = (selectedRowKeys) => {
        const { PageList } = this.state;
        console.log('listdata.length ', PageList.length)
        this.setState({
            selectedRowKeys,
            checked: selectedRowKeys.length === PageList.length ? true : false
        });
    };
    onChangepage = (page) => {
        this.setState({
            pageNumber: page,
            checked: false,
            selectedRowKeys: []
        })
    }
    handelAll = async () => {
        const { selectedRowKeys, checked, pageSize, pageNumber, PageList, listdata = [] } = this.state;
        const data = listdata.slice(Number((pageNumber - 1) * 20), Number(pageNumber * pageSize));
        this.setState({
            checked: !checked,
            PageList: data || [],
        });
        if (data.length === selectedRowKeys.length) {
            this.handleRowSelectChange([]);
        } else {
            const index = [];
            data.forEach(item => {
                index.push(item.elementId)
            });
            this.handleRowSelectChange(index)
        }

    }
    handleRowSelectChange = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys: selectedRowKeys,
        });

    }
    handelDetails = (item) => {
        sessionStorage.setItem('datalis', JSON.stringify(item));
        setTimeout(() => {
            window.open("/details");
        }, 1000)
    }
    onDownLoad = () => {
        const { selectedRowKeys } = this.state;
        if (selectedRowKeys.length > 0) {
            if (selectedRowKeys.length > 1) {
                Download(this.state.selectedRowKeys)
            } else {
                downAttendanceList(this.state.selectedRowKeys, true);
            }
        }else{
            helper.error('出错啦,您未选中下载素材！！！','请选择您想要下载的素材')
        }
    }
    getPatternsearcQuery = async () => {
        const { TraceId, Text } = this.state;
        try {
            const listdata = await http(`/patternsearch/query`, { method: 'post', data: { TraceId, Text } });
            // 图片预加载
            await listdata.forEach(item => {
                if (item.elementId) {
                    helper.preloadImage(`${ImageUrl}/${item.elementId}.png`);
                }
            })
            this.setState({
                listdata: listdata || [],
                PageList: listdata.slice(0, 20) || [],
                disabled: listdata.length < 1 ? true : false,
                loading: false,
                emptyText: '',
            })

        } catch (error) {
            this.setState({
                disabled: true,
                listdata: [],
                loading: false,
                emptyText: '暂时没有相关结果，请尝试其他灵感',
            })
        }
    }
    render() {
        const { selectedRowKeys, pageNumber, pageSize, listdata, disabled, PageList, checked,emptyText } = this.state;
        const total = listdata.length;
        const columns = [
            {
                title: '',
                dataIndex: 'elementId',
                width: '100%',
                align: 'center',
                textWrap: 'word-break',
                render: (text, record) => {
                    return (
                        <div className='list-img' onClick={() => { this.handelDetails(record) }}>
                            <img src={`${ImageUrl}/${record.elementId}.png`} onError={e => {
                                e.target.src = `${ImageUrl}/wansili22,571.png`
                            }} />
                        </div>)
                },
            }
        ];
        const pagination = {
            total: total,
            pageSize: pageSize,
            pageNumber: pageNumber,
            showSizeChanger: false,
            current: pageNumber,
            onChange: this.onChangepage
        }
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div className='clearBoth'>
                <TagList total={total} />
                <div className="container-center">
                    <div className="result-box">
                        <Checkbox onChange={(e) => { this.handelAll() }} className="choose-all" disabled={disabled} checked={checked}>全选</Checkbox>
                        <Button className='choose-all download' onClick={this.onDownLoad} disabled={disabled}>{`(${selectedRowKeys.length})下载`}</Button>
                        <div className="table-box">
                            <Table
                                 locale={{emptyText:emptyText}}
                                columns={columns}
                                showHeader={false}
                                bordered={false}
                                dataSource={initData(listdata)}
                                rowSelection={rowSelection}
                                pagination={pagination}
                                loading={this.state.loading}
                            />
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}
export default List;