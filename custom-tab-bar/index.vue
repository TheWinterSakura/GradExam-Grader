<template>
	<view class="tab-bar">
		<view 
			v-for="(item, index) in list" 
			:key="index" 
			class="tab-bar-item" 
			@click="switchTab(index)"
		>
			<text 
				:style="{color: selected === index ? selectedColor : color}" 
				class="tab-text"
				:class="{'active': selected === index}"
			>
				{{ item.text }}
			</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			color: '#7A7E83',
			selectedColor: '#007AFF',
			selected: 0,
			list: [
				{
					pagePath: '/pages/index/index',
					iconPath: 'home',
					selectedIconPath: 'home-filled',
					text: '首页'
				},
				{
					pagePath: '/pages/message/message',
					iconPath: 'chat',
					selectedIconPath: 'chat-filled',
					text: '消息'
				},
				{
					pagePath: '/pages/note/note',
					iconPath: 'compose',
					selectedIconPath: 'compose',
					text: '笔记'
				},
				{
					pagePath: '/pages/mine/mine',
					iconPath: 'contact',
					selectedIconPath: 'contact-filled',
					text: '我'
				}
			]
		}
	},
	created() {
		this.updateSelected()
	},
	methods: {
		switchTab(index) {
			const item = this.list[index]
			uni.switchTab({
				url: item.pagePath
			})
			this.selected = index
		},
		updateSelected() {
			const pages = getCurrentPages()
			const currentPage = pages[pages.length - 1]
			const currentPath = '/' + currentPage.route
			
			this.selected = this.list.findIndex(item => item.pagePath === currentPath)
			if (this.selected === -1) {
				this.selected = 0
			}
		}
	},
	onShow() {
		this.updateSelected()
	}
}
</script>

<style lang="scss" scoped>
.tab-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 50px;
	background-color: #ffffff;
	display: flex;
	border-top: 1px solid #e5e5e5;
	padding-bottom: env(safe-area-inset-bottom);
	z-index: 9999;
}

.tab-bar-item {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}

.tab-text {
	font-size: 18px;
	font-weight: normal;
	transition: all 0.3s;
}

.tab-text.active {
	font-weight: bold;
	font-size: 19px;
}
</style>
