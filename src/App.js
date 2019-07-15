import React from 'react';
import Headers from './component/Headers';
import Main from './component/Main';
import Info from './component/Info';
import Footer from './component/Footer';

export default class App extends React.Component {
  state = {
    list: [{id: 1, isCompleted: false, content: '真是不好啊'}],
    filterListArr: [],
  };

  componentDidMount () {
    this.setState ({
      filterListArr: this.state.list,
    });
  }

  //改变选中的状态
  completeChange = id => {
    let {list} = this.state;
    let arr = list.map (item => {
      if (item.id === id) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });
    this.setState ({
      list: arr,
    });
  };

  //添加新的todos
  newTodos = data => {
    let {list} = this.state;
    let ids;
    if (list.length) {
      ids = list[list.length - 1].id++;
    } else {
      ids = 1;
    }

    this.setState ({
      list: [{id: ids, isCompleted: true, content: data}, ...list],
      filterListArr: [{id: ids, isCompleted: true, content: data}, ...list],
    });
  };

  //删除指定的数据
  delTodos = id => {
    let {list} = this.state;
    let arr = list.filter (item => item.id !== id);
    this.setState ({
      list: arr,
      filterListArr: arr,
    });
  };

  //筛选功能
  filterList = data => {
    let {list} = this.state;
    let arr = list;
    if (data === 'active') {
      this.setState ({
        filterListArr: arr.filter (v => v.isCompleted),
      });
    } else if (data === 'completed') {
      this.setState ({
        filterListArr: arr.filter (v => !v.isCompleted),
      });
    } else {
      this.setState ({
        filterListArr: arr,
      });
    }
  };

  //删除已完成
  deleteComplete = () => {
    let {list} = this.state;
    this.setState ({
      list: list.filter (v => v.isCompleted),
      filterListArr: list.filter (v => v.isCompleted),
    });
  };
  render () {
    return (
      <div>
        <section className="todoapp">
          <Headers newTodos={this.newTodos} />
          <Main
            list={this.state.filterListArr}
            completeChange={this.completeChange}
            delTodos={this.delTodos}
          />
          <Footer
            list={this.state.list}
            filterList={this.filterList}
            deleteComplete={this.deleteComplete}
          />
        </section>
        <Info />
      </div>
    );
  }
}
