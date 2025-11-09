/**
 * 
 *     什么是包？
 *        包(package)是一个或多个js模块的集合，它们共同完成某一类功能，可以简单的认为每一个工程就是一个包
 *  
 *      什么是包管理器
 *        包管理器是一个管理包的工具，前端常见的包管理器有 npm、yarn
 * 
 * 
 *      node查找包的顺序
 *        require(包名) 
 *        1. 查找是否有内置模块
 *        2. 查找当前目录node_modules中是否有a
 *        3. 依次查找上级目录node_modules中是否有a，知道根目录
 * 
 * 
 *        安装普通依赖
 *           npm install 包名
 *      
 *        安装开发依赖
 *           npm install -D 包名
 * 
 *        全局安装
 *          只有需要使用某个全局命令的时候才安装
 *          npm install -g 包名
 * 
 *       安装时指定版本
 *          npm install 包名@版本号
 * 
 *       卸载包
 *          npm uninstall 包名
 * 
 * 
 */