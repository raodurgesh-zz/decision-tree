import React, { Component } from 'react';
import SortableTree, {
  addNodeUnderParent,
  removeNodeAtPath,
  changeNodeAtPath,
  map,
} from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import NodeRendererDefault from './node-content-renderer';
import InterationMenu from './utils/interaction-menu';
import InterationBox from './utils/interaction-box';

const getNodeKey = ({ treeIndex }) => treeIndex;

export default class Tree extends Component {
  constructor(props) {
    super(props);

    this.addChildNode = this.addChildNode.bind(this);
    this.removeNode = this.removeNode.bind(this);
    this.changeTreeNode = this.changeTreeNode.bind(this);

    this.state = {
      treeData: [{ type: 'interaction-input' }],
      interationMenu: {
        coordinate: null,
        show: false,
      },
    };
  }

  addChildNode({ path, type }) {
    this.setState(state => ({
      treeData: addNodeUnderParent({
        treeData: state.treeData,
        parentKey: path[path.length - 1],
        expandParent: true,
        getNodeKey,
        newNode: {
          type,
        },
      }).treeData,
    }));
  }

  removeNode({ path }) {
    this.setState(state => ({
      treeData: removeNodeAtPath({
        treeData: state.treeData,
        path,
        getNodeKey,
      }),
    }));
  }

  changeTreeNode({ path, title, type }) {
    const treeData = changeNodeAtPath({
      treeData: this.state.treeData,
      path,
      getNodeKey,
      ignoreCollapsed: false,
      newNode: {
        title,
        type,
        id: title,
      },
    });

    this.setState({
      treeData,
    });
  }

  getEachNodeTitle() {
    let titles = [];
    const getTitle = nodeInfo => {
      const node = nodeInfo.node;
      if (node && node.title && node.id) {
        titles.push({ title: node.title, id: node.id });
      }
      return nodeInfo;
    };

    map({ treeData: this.state.treeData, getNodeKey, callback: getTitle });
    return titles.sort();
  }

  render() {
    const interationMenu = this.state.interationMenu;

    const InteractionInput = ({ node, path }) => (
      <InterationBox
        type="input"
        showRemoveButton={
          this.state.treeData[0] && this.state.treeData[0].title
        }
        removeNode={() => this.removeNode({ path })}
        setTitle={title =>
          this.changeTreeNode({ node, path, title, type: 'node' })
        }
      />
    );
    const InteractionDropdown = ({ node, path }) => (
      <InterationBox
        type="ddl"
        options={this.getEachNodeTitle()}
        showRemoveButton={true}
        removeNode={() => this.removeNode({ path })}
        setTitle={title =>
          this.changeTreeNode({ node, path, title, type: 'node' })
        }
      />
    );

    const renderNode = ({ node, path }) => {
      const type = (node && node.type) || '';
      switch (type) {
        case 'interaction-input':
          return InteractionInput({ node, path });
        case 'interaction-ddl':
          return InteractionDropdown({ node, path });
        default:
          return <div className="rst__rowTitle__inner">{node.title}</div>;
      }
    };

    const selectedInteraction = type => {
      this.addChildNode({ type, ...this.state.interationMenu.default });
    };

    const showInteractionMenu = ({ event, node, path }) => {
      const { clientX: left, clientY: top } = event;
      this.setState({
        interationMenu: {
          show: true,
          coordinate: { left, top },
          default: { node, path },
        },
      });
    };

    const hideInteractionMenu = () => {
      this.setState({ interationMenu: { show: false } });
    };

    return (
      <div>
        {interationMenu.show && (
          <InterationMenu
            coordinate={interationMenu.coordinate}
            hideInteractionMenu={hideInteractionMenu}
            selectedItem={selectedInteraction}
          />
        )}
        <div style={{ height: 400, margin: 50 }}>
          <div className="btn-wrap">
            <div className="start-btn">START</div>
            <div class="add-btn" />
          </div>
          <SortableTree
            treeData={this.state.treeData}
            rowHeight={100}
            isVirtualized={false}
            onChange={treeData => this.setState({ treeData })}
            theme={{ nodeContentRenderer: NodeRendererDefault }}
            generateNodeProps={({ node, path }) => ({
              title: renderNode({ node, path }),
              buttons: (() => {
                return node.type === 'node'
                  ? [
                      <div
                        className="rst__rowNodeAdd"
                        onClick={event =>
                          showInteractionMenu({ node, path, event })
                        }
                      />,
                      <div
                        className="rst__rowNodeDelete"
                        onClick={() => this.removeNode({ path })}
                      />,
                    ]
                  : [];
              })(),
            })}
          />
        </div>
      </div>
    );
  }
}
