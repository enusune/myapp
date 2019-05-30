import React, {Component} from "react";
import {Layout} from "antd/lib/index";

const {Content} = Layout;

class MyContent extends Component {
    render() {
        return (
            <Content>
                {this.props.children}
            </Content>
        );
    }
}

export default MyContent
