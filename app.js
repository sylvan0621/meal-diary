/**
 * 今天有在好好吃饭吗 - 深绿自然系版本 v8
 * 更新：Firebase 云端同步、用户登录支持
 */

const STORAGE_KEY = 'mealDiaryV8';

const TAG_CONFIG = {
    hudun:   { name: '糊弄', icon: 'bowl', label: '糊弄餐' },
    health:  { name: '健康', icon: 'leaf', label: '健康餐' },
    feast:   { name: '大餐', icon: 'hotpot', label: '大餐仪式' },
    takeout: { name: '外卖', icon: 'pizza', label: '外卖快乐' }
};

// 简明图标：简单形状+文字，更易辨认
const SVG_ICONS = {
    instant: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <rect x="10" y="14" width="28" height="24" rx="4" fill="currentColor" opacity="0.15"/>
        <line x1="16" y1="26" x2="32" y2="26" stroke-width="3"/>
        <line x1="16" y1="32" x2="32" y2="32" stroke-width="3"/>
    </svg>`,
    
    bowl: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <path d="M6 22c0 14 10 18 18 18s18-4 18-18H6z" fill="currentColor" opacity="0.15"/>
        <ellipse cx="24" cy="22" rx="18" ry="5"/>
        <ellipse cx="24" cy="28" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
    </svg>`,
    
    dumpling: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <ellipse cx="24" cy="28" rx="14" ry="10" fill="currentColor" opacity="0.15"/>
        <path d="M12 26c4-6 16-6 24 0"/>
        <path d="M16 24v4c0 2 3 4 8 4s8-2 8-4v-4"/>
    </svg>`,
    
    egg: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <ellipse cx="24" cy="26" rx="14" ry="16" fill="currentColor" opacity="0.15"/>
        <ellipse cx="24" cy="28" rx="7" ry="7" fill="currentColor" opacity="0.25"/>
    </svg>`,
    
    sandwich: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <path d="M8 14h32v8H8z" fill="currentColor" opacity="0.25"/>
        <path d="M8 24h32v6H8z" fill="currentColor" opacity="0.15"/>
        <path d="M8 32h32v8H8z" fill="currentColor" opacity="0.25"/>
    </svg>`,
    
    sausage: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <rect x="8" y="18" width="32" height="12" rx="6" fill="currentColor" opacity="0.2"/>
        <line x1="16" y1="18" x2="16" y2="30" stroke-width="3"/>
        <line x1="24" y1="18" x2="24" y2="30" stroke-width="3"/>
        <line x1="32" y1="18" x2="32" y2="30" stroke-width="3"/>
    </svg>`,
    
    burger: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <path d="M8 14h32a2 2 0 0 1 2 2v4H6v-4a2 2 0 0 1 2-2z" fill="currentColor" opacity="0.3"/>
        <rect x="8" y="22" width="32" height="6" fill="currentColor" opacity="0.2"/>
        <path d="M6 30h36v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-6z" fill="currentColor" opacity="0.25"/>
        <circle cx="14" cy="15" r="1.5" fill="currentColor"/>
        <circle cx="24" cy="15" r="1.5" fill="currentColor"/>
        <circle cx="34" cy="15" r="1.5" fill="currentColor"/>
    </svg>`,
    
    takeoutBox: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <rect x="8" y="16" width="32" height="24" rx="3" fill="currentColor" opacity="0.12"/>
        <path d="M14 16V10l10-4 10 4v6"/>
        <line x1="14" y1="26" x2="34" y2="26"/>
        <line x1="14" y1="32" x2="34" y2="32"/>
    </svg>`,
    
    bento: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <rect x="8" y="8" width="32" height="32" rx="4" fill="currentColor" opacity="0.1"/>
        <line x1="24" y1="8" x2="24" y2="40"/>
        <line x1="8" y1="24" x2="40" y2="24"/>
        <rect x="11" y="11" width="10" height="10" rx="2" fill="currentColor" opacity="0.2"/>
        <rect x="27" y="11" width="10" height="10" rx="2" fill="currentColor" opacity="0.2"/>
        <rect x="11" y="27" width="10" height="10" rx="2" fill="currentColor" opacity="0.2"/>
        <rect x="27" y="27" width="10" height="10" rx="2" fill="currentColor" opacity="0.2"/>
    </svg>`,
    
    porridge: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <path d="M8 20c0 12 10 16 16 16s16-4 16-16H8z" fill="currentColor" opacity="0.12"/>
        <ellipse cx="24" cy="20" rx="14" ry="4"/>
        <ellipse cx="20" cy="28" rx="4" ry="3" fill="currentColor" opacity="0.2"/>
        <ellipse cx="28" cy="30" rx="3" ry="2" fill="currentColor" opacity="0.15"/>
    </svg>`,
    
    salad: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <ellipse cx="24" cy="32" rx="16" ry="10" fill="currentColor" opacity="0.12"/>
        <path d="M10 28c6-12 14-16 14-16s8 4 14 16" fill="currentColor" opacity="0.18"/>
        <circle cx="16" cy="26" r="4" fill="currentColor" opacity="0.25"/>
        <circle cx="32" cy="28" r="3" fill="currentColor" opacity="0.2"/>
    </svg>`,
    
    leaf: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <path d="M24 44c-16 0-20-16-20-28 10 10 20 6 20 28z" fill="currentColor" opacity="0.15"/>
        <path d="M24 44c16 0 20-16 20-28-10 10-20 6-20 28z" fill="currentColor" opacity="0.1"/>
        <line x1="24" y1="8" x2="24" y2="44" stroke-width="2.5"/>
        <path d="M18 22c4 4 6 4 6 0" stroke-width="2"/>
    </svg>`,
    
    broccoli: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <circle cx="16" cy="18" r="10" fill="currentColor" opacity="0.15"/>
        <circle cx="32" cy="18" r="10" fill="currentColor" opacity="0.15"/>
        <circle cx="24" cy="12" r="10" fill="currentColor" opacity="0.2"/>
        <line x1="24" y1="24" x2="24" y2="40"/>
        <line x1="18" y1="40" x2="30" y2="40"/>
    </svg>`,
    
    carrot: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <path d="M22 12L16 42l16-4-4-26z" fill="currentColor" opacity="0.12"/>
        <path d="M20 12c-2-8 2-10 4-10s6 2 4 10" fill="currentColor" opacity="0.15"/>
        <line x1="24" y1="22" x2="22" y2="36" stroke-width="2"/>
        <line x1="28" y1="20" x2="26" y2="34" stroke-width="2"/>
    </svg>`,
    
    avocado: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <ellipse cx="24" cy="26" rx="14" ry="18" fill="currentColor" opacity="0.1"/>
        <circle cx="24" cy="24" r="8" fill="currentColor" opacity="0.25"/>
    </svg>`,
    
    apple: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <path d="M24 12c-10 0-14 10-14 18 0 10 8 14 14 14s14-4 14-14c0-8-4-18-14-18z" fill="currentColor" opacity="0.12"/>
        <line x1="24" y1="8" x2="24" y2="14"/>
        <path d="M28 10c2 0 4 2 4 4"/>
    </svg>`,
    
    kiwi: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <circle cx="24" cy="24" r="18" fill="currentColor" opacity="0.1"/>
        <circle cx="24" cy="24" r="12"/>
        <circle cx="24" cy="24" r="6" fill="currentColor" opacity="0.15"/>
        <line x1="24" y1="12" x2="24" y2="18" stroke-width="2"/>
        <line x1="24" y1="30" x2="24" y2="36" stroke-width="2"/>
        <line x1="12" y1="24" x2="18" y2="24" stroke-width="2"/>
        <line x1="30" y1="24" x2="36" y2="24" stroke-width="2"/>
    </svg>`,
    
    shrimp: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <path d="M38 36c0-12-8-18-18-18 8 4 12 16 8 24 6-2 10-4 10-6z" fill="currentColor" opacity="0.12"/>
        <circle cx="28" cy="28" r="3" fill="currentColor" opacity="0.2"/>
    </svg>`,
    
    fish: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <path d="M6 24c0-12 16-14 36 0-16 14-36 14-36 0z" fill="currentColor" opacity="0.12"/>
        <path d="M38 24l8-6v12z" fill="currentColor" opacity="0.15"/>
        <circle cx="14" cy="24" r="4" fill="currentColor" opacity="0.2"/>
    </svg>`,
    
    eggBoiled: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <ellipse cx="24" cy="26" rx="14" ry="16" fill="currentColor" opacity="0.12"/>
        <circle cx="24" cy="26" r="9" fill="currentColor" opacity="0.2"/>
        <circle cx="24" cy="26" r="5" fill="currentColor" opacity="0.35"/>
    </svg>`,
    
    hotpot: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <rect x="10" y="20" width="28" height="20" rx="4" fill="currentColor" opacity="0.1"/>
        <ellipse cx="24" cy="20" rx="14" ry="5"/>
        <path d="M18 12c4 5 12 5 12 0" stroke-width="2"/>
        <circle cx="18" cy="30" r="4" fill="currentColor" opacity="0.2"/>
        <circle cx="30" cy="30" r="4" fill="currentColor" opacity="0.2"/>
    </svg>`,
    
    stew: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <path d="M10 18h28v14a4 4 0 01-4 4H14a4 4 0 01-4-4V18z" fill="currentColor" opacity="0.1"/>
        <ellipse cx="24" cy="18" rx="14" ry="5"/>
        <circle cx="18" cy="28" r="5" fill="currentColor" opacity="0.15"/>
        <circle cx="30" cy="28" r="5" fill="currentColor" opacity="0.15"/>
    </svg>`,
    
    meat: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <ellipse cx="24" cy="24" rx="18" ry="14" fill="currentColor" opacity="0.1"/>
        <circle cx="18" cy="22" r="5" fill="currentColor" opacity="0.15"/>
        <path d="M40 20c4 0 6 3 6 6s-2 4-4 4"/>
    </svg>`,
    
    steak: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <path d="M6 26c0-12 10-14 18-14s18 2 18 14c0 8-10 14-18 14s-18-6-18-14z" fill="currentColor" opacity="0.12"/>
        <path d="M16 18c6-4 16-4 20 0" stroke-width="2"/>
        <circle cx="20" cy="26" r="3" fill="currentColor" opacity="0.2"/>
        <circle cx="28" cy="26" r="3" fill="currentColor" opacity="0.2"/>
    </svg>`,
    
    crab: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <ellipse cx="24" cy="30" rx="14" ry="10" fill="currentColor" opacity="0.1"/>
        <circle cx="16" cy="18" r="6" fill="currentColor" opacity="0.15"/>
        <circle cx="32" cy="18" r="6" fill="currentColor" opacity="0.15"/>
        <path d="M10 26c-4-4-6-10-4-14"/>
        <path d="M38 26c4-4 6-10 4-14"/>
        <circle cx="6" cy="14" r="4" fill="currentColor" opacity="0.2"/>
        <circle cx="42" cy="14" r="4" fill="currentColor" opacity="0.2"/>
    </svg>`,
    
    wine: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <path d="M16 8h16l-3 22c0 5-5 8-5 8s-5-3-5-8L16 8z" fill="currentColor" opacity="0.08"/>
        <line x1="24" y1="38" x2="24" y2="44"/>
        <line x1="14" y1="44" x2="34" y2="44"/>
    </svg>`,
    
    cake: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <rect x="10" y="18" width="28" height="22" rx="3" fill="currentColor" opacity="0.1"/>
        <path d="M10 18c5-10 23-10 28 0"/>
        <line x1="24" y1="6" x2="24" y2="14" stroke-width="2"/>
        <circle cx="24" cy="4" r="3" fill="currentColor" opacity="0.25"/>
        <line x1="14" y1="28" x2="34" y2="28"/>
        <line x1="14" y1="34" x2="34" y2="34"/>
    </svg>`,
    
    sushi: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <ellipse cx="24" cy="30" rx="18" ry="10" fill="currentColor" opacity="0.1"/>
        <ellipse cx="24" cy="26" rx="14" ry="6" fill="currentColor" opacity="0.08"/>
        <ellipse cx="24" cy="26" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
    </svg>`,
    
    cheers: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <path d="M14 10h6v20c0 5-3 8-3 8s-3-3-3-8V10z" fill="currentColor" opacity="0.08"/>
        <path d="M28 10h6v20c0 5-3 8-3 8s-3-3-3-8V10z" fill="currentColor" opacity="0.08"/>
        <line x1="10" y1="42" x2="38" y2="42"/>
    </svg>`,
    
    pizza: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <path d="M24 6L6 44h36L24 6z" fill="currentColor" opacity="0.1"/>
        <circle cx="24" cy="32" r="10" fill="currentColor" opacity="0.12"/>
        <circle cx="18" cy="38" r="4" fill="currentColor" opacity="0.2"/>
        <circle cx="30" cy="38" r="4" fill="currentColor" opacity="0.2"/>
    </svg>`,
    
    chicken: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <path d="M14 12c-4 4-4 18 0 26 10 4 20 4 24 0 4-8 4-22 0-26-10-4-20-4-24 0z" fill="currentColor" opacity="0.1"/>
        <path d="M20 22c4-3 12-3 16 0" stroke-width="2"/>
        <line x1="14" y1="34" x2="8" y2="40"/>
        <line x1="34" y1="34" x2="40" y2="40"/>
    </svg>`,
    
    fries: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <rect x="12" y="22" width="24" height="18" rx="3" fill="currentColor" opacity="0.1"/>
        <rect x="16" y="8" width="4" height="16" fill="currentColor" opacity="0.2"/>
        <rect x="22" y="6" width="4" height="18" fill="currentColor" opacity="0.2"/>
        <rect x="28" y="8" width="4" height="16" fill="currentColor" opacity="0.2"/>
    </svg>`,
    
    taco: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <path d="M6 38c5-18 10-24 18-24s13 6 18 24" fill="currentColor" opacity="0.1"/>
        <path d="M10 34c6-2 18-2 28 0" stroke-width="2"/>
        <circle cx="20" cy="30" r="4" fill="currentColor" opacity="0.15"/>
        <circle cx="28" cy="30" r="4" fill="currentColor" opacity="0.15"/>
    </svg>`,
    
    burrito: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <rect x="8" y="14" width="32" height="24" rx="12" fill="currentColor" opacity="0.1"/>
        <line x1="12" y1="24" x2="36" y2="24"/>
        <line x1="12" y1="30" x2="36" y2="30"/>
    </svg>`,
    
    box: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <rect x="10" y="14" width="28" height="26" rx="3" fill="currentColor" opacity="0.08"/>
        <path d="M10 20l14-8 14 8"/>
        <line x1="14" y1="28" x2="34" y2="28"/>
        <line x1="14" y1="34" x2="34" y2="34"/>
    </svg>`,
    
    riceBox: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <rect x="8" y="12" width="32" height="28" rx="3" fill="currentColor" opacity="0.08"/>
        <line x1="8" y1="22" x2="40" y2="22"/>
        <circle cx="16" cy="18" r="4" fill="currentColor" opacity="0.15"/>
        <circle cx="32" cy="18" r="4" fill="currentColor" opacity="0.15"/>
        <circle cx="24" cy="32" r="6" fill="currentColor" opacity="0.2"/>
    </svg>`,
    
    curry: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <path d="M10 18h28v14a4 4 0 01-4 4H14a4 4 0 01-4-4V18z" fill="currentColor" opacity="0.1"/>
        <ellipse cx="24" cy="18" rx="12" ry="4"/>
        <circle cx="20" cy="28" r="4" fill="currentColor" opacity="0.15"/>
        <circle cx="28" cy="28" r="4" fill="currentColor" opacity="0.15"/>
    </svg>`,
    
    pasta: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <ellipse cx="24" cy="30" rx="18" ry="12" fill="currentColor" opacity="0.1"/>
        <ellipse cx="24" cy="26" rx="14" ry="7"/>
        <circle cx="24" cy="30" r="6" fill="currentColor" opacity="0.2"/>
    </svg>`,
    
    drink: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <path d="M16 12h16l-4 28h-8L16 12z" fill="currentColor" opacity="0.08"/>
        <line x1="14" y1="18" x2="34" y2="18"/>
        <line x1="20" y1="8" x2="18" y2="14" stroke-width="2"/>
        <line x1="28" y1="8" x2="30" y2="14" stroke-width="2"/>
        <circle cx="20" cy="28" r="2" fill="currentColor" opacity="0.15"/>
        <circle cx="28" cy="32" r="2" fill="currentColor" opacity="0.15"/>
    </svg>`,
    
    utensils: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <line x1="16" y1="8" x2="16" y2="38"/>
        <path d="M16 8c0-4 4-5 4 0"/>
        <line x1="28" y1="8" x2="28" y2="38"/>
        <path d="M28 8c0-4 4-5 4 0"/>
        <line x1="18" y1="16" x2="26" y2="16"/>
        <circle cx="18" cy="36" r="3" fill="currentColor" opacity="0.15"/>
        <circle cx="30" cy="36" r="3" fill="currentColor" opacity="0.15"/>
    </svg>`,
    
    bentoSmall: `<svg viewBox="0 0 48 48" stroke="currentColor" stroke-width="2.5">
        <rect x="10" y="10" width="28" height="28" rx="4" fill="currentColor" opacity="0.08"/>
        <line x1="24" y1="10" x2="24" y2="38"/>
        <line x1="10" y1="24" x2="38" y2="24"/>
    </svg>`
};

