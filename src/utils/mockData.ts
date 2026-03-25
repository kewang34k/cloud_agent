import { Product } from '../store';

export const products: Product[] = [
  {
    id: '1',
    name: '真丝缎面吊带裙',
    price: 599,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: '采用100%桑蚕丝，触感丝滑，垂坠感极佳。极简的吊带设计，展现优雅的锁骨线条，适合各种晚宴或日常穿搭。',
    isNew: true,
    isHot: true,
  },
  {
    id: '2',
    name: '羊毛混纺阔腿裤',
    price: 459,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['S', 'M', 'L'],
    description: '高腰设计，拉长腿部比例。优质羊毛混纺面料，保暖且不易起皱。',
    isNew: true,
  },
  {
    id: '3',
    name: '经典法式风衣',
    price: 899,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '永不过时的法式风衣，卡其色调，防风防水面料。',
    isHot: true,
  },
  {
    id: '4',
    name: '无袖针织背心',
    price: 259,
    images: [
      'https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M'],
    description: '基础款无袖针织，柔软亲肤，百搭单品。',
  },
  {
    id: '5',
    name: '复古高腰牛仔裤',
    price: 399,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['25', '26', '27', '28', '29'],
    description: '直筒版型，修饰腿型，复古水洗蓝。',
    isHot: true,
  },
  {
    id: '6',
    name: '极简西装外套',
    price: 699,
    images: [
      'https://images.unsplash.com/photo-1550639524-a6f58345a278?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['S', 'M', 'L'],
    description: '挺括有型的西装外套，职场与休闲皆宜。',
    isNew: true,
  }
];

export const reviews = [
  { id: '1', user: '林**', rating: 5, comment: '面料真的太棒了，非常丝滑，上身效果绝佳。', date: '2023-10-15' },
  { id: '2', user: '张**', rating: 4, comment: '尺码很准，颜色也正，物流稍微有点慢。', date: '2023-10-12' },
];
