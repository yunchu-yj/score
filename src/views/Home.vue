<script setup>
import Student from '@/views/Student.vue'
</script>
<template>
    <div id="app">
        <!-- 加载状态 -->
        <div v-if="loading" class="loading-overlay">
            <div class="loading-spinner"></div>
        </div>
        
        <div class="page-container">
            <!-- 顶部状态栏 -->
            <header class="header">
                <div class="header-left">
                    <img src= '/src/assets/XHXM/XH.png' alt="校徽" class="logo">
                    <span class="header-title">中南民族大学</span>
                </div>
                <div class="header-right">
                    <div class="user-info">
                        <div class="user-avatar">{{ userInitial }}</div>
                        <span>{{ userName || '加载中...' }}</span>
                    </div>
                    <!-- 管理按钮 - 根据权限显隐 -->
                    <a v-if="showAdminBtn" :href="adminUrl" class="btn-admin">
                        管理
                    </a>
                </div>
            </header>
            
            <!-- 中间内容区域 -->
            <main class="main-content">
                <div class="content-area">
                    <!-- ========== 此处填充页面内容 ========== -->
                    <div class="placeholder-text">
                        <Student />
                    </div>
                    <!-- ========== 内容填充区域结束 ========== -->
                </div>
            </main>
            
            <!-- 底部状态栏 -->
            <footer class="footer">
                ©2026 Power by 双零团队
            </footer>
        </div>
    </div>
</template>
<style scoped>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body {
            height: 100%;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
        }
        
        /* 页面整体布局 */
        .page-container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            padding-top: 64px; /* 为固定header留出空间 */
        }
        
        /* 顶部状态栏 - 浅蓝色 固定 */
        .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
            background: linear-gradient(135deg, #409EFF 0%, #66b1ff 100%);
            padding: 12px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
        }
        
        .header-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .logo {
            height: 40px;
            width: auto;
        }
        
        .header-title {
            color: white;
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 1px;
        }
        
        .header-right {
            display: flex;
            align-items: center;
            gap: 16px;
        }
        
        .user-info {
            display: flex;
            align-items: center;
            gap: 8px;
            color: white;
            font-size: 14px;
        }
        
        .user-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
        }
        
        .btn-admin {
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 4px;
            color: white;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
        }
        
        .btn-admin:hover {
            background: rgba(255, 255, 255, 0.3);
            border-color: white;
        }
        
        /* 中间内容区域 - 留白 */
        .main-content {
            flex: 1;
            background: #f5f7fa;
            padding: 20px;
        }
        
        .content-area {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            min-height: calc(100vh - 160px);
            padding: 24px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        }
        
        .placeholder-text {
            color: #909399;
            text-align: center;
            padding: 60px 20px;
            font-size: 16px;
        }
        
        /* 底部状态栏 - 浅蓝色 */
        .footer {
            background: linear-gradient(135deg, #409EFF 0%, #66b1ff 100%);
            padding: 16px 24px;
            text-align: center;
            color: white;
            font-size: 14px;
            box-shadow: 0 -2px 8px rgba(64, 158, 255, 0.3);
        }
        
        /* 加载状态 */
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #409EFF;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* 响应式设计 */
        @media (max-width: 768px) {
            .page-container {
                padding-top: 52px; /* 移动端header更矮 */
            }
            .header {
                padding: 10px 16px;
            }
            .header-title {
                font-size: 14px;
            }
            .logo {
                height: 32px;
            }
            .user-info span {
                display: none;
            }
            .btn-admin {
                padding: 6px 12px;
                font-size: 12px;
            }
            .content-area {
                padding: 16px;
                min-height: calc(100vh - 140px);
            }
        }
</style>>