// 每个标签对应的食物图标
const FOOD_ICONS = {
    hudun: ['instant', 'bowl', 'dumpling', 'egg', 'sandwich', 'sausage', 'burger', 'takeoutBox', 'bento', 'porridge'],
    health: ['salad', 'leaf', 'broccoli', 'carrot', 'avocado', 'apple', 'kiwi', 'shrimp', 'fish', 'eggBoiled'],
    feast: ['hotpot', 'stew', 'meat', 'steak', 'crab', 'wine', 'cake', 'sushi', 'cheers'],
    takeout: ['pizza', 'chicken', 'fries', 'taco', 'burrito', 'box', 'riceBox', 'curry', 'pasta', 'drink']
};

// 图标对应的中文名称
const ICON_NAMES = {
    instant: '泡面', bowl: '米饭', dumpling: '饺子', egg: '鸡蛋', sandwich: '三明治', sausage: '香肠', burger: '汉堡', takeoutBox: '外卖盒', bento: '便当', porridge: '粥',
    salad: '沙拉', leaf: '青菜', broccoli: '西兰花', carrot: '胡萝卜', avocado: '牛油果', apple: '苹果', kiwi: '奇异果', shrimp: '虾', fish: '鱼', eggBoiled: '煮蛋',
    hotpot: '火锅', stew: '炖菜', meat: '肉', steak: '牛排', crab: '螃蟹', wine: '酒', cake: '蛋糕', sushi: '寿司', cheers: '干杯',
    pizza: '披萨', chicken: '炸鸡', fries: '薯条', taco: '塔可', burrito: '卷饼', box: '餐盒', riceBox: '盖饭', curry: '咖喱', pasta: '意面', drink: '饮料',
    utensils: '餐具', bentoSmall: '便当'
};

