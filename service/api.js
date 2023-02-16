import {
	post,
	get,
	postlive,
	getlive
} from './request.js'
export default {
	//时间戳转化为正常时间函数
	timestampTopTime(timeStamp, datetime) {
		let date = new Date(timeStamp * 1000) //时间戳为10位需要*10，时间戳为13位不需要*10
		let Y = date.getFullYear() + '-';
		let M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
		let h = '' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
		let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
		if (datetime) {
			return Y + M + D + h + m + s;
		} else {
			return Y + M + D
		}
	},
	//获取登录信息
	login(param) {
		return postlive("/api/user/login", param)
	},

	// 获取首页数据  轮播  竞拍中车源数量
	getIndexData() {
		return post('/api/home/index')
	},
	//获取场次列表
	getAuctionSessionIndex(param) {
		return post('/api/bidding/auction_session_index', param)
	},
	//获取车辆分类数据
	getCarCate() {
		return post('/api/bidding/car_cate')
	},
	// 获取场次列表
	getAuctionSessionIndex(param) {
		return post('/api/bidding/auction_car_index', param)

	},
	// 获取个人信息
	getUserInfo() {
		return postlive('/api/index/index')
	},
	/**
	 *  根据服务类型查询查询记录 /api/fuwu/fuwuListByType
	 * */
	getFuWuListByType(param) {
		return post("/api/fuwu/fuwuListByType", param)
	},
	getFuWuUserInfo() {
		return post("/api/user/get_user_info")
	},
	/**
	 *  服务订单详情
	 * */
	getFuWuInfo(param) {
		return post("/api/fuwu/fuwuInfo", param)
	},
	// 获取协议
	getRule(param) {
		return post('/api/home/agreement', param)
	},
	/**
	 *  获取查询所需要的金额
	 * */
	getFuWuMoney() {
		return post('/api/fuwu/getMoney')
	},
	svaeFuWuUserInfo(param) {
		return post('/api/user/save_user_info', param)
	},
	/**
	 *  创建服务订单写入交易日志返回订单号 /api/fuwu/setFuwuIndent
	 * */
	getInquiryOrder(param) {
		return post('/api/fuwu/setFuwuIndent', param)
	},


}
