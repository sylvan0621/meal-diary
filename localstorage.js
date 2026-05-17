/**
 * 纯前端数据存储管理器
 * 所有数据保存在 localStorage 中，无需后端服务
 */

const STORAGE_KEY_USERS = 'mealDiaryUsers';
const STORAGE_KEY_MEALS = 'mealDiaryMeals';

// 获取所有用户
function getAllUsers() {
    const usersStr = localStorage.getItem(STORAGE_KEY_USERS);
    return usersStr ? JSON.parse(usersStr) : [];
}

// 获取所有记录
function getAllMeals() {
    const mealsStr = localStorage.getItem(STORAGE_KEY_MEALS);
    return mealsStr ? JSON.parse(mealsStr) : [];
}

// 保存用户
function saveUser(user) {
    const users = getAllUsers();
    const existingIndex = users.findIndex(u => u.uid === user.uid);
    
    if (existingIndex >= 0) {
        users[existingIndex] = { ...users[existingIndex], ...user };
    } else {
        users.push(user);
    }
    
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    return true;
}

// 保存记录
function saveMeal(meal) {
    const meals = getAllMeals();
    meals.push(meal);
    localStorage.setItem(STORAGE_KEY_MEALS, JSON.stringify(meals));
    return true;
}

// 获取当前用户
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
        try {
            return JSON.parse(userStr);
        } catch (e) {
            return null;
        }
    }
    return null;
}

// 设置当前用户
function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// 是否为游客
function isGuest() {
    const user = getCurrentUser();
    return user ? user.isGuest : false;
}

// 是否已登录
function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

// 获取用户ID
function getUserId() {
    const user = getCurrentUser();
    return user ? user.uid : null;
}

// 登出
function logout() {
    localStorage.removeItem('currentUser');
}

// 注册用户（手机号）
function registerUser(phone, nickname) {
    const users = getAllUsers();
    const existingUser = users.find(u => u.phone === phone);
    
    if (existingUser) {
        // 如果已存在，更新登录时间
        existingUser.lastLogin = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
        setCurrentUser(existingUser);
        return { success: true, user: existingUser, isNew: false };
    }
    
    // 创建新用户
    const newUser = {
        uid: 'user_' + Date.now(),
        phone: phone,
        displayName: nickname || '用户' + phone.slice(-4),
        isGuest: false,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
    };
    
    saveUser(newUser);
    setCurrentUser(newUser);
    return { success: true, user: newUser, isNew: true };
}

// 创建游客用户
function createGuestUser() {
    const guestUser = {
        isGuest: true,
        uid: 'guest_' + Date.now(),
        displayName: '游客',
        phone: null,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
    };
    
    setCurrentUser(guestUser);
    return guestUser;
}

// 获取统计数据
function getStats() {
    const users = getAllUsers();
    const meals = getAllMeals();
    
    const today = new Date().toISOString().split('T')[0];
    const todayMeals = meals.filter(m => m.date === today);
    const todayUsers = new Set(todayMeals.map(m => m.userId)).size;
    
    return {
        totalUsers: users.length,
        totalRecords: meals.length,
        todayRecords: todayMeals.length,
        activeUsers: todayUsers
    };
}

// 获取分类统计
function getCategoryStats() {
    const meals = getAllMeals();
    const counts = { hudun: 0, health: 0, feast: 0, takeout: 0 };
    
    meals.forEach(meal => {
        if (meal.tag && counts.hasOwnProperty(meal.tag)) {
            counts[meal.tag]++;
        }
    });
    
    return counts;
}

// 删除记录
function deleteMeal(mealId) {
    const meals = getAllMeals();
    const filtered = meals.filter(m => m.id !== mealId);
    localStorage.setItem(STORAGE_KEY_MEALS, JSON.stringify(filtered));
    return true;
}



// 检查是否为管理员（本地配置）
function checkAdmin(userId) {
    // 默认第一个注册的用户为管理员
    const users = getAllUsers();
    return users.length > 0 && users[0].uid === userId;
}

// 导出模块
window.LocalStorageManager = {
    getUser: getCurrentUser,
    setUser: setCurrentUser,
    isGuest: isGuest,
    isLoggedIn: isLoggedIn,
    getUserId: getUserId,
    logout: logout,
    saveUser: saveUser,
    saveMeal: saveMeal,
    getAllMeals: getAllMeals,
    deleteMeal: deleteMeal,
    getStats: getStats,
    getCategoryStats: getCategoryStats,
    getAllUsers: getAllUsers,
    registerUser: registerUser,
    createGuestUser: createGuestUser,
    checkAdmin: checkAdmin
};
