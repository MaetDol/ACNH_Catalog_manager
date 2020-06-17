const rowDatas = [
  {
    id: 132,
    name_en: 'English name!',
    name_kr: '한국 명칭!',
    preview_variant_id: 1,
    row: {
      id: 1,
      is_complete: true,
      is_deleted: false,
    },
    tags: [
      {
        id:1,
        category: 'Source',
        content: '너굴 상점'
      }, {
        id:2,
        category: 'HHA Concept',
        content: '야외 가구'
      },
    ],
    variants: [
      {
        id: 1,
        color_en: 'white',
        color_kr: '화이트',
        file_id: 'FtrAcorsticguitar_Remake_0_0',
        is_owned: true,
        row_item_variant: { id: 1 }
      }, {
        id: 2,
        color_en: 'yellow',
        color_kr: '노랑',
        file_id: 'FtrAcorsticguitar_Remake_1_0',
        is_owned: true,
        row_item_variant: { id: 2 }
      }
    ]
  }, 
  
  {
    id: 136,
    name_en: 'Some cute name!',
    name_kr: '뀨잉!',
    preview_variant_id: 3,
    row: {
      id: 2,
      is_complete: false,
      is_deleted: false,
    },
    tags: [
      {
        id:1,
        category: 'Source',
        content: '너굴 상점'
      }, {
        id:3,
        category: 'HHA Concept',
        content: '큐트'
      },
    ],
    variants: [
      {
        id: 3,
        color_en: 'white',
        color_kr: '화이트',
        file_id: 'FtrWashingmachine_Remake_1_0',
        is_owned: true,
        row_item_variant: { id: 3 }
      }, {
        id: 4,
        color_en: 'yellow',
        color_kr: '노랑',
        file_id: 'FtrWashingmachine_Remake_2_0',
        is_owned: true,
        row_item_variant: { id: 4 }
      }, {
        id: 5,
        color_en: 'yellow',
        color_kr: '블랙',
        file_id: 'FtrWashingmachine_Remake_3_0',
        is_owned: true,
        row_item_variant: { id: 5 }
      }, {
        id: 6,
        color_en: 'yellow',
        color_kr: '핑크',
        file_id: 'FtrWashingmachine_Remake_4_0',
        is_owned: true,
        row_item_variant: { id: 6 }
      }, {
        id: 7,
        color_en: 'yellow',
        color_kr: '브라운',
        file_id: 'FtrWashingmachine_Remake_5_0',
        is_owned: false,
        row_item_variant: { id: 7 }
      }
    ]
  },
];

const searchDatas = [
  {
    id: 132,
    name_en: 'English name!',
    name_kr: '한국 명칭!',
    preview_variant_id: 1,
    row: {
      id: 1,
      is_complete: true,
      is_deleted: false,
    },
    variants: [
      {
        id: 1,
        color_en: 'white',
        color_kr: '화이트',
        file_id: 'FtrAcorsticguitar_Remake_0_0',
        is_owned: true,
        row_item_variant: { id: 1 }
      }
    ]
  }, 
  
  {
    id: 136,
    name_en: 'Some cute name!',
    name_kr: '뀨잉!',
    preview_variant_id: 3,
    row: {
      id: 2,
      is_complete: false,
      is_deleted: false,
    },
    variants: [
      {
        id: 3,
        color_en: 'white',
        color_kr: '화이트',
        file_id: 'FtrWashingmachine_Remake_1_0',
        is_owned: true,
        row_item_variant: { id: 3 }
      }
    ]
  },

  {
    id: 32,
    name_en: 'Not bad furniture',
    name_kr: '그럴싸한 가구',
    preview_variant_id: 9,
    row: {
      id: 6,
      is_complete: false,
      is_deleted: false,
    },
    variants: [
      {
        id: 9,
        color_en: 'white',
        color_kr: '화이트',
        file_id: 'FtrWashingmachine_Remake_1_0',
        is_owned: false,
        row_item_variant: { id: 12 }
      }
    ]
  },
];


rowDatas.forEach( e => sheet.addItem({
  ...e,
  row: { ...e.row },
  tags: [ ...e.tags ],
  variants: [ ...e.variants ],
}) );