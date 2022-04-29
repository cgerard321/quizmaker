import React, { Component } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdChevronRight,
  MdKeyboardArrowDown,
  MdAddBox,
  MdIndeterminateCheckBox,
  MdFolder,
  MdFolderOpen,
  MdInsertDriveFile
} from "react-icons/md";
//browse material design icons here: https://react-icons.github.io/react-icons/icons?name=md
//brows all icons in react-icons here: https://github.com/react-icons/react-icons

const nodes = [
  {
    value: "ParentOne",
    label: "ParentOne",
    children: [
      {
        value: "SectionOneChild",
        label: "SectionOneChild",
        children: [
          {
            value: "SectionOneChil-of-Child-1",
            label: "SectionOneChil-of-Child-1",
            children: [
              {
                value: "SectionOneChil-of-Child-1-of-Child",
                label: "SectionOneChil-of-Child-1-of-Child"
              }
            ]
          },
          {
            value: "SectionOneChil-of-Child-2",
            label: "SectionOneChil-of-Child-2"
          }
        ]
      },
      {
        value: "SectionTwo",
        label: "SectionTwo",
        children: [
          {
            value: "SectionTwo-Child",
            label: "SectionTwo-Child"
          }
        ]
      }
    ]
  },
  {
    value: "ParentTwo",
    label: "ParentTwo",
    children: [
      {
        value: "ParentTwo-Child-1",
        label: "ParentTwo-Child-1"
      },
      {
        value: "ParentTwo-Child-2",
        label: "ParentTwo-Child-2"
      }
    ]
  }
];

class WidgetTree extends Component {
  state = {
    checked: [],
    expanded: []
  };

  render() {
    const icons = {
      check: <MdCheckBox className="rct-icon rct-icon-check" />,
      uncheck: <MdCheckBoxOutlineBlank className="rct-icon rct-icon-uncheck" />,
      halfCheck: (
        <MdIndeterminateCheckBox className="rct-icon rct-icon-half-check" />
      ),
      expandClose: (
        <MdChevronRight className="rct-icon rct-icon-expand-close" />
      ),
      expandOpen: (
        <MdKeyboardArrowDown className="rct-icon rct-icon-expand-open" />
      ),
      expandAll: <MdAddBox className="rct-icon rct-icon-expand-all" />,
      collapseAll: (
        <MdIndeterminateCheckBox className="rct-icon rct-icon-collapse-all" />
      ),
      parentClose: <MdFolder className="rct-icon rct-icon-parent-close" />,
      parentOpen: <MdFolderOpen className="rct-icon rct-icon-parent-open" />,
      leaf: <MdInsertDriveFile className="rct-icon rct-icon-leaf-close" />
    };
    console.log(this);
    return (
      <CheckboxTree
        nodes={this.props.nodes}
        checked={this.state.checked}
        expanded={this.state.expanded}
        onCheck={checked => this.setState({ checked })}
        onExpand={expanded => this.setState({ expanded })}
        icons={icons}
      />
    );
  }
}
export default WidgetTree;
