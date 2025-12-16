/**
 *     为什么Vue3能追踪 Map/Set 等复杂的数据结构，而Vue2不能？
 *        Vue3能追踪 Map/Set/WeakMap等集合类型，是因为它使用的 代理 能拦截一切对象集合的操作
 *        为集合方法做了“方法替身”来增强功能  如：调用数组类型的方法，该方法不是数组原型上的，而是代理返回出来的替身
 *   
 *        Vue2用Object.defineProperty属性描述符，只能拦截get/set,更不能拦截其他集合类型，所以无法原生支持 Map/Set 集合类型
 * 
 * 
 *    
 *     为什么 Vue3 可以多次调用 onMounted？
 *        vue2是写在配置对象中，如果有多个那么会覆盖掉前面所写的，所以只能注册和调用一次
 *        vue3组合式api,是通过回调来注册的，将其加入到队列中，所以可以注册多个
 *        vue3内部是维护一个队列，所以无论是选项式还是组合式 都会往队列上加入生命周期处理函数
 * 
 *   
 *     为什么 Vue 的 diff 不能直接比较两棵完整 DOM 树？
 *        真实DOM是浏览器提供的原生对象，结构复杂，属性庞大
 *        一个修改可能导致回流和重绘，涉及到渲染树的计算，布局计算等
 *        如果每次都重新构建dom树，那么将是灾难性的
 * 
 * 
 *     keep-alive 的使用时机与缓存原理     土音：key 而赖
 * 
 *          使用场景：组件切换时需要保留状态。常用于tab页、分页、表单等场景
 * 
 *          实现原理：
 *              keep-alive内部维护一个缓存 Map:{ key: 虚拟节点 }
 *              被缓存组件不会销毁，而是执行 deactivated钩子
 *              切会组件时直接复用缓存虚拟节点，并触发 activated钩子
 *              避免重复创建dom和组件实例，提高性能
 *  
 * 
 *     怎么才能减少回流与重绘
 *          减少dom的操作，批量修改样式，而不是单独修改每个节点 可以使用documentFragment
 *          使用CSS动画，代替JS操作dom，获取和操作dom都会极大的消耗性能
 *          样式集中修改，而不是一行行该
 * 
 * 
 *     Diff 算法为什么采用“同层比较”，而不是比较完整的 DOM 树？ 
 *          如果跨层级比较会造成节点错位，性能极大浪费，因为虚拟树是层级敏感结构
 *   
 * 
 *     事件有两种触发方式
 *          用户触发，如通过鼠标点击触发，这种的处理函数会加入到宏队列中
 *          代码手动触发，如 dom.onclick()  这种的处理函数是同步执行的
 * 
 * 
 *     组件优化可以从性能、可维护性和渲染效率等多个方向入手。
 *         1.减少不必要的渲染
 *              合理使用 i-if和v-show
 *                 v-if  在条件为假时不会渲染组件，但每次条件变化会触发重新渲染。
 *                 v-show  只切换元素的display,适合频繁显示/隐藏的情况
 *  
 *              使用 computed 而不是 methods 做复杂计算   吐音：咩刹得
 *                   computed会缓存结果，只有依赖变化时才会重新计算。
 *                   methods每次渲染都会执行，可能浪费性能
 * 
 *              拆分组件
 *                  如果组件过大，考虑拆分为多个小组件，小组件更容易复用，也能减少重新渲染的范围。
 * 
 *              使用 v-once 渲染静态内容   土音：why是
 *                  <div v-once>{{ text }}</div>  对不会变化的部分，只渲染一次，避免每次虚拟DOM比较
 *                  不会对其进行任何的diff对比和依赖跟踪
 * 
 *        2. 避免不必要的响应式开销
 *             使用 shallowReactive、shollowRef   shallow吐音：啥漏
 *               对深层对象不需要深度响应时，可以用这两个方法可以减少代理开销
 *               shollowRef传的参数如果是对象的话也不会使用reactive进行代理
 * 
 *             避免大对象或数组被深度响应
 *               对大数组或对象，只对必要字段做响应式
 *  
 *             使用 markRaw  土音：迈可乱
 *               对不会变化的对象或类实例，可以使用 markRaw,  Vue不会将它们转换为响应式
 * 
 *        3. 优化列表渲染
 *            加上 key
 *              让Vue能准确追踪节点，避免不必要的重绘
 *        
 *            虚拟列表或分页
 *              对大数据量列表，考虑使用分页或虚拟列表，只渲染可视区的DOM
 * 
 *            避免直接修改数组长度或顺序
 *              使用Vue提供的数组变更方法
 * 
 *        4. 避免不必要的 watch/effect
 *             合理设置 watch
 *               只监控需要的属性
 *               对深层对象，使用 deep:true 会增加性能开销，避免不必要的深度 watch
 *  
 *             使用 watchEffect
 *               自动追踪依赖，但注意依赖过多也会增加开销
 * 
 *        5. 性能优化DOM操作
 *             事件处理函数 
 *                可以使用防抖或节流 限制高频事件
 * 
 *             减少DOM节点数量
 *                避免过度嵌套，删除不必要的包装器
 * 
 *             避免频繁访问DOM
 *                尽量通过数据驱动渲染，而不是直接操作DOM
 * 
 *         6. 异步加载
 *              组件懒加载 
 *                defineAsyncComponent(()=>import(路径))
 * 
 *              按需加载资源
 *                图片、第三方库等可以延迟加载
 * 
 *         7. 使用 v-memo  土音：咩某
 *              对复杂模板内容可以使用 v-memo 缓存部分虚拟DOM，减少无意义渲染
 *              <div v-memo="[props.data]">{{ props.data.text }}</div>
 *              只有依赖数组变化时才重新渲染
 * 
 * 
 * 
 *        微信开发流程
 *          1. 注册（首先必须有开发者账号）
 *          2. 获取appid （开发阶段可以使用测试号），上线必须得有appi，从开发管理的开发设置中可以找得到
 *          3. 配置 app.config.js 文件   config吐音：堪非
 *          4. 开发
 *          5. 调试、预览、发布
 * 
 *          defineAppConfig({
                     pages: [   吐音：培之是
                       'pages/index/index',
                       'pages/logs/logs'
                     ],
                     window: {
                       navigationBarBackgroundColor: '#ffffff',
                       navigationBarTitleText: 'Taro 小程序',
                       navigationBarTextStyle: 'black',
                       backgroundColor: '#eeeeee',
                       backgroundTextStyle: 'light'
                     },
                     tabBar: {
                       list: [
                         {
                           pagePath: 'pages/index/index',
                           text: '首页',
                           iconPath: 'assets/home.png',
                           selectedIconPath: 'assets/home-active.png'
                         },
                         {
                           pagePath: 'pages/logs/logs',
                           text: '日志',
                           iconPath: 'assets/log.png',
                           selectedIconPath: 'assets/log-active.png'
                         }
                       ],
                       color: '#999',
                       selectedColor: '#2d8cf0',
                       backgroundColor: '#fff',
                       borderStyle: 'black'
                     },
                     subpackage: [    分包    吐音：是趴给吃
                     {
                      "root": "packageA",  根目录
                      "pages": [  分包的页面路径
                        "pages/list/list",
                        "pages/detail/detail"
                      ],
                      independent: boolean  是否独立分包   吐音：音的瓶等
                     },
                      ] 
                 })

                 主包不能直接引用分包的JS、图片、样式、组件等资源
                 因为分包是在需要时才会被按需下载的，而主包在启动时就必须完整加载，如果主包依赖分包的内容，就会导致无法在启动阶段正常运行，因为分包还没下载

                 独立分包不能引用主包或其他分包，因为是独立运行环境，不可互相引用
                 
           小程序的优化
               启动优化：1.分包以此来减少主包体积，主包只保留 首页、公共组件、公共模块 和 wx.loadSubPackage({ name: '包名' })提前加载下一个分包页
                        2.懒加载资源 图片：使用低分辨率占位图等正则加载完毕后再替换、视频、地图等组件，只有在需要时再渲染、列表项过多时使用虚拟列表
                        3.减少初始setData 页面onload不要一次性set太多数据，先渲染关键内容，次要数据异步加载

               渲染优化：1.减少setData调用次数，因为每次setData都会触发通信与渲染，性能开销大
                        2.组件分层 大组件可以拆分为多个组件，局部更新
                        3.列表性能优化 懒加载、虚拟列表
                        4.减少样式层级和复杂选择器

               网络优化：1.缓存数据、静态资源CDN加速
                        2.减少请求次数、文件合并避免重复请求
                        3.使用异步任务与后台处理 开启Worker线程来计算大数据，该线程不会阻塞

               体验优化：1.骨架屏
                        2.图片使用base64，大图使用webp
                        3.滚动、动画流畅度 使用transform或wx.createAnimation


            
           微信小程序生命周期函数
                全局的
                  onLaunch(options) {  吐音：安浪是
                    console.log('小程序初始化完成（只触发一次）', options)
                    是小程序最早的生命周期
                  },
                  onShow(options) {   吐音：安索
                    console.log('小程序启动 / 从后台进入前台', options)
                  },
                  onHide() {   吐音：安嘿的
                    console.log('小程序从前台进入后台')
                  },
                  onError(err) {  吐音：安A我
                    console.error('小程序发生错误：', err)
                  },
                  onPageNotFound(res) {  吐音：安培之辣非噢
                    console.warn('页面不存在，自动跳转到首页')
                    wx.redirectTo({ url: '/pages/index/index' })
                  }


                页面级的
                  onLoad(options) {   吐音：安漏
                     console.log('页面加载', options)
                   },
                   onShow() {  吐音： 安索
                     console.log('页面显示')
                   },
                   onReady() {  吐音：安略滴
                     console.log('页面初次渲染完成')
                   },
                   onHide() {  吐音：安嘿的
                     console.log('页面隐藏')
                   },
                   onUnload() {  吐音：安嗯漏
                     console.log('页面卸载')
                   },
                  
                   // 额外的页面事件
                   onPullDownRefresh() {
                     console.log('下拉刷新')
                     wx.stopPullDownRefresh()
                   },
                   onReachBottom() {   吐音：绿是吧疼
                     console.log('触底加载更多')
                   },
                   onShareAppMessage() {
                     return {
                       title: '自定义分享标题',
                       path: '/pages/index/index'
                     }
                   },
                   onPageScroll(e) {  吐音：安培之是歌了
                     console.log('页面滚动', e.scrollTop)
                   },
                   onResize(res) {  吐音：安绿塞
                     console.log('屏幕尺寸变化', res.size)
                   }
                
               
                组件级的
                   created() {  吐音：愧绿A
                     console.log('组件实例刚刚创建')
                   },
                   attached() { 吐音：而特的
                     console.log('组件挂载到页面节点树')
                   },
                   ready() {   吐音：略滴
                     console.log('组件布局完成，可访问节点')
                   },
                   moved() {  吐音：某特
                     console.log('组件被移动到节点树其他位置')
                   },
                   detached() {  吐音：滴特克是
                     console.log('组件实例被移除')
                   },
                   error(err) {  吐音：A我
                     console.error('组件错误', err)
                   }


            微信小程序的页面栈机制
               小程序维护了一个页面栈，每打开一个新页面就会入栈，返回一个页面就是出栈。
               最多可以同时保留10层页面栈。
               小程序页面栈满 10 层时，再使用 navigateTo 入栈会失败报错，页面不会打开。

            微信小程序跳转路由api
               普通跳转  wx.navigateTo                                  吐音：乃么给丢
               重定向    wx.redirectTo    为替换当前栈页面               吐音：米的略丢
               返回      wx.navigateBack  返回上层页面                  吐音：乃么给霸
               切换tab   wx.switchTab     必须是tabBar页                吐音：是喂是特霸
               重新启动  wx.reLaunch       清空页面栈后打开目标页         吐音：喂浪是

            扫码登陆的流程
               二维码本质上只是一个ID，用户扫码后服务端告诉网页：这个ID已经登录成功
               
               微信扫码后打开小程序或者公众号网页
                 打开小程序的情况：
                   用户进入小程序页面，在小程序页面中调用 wx.login获取code，然后调用接口并将链接中的key带上。
                   后端去调用微信接口来换取openid,然后后端判断是否已登录或注册。
                   网页(也就是二维码这个页面)进行轮训请求，判断是否已经登录，如已登录则进行后续操作。

                  打开公众号h5的形式
                    如果是网页h5这时就需要进行Oauth2授权流程了
                    打开的页面需要重定向到 https://open.weixin.qq.com/connect/oauth2/authorize(这个链接为微信指定) 并且带上参数
                     window.location.href =
                      `https://open.weixin.qq.com/connect/oauth2/authorize?
                      appid=你的公众号appid&
                      redirect_uri=${回调地址}&
                      response_type=code&
                      scope=snsapi_userinfo&
                      state=STATE#wechat_redirect`
                    该微信自己的网页用户点击授权后，会回调到指定的redirect_uri链接并且会带上code等信息
                    可以后端直接根据链接的code来换取openid再获取用户信息
                    也可以前端来通过js调用后端接口将code带上，然后后端再进行后续操作


            使用微信SDK
               1. <script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>引入SDK

               2. 向后端请求签名配置
                    后端需要调用微信的接口生成签名
                    签名需要的四个参数
                        noncestr(随机字符串)、timestamp(时间戳)、jsapi_ticket(调用微信接口获取凭证)、url(当前网页的完整URL)
                    算好后需要将上面这几个属性和签名给到前端
                    前端通过config进行注册配置
                     wx.config({
                      debug: false, // 开启调试模式（调试用）
                      appId: 'wx1234567890abcd', // 公众号 appId
                      timestamp: 1731234567, // 时间戳
                      nonceStr: 'random123', // 随机字符串
                      signature: '后端返回的签名',
                      jsApiList: ['scanQRCode', 'updateAppMessageShareData'] // 要用的功能列表
                    });

                    为什么需要签名验证
                       因为微信要确保网页确实是被公众号授权过的，否则，任何人都可以随意调用微信的扫码、支付等接口、会有安全风险




            当小程序检测到有新版本时，会自动下载，但不会自动重启
    
               小程序启动时，系统会自动调用更新管理器
                  const updateManager = wx.getUpdateManager();  // 拿到更新管理器

                微信客户端后台检测是否有新版本，如果有，会自动下载新包

                下载完成后，会触发， updateManager.onUpdateReady(回调)

                updateManager.applyUpdate() 重启并使用新版本  applyUpdate吐音：啊披来哈得


                如果只是小修小补，不必强制更新，微信会在后台自动更新缓存


            小程序的开发版本、体验版、线上版本默认是共享同一个缓存
               因为小程序的缓存机制是按 小程序AppID 来划分的，上面使用的是同一个版本

               解决办法，利用微信内置的环境变量
                
                 1. 给缓存加前缀
                    wx.setStorageSync(__wxConfig.envVersion + key, value)
                    wx.getStorageSync(__wxConfig.envVersion + key)

                 2. 按环境清理缓存
                    onLaunch(){
                       if(__wxConfig.envVersion === 开发/体验){
                           wx.clearStorageSync()
                       }
                    }

                 3. 配置独立环境的api
                     跟web的Vue项目一样，配置好各各环境的api后，调用接口时使用
               

            如果有一百万个任务需要处理，同时处理的话会掉帧卡顿，怎么解决？
                浏览器是一秒刷新60次页面，相当于16毫秒刷新一次页面。

                方法1：分批执行（任务切片）
                       利用 requestIdleCallback 这个api，传个回调，吐音：绿愧而哎逗可拜
                       这个api会在浏览器空闲时调用回调 ，让渲染和交互不卡顿

                方法2：时间切片
                       手动在任务执行时间判断，利用已知16毫秒刷新一次页面的特定进行处理
                       const start = 时间戳
                       if(任务队列.length && 当前时间戳 - start < 16){
                          处理任务
                       }else {
                          setTimeout(回调，0);这个16毫秒让浏览器去刷新页面  
                       }

                方法3：开启子线程，子线程可以与渲染线程同时执行
                      const worker = new Worker('worker.js')
                      worker.postMessage(1_000_000);
                      worker.onmessage = e => console.log('结果：', e.data);

                      // worker.js
                      onmessage = e => {
                        const result = heavyCompute(e.data);
                        postMessage(result);
                      };
                    


                 position: sticky;  吐音：魄Z顺：是弟意


                vite使用Rollup来进行打包
                       Rollup会：
                         处理依赖分析
                         执行Tree-Shaking
                         压缩代码
                         输出优化后的bundle文件

                    开发时用 esbuild，打包时用 Rollup   Rollup吐音：栾了   esbuild吐音：S跌偶

                    Rollup是一个基于ESModule的打包工具，它的设计初衷就是 打包纯JS模块，生成极致精简的bundle




          queueMicrotask(()=>{})
             该回调会立即进入微队列，而其他的要等到本轮同步执行栈“清空”后，事件循环调度时入队。

          fetchAPI属于微队列

          主线程与渲染 
          JavaScript 与浏览器渲染共用 同一个主线程。
          当 JS 同步任务在执行时，浏览器 不会打断它去重排或重绘。
          换句话说：同步 JS 执行完之前，页面渲染都被阻塞。



          nextTick执行时间
              虚拟dom的重渲染是异步微队列，也就是虚拟dom完成更新后nextTick的回调就会被加入到微队列等待处理
                
*/
