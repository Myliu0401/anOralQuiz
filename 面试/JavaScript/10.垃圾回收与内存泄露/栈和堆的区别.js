/* 


一、  堆(heap)和栈(stack)

栈(stack)会自动分配内存空间，会自动释放。堆(heap)动态分配的内存，大小不定也不会自动释放。

二、  基本类型和引用类型

基本类型：简单的数据段，存放在栈内存中，占据固定大小的空间。

引用类型：指那些可能由多个值构成的对象，保存在堆内存中,包含引用类型的变量实际上保存的不是变量本身，二十指向该对象的指针。

基本数据类型包括Undefined,String,Boolean,Null,Number

三、  传值和传址

从一个向另一个变量复制引用类型的值，复制的其实是指针，因此两个变量最终指向同一个对象。即复制的是栈中的地址而不是堆中的对象。

从一个变量复向另一个变量复制基本类型的值，会创建这个值的副本。



*/