import { OptionItem } from '../../core/interfaces/base.interface';

export enum BASE_DATE_FORMAT {
  DATE = 'dd/MM/yyyy',
  DATE_TIME = 'dd/MM/yyyy HH:mm',
}

export const DEFAULT_FALLBACK =
  'data:image/png;base64,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';

export const ORIGINAL_LANGUAGE = 'en';

export enum CONTENT_TYPE {
  MENU = 'MENU',
  HOME = 'HOME',
  INTRO = 'INTRO',
  DOMESTIC = 'DOMESTIC',
  INTERNATIONAL = 'INTERNATIONAL',
  CUSTOMER = 'CUSTOMER',
  SERVICE = 'SERVICE',
  CONTACT = 'CONTACT',
  COMMON = 'COMMON',
}

export const CONTENT_DATA_OPTIONS: OptionItem[] = [
  { value: CONTENT_TYPE.MENU, label: 'Danh mục' },
  { value: CONTENT_TYPE.HOME, label: 'Trang chủ' },
  { value: CONTENT_TYPE.INTRO, label: 'Giới thiệu' },
  { value: CONTENT_TYPE.DOMESTIC, label: 'Tour trong nước' },
  { value: CONTENT_TYPE.INTERNATIONAL, label: 'Tour quốc tế' },
  { value: CONTENT_TYPE.CUSTOMER, label: 'Khách hàng' },
  { value: CONTENT_TYPE.SERVICE, label: 'Dịch vụ' },
  { value: CONTENT_TYPE.CONTACT, label: 'Liên hệ' },
  { value: CONTENT_TYPE.COMMON, label: 'Chung' },
];

export const BANNER_WEB = [
  {
    image:
      'https://res.klook.com/image/upload/fl_lossy.progressive,q_90/c_fill,w_2560/v1744887444/banner/mtjajbd973gg6rboqqrj.webp',
  },
  {
    image:
      'https://res.klook.com/image/upload/fl_lossy.progressive,q_90/c_fill,,w_2560,/v1747363626/banner/rgj9gn9qqaflkyibv2ir.webp',
  },
  {
    image:
      'https://res.klook.com/image/upload/fl_lossy.progressive,q_90/c_fill,,w_2560,/v1744887428/banner/aikggh0fo0dglcieygli.webp',
  },
];

export const IMAGE_CONSTANTS = [
  {
    image:
      'https://hanoitourist.vn/sites/default/files/2024/05/Boc-Vien-co-tran.jpg',
  },
  {
    image:
      'https://hanoitourist.vn/sites/default/files/2024/05/Boc-Vien-co-tran.jpg',
  },
  {
    image:
      'https://hanoitourist.vn/sites/default/files/2025/07/-2406-1666252910_2.png',
  },
  {
    image:
      'https://hanoitourist.vn/sites/default/files/2025/07/195660_avatar_0.jpg',
  },
  {
    image:
      'https://hanoitourist.vn/sites/default/files/2024/09/Ch%E1%BB%A3%20B%E1%BA%BFn%20Th%C3%A0nh.jpeg',
  },
  {
    image:
      'https://hanoitourist.vn/sites/default/files/2025/07/-2406-1666252910_2.png',
  },
  {
    image:
      'https://hanoitourist.vn/sites/default/files/2025/07/195660_avatar_2.jpg',
  },
  {
    image:
      'https://hanoitourist.vn/sites/default/files/2025/07/unnamed_82_.png_large.jpg',
  },
  {
    image:
      'https://hanoitourist.vn/sites/default/files/2025/07/unnamed_82_.png_large.jpg',
  },
];

export const TRAVEL_GUIDE = [
  {
    image:
      'https://hanoitourist.vn/sites/default/files/2025/07/untitled-design-6_1.png',
  },
  {
    image:
      'https://hanoitourist.vn/sites/default/files/styles/large/public/2025/07/th%C4%91_0.jpg?itok=CPIuTj36',
  },
  {
    image:
      'https://hanoitourist.vn/sites/default/files/styles/large/public/2025/07/Autumn-in-the-Bavarian-Alps-Neuschwanstein-Castle.jpg?itok=okd6fMUl',
  },
  {
    image:
      'https://hanoitourist.vn/sites/default/files/styles/large/public/2025/07/da%CC%80i-loan.jpeg?itok=KsNBTNHE',
  },
  {
    image:
      'https://hanoitourist.vn/sites/default/files/styles/large/public/2025/07/Garden-by-the-Bay-Singapore-ivivu-6.jpg?itok=xE4FRVb_',
  },
  {
    image:
      'https://hanoitourist.vn/sites/default/files/styles/large/public/2025/07/360_F_1024357456_EM2wFghRSFqixMl94vTllR0POkucRtsQ.jpg?itok=oQRomorT',
  },
  {
    image:
      'https://hanoitourist.vn/sites/default/files/styles/large/public/2025/07/Hawa-Mahal_Jaipur.jpg?itok=BaOVex_u',
  },
  {
    image:
      'hhttps://hanoitourist.vn/sites/default/files/styles/large/public/2025/07/Hawa-Mahal_Jaipur.jpg?itok=BaOVex_u',
  },
  {
    image:
      'https://hanoitourist.vn/sites/default/files/inline-images/Succulents-in-Flower-Dome.jpg',
  },
];
