<template>
	<view class="tab-bar">
		<view
			v-for="(item, index) in list"
			:key="index"
			class="tab-bar-item"
			@click="switchTab(index)"
		>
			<view class="tab-icon-wrap" :class="{ active: selected === index }">
				<uni-icons
					:type="selected === index ? item.selectedIcon : item.icon"
					:size="22"
					:color="selected === index ? selectedColor : color"
				></uni-icons>
			</view>
			<text
				class="tab-text"
				:class="{ active: selected === index }"
			>{{ item.text }}</text>
		</view>
	</view>
</template>

<script>
	// 显式引入 uni-icons 以确保在微信小程序中可用
	import uniIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue'

	export default {
		components: { uniIcons },
		data() {
			return {
				color: '#9CA3AF',
				selectedColor: '#4F6EF7',
				selected: 0,
				list: [
					{
						pagePath: '/pages/index/index',
						icon: 'home',
						selectedIcon: 'home-filled',
						text: '首页'
					},
					{
						pagePath: '/pages/message/message',
						icon: 'chat',
						selectedIcon: 'chat-filled',
						text: '消息'
					},
					{
						pagePath: '/pages/note/note',
						icon: 'compose',
						selectedIcon: 'compose-filled',
						text: '笔记'
					},
					{
						pagePath: '/pages/mine/mine',
						icon: 'contact',
						selectedIcon: 'contact-filled',
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
				if (pages.length === 0) return
				const currentPage = pages[pages.length - 1]
				const currentPath = '/' + currentPage.route
				const idx = this.list.findIndex(item => item.pagePath === currentPath)
				if (idx !== -1) {
					this.selected = idx
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
	height: 52px;
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	padding-bottom: env(safe-area-inset-bottom);
	z-index: 9999;
	box-shadow: 0 -1px 8px rgba(0, 0, 0, 0.04);
}

.tab-bar-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 2px;
	padding: 4px 0;
}

.tab-icon-wrap {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 44px;
	height: 28px;
	border-radius: 14px;
	transition: all 0.25s ease;
}

.tab-icon-wrap.active {
	background-color: rgba(79, 110, 247, 0.08);
}

.tab-text {
	font-size: 10px;
	color: #9CA3AF;
	transition: all 0.25s ease;
}

.tab-text.active {
	color: #4F6EF7;
	font-weight: 600;
}
</style>
