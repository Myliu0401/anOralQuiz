/* 

     Map
       是JS中新增的集合对象，其功能类似于对象。但是，与常规对象相比，存在一些差异。
       是一个可迭代对象

      const obj = new Map()
       添加/修改属性
       obj.set('建', '值')

       获取属性
       obj.get('属性名')

       通过一个二维数组，可以快速的初始化一个map
        new Map(二维数组)

       获取长度
          obj.size



       Map和Object的区别
           Map默认情况下不包含任何建。Object有一个原型，原型链上的建名有可能和自己对象上的建产生冲突。
           Map的建可以是任意值，包括函数，对象或者任意基本类型。一个Object必须是一个string或Symbo。
           Map中的key是有序的，因此当迭代的时候，一个Map对象以插入的顺序返回键值。Object的建是无序的。
           Map可以通过size获取长度。Object只能手动计算。
           Map可以迭代。Object需要某种方式获取到建才能被迭代


        WeakMap
           key必须是对象
           obj.set(对象, 值)
          weakMap不支持迭代方法


        Set
          set也类似于Map,但是set对于单个值更有用

          添加属性
            const set = new Set()
            set.add(1)

          可以利用一维数组初始化
          new Set(一维数组)
           可以利用set来进行数组去重


*/