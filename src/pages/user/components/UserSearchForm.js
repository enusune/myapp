import React from 'react'
import {Form, Row, Col, Input, Button, Icon, Select,} from 'antd';

const {Option} = Select;

class UserSearchForm extends React.Component {

    constructor() {
        super()
        this.state = {
            expand: false,
        };
    }

    // 生成查询表单
    getFields() {
        const count = this.state.expand ? 10 : 6;
        const {getFieldDecorator} = this.props.form;
        const children = [];
        for (let i = 0; i < 10; i++) {
            const itemObj = this.getItemObject(i)
            children.push(
                <Col span={8} key={i} style={{display: i < count ? 'block' : 'none'}}>
                    <Form.Item label={itemObj.label}>
                        {getFieldDecorator(itemObj.name, {
                            rules: [
                                {
                                    required: itemObj.required,
                                    message: itemObj.message,
                                },
                            ],
                        })(this.getItemElement(i, itemObj.placeholder))}
                    </Form.Item>
                </Col>,
            );
        }
        return children;
    }

    //提交搜索表单触发的函数
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log(err)
                return
            }
            console.log('Received values of form: ', values);
            let params = {}
            for (let key in values) {
                if (values[key]) {
                    params[key] = values[key]
                }
            }
            this.props.fetch(params)
            this.props.onSearchFormChange(params)
        });
    };

    //判断表单输入元素
    getItemElement = (index, placeholder) => {
        let element = <Input placeholder={placeholder}/>
        switch (index) {
            case 1:
                element = (<Select placeholder={placeholder}>
                    <Option value={"male"}>男</Option>
                    <Option value={"female"}>女</Option>
                </Select>)
                break;
            default:
        }
        return element
    }

    //表单各个item的具体信息
    getItemObject = (index) => {
        let res = {
            label: "",
            name: "",
            placeholder: "",
            message: "",
            required: false
        };
        switch (index) {
            case 0:
                res.label = "用户名称";
                res.name = "username";
                res.placeholder = "请输入用户名称";
                res.message = "必须输入用户名称";
                res.required = false;
                break;
            case 1:
                res.label = "性 别";
                res.name = "gender";
                res.placeholder = "请选择用户性别";
                res.message = "必须输入性别";
                res.required = false;
                break;
            case 2:
                res.label = "用户名称";
                res.name = "username2";
                res.placeholder = "请输入用户名称";
                res.message = "必须输入用户名称";
                res.required = true;
                break;
            case 3:
                res.label = "用户名称";
                res.name = "username3";
                res.placeholder = "请输入用户名称";
                res.message = "必须输入用户名称";
                res.required = false;
                break;
            case 4:
                res.label = "用户名称";
                res.name = "username4";
                res.placeholder = "请输入用户名称";
                res.message = "必须输入用户名称";
                res.required = false;
                break;
            case 5:
                res.label = "用户名称";
                res.name = "username5";
                res.placeholder = "请输入用户名称";
                res.message = "必须输入用户名称";
                res.required = false;
                break;
            case 6:
                res.label = "用户名称";
                res.name = "username6";
                res.placeholder = "请输入用户名称";
                res.message = "必须输入用户名称";
                res.required = false;
                break;
            case 7:
                res.label = "用户名称";
                res.name = "username7";
                res.placeholder = "请输入用户名称";
                res.message = "必须输入用户名称";
                res.required = false;
                break;
            case 8:
                res.label = "用户名称";
                res.name = "username8";
                res.placeholder = "请输入用户名称";
                res.message = "必须输入用户名称";
                res.required = false;
                break;
            case 9:
                res.label = "用户名称";
                res.name = "username9";
                res.placeholder = "请输入用户名称";
                res.message = "必须输入用户名称";
                res.required = false;
                break;
            default:
                res = undefined
        }
        return res;
    }


    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
        this.props.fetch()
        this.props.onSearchFormChange({})
    };

    //展开函数
    toggle = () => {
        const {expand} = this.state;
        this.setState({expand: !expand});
    };

    render() {
        return (
            <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                <Row gutter={24}>{this.getFields()}</Row>
                <Row>
                    <Col span={24} style={{textAlign: 'right'}}>
                        <Button type="primary" htmlType="submit">
                            搜索
                        </Button>
                        <Button style={{marginLeft: 8}} onClick={this.handleReset}>
                            重置
                        </Button>
                        <span style={{marginLeft: 8, fontSize: 12, color: "#1890ff", cursor: "pointer"}}
                              onClick={this.toggle}>
              {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'}/>
            </span>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const WrappedUserSearchForm = Form.create({name: 'advanced_search'})(UserSearchForm);
export default WrappedUserSearchForm
