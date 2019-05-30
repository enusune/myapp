import React, {Component} from 'react'
import {Table,} from 'antd';

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
                title: '姓名',
                dataIndex: 'name',
                sorter: true,
                render: name => `${name.first} ${name.last}`,
                width: '20%',
            },
            {
                title: '性别',
                dataIndex: 'gender',
                filters: [{text: 'Male', value: 'male'}, {text: 'Female', value: 'female'}],
                width: '20%',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
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