// 默认文案
const DEFAULT_TEXTS = {
    hudun: [
        '今天用冰箱边角料拼出了一碗不知道叫啥但能吃的饭。',
        '懒人炒饭第38代传人，冰箱有啥就炒啥。',
        '泡面加蛋，法力无边。糊弄但幸福的一天。',
        '今天的主厨是冰箱，菜单叫"随便热热"。',
        '一碗白粥配咸菜，也是认真对待了胃。'
    ],
    health: [
        '主动向蔬菜伸出了筷子，值得一枚小勋章。',
        '身体说谢谢你，今天没有用油炸敷衍它。',
        '水煮一切，灵魂靠蘸料。干净饮食的一天。',
        '今天吃了彩虹色的一餐，蔬菜们很欣慰。',
        '清淡的一天，味蕾在放空，身体在充电。'
    ],
    feast: [
        '生活需要仪式感，今天正襟危坐好好对待了自己的胃。',
        '火锅咕噜咕噜，烦恼呼噜呼噜。',
        '值得用一顿大餐来纪念的普通日子。',
        '认真做了一顿饭，厨房变成了最温暖的地方。',
        '今天不是在吃饭，是在享受生活。'
    ],
    takeout: [
        '今天把做饭的KPI外包了出去，也是一种时间管理。',
        '不用洗碗的日子，空气都是甜的。',
        '在等外卖的30分钟里，完成了精神充电。',
        '外卖到了的那一刻，幸福感准时送达。',
        '今天选择相信专业，让厨师来照顾胃。'
    ]
};

