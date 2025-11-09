/**
 * 
 *      官方标准
 *         ESModule
 *         
 *         分为 具名导出和默认导出
 *  
 *         同样不会污染全局变量
 * 
 *         具名导出
 *           export const a = 1
 *           export function b(){}
 *           const d = 2
 *           export { d }
 *           const k = 10
 *           export { k as temp }
 * 
 *         默认导出
 *           export default 3
 *           export default function (){}
 * 
 *         默认导出最多只能导出一个，否则会报错
 *         同样也会有缓存，导入过的或执行过的  后面再导入的话不会重复执行导入模块内容
 *  
 *         上面的为静态导入
 * 
 *  
 *          动态导入 
 *            import(路径) 返回一个Pomise
 *            可以在任何地方进行导入
 * 
 * 
 *      
 *          静态导入的代码必须为在代码顶端，也不可放入代码块中，并且静态导入的代码绑定的符号是常年，不可更改
 *          
 *  
 *        
 *     
 * 
 */