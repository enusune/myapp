import React, {Component} from "react";
import {Layout} from 'antd'
import styles from "@/layouts/index.css";

const {Sider} = Layout;

class MySider extends Component {
    render() {
        const {collapsed, children} = this.props
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <div className={styles.logo}/>
                {children}
            </Sider>
        );
    }
}

export default MySider