// 文学吃饭短句库
const LITERARY_QUOTES = [
    { text: '人间有味是清欢。', author: '苏轼' },
    { text: '食色性也。', author: '《孟子》' },
    { text: '饮食男女，人之大欲存焉。', author: '《礼记》' },
    { text: '一粥一饭，当思来处不易。', author: '朱柏庐《朱子家训》' },
    { text: '唯美食与爱不可辜负。', author: '青慕' },
    { text: '人莫不饮食也，鲜能知味也。', author: '《中庸》' },
    { text: '治大国，若烹小鲜。', author: '《老子》' },
    { text: '食不厌精，脍不厌细。', author: '《论语》' },
    { text: '民以食为天。', author: '《汉书》' },
    { text: '人世间，酸甜苦辣，若长良川。', author: '《深夜食堂》' },
    { text: '谁不热爱生活，谁就不配做饭。', author: '蔡澜' },
    { text: '碗筷之间，尽是人生。', author: '蔡澜' },
    { text: '吃得好，活得就好。', author: '蔡澜' },
    { text: '没有什么是一顿火锅解决不了的，如果有，那就两顿。', author: '民间谚语' },
    { text: '胃是离心最近的地方，暖了胃，心就暖了。', author: '民间谚语' },
    { text: '人间烟火气，最抚凡人心。', author: '汪曾祺' },
    { text: '四方食事，不过一碗人间烟火。', author: '汪曾祺' },
    { text: '一个人的口味要宽一点，杂一点，"南甜北咸东辣西酸"，都去尝尝。', author: '汪曾祺' },
    { text: '家人闲坐，灯火可亲。', author: '汪曾祺' },
    { text: '黄油面包是幸福的，但人不能只靠黄油面包活着。', author: '托尔斯泰《战争与和平》' },
    { text: '我们活着不是为了吃饭，但吃饭是为了活着。', author: '索福克勒斯' },
    { text: '吃是一种被低估的美德。', author: '乔治·萧伯纳' },
    { text: '告诉我你吃什么，我就能说出你是什么样的人。', author: '布里亚-萨瓦兰' },
    { text: '一顿好饭可以拯救一个糟糕的日子。', author: '英国谚语' },
    { text: '所谓幸福，就是一个可以好好吃饭的胃，和一个可以好好说话的人。', author: '日本谚语' },
    { text: '人生就像一盒巧克力，你永远不知道下一颗是什么味道。', author: '《阿甘正传》' },
    { text: '在所有的事物中，唯有食物能让人忘记一切烦恼。', author: '塞万提斯' },
    { text: '吃得好，是对自己最基本的温柔。', author: '村上春树' },
    { text: '孤独的美食家，不需要同情，只需要一双筷子。', author: '久住昌之《孤独的美食家》' },
    { text: '被食物治愈的瞬间，是这世界上最诚实的幸福。', author: '久住昌之' },
    { text: '深夜的食堂，装的是白天说不出口的心事。', author: '安倍夜郎《深夜食堂》' },
    { text: '食物是带着记忆的，你吃下的每一口，都是一段时光。', author: '是枝裕和' },
    { text: '做饭这件事，本身就是一种对生活的深情告白。', author: '吉本芭娜娜' },
    { text: '厨房是家里最温暖的地方，因为那里有火，有水，有爱。', author: '吉本芭娜娜' },
    { text: '人生在世，无非是吃喝二字。', author: '张爱玲' },
    { text: '生活就是一顿接一顿的饭。', author: '老舍' },
    { text: '胃里的充实，是灵魂的安宁。', author: '老舍' },
    { text: '人生如逆旅，我亦是行人。但至少，路上还有一碗热汤。', author: '苏轼' },
    { text: '日啖荔枝三百颗，不辞长作岭南人。', author: '苏轼' },
    { text: '长江绕郭知鱼美，好竹连山觉笋香。', author: '苏轼' },
    { text: '小饼如嚼月，中有酥和饴。', author: '苏轼' },
    { text: '雪沫乳花浮午盏，蓼茸蒿笋试春盘。人间有味是清欢。', author: '苏轼' },
    { text: '绿蚁新醅酒，红泥小火炉。晚来天欲雪，能饮一杯无？', author: '白居易' },
    { text: '鲈肥菰脆调羹美，荞熟油新作饼香。', author: '陆游' },
    { text: '山暖已无梅可折，江清独有蟹堪持。', author: '陆游' },
    { text: '世间万物，唯有爱与美食不可等待。', author: '佚名' },
    { text: '好好吃饭，是对自己最大的尊重。', author: '佚名' },
    { text: '一碗热汤面，胜过千言万语。', author: '佚名' },
    { text: '厨房有烟火，家里有温度。', author: '佚名' },
    { text: '认真吃饭的人，运气不会太差。', author: '佚名' },
    { text: '今天的饭，只有今天能吃到。', author: '佚名' },
    { text: '把生活嚼得有滋有味，把日子过得活色生香。', author: '佚名' },
    { text: '吃好喝好，长生不老。', author: '佚名' },
    { text: '人生苦短，再来一碗。', author: '佚名' },
    { text: '胃满了，心就不空了。', author: '佚名' },
    { text: '没有什么烦恼是一顿饭解决不了的。', author: '佚名' },
    { text: '吃饭这件事，从来不是小事。', author: '佚名' },
    { text: '每一顿饭，都是一次与生活的和解。', author: '佚名' },
    { text: '人间至味，不过家常。', author: '佚名' }
];

