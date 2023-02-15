import Request from './luch-request/request.js'
const http = new Request()


//配置参数
http.setConfig((config) => {
	/* config 为默认全局配置*/
	let deviceType = uni.getStorageSync("device_type") || '';
	let token = uni.getStorageSync("token") || '';
	config.baseUrl = 'https://zcp.zhaocaipaipai.com'; /* 根域名 */

	config.header = {
		// 'XX-Device-Type': deviceType,
		'Token': token
	}

	return config;
})


// 响应拦截器
http.interceptor.response((response) => {
	/* 对响应成功做点什么 （statusCode === 200），必须return response*/

	if (response.data.code === 10001) {

		uni.reLaunch({
			url: '../pages/public/login'
		});
	}

	if (response.data.code === 401) {
		uni.reLaunch({
			url: '/pages/public/selectLogin'
		});
	}
	return response;
}, (response) => {
	/*  对响应错误做点什么 （statusCode !== 200），必须return response*/

	return response;
})




export function post(url, param) {
	return http.post(url, param).then(res => {
		return new Promise((resolve, reject) => {
			resolve(res.data);
		})
	}).catch(err => {

		uni.showToast({
			title: "网络请求失败，请稍后再试",
			icon: "none"
		});
	})
}



export function get(url, param) {
	return http.get(url, param).then(res => {
		return new Promise((resolve, reject) => {
			resolve(res.data);
		})
	}).catch(err => {

		uni.showToast({
			title: "网络请求失败，请稍后再试",
			icon: "none"
		});
	})
}


const httplive = new Request()

//配置参数
httplive.setConfig((config) => {
	/* config 为默认全局配置*/
	let deviceType = uni.getStorageSync("device_type") || '';
	let token = uni.getStorageSync("token") || '';
	config.baseUrl = 'https://zcp.zhaocaipaipai.com'; /* 根域名 */
	config.header = {
		// 'XX-Device-Type': deviceType,
		'Token': token
	}
	// console.log("请求基础配置：");
	// console.log(config);
	return config;
})


// 响应拦截器
httplive.interceptor.response((response) => {
	/* 对响应成功做点什么 （statusCode === 200），必须return response*/
	console.log(response);

	if (response.data.code === 10001) {
		uni.reLaunch({
			url: '../pages/public/login'
		});
	}

	if (response.data.code === 401) {
		uni.reLaunch({
			url: '../pages/public/selectLogin.vue'
		});
	}
	return response;
}, (response) => {
	/*  对响应错误做点什么 （statusCode !== 200），必须return response*/
	// console.error('statusCode != 200');
	// console.error(response);
	return response;
})






export function postlive(url, param) {
	return httplive.post(url, param).then(res => {
		return new Promise((resolve, reject) => {
			resolve(res.data);
		})
	}).catch(err => {
		// console.error("请求错误：");
		// console.error("错误Api:" + url);
		// console.error("错误详情：");
		// console.error(err);
		uni.showToast({
			title: "网络请求失败，请稍后再试",
			icon: "none"
		});
	})
}



export function getlive(url, param) {
	return httplive.get(url, param).then(res => {
		return new Promise((resolve, reject) => {
			resolve(res.data);
		})
	}).catch(err => {
		// console.error("请求错误：");
		// console.error("错误Api:" + url);
		// console.error("错误详情：");
		// console.error(err);
		uni.showToast({
			title: "网络请求失败，请稍后再试",
			icon: "none"
		});
	})
}

export {
	http,
	httplive
}
