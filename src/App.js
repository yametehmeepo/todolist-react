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
    /*this.ButtonAddHandler = this.ButtonAddHandler.bind(this);*/
  }
  addhandler(e){
    var ListDataArr = this.props.ListDataArr;
    var inputStr = this.input.value;
    var trimStr = trim(inputStr);
    if(( e.target.type === 'text' && e.keyCode === 13 ) || e.target.type === 'button'){
      if(trimStr){
        ListDataArr.push({
          text:trimStr,
          ischecked: false
        });
        
        this.props.SetInputToListData(ListDataArr);
      }
      this.input.value = '';
    }
  }
  render(){
    return (
      <div className="addpanel clearfix">
        <button type="button" onClick={this.addhandler}>新增</button>
        <div className="addinput">
          <input type="text" placeholder="请输入添加事项" onKeyDown={this.addhandler} ref={input => this.input=input} />
        </div>
      </div>
    )
  }
}
//显示代办事项组件
class ListPanel extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputText: ''
    };
    this.changeChecked = this.changeChecked.bind(this);
    this.modification = this.modification.bind(this);
    this.keydownModification = this.keydownModification.bind(this);
    this.deletehandler = this.deletehandler.bind(this);
    this.textrecord = this.textrecord.bind(this);
    this.bindinputvalue = this.bindinputvalue.bind(this);
  }
  changeChecked(index){
    var ListDataArr = this.props.ListDataArr;
    ListDataArr[index].ischecked = !ListDataArr[index].ischecked;
    this.props.checkhandler(ListDataArr);
  }
  modification(index,e){
    var ListDataArr = this.props.ListDataArr;
    var afterStr = trim(e.target.value);
    if(afterStr === this.state.inputText){
      ListDataArr[index].text = afterStr;
      this.props.checkhandler(ListDataArr);
    }else{
      var conf = window.confirm('确定修改么?');
      if(conf){
        ListDataArr[index].text = afterStr;
        this.props.checkhandler(ListDataArr);
      }else{
        ListDataArr[index].text = this.state.inputText;
        this.props.checkhandler(ListDataArr);
      }
    }
  }
  keydownModification(index,e){
    if(e.keyCode === 13){
      this.modification(index,e);
    }
  }
  deletehandler(index,e){
    var ListDataArr = this.props.ListDataArr;
    var conf = window.confirm('确定删除么?');
      if(conf){
        ListDataArr.splice(index,1);
        this.props.checkhandler(ListDataArr);
      }
  }
  textrecord(index,e){
    this.setState({
      inputText: e.target.value
    })
    console.log(e.target.value);
  }
  bindinputvalue(index,e){
    var ListDataArr = this.props.ListDataArr;
    ListDataArr[index].text = e.target.value;
    this.props.checkhandler(ListDataArr);
  }
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
                    <input type="checkbox" onChange={this.changeChecked.bind(null,index)} checked={item.ischecked?true:false}/>
                    {index+1+": "}
                  </span>
                  <div>
                    <input type="text" value={item.text} onChange={this.bindinputvalue.bind(null,index)} onFocus={this.textrecord.bind(null,index)} onBlur={this.modification.bind(this,index)} onKeyDown={this.keydownModification.bind(null,index)} disabled={item.ischecked?true:false} className={item.ischecked?'done':''}/>
                  </div>
                  <i onClick={this.deletehandler.bind(null,index)}></i>
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
      ListDataArr: storage.fetch(),
    }
    this.SetInputToListData = this.SetInputToListData.bind(this);
  }
  SetInputToListData(arr){
    arr.map((item,index) =>{
      return (item.id = index);
    });
    this.setState({
      ListDataArr: arr
    });
    storage.save(arr);
  }
  render() {
    console.log(JSON.stringify(this.state.ListDataArr));
    return (
      <div id="app">
        <AddPanel ListDataArr={this.state.ListDataArr} SetInputToListData={this.SetInputToListData}></AddPanel>
        <ListPanel ListDataArr={this.state.ListDataArr} checkhandler={this.SetInputToListData}></ListPanel>
        {/*<Statistics></Statistics>*/}
      </div>
    );
  }
}

//创建localstorage 
var storageName = 'todolist-react';
const storage = {
  fetch(){
    return JSON.parse(localStorage.getItem(storageName) || '[]');
  },
  save(jsondata){
    localStorage.setItem(storageName,JSON.stringify(jsondata));
  }
}



export default App;
