import React, {Component} from 'react'
import {Card, Col, Row} from 'antd';
import UserList from './components/UserList'
import UserDetailsModal from './components/UserDetailsModal'
import WrappedUserSearchForm from './components/UserSearchForm'
import {connect} from 'dva';
import styles from './user.css'

class User extends Component {

    handleTableChange = (pagination, filters, sorter) => {

        const {userSearchFormParams} = this.props.user
        const pager = {...this.props.user.userList.pagination};
        pager.current = pagination.current;
        this.props.dispatch({
            type: 'user/updateState',
            payload: {userList: {pagination: pager,}},

        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
            ...userSearchFormParams,
        });
    };

    fetch = (params = {}) => {
        console.log('params:', params);
        this.props.dispatch({
            type: 'user/updateState',
            payload: {
                userList: {loading: true},
            }
        });
        this.props.dispatch({
            type: 'user/queryUserList',
            payload: {
                userList: {loading: true},
                params: {
                    method: 'get',
                    data: {
                        results: 100,
                        ...params
                    }
                }
            }
        });
    };

    onSearchFormChange = (params) => {
        this.props.dispatch(
            {
                type: 'user/updateState',
                payload: {
                    userSearchFormParams: {...params},
                }
            }
        )
    }

    onDetailsButtonClick = (user,) =>{
        this.props.dispatch({
            type: 'user/updateState',
            payload: {
                userDetail: {visible: true,data: {...user}},
            }
        })
    }
    onUserDetailsModalCancel = () => {
        this.props.dispatch({
            type: 'user/updateState',
            payload: {
                userDetail: {visible: false,},
            }
        })
    }

    render() {
        const {
            fetch,
            handleTableChange,
            onSearchFormChange,
            onDetailsButtonClick,
            onUserDetailsModalCancel
        } = this
        const userListProps = {
            fetch,
            handleTableChange,
            onDetailsButtonClick,
            ...this.props.user.userList
        }
        const searchFormProps = {
            fetch,
            onSearchFormChange
        }
        const detailProps = {
            onUserDetailsModalCancel,
            ...this.props.user.userDetail
        }
        return (
            <div className={styles.normal}>
                <Row gutter={18}>
                    <Col span={24}>
                        <Card title="用户列表" bordered={false} style={{background: '#FFFFFF'}}>
                            <WrappedUserSearchForm {...searchFormProps}/>
                            <UserList {...userListProps}/>
                        </Card>
                    </Col>
                </Row>
                <UserDetailsModal {...detailProps}/>
            </div>
        )
    }
}

export default connect((({user}) => ({user})))(User)