const WEEKDAY_NAMES = ['日', '一', '二', '三', '四', '五', '六'];

// 状态
let selectedTag = null;
let selectedFoods = [];
let uploadedImage = null;
let customText = '';
let currentText = '';
let currentMealType = 'lunch';

const $ = id => document.getElementById(id);

// DOM 元素
const mealBtns = document.querySelectorAll('.meal-btn');
const tagBtns = document.querySelectorAll('.tag-btn');
const foodSelection = $('food-selection');
const foodGrid = $('food-grid');
const foodUpload = $('food-upload');
const customInput = $('custom-input');
const customTextarea = $('custom-text');
const confirmTextBtn = $('confirm-text');
const cardDate = $('card-date');
const cardIcon = $('card-icon');
const cardText = $('card-text');
const cardLabel = $('card-label');
const saveBtn = $('save-btn');
const mealCount = $('meal-count');
const weeklyBtn = $('weekly-btn');
const weeklyModal = $('weekly-modal');
const weeklyGrid = $('weekly-grid');
const weeklySummary = $('weekly-summary');
const closeBtn = document.querySelector('.close-btn');

function init() {
    setDate();
    setDailyQuote();
    initData();
    bindEvents();
}

async function initData() {
    const isLoggedIn = LocalStorageManager && LocalStorageManager.isLoggedIn();
    
    if (isLoggedIn && !LocalStorageManager.isGuest()) {
        const userId = LocalStorageManager.getUserId();
        const allMeals = LocalStorageManager.getAllMeals();
        const userMeals = allMeals.filter(m => m.userId === userId);
        
        if (userMeals.length > 0) {
            const localData = loadData();
            if (userMeals.length > localData.meals.length) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ meals: userMeals }));
                console.log(`加载了 ${userMeals.length} 条用户记录`);
            }
        }
    }
    
    updateMealCount();
}

