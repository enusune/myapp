import React,{Component} from 'react'
import {Tabs} from 'antd';
import PropTypes from "prop-types";
import withRouter from 'umi/withRouter'


const TabPane = Tabs.TabPane;

class MyTab extends Component {

  componentWillMount(){
    const {panes, onPaneAdd,} = this.props
    if (panes.length === 1) {
      const pane = panes[0]
      onPaneAdd(pane)
    }
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  remove = (targetKey) => {
    const {onPaneRemove} = this.props
    onPaneRemove(targetKey)
  }

  render() {
    const {
      panes,
      activeKey,
      onPaneChange,
    } = this.props
    return (
      <div>
        <Tabs
          hideAdd
          onChange={onPaneChange.bind(this)}
          activeKey={activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
            {pane.content}
          </TabPane>)}
        </Tabs>
      </div>
    );
  }
}

MyTab.propTypes = {
  panes: PropTypes.array.isRequired,
  activeKey: PropTypes.string.isRequired,
  onPaneChange: PropTypes.func.isRequired,
}
export default withRouter(MyTab)
