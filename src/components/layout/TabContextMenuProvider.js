import React, {Component} from 'react'
import {contextMenu} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

class TabContextMenuProvider extends Component {

  handleEvent(e) {
    const {id, data, onContextMenuShow} = this.props
    onContextMenuShow(data)
    e.preventDefault();
    contextMenu.show({
      id: id,
      event: e,
      props: data
    });
  }

  render() {
    return (
      <span onContextMenu={this.handleEvent.bind(this)}>
        {this.props.children}
      </span>
    );
  }
}

export default TabContextMenuProvider