function setDate() {
    const now = new Date();
    cardDate.textContent = `${now.getMonth() + 1}月${now.getDate()}日`;
}

function setDailyQuote() {
    const today = new Date().toDateString();
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
        hash = ((hash << 5) - hash) + today.charCodeAt(i);
        hash |= 0;
    }
    const index = Math.abs(hash) % LITERARY_QUOTES.length;
    const quote = LITERARY_QUOTES[index];

    document.querySelector('.quote').textContent = `"${quote.text}"`;
    document.querySelector('.quote-author').textContent = `— ${quote.author}`;
}

function bindEvents() {
    mealBtns.forEach(btn => {
        btn.addEventListener('click', () => selectMeal(btn));
    });

    tagBtns.forEach(btn => {
        btn.addEventListener('click', () => selectTag(btn));
    });

    foodUpload.addEventListener('change', handleImageUpload);
    confirmTextBtn.addEventListener('click', confirmCustomText);
    saveBtn.addEventListener('click', saveCard);

    weeklyBtn.addEventListener('click', showWeekly);
    closeBtn.addEventListener('click', () => { weeklyModal.style.display = 'none'; });
    weeklyModal.addEventListener('click', (e) => {
        if (e.target === weeklyModal) weeklyModal.style.display = 'none';
    });
}

function selectMeal(btn) {
    mealBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    currentMealType = btn.dataset.meal;
    
    if (selectedTag) {
        showFoodSelection(selectedTag);
    }
    
    loadExistingRecord();
}

function loadExistingRecord() {
    const data = loadData();
    const today = new Date().toISOString().split('T')[0];
    const record = data.meals.find(m => m.date === today && m.mealType === currentMealType);
    
    if (record) {
        selectedTag = record.tag;
        tagBtns.forEach(b => {
            b.classList.toggle('selected', b.dataset.tag === record.tag);
        });
        
        selectedFoods = record.foodIcons || [];
        uploadedImage = record.foodImage;
        
        showFoodSelection(record.tag);
        
        if (uploadedImage) {
            cardIcon.innerHTML = `<img src="${uploadedImage}" alt="上传的食物">`;
        } else if (selectedFoods.length > 0) {
            updateCardIcons();
        }
        
        cardText.textContent = record.text;
        cardText.classList.remove('empty');
        cardLabel.textContent = TAG_CONFIG[record.tag].label;
        saveBtn.disabled = false;
    }
}

function selectTag(btn) {
    tagBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    selectedTag = btn.dataset.tag;
    selectedFoods = [];
    uploadedImage = null;
    customText = '';

    cardIcon.innerHTML = SVG_ICONS.utensils;
    cardText.textContent = '';
    cardText.classList.add('empty');
    saveBtn.disabled = true;

    showFoodSelection(selectedTag);
}

function showFoodSelection(tag) {
    foodSelection.style.display = 'block';
    customInput.style.display = 'none';

    const icons = FOOD_ICONS[tag];
    foodGrid.innerHTML = '';

    icons.forEach(iconKey => {
        const item = document.createElement('div');
        item.className = 'food-item';
        if (selectedFoods.includes(iconKey)) {
            item.classList.add('selected');
        }
        item.innerHTML = SVG_ICONS[iconKey];
        item.dataset.icon = iconKey;
        item.addEventListener('click', () => selectFood(iconKey, item));
        
        const label = document.createElement('span');
        label.className = 'food-label';
        label.textContent = ICON_NAMES[iconKey];
        item.appendChild(label);
        
        foodGrid.appendChild(item);
    });
}

