<template>
	<view class="container" v-if="!isAutoLogin">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zoujiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign"></view>
			<view class="welcome">
				欢迎回来!

			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input type="nnumber" :value="mobile" placeholder="请输入手机号" maxlength="11" data-key="mobile"
						@input="inputChange">

				</view>
				<view class="input-item">
					<text class="tit" @tap="goResetPwd">密码</text>
					<input type="password" value="" password data-key="password" @input='inputChange' @confirm="toLogin"
						placeholder="8-18位不含特殊字符的数字,字母组合">
				</view>
			</view>


			<button class="confirm-btn bg-blue" :disabled="logining" @click="toLogin">登录</button>
			<view class="forget-section" @click="goResetPwd">
				忘记密码？
			</view>
		</view>
		<view class="register-section">
			还没有账号？
			<text @click="toRegist">马上注册</text>
			<u-checkbox v-model="checked" :disabled="false">知悉并同意《隐私协议》《用户使用协议》</u-checkbox>
		</view>

		<view class="" v-if="isAutoLogin">
			<view class="cu-load load-modal">
				<image src="../../static/index/logo.png" mode=""></image>
				<view class="gray-text">
					正在加载一键登录
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				isAutoLogin: false,
				checked: false,
				mobile: '',
				password: "",
				logining: false,
				type: '',

				// 用户信息
				user: {
					mobile: '',
					password: '',
					model: '',
					uuid: '',
					cid: '',
					edition: ''
				}
			}
		},
		onLoad(option) {

			if (option.type == 'phone') {
				this.LoginInit1()
				this.isAutoLogin = true
			}

		},
		methods: {

			LoginInit1() {
				// 一键登录
				// 1判断平台
				let platform = uni.getSystemInfoSync().platform;
				let _this = this;
				if (platform == 'android') {
					// 如果是安卓系统，调用该方法可实现对三网运营商授权页面个性化设计

					shanYanSDKModule.setAuthThemeConfig({
						//闪验SDK  配置授权页方法

						//授权页已有元素配置
						uiConfig: {
							setAuthBGImgPath: "static/bg1.jpg",
							setNavColor: '#ff0000',
							setLogoImgPath: 'static/logo1.png',
							setAppPrivacyOne: {
								title: '闪验用户协议',
								url: "https://api.253.com/api_doc/yin-si-zheng-ce/wei-hu-wang-luo-an-quan-sheng-ming.html"
							},
							setAppPrivacyTwo: {
								title: '闪验隐私政策',
								url: "https://api.253.com/api_doc/yin-si-zheng-ce/ge-ren-xin-xi-bao-hu-sheng-ming.html"
							},
							setAppPrivacyThree: {
								title: '服务协议',
								url: "https://api.253.com/api_doc/yin-si-zheng-ce/ge-ren-xin-xi-bao-hu-sheng-ming.html"
							},
							setPrivacyState: false,
							setPrivacyText: {
								privacyTextOne: '登录即同意',
								privacyTextTwo: "、",
								privacyTextThree: '、',
								privacyTextFour: '和',
								privacyTextFive: '并授权登录'
							},


							setNumberSize: 34

						}, //授权页添加自定义控件元素
						widgets: {
							// widget1: {
							// 	widgetId: "customView_one",
							// 	type: "TextView",
							// 	left: "",
							// 	top: "300",
							// 	right: "",
							// 	bottom: "",
							// 	width: "",
							// 	height: "30",
							// 	textContent: "自定义控件1（点击不销毁授权页1）",
							// 	textFont: "13",
							// 	textColor: "#cc0000",
							// 	backgroundColor: "#ffffff",
							// 	isFinish: "false"
							// },
							// widget2: {
							// 	widgetId: "customView_two",
							// 	type: "TextView",
							// 	left: "",
							// 	top: "360",
							// 	right: "",
							// 	bottom: "",
							// 	width: "",
							// 	height: "30",
							// 	textContent: "自定义控件2（点击销毁授权页）",
							// 	textFont: "13",
							// 	textColor: "#cc0000",
							// 	backgroundColor: "#ffffff",
							// 	isFinish: "true"
							// },

						},
					}, result => {
						console.log(JSON.stringify(result));
					});
				} else if (platform == 'ios') {
					// 如果是ios系统
					//iOS 全屏模式
					let screenWidth_Portrait = plus.screen.resolutionWidth; //竖屏宽
					var screenScale = screenWidth_Portrait / 375.0; //相对iphone6屏幕
					if (screenScale > 1) {
						screenScale = 1; //大屏的无需放大
					}

					//竖屏
					let clLayoutLogoTop_Portrait = screenScale * 100;
					let clLayoutLogoWidth_Portrait = 100 * screenScale;
					let clLayoutLogoHeight_Portrait = 100 * screenScale;
					let clLayoutLogoCenterX_Portrait = 0;

					let clLayoutPhoneCenterY_Portrait = -150 * screenScale;
					let clLayoutPhoneLeft_Portrait = 50 * screenScale;
					let clLayoutPhoneRight_Portrait = -50 * screenScale;
					let clLayoutPhoneHeight_Portrait = 40 * screenScale;

					let clLayoutLoginBtnCenterY_Portrait = clLayoutPhoneCenterY_Portrait + 30 +
						clLayoutPhoneHeight_Portrait * 0.5 *
						screenScale + 20 * screenScale + 15 * screenScale; // 登录button的位置  
					let clLayoutLoginBtnHeight_Portrait = 50 * screenScale;
					let clLayoutLoginBtnLeft_Portrait = 70 * screenScale;
					let clLayoutLoginBtnRight_Portrait = -70 * screenScale;

					let clLayoutAppPrivacyLeft_Portrait = 40 * screenScale;
					let clLayoutAppPrivacyRight_Portrait = -40 * screenScale;
					let clLayoutAppPrivacyBottom_Portrait = -20 * screenScale;
					let clLayoutAppPrivacyHeight_Portrait = 45 * screenScale;

					let clLayoutSloganLeft_Portrait = 0;
					let clLayoutSloganRight_Portrait = 0;
					let clLayoutSloganHeight_Portrait = 15 * screenScale;
					let clLayoutSloganBottom_Portrait = clLayoutAppPrivacyBottom_Portrait -
						clLayoutAppPrivacyHeight_Portrait;



					this.ios_uiConfigure = {

						clBackgroundImg: "static/bg1.jpg",

						shouldAutorotate: true,
						/**支持方向
						 * 如支持横竖屏，需同时设置 clOrientationLayOutPortrait 和 clOrientationLayOutLandscape
						 * 0:UIInterfaceOrientationMaskPortrait
						 * 1:UIInterfaceOrientationMaskLandscapeLeft
						 * 2:UIInterfaceOrientationMaskLandscapeRight
						 * 3:UIInterfaceOrientationMaskPortraitUpsideDown
						 * 4:UIInterfaceOrientationMaskLandscape
						 * 5:UIInterfaceOrientationMaskAll
						 * 6:UIInterfaceOrientationMaskAllButUpsideDown
						 * */
						supportedInterfaceOrientations: 5,

						/**偏好方向 
						 * -1:UIInterfaceOrientationUnknown
						 * 0:UIInterfaceOrientationPortrait
						 * 1:UIInterfaceOrientationPortraitUpsideDown
						 * 2:UIInterfaceOrientationLandscapeLeft
						 * 3:UIInterfaceOrientationLandscapeRight
						 * */
						//偏好方向默认Portrait preferredInterfaceOrientationForPresentation: Number(5),

						clNavigationBackgroundClear: true, //导航栏透明
						clNavigationBackBtnImage: "static/img/close-white.png", //返回按钮图片
						clNavBackBtnAlimentRight: false, //返回按钮居右,设置自定义导航栏返回按钮时，以自定义为准

						clLogoImage: "static/logo1.png", //logo图片


						clLoginBtnText: "本机号码一键登录", //一键登录按钮文字
						clLoginBtnTextColor: [1, 1, 1, 1.0], //rgba
						clLoginBtnBgColor: [0.24, 0.4, 0.8, 1.0], //rgba
						clLoginBtnTextFont: 18 * screenScale,
						clLoginBtnCornerRadius: 10,
						clLoginBtnBorderWidth: 0.5,
						// clLoginBtnBorderColor: [0.2, 0.8, 0.2, 1.0], //rgba 

						clPhoneNumberFont: 40.0 * screenScale, //手机号字体




						clSloganTextColor: [0, 0, 0, 1],
						clAppPrivacyColor: [
							[0, 0, 0, 1.0],
							[0, 1, 0, 1.0]
						], //2 item,commomTextColor and appPrivacyTextColor
						clAppPrivacyTextFont: 11 * screenScale,
						clAppPrivacyTextAlignment: 0, //0: center 1: left 2: right
						clAppPrivacyFirst: ["用户协议", "https://www.baidu.com"], // 2 item, name and url
						clAppPrivacySecond: ["隐私政策", "https://www.sina.com"], // 2 item, name and url

						clCheckBoxVerticalAlignmentToAppPrivacyCenterY: true,
						clCheckBoxSize: [40 * screenScale, 40 * screenScale], //2 item, width and height   //协议框的宽高
						clCheckBoxImageEdgeInsets: [2 * screenScale, 10 * screenScale, 13 * screenScale, 5 *
							screenScale
						], //4 item, top left bottom right
						clCheckBoxUncheckedImage: "static/img/checkbox-multiple-bl@3x.png",
						clCheckBoxCheckedImage: "static/img/checkbox-multiple-ma@3x.png",

						clLoadingSize: [50, 50], //2 item, width and height
						clLoadingTintColor: [0.2, 0.8, 0.2, 1],
						clLoadingBackgroundColor: [1, 1, 1, 1],
						clLoadingCornerRadius: 5,

						//竖屏布局对象
						clOrientationLayOutPortrait: {

							//控件
							clLayoutLogoWidth: clLayoutLogoWidth_Portrait,
							clLayoutLogoHeight: clLayoutLogoHeight_Portrait,
							clLayoutLogoCenterX: clLayoutLogoCenterX_Portrait,
							clLayoutLogoTop: clLayoutLogoTop_Portrait,

							clLayoutPhoneCenterY: clLayoutPhoneCenterY_Portrait,
							clLayoutPhoneHeight: clLayoutPhoneHeight_Portrait,
							clLayoutPhoneLeft: clLayoutPhoneLeft_Portrait,
							clLayoutPhoneRight: clLayoutPhoneRight_Portrait,


							clLayoutLoginBtnCenterY: clLayoutLoginBtnCenterY_Portrait,
							clLayoutLoginBtnHeight: clLayoutLoginBtnHeight_Portrait,
							clLayoutLoginBtnLeft: clLayoutLoginBtnLeft_Portrait,
							clLayoutLoginBtnRight: clLayoutLoginBtnRight_Portrait,


							clLayoutAppPrivacyLeft: clLayoutAppPrivacyLeft_Portrait,
							clLayoutAppPrivacyRight: clLayoutAppPrivacyRight_Portrait,
							clLayoutAppPrivacyBottom: clLayoutAppPrivacyBottom_Portrait,
							clLayoutAppPrivacyHeight: clLayoutAppPrivacyHeight_Portrait,

							clLayoutSloganLeft: clLayoutSloganLeft_Portrait,
							clLayoutSloganRight: clLayoutSloganRight_Portrait,
							clLayoutSloganHeight: clLayoutSloganHeight_Portrait,
							clLayoutSloganBottom: clLayoutSloganBottom_Portrait,
						},

						//自定义控件
						widgets: {
							widget0: {
								widgetId: "customView_nav_left", //字符标记
								type: "Button", // 类型：Button：按钮，ImageView:图片 TextView:文本
								navPosition: "navleft", //按钮位置 navleft:导航栏左侧 ，navright:导航栏右侧（不设置默认添加到授权页上）,当设置为导航栏控件时，仅宽高可设置，位置固定
								textContent: "", //文字
								textFont: 11, //字体
								textColor: [1, 1, 0, 1], //文字颜色[r,g,b,a]
								// backgroundColor: [0,0,1,1],//控件背景色[r,g,b,a]
								image: "static/img/close-black.png",


								// cornerRadius: 10,//圆角，设置圆角时请设置masksToBounds:true
								// masksToBounds:true,//圆角相关

								isFinish: true, //点击销毁授权页,

								// clLayoutLeft:12,
								// clLayoutTop:60,
								// clLayoutRight:-12,
								// clLayoutBottom:-80,
								clLayoutWidth: 40,
								clLayoutHeight: 40,
								// clLayoutCenterX:0,
								// clLayoutCenterY:0,
							},
							widgetnavRight: {
								widgetId: "customView_nav_right", //字符标记
								type: "Button", // 类型：Button：按钮，ImageView:图片 TextView:文本
								navPosition: "navright", //按钮位置 navleft:导航栏左侧 ，navright:导航栏右侧（不设置默认添加到授权页上）,当设置为导航栏控件时，仅宽高可设置，位置固定
								textContent: "", //文字
								textFont: 13, //字体
								textColor: [0, 1, 0, 1], //文字颜色[r,g,b,a]
								backgroundColor: [255, 255, 255, 0], //控件背景色[r,g,b,a]
								image: "static/img/close-white@2x.png",

								cornerRadius: 10, //圆角，设置圆角时请设置masksToBounds:true
								masksToBounds: true, //圆角相关

								isFinish: true, //点击销毁授权页,

								// clLayoutLeft:12,
								// clLayoutTop:60,
								// clLayoutRight:-12,
								// clLayoutBottom:-80,
								clLayoutWidth: 60,
								clLayoutHeight: 40,
								// clLayoutCenterX:0,
								// clLayoutCenterY:0,
							},
							// widget1: {
							// 	widgetId: "customView_one", //字符标记
							// 	type: "Button", // 类型：Button：按钮，ImageView:图片 TextView:文本
							// 	textContent: "自定义控件1（点击销毁授权页）",//文字
							// 	textFont: 13,//字体
							// 	textColor: [0,1,0,1],//文字颜色[r,g,b,a]
							// 	backgroundColor: [0,0,1,1],//控件背景色[r,g,b,a]
							// 	image: "static/img/qq.png",


							// 	cornerRadius: 10,//圆角，设置圆角时请设置masksToBounds:true
							// 	masksToBounds:true,//圆角相关

							// 	isFinish: true,//点击销毁授权页,

							// 	// clLayoutLeft:12,
							// 	// clLayoutTop:60,
							// 	// clLayoutRight:-12,
							// 	clLayoutBottom:-50,
							// 	clLayoutWidth:180,
							// 	clLayoutHeight:50,
							// 	clLayoutCenterX:0,
							// 	// clLayoutCenterY:0,
							// },
							// widget2: {
							// 	widgetId: "customView_two", //字符标记
							// 	type: "Button", // 类型：Button：按钮，ImageView:图片 TextView:文本
							// 	textContent: "其他方式登录",//文字
							// 	textFont: 20,//字体
							// 	textColor: [1,0.5,0.6,1],//文字颜色[r,g,b,a]
							// 	backgroundColor: [0,1,0,1],//控件背景色[r,g,b,a]
							// 	numberOfLines:0, //行数：默认单行， 0:无限，自动换行，其他：指定行数
							// 	textAlignment: 0, //0: center 1: left 2: right //仅TextView有效

							// 	clLayoutLeft:80,
							// 	// clLayoutTop:60,
							// 	clLayoutRight:-80,
							// 	clLayoutBottom:-120,
							// 	clLayoutWidth:150,
							// 	clLayoutHeight:60,
							// 	// clLayoutCenterX:0,
							// 	// // clLayoutCenterY:0,
							// },
							// widget3: {
							// 	//  上方logo的地方
							// 	widgetId: "customView_three_imageView", //字符标记
							// 	type: "ImageView", // 类型：Button：按钮，ImageView:图片 TextView:文本
							// 	image: "static/img/qq.png",
							// 	backgroundColor: [0,1,0,1],//控件背景色[r,g,b,a]

							// 	cornerRadius: 40,//圆角，设置圆角时请设置masksToBounds:true
							// 	masksToBounds:true,//圆角相关

							// 	clLayoutLeft:80,
							// 	clLayoutTop:160,
							// 	clLayoutRight:-80,
							// 	// clLayoutBottom:-280,
							// 	// clLayoutWidth:150,
							// 	clLayoutHeight:80,
							// 	// clLayoutCenterX:0,
							// 	// clLayoutCenterY:0,
							// }
						},
					}

					//设置自定义控件点击回调
					shanYanSDKModule.setCustomInterface((customInterface) => {

						this.shanyan_result = JSON.stringify(customInterface);
						console.log(JSON.stringify(customInterface));

						if (customInterface.widgetId == 'customView_nav_left') {
							uni.reLaunch({
								url: './selectLogin'
							})
						}
					});

					this.shanyan_code = 1000;
					this.shanyan_result = "授权页配置完成";

				}

				//登录
				if (platform == 'android') {
					_this.type = 2
					/*************************Android*************************/
					//闪验SDK  拉起授权页方法
					shanYanSDKModule.openLoginAuth(false,
						result => {
							uni.hideLoading();
							this.shanyan_code = JSON.stringify(result.code);
							this.shanyan_result = JSON.stringify(result.result);
							console.log(JSON.stringify(result));

							if (result.code != 1000) {
								_this.$msg('拉起授权页失败，请返回重试或选择其他登录方式')
								setTimeout(function() {
									uni.reLaunch({
										url: './selectLogin'
									})
								}, 500)
							}

						},
						result => {
							this.shanyan_code = JSON.stringify(result.code);
							this.shanyan_result = JSON.stringify(result.result);
							console.log(JSON.stringify(result));

							if (result.code == 1000) {
								console.log("点击一键登录获取token成功");

								let token = JSON.parse(this.shanyan_result)
								token = JSON.parse(token).token
								console.log(token);

								// let user_info = {
								// 	type: _this.type,
								// 	flash_token: token
								// }

								_this.user.type = _this.type
								_this.user.flash_token = token


								_this.$apiService.login(_this.user).then(res => {

									//  销毁授权页
									shanYanSDKModule.finishAuthActivity();

									console.log(res);
									if (res.code === 2) {
										let phone = res.data
										uni.navigateTo({
											url: './register?type=3' + '&mobile=' + phone
										})
									} else if (res.code === 1) {
										// code 为1  则是用户已经注册过了，直接把token存到本地  然后刷新token
										try {

											let token1 = res.data.userinfo.token
											this.loginIM(res.data.userinfo.mobile)
											uni.setStorageSync('token', token1);
											this.$store.commit('login', res.data.userinfo);
											this.$updateHttpConfig()

											setTimeout(() => {
												uni.switchTab({
													url: '../index/index'
												})

											}, 150)



											console.log(uni.getStorageSync('token'));
										} catch (e) {
											// error
											console.error('保存token失败');
										}


									} else {
										_this.$msg('登录失败，请重试')
										setTimeout(() => {
											uni.reLaunch({
												url: './selectLogin'
											})
										}, 600)
									}
								})




							} else if (result.code == 1011) {
								// 这是里用户自己点击了关闭按钮
								console.log('点击返回按钮');
								uni.reLaunch({
									url: './selectLogin'
								})
							} else {
								console.log('点击一键登录获取token失败');
							}






						});

				} else if (platform == 'ios') {
					_this.type = 1
					/*************************iOS*************************/
					//闪验SDK  拉起授权页方法

					if (this.ios_uiConfigure == null) {
						//debug_test
						uni.showToast({
							icon: "none",
							title: "请先配置UI",
							duration: 3000
						});
						return;
					}

					//一键登录
					shanYanSDKModule.quickAuthLoginWithConfigure(this.ios_uiConfigure,
						openLoginAuthListenerResult => {
							//拉起授权页面回调
							uni.hideLoading();

							//debug_test
							// uni.showToast({
							// 	icon: "none",
							// 	title: JSON.stringify(openLoginAuthListenerResult),
							// 	duration: 3000
							// });

							this.shanyan_code = JSON.stringify(openLoginAuthListenerResult.code);
							this.shanyan_result = JSON.stringify(openLoginAuthListenerResult);
							console.log(JSON.stringify(openLoginAuthListenerResult));

							if (this.shanyan_code.code == 1023) {
								this.$msg('拉起一键登录失败，请重试或者选择其他方式登录')
								setTimeout(() => {
									uni.reLaunch({
										url: './selectLogin'
									})
								}, 500)
							}
						},
						oneKeyLoginListenerResult => {
							uni.hideLoading();
							//点一键登录回调	
							if (oneKeyLoginListenerResult.errorCode != null) {
								if (oneKeyLoginListenerResult.code == 1011) {
									//提示：错误无需提示给用户，可以在用户无感知的状态下直接切换登录方式
									//用户取消登录（点返回）
									//处理建议：如无特殊需求可不做处理，仅作为交互状态回调，此时已经回到当前用户自己的页面
									//点击sdk自带的返回，无论是否设置手动销毁，授权页面都会强制关闭
								} else {
									//处理建议：其他错误代码表示闪验通道无法继续，可以统一走开发者自己的其他登录方式，也可以对不同的错误单独处理
									//关闭授权页
									shanYanSDKModule.finishAuthControllerCompletion(oneKeyLoginListenerResult => {

									});
								}
							} else {
								//SDK获取Token成功
								console.log('token成功：', JSON.stringify(oneKeyLoginListenerResult));
								//此处根据token调用户后台接口获取手机号，获取成功或失败后再调shanYanSDKModule.finishAuthControllerCompletion()关闭页面
								// //关闭授权页
								shanYanSDKModule.finishAuthControllerCompletion(oneKeyLoginListenerResult => {
									//如需跳转，code here:
								});
								let token = oneKeyLoginListenerResult.data.token

								// let user_info = {
								// 	type: _this.type,
								// 	flash_token: token
								// }

								_this.user.type = _this.type
								_this.user.flash_token = token
								// console.log(user_info);
								_this.$apiService.login(_this.user).then(res => {
									console.log(res);
									if (res.code === 2) {
										let phone = res.data
										uni.navigateTo({
											url: './register?type=3' + '&mobile=' + phone
										})
									} else if (res.code === 1) {
										// code 为1  则是用户已经注册过了，直接把token存到本地  然后刷新token
										try {

											this.loginIM(res.data.userinfo.mobile)
											let token1 = res.data.userinfo.token
											uni.setStorageSync('token', token1);
											this.$store.commit('login', res.data.userinfo);
											this.$updateHttpConfig()


											setTimeout(() => {
												uni.switchTab({
													url: '../index/index'
												})
											}, 150)


											console.log(uni.getStorageSync('token'));
										} catch (e) {
											// error
											console.error('保存token失败');
										}


									}
								})




								//debug_test
								// uni.showToast({
								// 	icon: "none",
								// 	title: JSON.stringify(oneKeyLoginListenerResult),
								// 	duration: 3000
								// });
							}

							this.shanyan_code = JSON.stringify(oneKeyLoginListenerResult.code);
							this.shanyan_result = JSON.stringify(oneKeyLoginListenerResult);
							console.log(JSON.stringify(oneKeyLoginListenerResult));
						});
				}

			},
			// 注册
			toRegist() {

				uni.navigateTo({
					url: './register?type=1'
				})
			},



			inputChange(e) {
				// console.log(e, 1234)
				const key = e.currentTarget.dataset.key
				this[key] = e.detail.value
				// console.log(this[key])

			},
			// 忘记密码
			goResetPwd() {
				console.log(1111111)
				uni.navigateTo({
					url: '../mine/resetpwd'
				})
			},

			toLogin() {
				// 先判断是否勾选选了隐私协议
				if (!this.checked) {
					this.$msg('请先勾选同意隐私协议')
					// console.log('勾选用户隐私协议')
					return

				}
				this.type = 3
				this.logining = true
				//判断是否输入了账号和密码
				if (this.mobile == '' || this.password == '') {
					this.$msg('请输入账号或密码')
					return
				}


				// 用户输入账号密码后，将账号密码存到user中
				this.user.mobile = this.mobile
				this.user.password = this.password
				this.user.type = this.type


				//发送请求，核对信息是否正确
				this.$apiService.login(this.user).then(res => {
					console.log(res, 77777)
					// 如果账户不正确
					if (res.code != 1) {
						this.$msg(res.msg)
						this.logining = false
						return
					} else {
						this.$msg(res.msg)
						console.log(res)
						let token = res.data.userinfo.token

						this.$store.commit('login', res.data.userinfo)

						try {
							uni.setStorageSync('token',
								token); //将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口
							setTimeout(() => {
								uni.switchTab({
									url: '../index/index'
								})
							}, 300)

							this.$updateHttpConfig()


							// console.log(uni.getStorageSync('token'), 3333333333);
						} catch (e) {
							// error
							console.error('保存token失败');
						}


					}
				})
			}

		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.container {
		padding-top: 115px;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}

	.wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}

	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}

	.left-top-sign {
		font-size: 120upx;
		color: $page-color-base;
		position: relative;
		left: -16upx;
	}

	.right-top-sign {
		position: absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;

		/* 	&:before,
		&:after {
			display: block;
			content: "";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
	
		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		} */

		&:after {
			/* position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0; */
			/* background: pink; */
		}
	}

	.left-bottom-sign {
		/* position: absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx; */
	}

	.welcome {
		position: relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}

	.input-content {
		padding: 0 60upx;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30upx;
		background: $page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}

		input {
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
	}

	.confirm-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		/* background: $uni-color-primary; */
		color: #fff;
		font-size: $font-lg;

		&:after {
			border-radius: 100px;
		}
	}

	.forget-section {
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}

	.register-section {
		position: absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;

		text {
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>
