<template>
	<view class="inquiry" :class="type=='wz'?'bg':''">
		<view class="content">
			<view class="from">
				<view class="left-title text-white">车辆信息</view>
				<view class="from-content">

					<view class="cu-form-group" v-if="type == 'wz'">
						<view class="title">VIN</view>
						<input type="text" placeholder="请输入VIN" v-model="frameNum" maxlength="17">
					</view>

					<!-- 	<view class="cu-form-group" v-else>
							<view class="title">车大架号</view>
							<input type="text" placeholder="请输入车大架号" v-model="vin">
						</view> -->


					<view class="cu-form-group" v-else>
						<view class="title">VIN</view>
						<input placeholder="请识别行驶证" name="input" v-model="vin" maxlength="17"></input>
						<!-- <button class='cu-btn bg-green shadow' @click="identifyVIN">拍照识别</button> -->
						<!-- <u-icon name="scan" color="#2979ff" size="36" @click="identifyVIN"></u-icon> -->
					</view>

					<view class="cu-form-group margin-top" v-if="type == 'wz'">
						<view class="title">车牌号码</view>
						<input type="text" placeholder="请输入车牌号码" v-model="carNum">
					</view>

					<view class="cu-form-group">
						<view class="title">发动机号</view>
						<input type="text" placeholder="请识别行驶证" v-model="engineNum">
					</view>



					<view class="cu-form-group" v-if="type == 'wb'">
						<view class="title">车主姓名</view>
						<input type="text" placeholder="请识别行驶证" v-model="owner">
					</view>

					<view class="cu-form-group" v-if="type == 'wb'">
						<view class="title">车牌号</view>
						<input type="text" placeholder="请识别行驶证" v-model="carcode">
					</view>


					<view class="cu-form-group" v-if="type == 'wb' && !userStatus">
						<view class="title">身份证号</view>
						<input type="text" placeholder="请输入身份证号" v-model="sfz">
					</view>

					<view class="cu-form-group" v-if="type == 'wb'  && !userStatus">
						<view class="title">真实姓名</view>
						<input type="text" placeholder="请输入真实姓名" v-model="agentname">
					</view>

					<view class="cu-form-group" v-if="type == 'wb'  && !userStatus">
						<view class="title">手签照片</view>
						<input type="text" placeholder="点击进行手签" disabled="true" @click="signature" v-model="autograph1">
					</view>

				</view>


				<view class="footer-btn" v-if="type == 'wb'">
					<view class="padding flex  justify-center">
						<!-- <button class="cu-btn bg-blue lg" @tap="onInquire('base')">基础查询</button>
						<button class="cu-btn bg-blue lg" @tap="onInquire('complex')">综合查询</button> -->

						<button class="cu-btn bg-blue lg" @tap="onInquire('chuxian')">出险查询</button>
					</view>
				</view>

				<view class="footer-btn" v-if="type == 'wz'">
					<view class="padding flex flex-direction">
						<button class="cu-btn bg-yellow lg" @tap="onInquire('confirm')">确认信息并查询</button>

					</view>
				</view>


			</view>



			<view class="tips text-left">
				<rich-text :nodes="tips"></rich-text>
			</view>

			<view class="text-lg text-tips" @click="goChongZhi" v-if="type == 'wb'">
				点击此处，跳转到充值页面
			</view>

		</view>

		<view class="list text-white padding ">
			<view class="" v-if="fuwuList.length == 0">
				暂无查询记录
			</view>

			<view class=" ">
				<view class="padding-sm bg-white border-bt margin-top" v-for="(item, index) in fuwuList" :key="index"
					@tap="goDetail(item)">
					<view class="padding-xs" style="border-bottom: 1rpx solid #ccc;">
						{{ item.create_time }}
					</view>

					<view class="padding-xs">
						<view class="flex justify-between" style="line-height: 34rpx;">
							<view class="text-orange  hphm" style="font-size: 34rpx;">
								{{ item.hphm }}
							</view>
							<view class="text-green hphm">{{item.order_type}}</view>
						</view>
						<view class="" style="padding-top: 10rpx;">查询单号： {{ item.out_trade_no }}</view>
					</view>
					<!-- 	<view class=" flex justify-between">
						<view class="">{{ item.hphm }}</view>
						<view class="">{{ item.create_time }}</view>
					</view>


					<view class="flex justify-between padding-top">
						<view>查询单号： {{ item.out_trade_no }}</view>
						<view class="">{{item.order_type}}</view>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userStatus: false,
				userInfo: {},
				type: 'wb', // 判断是维保 还是违章
				tips: '',
				carNum: '', //车牌号
				engineNum: '', // 发动机号
				frameNum: '', //车大架号
				vin: '',
				orderType: '', //判断是维保 还是违章  请求的时候使用
				payNum: '', //查询所需的金额
				sfz: '',
				owner: '',
				carcode: '',
				autograph1: '',
				agentname: '',
				autograph: '',
				fuwuList: [], // 之前的查询记录
			};
		},

		onLoad(option) {
			uni.$on('ceshiUrl', (res) => {
				console.log(res);
				if (res) {
					// #ifdef APP-PLUS
					let aimg = []
					aimg.push(res.tempFilePath)
					this.uploadc(aimg, 'sign')
					this.autograph1 = '已完成手签'
					// #endif
					// #ifdef H5
					this.autograph = res.tempFilePath
					this.autograph1 = '已完成手签'
					// #endif
				} else {
					this.$msg('请重新签名')
				}

			})
			if (option.from == 'auction') {
				let data = JSON.parse(option.data)
				this.carNum = data.carNum
				this.engineNum = data.engineNum
				this.frameNum = data.frameNum
			}
			console.log(option.type);
			this.type = option.type;
			this.setTitle();
			this.getTips();
			this.init()
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				// this.userInfo = uni.getStorageSync('userInfo') || undefined;
				this.$apiService.getUserInfo().then(res => {
					if (res.code != 1) {
						this.$msg(res.msg);
						return;
					}
					this.userInfo = res.data;
				});
				this.loading = false;
			},
			goChongZhi() {
				let data = {
					money: this.userInfo.money,
					bond: this.userInfo.bond,
					score: this.userInfo.score,
					chuxian: this.userInfo.chuxian
				}

				uni.navigateTo({
					url: '/pages/user/account/recharge?type=chuxian&userinfo=' + JSON.stringify(data)
				})
			},

			async uploadc(imgs, type) {
				console.log(imgs);
				console.log(type);
				uni.showLoading({
					mask: true
				})
				let _this = this
				await new Promise((resolve, rej) => {
					//for (let i = 0; i < imgs.length; i++) {
					let imgUrl = imgs[0];
					uni.uploadFile({
						url: this.$http.config.baseUrl + '/api/common/upload',
						filePath: imgUrl,
						fileType: 'image',
						name: 'file',
						success: uploadFileRes => {
							let uploadImgUrl = JSON.parse(uploadFileRes.data).data.url;
							console.log(uploadImgUrl);
							// return(uploadImgUrl)

							if (type == 'sign') {
								_this.autograph = uploadImgUrl
								console.log(_this.autograph);
								uni.hideLoading()
							} else {
								_this.driving_license = uploadImgUrl
								_this.shibeiVin(uploadImgUrl)
							}
						},
						fail: (e) => {
							rej(e)
							this.$msg('图片上传失败');
						}
					});
					//}
				}).then((uploadImgUrl) => {
					console.log(type);







					// this.shibeiVin(uploadImgUrl)
				}).catch(
					console.log('123123123')
				)
			},

			async identifyVIN() {
				// 上传
				let chooseImage = new Promise((resolve, reject) => {
					uni.chooseImage({
						count: 1, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						success: (res) => {
							// console.log(res);
							// console.log(JSON.stringify(res.tempFilePaths));
							let img = ''
							img = this.uploadc(res.tempFilePaths)
							let imgBase64 = this.image2Base64(res.tempFiles[0])
							console.log(img);
							// resolve(imgBase64)

							resolve(img)
							// console.log(imgBase64);
						},
						fail: (e) => {
							this.$msg(e)
							uni.hideLoading()
						}
					});
				})

				chooseImage.then(res => {
					console.log(res);
					return

				})

			},
			shibeiVin(res) {
				uni.request({
					url: 'https://driving.market.alicloudapi.com/rest/160601/ocr/ocr_vehicle.json',
					header: {
						Authorization: 'APPCODE e90a6b289ed64e4d96e17fa92fc9de8c'
					},
					method: 'POST',
					data: {
						image: res
					},
					success: (res) => {
						res = res.data
						if (res.success) {
							this.vin = res.vin
							this.carcode = res.plate_num
							this.owner = res.owner
							this.engineNum = res.engine_num
						}
						console.log(res);
						uni.hideLoading()
					},
					fail: (e) => {
						this.$msg(e)
						uni.hideLoading()
					}
				})
			},
			async image2Base64(img, index) {
				if (typeof window === 'object' && 'document' in window) {
					console.log(2222222);
					return new Promise((resolve, reject) => {
						var reader = new FileReader();
						reader.readAsDataURL(img)
						reader.onload = (res) => {
							resolve(res.target.result)
						}
					})


				} else if (typeof plus === 'object') {
					console.log(111111);
					// console.log(img,index);
					return new Promise((resolve, reject) => {
						plus.io.resolveLocalFileSystemURL(this.getLocalFilePath(img.path), function(entry) {
							entry.file(function(file) {
								var fileReader = new plus.io.FileReader()
								fileReader.onload = function(data) {
									resolve(data.target.result)
								}
								fileReader.onerror = function(error) {
									console.log(error);
									reject(error)
								}
								fileReader.readAsDataURL(file)
							}, function(error) {
								console.log(error);
								reject(error)
							})
						}, function(error) {
							console.log(error);
							reject(error)
						})
					})

				}

			},

			signature() {
				console.log('签名');
				uni.navigateTo({
					url: './sign'
				})
			},

			init() {
				let param = {

				}
				if (this.type == 'wz') {
					param.type = 0
				} else if (this.type == 'wb') {
					param.type = 1
				}

				this.$apiService.getFuWuListByType(param).then(res => {
					if (res.code != 1) {
						return
					}

					this.fuwuList = res.data.data
				})

				// 获取用户信息
				this.$apiService.getFuWuUserInfo().then(res => {
					console.log(res);
					this.userStatus = res.data.status
				})

			},
			goDetail(item) {
				// uni.navigateTo({
				// 	url: `./result?id=${item.id}&from=list&ordertype=${item.order_type}`
				// })

				if (item.order_type == '违章查询') {
					uni.navigateTo({
						url: `./result?id=${item.id}&from=list&ordertype=${item.order_type}`
					})
				} else if (item.order_type == '出险查询') {

					item.is_chuxian = 1
					item.show_chuxian_type = 'mobile'

					this.$apiService.getFuWuInfo(item).then(res => {

						if (res.code != 1) {
							this.$msg(res.msg)
							return
						}
						if (res.data == '') {
							this.$msg('未获取到链接')
							return
						}

						uni.navigateTo({
							url: `../webview/View/View?id=${item.id}&from=list&ordertype=${item.order_type}&en=${item.frame_num}&url=${res.data}`
						})

					})



				} else {
					uni.navigateTo({
						url: `./wb-result?id=${item.id}&from=list&ordertype=${item.order_type}&en=${item.frame_num}`
					})
				}
			},
			setTitle() {
				let title = ''
				switch (this.type) {
					case 'wz':
						title = '查询违章'
						break;
					case 'wb':
						title = '查询维保'
						break;
					default:
						this.$msg('动态标题设置错误')
						break;
				}

				uni.setNavigationBarTitle({
					title: title
				})
			},
			getTips() {
				let tiptype = '';
				if (this.type == 'wz') {
					tiptype = 'weizhang';
					this.orderType = 0;
				} else if (this.type == 'wb') {
					tiptype = 'chuxian';
					this.orderType = 1;
				} else {
					this.$msg('类型错误');
				}
				let param = {
					name: tiptype
				}
				this.$apiService.getRule(param).then(res => {
					if (res.code != 1) {
						this.$msg(res.msg);
						return;
					}
					this.tips = res.data.content;
				});
			},
			onInquire(op) {

				if (this.type == 'wb') {
					if (!this.carcode) {
						this.$msg('请进行填写或识别行驶证');
						return
					} else if (!this.engineNum) {
						this.$msg('请进行填写或识别行驶证');
						return
					} else if (!this.vin) {
						this.$msg('请进行填写或识别行驶证');
						return
					} else if (!this.driving_license) {
						this.$msg('请识别行驶证');
						return
					} else if (!this.owner) {
						this.$msg('请进行填写或识别行驶证');
						return
					} else if (this.vin.length != 17) {
						this.$msg('VIN码应为17位');
						return
					}

				}


				// 'pay_num': this.payNum,
				// 'order_type': this.orderType,
				// 'carNum': this.carNum,
				// 'engineNum': this.engineNum,
				// 'frameNum': this.frameNum,
				// 'vin': this.vin,
				// 'sfz': this.sfz,
				// 'agentname': this.agentname,
				// 'autograph': this.autograph,
				// 'owner': this.owner,
				// 'carcode': this.carcode,
				// 'driving_license': this.driving_license





				// base  Complex  confirm
				this.$apiService.getFuWuMoney().then(res => {
					if (res.code == 1) {
						if (op == 'base') {
							this.payNum = res.data.weibao_money;
							this.orderType = 1
						} else if (op == 'complex') {
							this.payNum = res.data.zonghe_money;
							this.orderType = 2
							return
						} else if (op == 'confirm') {
							this.orderType = 0
							this.payNum = res.data.weizhang_money;
							return
						} else if (op == 'chuxian') {
							this.orderType = 3
							this.payNum = res.data.chuxian_money;
							return
						} else {
							this.$msg('获取金额失败')
							this.payNum = ''
							return
						}
					} else {
						this.$msg(res.msg)
					}
					console.log(this.payNum);
					return this.payNum
				}).then(() => {
					if (this.userStatus) {
						this.submitOrder()
						return
					}
					if (this.orderType == 3) {

						let userParam = {
							'sfz': this.sfz,
							'agentname': this.agentname,
							'autograph': this.autograph
						}
						console.log(userParam);
						this.$apiService.svaeFuWuUserInfo(userParam).then((res) => {
							console.log(res);
							if (res.code != 1) {
								this.$msg(res.msg)
								throw 'throw error1'
							} else {
								this.submitOrder()
							}


						})
					}
				})
			},

			submitOrder() {
				if (this.payNum == '') {
					return
				}
				let param = {
					'pay_num': this.payNum,
					'order_type': this.orderType,
					'carNum': this.carNum,
					'engineNum': this.engineNum,
					'frameNum': this.frameNum,
					'vin': this.vin,
					'sfz': this.sfz,
					'agentname': this.agentname,
					'autograph': this.autograph,
					'owner': this.owner,
					'carcode': this.carcode,
					'driving_license': this.driving_license
				}

				if (this.type == 'wb') {
					if (this.vin) {
						param.frameNum = this.vin
						param.carNum = this.carcode
					}
				}
				console.log(param);


				this.$apiService.getInquiryOrder(param).then(res => {
					console.log(res);
					if (res.code == 1) {
						let spe = ''
						if (res.data.user_level_special) {
							spe = JSON.stringify(res.data.user_level_special)
						}
						uni.navigateTo({
							url: "../money/pay?order=" + res.data.out_trade_no + '&vin=' + this
								.vin + '&owner=' + this.owner + '&carcode=' + this.carcode +
								'&driving_license=' + this.driving_license + '&pay=' + res.data
								.pay_num + '&num=' + param.carNum + '&engineno=' + param
								.engineNum + '&classno=' + param.frameNum + '&ordertype=' +
								param.order_type + '&type=carinquiry' + '&spe=' + spe
						})

					} else {
						this.$msg(res.msg)
					}
				})
				console.log(111);
			},
			checkInput() {
				//检查输入的数据
				if (!this.carNum) {
					this.$msg('请输入车牌号');
				} else if (!this.engineNum) {
					this.$msg('请输入发动机号');
				} else if (!this.frameNum) {
					this.$msg('请输入车大架号');
				} else {
					return true;
				}

				return false;

			}
		}
	}