function selectFood(iconKey, element) {
    const maxSelection = 4;
    
    if (element.classList.contains('selected')) {
        element.classList.remove('selected');
        selectedFoods = selectedFoods.filter(f => f !== iconKey);
    } else {
        if (selectedFoods.length >= maxSelection) {
            showToast(`最多选择${maxSelection}个食物`);
            return;
        }
        element.classList.add('selected');
        selectedFoods.push(iconKey);
    }
    
    uploadedImage = null;

    if (selectedFoods.length > 0) {
        customInput.style.display = 'block';
        customTextarea.value = '';
        customTextarea.focus();
    } else {
        customInput.style.display = 'none';
    }

    updateCardIcons();
    cardLabel.textContent = TAG_CONFIG[selectedTag].label;
    triggerCardAnim(cardLabel, 'anim-in');
}

function updateCardIcons() {
    if (selectedFoods.length === 0) {
        cardIcon.innerHTML = SVG_ICONS.utensils;
        return;
    }
    
    if (selectedFoods.length === 1) {
        cardIcon.innerHTML = SVG_ICONS[selectedFoods[0]];
        triggerCardAnim(cardIcon, 'anim-in');
    } else {
        let iconsHtml = '<div class="multi-icon">';
        selectedFoods.forEach((iconKey, index) => {
            iconsHtml += `<div class="multi-icon-item" style="animation-delay: ${index * 0.1}s;">${SVG_ICONS[iconKey]}</div>`;
        });
        iconsHtml += '</div>';
        cardIcon.innerHTML = iconsHtml;
        setTimeout(() => {
            document.querySelectorAll('.multi-icon-item').forEach((el, i) => {
                setTimeout(() => el.classList.add('anim-in'), i * 100);
            });
        }, 50);
    }
}

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        uploadedImage = event.target.result;
        selectedFoods = [];

        document.querySelectorAll('.food-item').forEach(item => {
            item.classList.remove('selected');
        });

        customInput.style.display = 'block';
        customTextarea.value = '';
        customTextarea.focus();

        cardIcon.innerHTML = `<img src="${uploadedImage}" alt="上传的食物">`;
        const img = cardIcon.querySelector('img');
        if (img) triggerCardAnim(img, 'anim-in');
        cardLabel.textContent = TAG_CONFIG[selectedTag].label;
        triggerCardAnim(cardLabel, 'anim-in');
    };
    reader.readAsDataURL(file);
}

function confirmCustomText() {
    customText = customTextarea.value.trim();

    if (customText) {
        currentText = customText;
    } else {
        const texts = DEFAULT_TEXTS[selectedTag];
        currentText = texts[Math.floor(Math.random() * texts.length)];
    }

    cardText.textContent = currentText;
    cardText.classList.remove('empty');
    triggerCardAnim(cardText, 'anim-in');
    saveBtn.disabled = false;

    confirmTextBtn.classList.add('success');
    confirmTextBtn.textContent = '已记录 ✓';
    setTimeout(() => {
        confirmTextBtn.classList.remove('success');
        confirmTextBtn.textContent = '确认记录';
    }, 1200);

    saveRecord(selectedTag, currentText, [...selectedFoods], uploadedImage, currentMealType);
    updateMealCount();

    showToast('记录成功 ✓');
}

function saveRecord(tag, text, foodIcons, foodImage, mealType) {
    const data = loadData();
    const today = new Date().toISOString().split('T')[0];

    const existingIndex = data.meals.findIndex(m => m.date === today && m.mealType === mealType);
    const record = {
        date: today,
        mealType: mealType,
        tag: tag,
        text: text,
        foodIcons: foodIcons,
        foodImage: foodImage,
        timestamp: Date.now()
    };

    if (existingIndex >= 0) {
        data.meals[existingIndex] = record;
    } else {
        data.meals.push(record);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    
    syncToCloud(record);
}

async function syncToCloud(record) {
    if (!LocalStorageManager || LocalStorageManager.isGuest()) return;
    
    const userId = LocalStorageManager.getUserId();
    if (!userId) return;
    
    record.userId = userId;
    record.id = 'meal_' + Date.now();
    
    LocalStorageManager.saveMeal(record);
    console.log('记录已保存到全局存储');
}

function loadData() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) {
        console.error('读取数据失败:', e);
    }
    return { meals: [] };
}

function updateMealCount() {
    const data = loadData();
    const count = data.meals.length;
    mealCount.textContent = count > 99 ? '99+' : count;
}

