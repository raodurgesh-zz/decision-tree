import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import NodeRendererDefault from './node-content-renderer';
import treeNodeRenderer from './tree-node-renderer';
import './App.css';

const getNodeKey = ({ treeIndex }) => treeIndex;

export default class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [
        {
          type: 'node',
          id: 'root node',
          title: 'root node',
          children: [
            {
              type: 'node',
              id: 'root node111',
              title: 'childen 122',
              children: [
                {
                  type: 'node',
                  id: 'root node112',
                  title: 'childen 333',
                  children: [],
                },
                {
                  type: 'node',
                  id: 'root node113',
                  title: 'childen 444',
                  children: [],
                },
              ],
            },
            {
              type: 'node',
              id: 'root node114',
              title: 'childen 5555',
              children: [],
            },
            {
              type: 'node',
              id: 'root node114',
              title: 'childen 666',
              children: [],
            },
          ],
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <div style={{ height: 400, margin: 50 }}>
          <SortableTree
            treeData={this.state.treeData}
            isVirtualized={false}
            height={1003}
            onChange={treeData => this.setState({ treeData })}
            theme={{
              nodeContentRenderer: NodeRendererDefault,
              treeNodeRenderer,
            }}
            generateNodeProps={({ node, path }) => ({
              title: <div className="rst__rowTitle__inner">{node.title}</div>,
            })}
          />
        </div>
      </div>
    );
  }
}