</script>

<style lang="scss">
	.inquiry {
		height: 100%;
		min-height: calc(100vh - 44px);
		background-image: url('https://zcp.zhaocaipaipai.com/app/chuxian-back.png');
		background-size: 100%;
		background-color: #0430d4;
		background-repeat: no-repeat;

		.content {
			padding: 550rpx 30rpx 30rpx;
		}

		.tips {
			color: #fff;
			padding-top: 20upx;
		}

		.from {
			position: relative;
			background-color: #fff;
			// border: 1px solid red;
			border-radius: 26upx;

			.left-title {
				position: absolute;
				top: 40rpx;
				left: 0;
				padding: 20rpx 40rpx 20rpx 25rpx;
				background-color: rgb(255, 201, 21);
				border-radius: 0 44rpx 44rpx 0;
				font-weight: bold;
				font-size: 34upx;
			}

			.from-content {
				padding: 100rpx 50rpx 30rpx 50rpx;

				.cu-form-group:last-child {
					border-bottom: 1upx solid #eee;
				}
			}

			.footer-btn {
				.flex-row {
					flex-direction: row;
					justify-content: space-between;

					.cu-btn {
						padding: 0 80upx;
					}
				}
			}
		}
	}

	.bg {
		background-image: url('https://zcp.zhaocaipaipai.com/app/weizhang-back.png');
		background-color: rgb(253, 205, 70);
	}

	.list {}

	.list {
		.border-bt {
			border-bottom: 1upx solid #C0C4CC;
			border-radius: 20upx;
		}

		.hphm {
			font-weight: bold;
		}


	}

	.cu-form-group {
		padding: 0;
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	.text-tips {
		color: #9beb00;
	}
</style>
