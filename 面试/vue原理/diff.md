
# diff时机

当组件被 创建、数据发生变化时，会运行一个函数（updataComponent），该函数会做两件事：

运行`_render`该函数中会运行编译后的render函数生成一棵虚拟dom树，并返回
运行`_update`,会对新旧虚拟dom树进行对比，最终完成对真实dom的更新

```js
  
   function Vue(){
      const updateComponent = ()=>{
        this._update(this._render()); // diff就发生在这里面
      }
   }

```

#### _update函数

该函数接收一个参数，该参数为新生成的虚拟dom树

该函数中会通过vue实例的 `_vnode`属性，拿到旧虚拟dom树
然后，对`_vnode`属性重新赋值为新的虚拟dom树，以完成对新虚拟dom树存储。

```js
  function _update(newNode){
     const lodNode = this._vnode;
     this._vnode = newNode; // 完成对新虚拟dom树存储
     this.patch(lodNode,newNode); // 进行对比更新，以完成对真实dom的更新
  };
```

#### patch函数

该函数会对新旧两棵树进行对比，以完成更新

旧树不存在：
  如果旧树不存在，那么证明该组件是首次渲染，直接递归遍历新虚拟dom树，为每个虚拟dom生成一个真实dom，并挂载到虚拟dom的elm属性上。

旧树存在：
  如果旧树存在，那么证明之前已经渲染后，那么对新旧两棵虚拟dom树进行对比更新。
  已达到两个目标：
    对真实dom的最小化处理
    将真实dom对应到新虚拟dom上（elm属性）

相同：新旧虚拟dom的 标签、key值完全相同，input还要看type属性
新建元素：根据新虚拟dom，创建一个真实dom,同时 挂载到elm属性上
销毁元素：调要真实dom的remove方法进行删除
更新：对比新旧虚拟dom完成对真实dom的更新
对比子节点：完成虚拟dom的子节点进行对比

首先对根节点进行对比： 
   相同：则进行更新流程
     将旧虚拟dom存储的真实dom，存储新虚拟dom的elm属性 `newVnode.elm = lodVnode.elm`
     对比新旧虚拟dom的属性，有变化则更新到真实dom上
     根节点处理完成后，进入子节点的对比
    
   不同：
     递归创建新元素
     删除旧元素


对比子节点
   vue在对比子节点时一切的出发点都是：
      尽量啥也别做
      实在不行就修改属性
      再不行就动标签
      最终不行，就只能删除、创建
  
 


