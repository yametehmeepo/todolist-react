import React, { Component } from 'react';

import './App.less';

//去除两边空格
function trim(str){
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

//新增事项组件
class AddPanel extends Component {
  constructor(props){
    super(props);
    this.addhandler = this.addhandler.bind(this);
    this.ButtonAddHandler = this.ButtonAddHandler.bind(this);
  }
  addhandler(e){
    var ListDataArr = this.props.ListDataArr;
    var trimStr = trim(e.target.value);
    if(e.keyCode === 13){
      if(trimStr){
        ListDataArr.push(trimStr);
        this.props.SetInputToListData(ListDataArr);
        e.target.value = '';
      }else{
        e.target.value = '';
      }
    }
  }
  ButtonAddHandler(){
    var ListDataArr = this.props.ListDataArr;
    var inputStr = this.input.value;
    var inputTrimStr = trim(inputStr);
      if(inputTrimStr){
        ListDataArr.push(inputTrimStr);
        this.props.SetInputToListData(ListDataArr);
        this.input.value = '';
      }else{
        this.input.value = '';
      }
  }
  render(){
    return (
      <div className="addpanel clearfix">
        <button onClick={this.ButtonAddHandler}>新增</button>
        <div className="addinput">
          <input type="text" placeholder="请输入添加事项" onKeyDown={this.addhandler} ref={input => this.input=input}/>
        </div>
      </div>
    )
  }
}
//显示代办事项组件
class ListPanel extends Component {
  render(){
    var ListDataArr = this.props.ListDataArr;
    return (
      <div className="listpanel">
        <h3>您的待办事项</h3>
        <ul>
          {
            ListDataArr.map((item,index) => {
              return (
                <li key={index+1}>
                  <span>
                    <input type="checkbox" />
                    {index+1+": "}
                  </span>
                  <div>
                    <input type="text" defaultValue={item} />
                  </div>
                  <a href="javascript:;"></a>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

/*class Statistics extends Component {
  render(){
    return (

    );
  }
}*/

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      ListDataArr: []
    }
    this.SetInputToListData = this.SetInputToListData.bind(this);
  }
  SetInputToListData(arr){
    this.setState({
      ListDataArr: arr
    })
  }
  render() {
    return (
      <div id="app">
        <AddPanel ListDataArr={this.state.ListDataArr} SetInputToListData={this.SetInputToListData}></AddPanel>
        <ListPanel ListDataArr={this.state.ListDataArr}></ListPanel>
        {/*<Statistics></Statistics>*/}
      </div>
    );
  }
}

export default App;