function saveCard() {
    const card = $('meal-card');
    saveBtn.disabled = true;
    saveBtn.textContent = '生成中...';

    html2canvas(card, {
        backgroundColor: '#1e321e',
        scale: 2,
        useCORS: true,
        logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `食事_${new Date().toISOString().split('T')[0]}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast('卡片已保存 📷');
    }).catch(err => {
        console.error('保存失败:', err);
        showToast('保存失败，请重试');
    }).finally(() => {
        saveBtn.disabled = false;
        saveBtn.textContent = '保存卡片';
    });
}

function showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

function triggerCardAnim(el, className) {
    el.classList.remove(className);
    void el.offsetWidth;
    el.classList.add(className);
    setTimeout(() => el.classList.remove(className), 600);
}

function showWeekly() {
    const data = loadData();
    const today = new Date();
    const days = [];

    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const records = data.meals.filter(m => m.date === dateStr);
        days.push({
            date: dateStr,
            dayName: WEEKDAY_NAMES[d.getDay()],
            dateNum: d.getDate(),
            month: d.getMonth() + 1,
            records: records
        });
    }

    weeklyGrid.innerHTML = '';
    days.forEach(day => {
        const div = document.createElement('div');
        const isToday = day.date === today.toISOString().split('T')[0];
        
        if (day.records.length > 0) {
            let iconsHtml = '';
            const mealOrder = ['breakfast', 'lunch', 'dinner'];
            mealOrder.forEach(mealType => {
                const record = day.records.find(r => r.mealType === mealType);
                if (record) {
                    const config = TAG_CONFIG[record.tag];
                    const iconKey = record.foodIcons && record.foodIcons.length > 0 
                        ? record.foodIcons[0] 
                        : config.icon;
                    iconsHtml += `<div class="weekly-day-icon">${SVG_ICONS[iconKey]}</div>`;
                }
            });
            
            const latestRecord = day.records[day.records.length - 1];
            const latestTag = TAG_CONFIG[latestRecord.tag];
            
            div.className = 'weekly-day';
            div.innerHTML = `
                <div class="weekly-date">${day.month}/${day.dateNum}</div>
                ${iconsHtml}
                <div class="weekly-day-label">${latestTag.name}</div>
            `;
            if (isToday) div.classList.add('today');
            
            div.addEventListener('click', () => showDayDetail(day));
        } else {
            div.className = 'weekly-day empty';
            div.innerHTML = `
                <div class="weekly-date">${day.month}/${day.dateNum}</div>
                <div class="weekly-day-icon empty-dot">·</div>
                <div class="weekly-day-label">未记录</div>
            `;
            if (isToday) div.classList.add('today');
        }

        weeklyGrid.appendChild(div);
    });

    const counts = { hudun: 0, health: 0, feast: 0, takeout: 0 };
    data.meals.forEach(record => {
        if (record.tag) counts[record.tag]++;
    });

    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    if (total === 0) {
        weeklySummary.innerHTML = '<p>这周还没有记录，<br>开始记录你的食事吧~</p>';
    } else {
        const parts = [];
        if (counts.hudun > 0) parts.push(`糊弄${counts.hudun}次`);
        if (counts.health > 0) parts.push(`健康${counts.health}次`);
        if (counts.feast > 0) parts.push(`大餐${counts.feast}次`);
        if (counts.takeout > 0) parts.push(`外卖${counts.takeout}次`);

        const msgs = ['你照顾得不错 💚', '每一顿都值得被记住', '好好吃饭的你很可爱 🌿', '下周继续加油'];
        weeklySummary.innerHTML = `<p>本周${parts.join('，')}。<br><span class="highlight">${msgs[Math.floor(Math.random() * msgs.length)]}</span></p>`;
    }

    weeklyModal.style.display = 'flex';
}

function showDayDetail(day) {
    // 创建单日详情弹窗
    let modal = document.getElementById('dayDetailModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'dayDetailModal';
        modal.className = 'day-detail-modal';
        document.body.appendChild(modal);
    }
    
    const mealOrder = ['breakfast', 'lunch', 'dinner'];
    const mealNames = { breakfast: '早餐', lunch: '午餐', dinner: '晚餐' };
    
    let recordsHtml = '';
    mealOrder.forEach(mealType => {
        const record = day.records.find(r => r.mealType === mealType);
        if (record) {
            const config = TAG_CONFIG[record.tag];
            let foodIconsHtml = '';
            if (record.foodIcons && record.foodIcons.length > 0) {
                record.foodIcons.forEach(iconKey => {
                    foodIconsHtml += `<div class="detail-food-icon">${SVG_ICONS[iconKey]}</div>`;
                });
            } else {
                foodIconsHtml = `<div class="detail-food-icon">${SVG_ICONS[config.icon]}</div>`;
            }
            
            recordsHtml += `
                <div class="detail-record">
                    <div class="detail-meal-type">${mealNames[mealType]}</div>
                    <div class="detail-record-content">
                        <div class="detail-tag" style="color: ${config.color}; background: ${config.color}20;">
                            ${config.name}
                        </div>
                        <div class="detail-food-icons">${foodIconsHtml}</div>
                        ${record.text ? `<div class="detail-text">${record.text}</div>` : ''}
                    </div>
                </div>
            `;
        } else {
            recordsHtml += `
                <div class="detail-record empty">
                    <div class="detail-meal-type">${mealNames[mealType]}</div>
                    <div class="detail-empty-text">暂无记录</div>
                </div>
            `;
        }
    });
    
    modal.innerHTML = `
        <div class="day-detail-overlay" onclick="closeDayDetail()"></div>
        <div class="day-detail-content">
            <div class="day-detail-header">
                <button class="day-detail-close" onclick="closeDayDetail()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <div class="day-detail-title">${day.month}/${day.dateNum} ${day.dayName}</div>
                <div style="width: 48px;"></div>
            </div>
            <div class="day-detail-records">
                ${recordsHtml}
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
}

function closeDayDetail() {
    const modal = document.getElementById('dayDetailModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', init);
