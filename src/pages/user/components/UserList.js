import React, {Component} from 'react'
import {Table, Avatar, Button, Popconfirm, Tooltip} from 'antd';

class UserList extends Component {


    constructor() {
        super()
        this.state = {
            data: [],
            pagination: {},
            loading: false,
        }
    }

    componentDidMount() {
        this.props.fetch();
    }

    render() {

        const columns = [
            {
                title: '头像',
                dataIndex: 'picture',
                render: (picture, record, index) => <Avatar shape="square" src={picture.medium}/>
            },
            {
                title: '用户名',
                dataIndex: 'login',
                render: (login, record, index) => `${login.username}`
            },
            {
                title: '真实姓名',
                dataIndex: 'name',
                sorter: true,
                render: name => `${name.first} ${name.last}`,
                width: '20%',
            },
            {
                title: '性别',
                dataIndex: 'gender',
                render: gender => `${gender === 'male' ? '男' : '女'}`,
                filters: [{text: '男', value: 'male'}, {text: '女', value: 'female'}],
                width: '20%',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '操作',
                render: (text, record, index) => (
                    <div>
                        <Tooltip title="详细信息" placement="left">
                            <Button shape="circle" icon="search" onClick={()=>{this.props.onDetailsButtonClick(record)}}/>
                        </Tooltip>
                        <Tooltip title="编辑" placement="left">
                            <Button shape="circle" icon="edit"/>
                        </Tooltip>
                        <Popconfirm
                            title="确定删除"
                            okText="确定"
                            cancelText="取消"
                            placement="top">
                            <Tooltip title="删除" placement="left">
                                <Button shape="circle" icon="delete"/>
                            </Tooltip>
                        </Popconfirm>
                    </div>
                )
            }
        ];

        return (
            <div>
                <Table columns={columns}
                       rowKey={record => record.login.uuid}
                       dataSource={this.props.data}
                       pagination={this.props.pagination}
                       loading={this.props.loading}
                       onChange={this.props.handleTableChange}/>

            </div>
        )
    }
}

export default UserList
