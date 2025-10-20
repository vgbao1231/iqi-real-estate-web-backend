export const DEFAULT_PROJECT = {
  isFeatured: false,
  isExclusive: false,
  visibleOnWeb: false,
  introduction: {
    logoImages: [],
    coverImage: null,
    coverTitle: '',
    headerLogoIndex: 0,
    coverLogoIndex: 0,
    titleImage: null,
    introductionImage: null,
    introductionVideo: '',
    introductionBackground: null,
    introductionTitle: '',
    introductionDescription: '',
    launchImages: [],
    launchTitle: '',
    launchDescription: '',
  },
  overview: {
    overviewImages: [
      { image: null, description: '' }, // Product
      { image: null, description: '' }, // Area
      { image: null, description: '' }, // Amenity
      { image: null, description: '' }, // Location
    ],
    overviewBackground: null,
    basicInfo: [
      { id: 'project_name', key: 'Tên dự án', value: '', type: 'text' },
      { id: 'bathrooms', key: 'Phòng tắm', value: ['', ''], type: 'range' },
      { id: 'developer', key: 'Chủ đầu tư', value: '', type: 'text' },
      {
        id: 'category',
        key: 'Danh mục',
        value: 'residential',
        type: 'select',
        options: [
          {
            value: 'residential',
            label: 'Nhà ở',
          },
          {
            value: 'international',
            label: 'Quốc tế',
          },
          {
            value: 'resort',
            label: 'Nghỉ dưỡng',
          },
        ],
        hidden: true,
      },
      {
        id: 'ownership_status',
        key: 'Tình trạng sở hữu',
        value: '',
        type: 'text',
      },
      {
        id: 'project_type',
        key: 'Loại hình',
        value: 'apartment',
        type: 'select',
        options: [
          {
            value: 'apartment',
            label: 'Căn hộ',
          },
          {
            value: 'villa',
            label: 'Biệt thự',
          },
          {
            value: 'townhouse',
            label: 'Nhà phố',
          },
          {
            value: 'resort',
            label: 'Resort',
          },
          {
            value: 'condotel',
            label: 'Condotel',
          },
          {
            value: 'beach_villa',
            label: 'Villa biển',
          },
          {
            value: 'office_for_lease',
            label: 'Văn phòng cho thuê',
          },
          {
            value: 'co_working_space',
            label: 'Co-working space',
          },
          {
            value: 'ecological_urban_area',
            label: 'Khu đô thị sinh thái',
          },
        ],
      },
      {
        id: 'legal_status',
        key: 'Tình trạng pháp lý',
        value: '',
        type: 'text',
      },
      { id: 'product_group', key: 'Nhóm sản phẩm', value: '', type: 'text' },
      {
        id: 'handover_time',
        key: 'Thời gian bàn giao',
        value: '',
        type: 'text',
      },
      {
        id: 'landscape_designer',
        key: 'Đơn vị thiết kế cảnh quan',
        value: '',
        type: 'text',
      },
      { id: 'phase', key: 'Giai đoạn', value: '', type: 'text' },
      {
        id: 'construction_unit',
        key: 'Đơn vị thi công',
        value: '',
        type: 'text',
      },
      {
        id: 'currency_unit',
        key: 'Đơn vị tiền tệ',
        value: 'vnd',
        type: 'select',
        options: [
          {
            value: 'vnd',
            label: 'VND',
          },
          {
            value: 'usd',
            label: 'USD',
          },
          {
            value: 'eur',
            label: 'EUR',
          },
        ],
      },
      {
        id: 'measurement_unit',
        key: 'Đơn vị đo lường',
        value: 'sqrt',
        type: 'select',
        options: [
          {
            value: 'sqm',
            label: 'sqm',
          },
          {
            value: 'sqrt',
            label: 'sqrt',
          },
        ],
      },
      {
        id: 'architectural_designer',
        key: 'Đơn vị thiết kế kiến trúc',
        value: '',
        type: 'text',
      },
      { id: 'address', key: 'Địa chỉ', value: '', type: 'text' },
      {
        id: 'total_units',
        key: 'Tổng số căn/sản phẩm',
        value: 0,
        type: 'number',
      },
      { id: 'city', key: 'Thành phố', value: '', type: 'text' },
      { id: 'land_area', key: 'Diện tích đất', value: '', type: 'text' },
      { id: 'district', key: 'Quận/Huyện', value: '', type: 'text' },
      { id: 'bedrooms', key: 'Phòng ngủ', value: ['', ''], type: 'range' },
      {
        id: 'status',
        key: 'Trạng thái',
        value: 'launching',
        type: 'select',
        options: [
          {
            value: 'planning',
            label: 'Đang lên kế hoạch',
          },
          {
            value: 'under_construction',
            label: 'Đang xây dựng',
          },
          {
            value: 'selling',
            label: 'Đang bán',
          },
          {
            value: 'launching',
            label: 'Đang mở bán',
          },
          {
            value: 'completed',
            label: 'Hoàn thành',
          },
        ],
      },
      { id: 'slug', key: 'Slug', value: '', type: 'text', hidden: true },
      { id: 'country', key: 'Quốc gia', value: 'Vietnam', type: 'text' },
      { id: 'price', key: 'Giá', value: ['', ''], type: 'range' },
    ],
    experienceImage: null,
  },
  location: {
    title: '',
    description: '',
    locationImage: null,
    mapInputType: 'embed',
    embedCode: '',
    coordinates: { lat: 10.75, lng: 106.4 },
    locationBackground: null,
  },
  siteplan: {
    siteplanImages: [],
    view360: [],
  },
  production: {
    products: [],
    furnitures: [],
  },
  amenity: {
    title: '',
    description: '',
    amenityImages: [],
  },
  contact: {
    layoutId: 'layout-1',
    logoImage: null,
    contactBackground: null,
    agency: {
      title: '',
      agencyImage: null,
      description: '',
    },
  },
  timeline: {
    timelineTitle: '',
    timelineImage: null,
    progressTitle: 'Hình Ảnh Tiến Độ Dự Án',
    progressImages: [],
    backgroundImage: null,
  },
  other: {
    policy: {
      title: '',
      policyImage: null,
      policyText: '',
    },
    invitation: {
      invitationImage: null,
      fields: [],
    },
    breakImages: [],
  },
};
