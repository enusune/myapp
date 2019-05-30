import React,{Component} from 'react'
import { Modal, Descriptions, Avatar} from 'antd';

class UserDetailsModal extends Component {

    getUser = () => {
        const user = this.props.data
        if (user && user.dob) {
            return (
                <Descriptions bordered column={{ xs: 1, sm: 2, md: 2}}>
                    <Descriptions.Item label="用户名">{`${user.login.username}`}</Descriptions.Item>
                    <Descriptions.Item label="头像">
                        <Avatar shape="square" src={user.picture.medium}/>
                    </Descriptions.Item>
                    <Descriptions.Item label="真实姓名">{`${user.name.last} ${user.name.first}`}</Descriptions.Item>
                    <Descriptions.Item label="性别">{user.gender}</Descriptions.Item>
                    <Descriptions.Item span={2} label="电话">{user.phone}</Descriptions.Item>
                    <Descriptions.Item span={2} label="邮箱">{user.email}</Descriptions.Item>
                    <Descriptions.Item span={2} label="注册时间">{user.registered.date}</Descriptions.Item>
                    <Descriptions.Item span={2} label="地址">{`${user.location.city} ${user.location.street}`}</Descriptions.Item>
                    <Descriptions.Item span={2} label="出生日期">{user.dob.date}</Descriptions.Item>
                    <Descriptions.Item span={2} label="年龄">{user.dob.age}</Descriptions.Item>
                </Descriptions>
            )
        }else{
            return null
        }
    }

    render() {
        return (
            <div>
                <Modal
                    title="用户信息"
                    visible={this.props.visible}
                    onCancel={this.props.onUserDetailsModalCancel}
                    footer={null}
                >
                    {this.getUser()}
                </Modal>
            </div>
        );
    }
}

export default UserDetailsModal