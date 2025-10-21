import { Prisma, PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  try {
    // Các lệnh xóa dữ liệu cũ
    // await prisma.project.deleteMany({});
    await prisma.article.deleteMany({});
    await prisma.user.deleteMany({});
    console.log('Cleared old data successfully or tables were empty.');
  } catch {
    console.warn(
      'WARN: Tables did not exist (P2021). Continuing with data creation...',
    );
  }

  const user = await prisma.user.createMany({
    data: [
      {
        id: 'eb95b8ac-141f-4c36-a21a-486fcac2cb0f',
        name: 'Admin',
        email: 'admin@gmail.com',
        password:
          '$2b$10$MRs8isuTJDAHfCKaWhRB/uMyKA3HijGO.3MNivRLoU2UOW0M10bwa',
        role: 'ADMIN',
        isActive: true,
        image: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1761015909/IQI/users/yqokuxgl18qe3w7aef5g.jpg',
          publicId: 'IQI/users/yqokuxgl18qe3w7aef5g',
        },
        phone: '0911095800',
        createdAt: '2025-10-20T07:49:06.618Z',
        updatedAt: '2025-10-21T03:05:10.564Z',
      },
    ],
  });

  const article = await prisma.article.createMany({
    data: [
      {
        id: '7aade4e9-eee9-4957-9e63-a91091a163ba',
        title: 'Thị trường BDS TP.HCM Q4/2025: Tăng trưởng ổn định 8.5%',
        description:
          'Thị trường bất động sản TP.HCM trong quý 4/2025 đã ghi nhận mức tăng trưởng 8.5% so với cùng kỳ năm trước, với phân khúc căn hộ cao cấp dẫn đầu xu hướng tăng giá.',
        type: 'MACRO',
        content:
          '<p><strong style="font-size: 24px;">Phân khúc căn hộ cao cấp dẫn đầu</strong></p><p><span style="font-size: 16px;">Theo báo cáo từ Hiệp hội Bất động sản TP.HCM, phân khúc căn hộ cao cấp đã tăng trưởng 12% về giá bán, trong khi nhà phố và biệt thự tăng 6.2%. Điều này cho thấy sự phân hóa rõ rệt trong thị trường.</span></p><p><span style="font-size: 16px;">Các dự án tại khu vực trung tâm như Quận 1, Quận 3, và Quận 7 tiếp tục thu hút sự quan tâm của nhà đầu tư nhờ vào vị trí đắc địa và hạ tầng hoàn thiện.</span></p><p><br></p><p><strong style="font-size: 24px;">Nguồn cung mới tăng mạnh</strong></p><p><span style="font-size: 16px;">Quý 4/2025 chứng kiến sự gia tăng đáng kể về nguồn cung mới với 15 dự án được mở bán, tổng cộng hơn 8,000 căn hộ ra thị trường. Điều này giúp cân bằng cung cầu và ổn định giá cả.</span></p><p><span style="font-size: 16px;">Đặc biệt, các dự án tại khu Đông như Thủ Đức, Quận 9 đang trở thành tâm điểm với mức giá hợp lý và tiềm năng phát triển cao.</span></p><p><br></p><p><strong style="font-size: 24px;">Dự báo cho năm 2025</strong></p><p><span style="font-size: 16px;">Các chuyên gia dự báo thị trường BDS TP.HCM sẽ tiếp tục tăng trưởng ổn định trong năm 2025 với mức tăng khoảng 6-8%. Các yếu tố hỗ trợ bao gồm:</span></p><ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><span style="font-size: 16px;">Hạ tầng giao thông được cải thiện với các tuyến metro mới</span></li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><span style="font-size: 16px;">Chính sách hỗ trợ người mua nhà lần đầu</span></li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><span style="font-size: 16px;">Dòng vốn FDI tiếp tục đổ vào thị trường BDS</span></li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><span style="font-size: 16px;">Nhu cầu ở thực tăng cao do dân số trẻ</span></li></ol><p><br></p>',
        category: 'INVESTMENT',
        readTime: '',
        views: 0,
        image: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1761015823/IQI/articles/cwcwcaa3rocjrkqqs6kr.webp',
          publicId: 'IQI/articles/cwcwcaa3rocjrkqqs6kr',
        },
        isFeatured: true,
        isPublished: true,
        createdAt: '2025-10-02T09:50:44.076Z',
        updatedAt: '2025-10-21T03:03:44.473Z',
        createdBy: 'eb95b8ac-141f-4c36-a21a-486fcac2cb0f',
        updatedBy: 'eb95b8ac-141f-4c36-a21a-486fcac2cb0f',
        tags: ['Đầu tư', 'Căn hộ', 'Thị trường'],
      },
      {
        id: 'a7449aaa-8fda-44b4-86f2-b0dfb527d30f',
        title: 'Thị trường BDS TP.HCM Q4/2025: Tăng trưởng ổn định 8.5%',
        description:
          'Thị trường bất động sản TP.HCM trong quý 4/2025 đã ghi nhận mức tăng trưởng 8.5% so với cùng kỳ năm trước, với phân khúc căn hộ cao cấp dẫn đầu xu hướng tăng giá.',
        type: 'MACRO',
        content:
          '<p><strong style="font-size: 24px;">Phân khúc căn hộ cao cấp dẫn đầu</strong></p><p><span style="font-size: 16px;">Theo báo cáo từ Hiệp hội Bất động sản TP.HCM, phân khúc căn hộ cao cấp đã tăng trưởng 12% về giá bán, trong khi nhà phố và biệt thự tăng 6.2%. Điều này cho thấy sự phân hóa rõ rệt trong thị trường.</span></p><p><span style="font-size: 16px;">Các dự án tại khu vực trung tâm như Quận 1, Quận 3, và Quận 7 tiếp tục thu hút sự quan tâm của nhà đầu tư nhờ vào vị trí đắc địa và hạ tầng hoàn thiện.</span></p><p><br></p><p><strong style="font-size: 24px;">Nguồn cung mới tăng mạnh</strong></p><p><span style="font-size: 16px;">Quý 4/2025 chứng kiến sự gia tăng đáng kể về nguồn cung mới với 15 dự án được mở bán, tổng cộng hơn 8,000 căn hộ ra thị trường. Điều này giúp cân bằng cung cầu và ổn định giá cả.</span></p><p><span style="font-size: 16px;">Đặc biệt, các dự án tại khu Đông như Thủ Đức, Quận 9 đang trở thành tâm điểm với mức giá hợp lý và tiềm năng phát triển cao.</span></p><p><br></p><p><strong style="font-size: 24px;">Dự báo cho năm 2025</strong></p><p><span style="font-size: 16px;">Các chuyên gia dự báo thị trường BDS TP.HCM sẽ tiếp tục tăng trưởng ổn định trong năm 2025 với mức tăng khoảng 6-8%. Các yếu tố hỗ trợ bao gồm:</span></p><ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><span style="font-size: 16px;">Hạ tầng giao thông được cải thiện với các tuyến metro mới</span></li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><span style="font-size: 16px;">Chính sách hỗ trợ người mua nhà lần đầu</span></li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><span style="font-size: 16px;">Dòng vốn FDI tiếp tục đổ vào thị trường BDS</span></li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><span style="font-size: 16px;">Nhu cầu ở thực tăng cao do dân số trẻ</span></li></ol><p><br></p>',
        category: 'MARKET',
        readTime: '',
        views: 0,
        image: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1761015808/IQI/articles/yb82dbts5h8bgbnm8fsk.webp',
          publicId: 'IQI/articles/yb82dbts5h8bgbnm8fsk',
        },
        isFeatured: true,
        isPublished: true,
        createdAt: '2025-10-02T09:50:44.076Z',
        updatedAt: '2025-10-21T03:03:30.173Z',
        createdBy: 'eb95b8ac-141f-4c36-a21a-486fcac2cb0f',
        updatedBy: 'eb95b8ac-141f-4c36-a21a-486fcac2cb0f',
        tags: ['Đầu tư', 'Căn hộ'],
      },
    ],
  });

  const contact = await prisma.contact.create({
    data: {
      id: randomUUID(),
      mainHotline: '0764155155',
      mainEmail: 'info-vietnam@iqiglobal.com',
      website: 'https://iqiglobal.com',
      mainAddress: '67-69 Đ. Võ Nguyên Giáp, Thảo Điền, Thủ Đức, Hồ Chí Minh',
      workingHours: 'Thứ 2 - Thứ 6: 8:00 - 18:00, Thứ 7: 8:00 - 17:00',
      socialMedia: [
        {
          id: '1',
          platform: 'Facebook',
          url: 'https://www.facebook.com/IQIVietnam',
        },
        {
          id: '2',
          platform: 'Instagram',
          url: 'https://www.instagram.com/iqivietnam',
        },
        {
          id: '3',
          platform: 'Youtube',
          url: 'https://www.linkedin.com/company/iqivietnam',
        },
        {
          id: '4',
          platform: 'LinkedIn',
          url: 'https://www.youtube.com/IQIVIETNAM',
        },
        {
          id: '5',
          platform: 'TikTok',
          url: 'https://www.tiktok.com/@iqivietnam',
        },
      ],
    },
  });

  const partners = await prisma.partner.createMany({
    data: [
      {
        id: '9c5ec840-3355-49bb-8469-b9a616181e2f',
        name: 'Gamuda Land',
        category: 'DEVELOPER',
        shortDescription: 'Chủ đầu tư quốc tế',
        description:
          'Nhà phát triển bất động sản quốc tế với các dự án quy mô lớn.',
        countryCount: null,
        agentCount: null,
        projectCount: 2,
        partnershipYear: 2025,
        specialties: ['Township', 'Residential', 'Park-integrated'],
        achievements: ['International Developer', 'Master Plan Excellence'],
        benefits: Prisma.JsonNull,
        image: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1761017824/IQI/partners/obzsnytntknal14giuam.png',
          publicId: 'IQI/partners/obzsnytntknal14giuam',
        },
        loanRate: null,
        maxLoan: null,
        revenue: '77.8 triệu USD',
        createdAt: '2025-10-21T03:36:53.730Z',
        updatedAt: '2025-10-21T03:37:05.076Z',
      },
      {
        id: '63f35512-50b1-41d8-ad7d-27bfb051cc40',
        name: 'Ecopark',
        category: 'DEVELOPER',
        shortDescription: 'Chủ đầu tư xanh',
        description:
          'Tập trung vào các dự án bất động sản xanh, thân thiện với môi trường.',
        countryCount: null,
        agentCount: null,
        projectCount: 2,
        partnershipYear: 2025,
        specialties: ['Eco-living', 'Township', 'Residential'],
        achievements: ['Green Developer', 'Sustainable Design'],
        benefits: Prisma.JsonNull,
        image: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1761017755/IQI/partners/a8ylad0vfru4dq6gprm0.png',
          publicId: 'IQI/partners/a8ylad0vfru4dq6gprm0',
        },
        loanRate: null,
        maxLoan: null,
        revenue: '54.9 triệu USD',
        createdAt: '2025-10-21T03:35:55.974Z',
        updatedAt: '2025-10-21T03:35:55.974Z',
      },
      {
        id: '4020a59f-092b-4a1c-819c-5d035754132e',
        name: 'PropTech Asia',
        category: 'INTERNATIONAL',
        shortDescription: 'Nền tảng công nghệ BĐS',
        description:
          'Đơn vị tiên phong trong giải pháp công nghệ cho bất động sản tại Châu Á, tập trung vào số hóa và dữ liệu.',
        countryCount: 10,
        agentCount: 12000,
        projectCount: null,
        partnershipYear: 2025,
        specialties: Prisma.JsonNull,
        achievements: [
          'Digital Transformation Award',
          'AI Adoption Leader',
          'PropTech Accelerator',
        ],
        benefits: Prisma.JsonNull,
        image: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1761017561/IQI/partners/skuquhxy416dqxekcyuj.png',
          publicId: 'IQI/partners/skuquhxy416dqxekcyuj',
        },
        loanRate: null,
        maxLoan: null,
        revenue: null,
        createdAt: '2025-10-21T03:32:42.053Z',
        updatedAt: '2025-10-21T03:32:42.053Z',
      },
      {
        id: 'dfe575a9-be13-45d0-bd67-21a144bae2d6',
        name: 'CBRE',
        category: 'INTERNATIONAL',
        shortDescription: 'Dịch vụ BĐS thương mại',
        description:
          'Tập đoàn dịch vụ bất động sản lớn nhất thế giới với hơn 100 quốc gia hoạt động.',
        countryCount: 100,
        agentCount: 115000,
        projectCount: null,
        partnershipYear: 2016,
        specialties: Prisma.JsonNull,
        achievements: [
          'Global Commercial Leader',
          'Top Investment Partner',
          'Real Estate Service Excellence',
        ],
        benefits: Prisma.JsonNull,
        image: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1761017496/IQI/partners/cekqdoj4eatrkec3uwen.png',
          publicId: 'IQI/partners/cekqdoj4eatrkec3uwen',
        },
        loanRate: null,
        maxLoan: null,
        revenue: null,
        createdAt: '2025-10-21T03:15:10.445Z',
        updatedAt: '2025-10-21T03:31:37.386Z',
      },
      {
        id: '80f98c2f-81d6-46db-8eec-972109673394',
        name: 'Techcombank',
        category: 'BANK',
        shortDescription: 'Ngân hàng TMCP Kỹ thương Việt Nam',
        description: null,
        countryCount: null,
        agentCount: null,
        projectCount: null,
        partnershipYear: 2025,
        specialties: Prisma.JsonNull,
        achievements: Prisma.JsonNull,
        benefits: ['Vay online 100%', 'Xét duyệt nhanh', 'Không phí trả trước'],
        image: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1761016407/IQI/partners/ctlhwgfao98ofkchtvva.png',
          publicId: 'IQI/partners/ctlhwgfao98ofkchtvva',
        },
        loanRate: '6.8%/năm',
        maxLoan: '80%',
        revenue: null,
        createdAt: '2025-10-21T03:13:28.258Z',
        updatedAt: '2025-10-21T03:13:28.258Z',
      },
      {
        id: 'ce3ed2bf-cf5f-4773-8a00-38cb2a5826cf',
        name: 'MB Bank',
        category: 'BANK',
        shortDescription: 'Ngân hàng TMCP Quân đội',
        description: null,
        countryCount: null,
        agentCount: null,
        projectCount: null,
        partnershipYear: 2025,
        specialties: Prisma.JsonNull,
        achievements: Prisma.JsonNull,
        benefits: [
          'Ân hạn gốc 12 tháng',
          'Tư vấn miễn phí',
          'Giao dịch bảo mật',
        ],
        image: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1761016343/IQI/partners/l71kjdnb0ampiy8limu5.png',
          publicId: 'IQI/partners/l71kjdnb0ampiy8limu5',
        },
        loanRate: '6.9%/năm',
        maxLoan: '80%',
        revenue: null,
        createdAt: '2025-10-21T03:12:24.436Z',
        updatedAt: '2025-10-21T03:12:24.436Z',
      },
      {
        id: 'b4a7aec4-3365-4244-84df-bccfcc893351',
        name: 'Vietcombank',
        category: 'BANK',
        shortDescription: 'Ngân hàng TMCP Ngoại thương Việt Nam',
        description: null,
        countryCount: null,
        agentCount: null,
        projectCount: null,
        partnershipYear: 2017,
        specialties: Prisma.JsonNull,
        achievements: Prisma.JsonNull,
        benefits: ['Hỗ trợ 24/7', 'Thủ tục rõ ràng', 'Nhanh chóng tiện lợi'],
        image: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1761015597/IQI/partners/t4cf8zeba00lqvcuftw9.png',
          publicId: 'IQI/partners/t4cf8zeba00lqvcuftw9',
        },
        loanRate: '6.5%/năm',
        maxLoan: '85%',
        revenue: null,
        createdAt: '2025-10-03T02:39:38.130Z',
        updatedAt: '2025-10-21T02:59:58.413Z',
      },
      {
        id: 'd0b76ab7-4780-472e-9463-36f335e09013',
        name: 'Juwai IQI',
        category: 'INTERNATIONAL',
        shortDescription: 'Mạng lưới BĐS quốc tế',
        description:
          'Tập đoàn bất động sản quốc tế có mặt tại hơn 20 quốc gia, kết nối nhà đầu tư toàn cầu với thị trường Châu Á.',
        countryCount: 20,
        agentCount: 30,
        projectCount: null,
        partnershipYear: 2015,
        specialties: Prisma.JsonNull,
        achievements: [
          'Top Global Network',
          'Asia-Pacific Excellence',
          'Innovation in Outreach',
        ],
        benefits: Prisma.JsonNull,
        image: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1761015576/IQI/partners/beqpfntfq1wfw7x8no7i.png',
          publicId: 'IQI/partners/beqpfntfq1wfw7x8no7i',
        },
        loanRate: null,
        maxLoan: null,
        revenue: null,
        createdAt: '2025-10-02T03:09:06.290Z',
        updatedAt: '2025-10-21T02:59:37.474Z',
      },
      {
        id: '054d81b2-c776-4b38-bd8a-a0ce003ac1a4',
        name: 'Masterise Homes',
        category: 'DEVELOPER',
        shortDescription: 'Chủ đầu tư cao cấp',
        description:
          'Chuyên phát triển bất động sản hạng sang tại các khu vực trung tâm TP.HCM.',
        countryCount: null,
        agentCount: null,
        projectCount: 5,
        partnershipYear: 2020,
        specialties: ['Luxury', 'Mixed-use', 'Residential'],
        achievements: [
          'Premium Partner',
          'Luxury Specialist',
          'Innovation Award',
        ],
        benefits: Prisma.JsonNull,
        image: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1761015624/IQI/partners/i8yelqgceosr6ff5jcdx.png',
          publicId: 'IQI/partners/i8yelqgceosr6ff5jcdx',
        },
        loanRate: null,
        maxLoan: null,
        revenue: '49.7 triệu USD',
        createdAt: '2025-10-02T03:02:29.967Z',
        updatedAt: '2025-10-21T03:00:25.234Z',
      },
    ],
  });

  // const project = await prisma.project.create({
  //   data: {
  //     id: projectId,
  //     isFeatured: true,
  //     isExclusive: false,
  //     visibleOnWeb: true,
  //     createdAt: '2025-09-12T02:45:03.285Z',
  //     updatedAt: '2025-09-25T10:23:24.513Z',
  //     createdBy: id,
  //     updatedBy: id,
  //     introduction: {
  //       coverImage: {
  //         url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758614081/IQI/projects/y601uamfqtzg1sd4yvcm.jpg',
  //         publicId: 'IQI/projects/y601uamfqtzg1sd4yvcm',
  //       },
  //       coverTitle: 'Trải nghiệm nghỉ dưỡng giữa thiên nhiên',
  //       logoImages: [
  //         {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758614080/IQI/projects/ad3bemdaaq18ob6kzh8f.png',
  //           publicId: 'IQI/projects/ad3bemdaaq18ob6kzh8f',
  //         },
  //         {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758614079/IQI/projects/qqeuyax8zixoncz0rje0.png',
  //           publicId: 'IQI/projects/qqeuyax8zixoncz0rje0',
  //         },
  //       ],
  //       launchTitle:
  //         '<p style="line-height: 1.2;"><strong style="color: rgb(255, 140, 63);"><em>Chính thức ra mắt</em></strong></p><p style="line-height: 1.2;"><strong style="color: rgb(118, 192, 75); font-size: 36px;"><em>RETREAT ISLAND</em></strong></p><p style="line-height: 1.2;"><strong style="color: rgb(118, 192, 75);"><em>Biệt thự đảo giữa rừng retreat</em></strong></p>',
  //       launchImages: [
  //         {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758616310/IQI/projects/rkslvscuweo0tngypzf1.jpg',
  //           publicId: 'IQI/projects/rkslvscuweo0tngypzf1',
  //         },
  //         {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758616310/IQI/projects/aoro2fpf3xwwkmwkkwmu.jpg',
  //           publicId: 'IQI/projects/aoro2fpf3xwwkmwkkwmu',
  //         },
  //         {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758616310/IQI/projects/dijeanx5lubzjemofyug.jpg',
  //           publicId: 'IQI/projects/dijeanx5lubzjemofyug',
  //         },
  //       ],
  //       coverLogoIndex: 1,
  //       headerLogoIndex: 0,
  //       launchBackground: {
  //         url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758616309/IQI/projects/l2ylp0sspm8othknyxuz.jpg',
  //         publicId: 'IQI/projects/l2ylp0sspm8othknyxuz',
  //       },
  //       introductionImage: {
  //         url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758616310/IQI/projects/os9resjywvudntvzvbl9.png',
  //         publicId: 'IQI/projects/os9resjywvudntvzvbl9',
  //       },
  //       introductionTitle:
  //         '<p style="line-height: 1;"><strong style="font-size: 40px; color: rgb(118, 192, 75);">Eco Retreat</strong></p><p style="line-height: 1;"><strong style="font-size: 40px;">ĐÔ THỊ "RỪNG RETREAT"</strong></p><p style="line-height: 1;"><strong style="font-size: 40px;">ĐẦU TIÊN TẠI VIỆT NAM</strong></p><p style="line-height: 1;"><strong style="font-size: 40px; color: rgb(255, 212, 170);">của Ecopark</strong></p>',
  //       introductionVideo: 'https://www.youtube.com/watch?v=pLL2g9_mZdo',
  //       launchDescription:
  //         '<p><span style="color: rgb(241, 196, 15);">✦</span> View 2 mặt hồ thiên nga ngay cạnh nhà, có hồ bơi &amp; sân vườn riêng</p><p><span style="color: rgb(241, 196, 15);">✦</span> Nằm trên 16 nhánh đảo riêng biệt, trung tâm của đô thị đáng sống nhất miền Nam</p><p><span style="color: rgb(241, 196, 15);">✦</span> "Nhà giữa đảo - Đảo giữa rừng retreat" chưa từng có trên thị trường.</p>',
  //       introductionBackground: {
  //         url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758616309/IQI/projects/sojymmfwavlfp0q6aivv.jpg',
  //         publicId: 'IQI/projects/sojymmfwavlfp0q6aivv',
  //       },
  //       introductionDescription:
  //         '<p style="line-height: 1.5;">Xây dựng mô hình khu đô thị trên thị trường không hiếm, nhưng kiến tạo môi trường đáng sống đúng nghĩa, mang đến những giá trị đích thực thì không phải dự án nào cũng làm được.</p><p style="line-height: 1.5;">Những khu đô thị xanh của Nhà sáng lập Ecopark là ngoại lệ - nơi mọi chủ nhân đều tự hào về quyết định sở hữu và đầu tư của mình.</p><p style="line-height: 1.5;">Chào mừng Quý Anh Chị đến với Eco Retreat - Đô thị xanh kiểu mẫu của Ecopark tại miền Nam!</p>',
  //     },
  //     overview: {
  //       basicInfo: [
  //         {
  //           id: 'category',
  //           key: 'Danh mục',
  //           type: 'select',
  //           value: 'resort',
  //           hidden: true,
  //           options: [
  //             {
  //               value: 'residential',
  //               label: 'Nhà ở',
  //             },
  //             {
  //               value: 'international',
  //               label: 'Quốc tế',
  //             },
  //             {
  //               value: 'resort',
  //               label: 'Nghỉ dưỡng',
  //             },
  //           ],
  //         },
  //         {
  //           id: 'project_name',
  //           key: 'Tên dự án',
  //           type: 'text',
  //           value: 'Eco Retreat',
  //         },
  //         {
  //           id: 'developer',
  //           key: 'Chủ đầu tư',
  //           type: 'text',
  //           value: 'Ecopark',
  //         },
  //         {
  //           id: 'product_group',
  //           key: 'Nhóm sản phẩm',
  //           type: 'text',
  //           value: 'Căn hộ, biệt thự nghỉ dưỡng',
  //         },
  //         {
  //           id: 'ownership_status',
  //           key: 'Tình trạng sở hữu',
  //           type: 'text',
  //           value: 'Lâu dài',
  //         },
  //         {
  //           id: 'phase',
  //           key: 'Giai đoạn',
  //           type: 'text',
  //           value: '1',
  //         },
  //         {
  //           id: 'project_type',
  //           key: 'Loại hình',
  //           type: 'select',
  //           value: 'ecological_urban_area',
  //           options: [
  //             {
  //               value: 'apartment',
  //               label: 'Căn hộ',
  //             },
  //             {
  //               value: 'villa',
  //               label: 'Biệt thự',
  //             },
  //             {
  //               value: 'townhouse',
  //               label: 'Nhà phố',
  //             },
  //             {
  //               value: 'resort',
  //               label: 'Resort',
  //             },
  //             {
  //               value: 'condotel',
  //               label: 'Condotel',
  //             },
  //             {
  //               value: 'beach_villa',
  //               label: 'Villa biển',
  //             },
  //             {
  //               value: 'office_for_lease',
  //               label: 'Văn phòng cho thuê',
  //             },
  //             {
  //               value: 'co_working_space',
  //               label: 'Co-working space',
  //             },
  //             {
  //               value: 'ecological_urban_area',
  //               label: 'Khu đô thị sinh thái',
  //             },
  //           ],
  //         },
  //         {
  //           id: 'legal_status',
  //           key: 'Tình trạng pháp lý',
  //           type: 'text',
  //           value: 'Sổ hồng sở hữu lâu dài',
  //         },
  //         {
  //           id: 'handover_time',
  //           key: 'Thời gian bàn giao',
  //           type: 'text',
  //           value: 'Dự kiến Quý II/2028',
  //         },
  //         {
  //           id: 'status',
  //           key: 'Trạng thái',
  //           type: 'select',
  //           value: 'launching',
  //           options: [
  //             {
  //               value: 'planning',
  //               label: 'Đang lên kế hoạch',
  //             },
  //             {
  //               value: 'under_construction',
  //               label: 'Đang xây dựng',
  //             },
  //             {
  //               value: 'selling',
  //               label: 'Đang bán',
  //             },
  //             {
  //               value: 'launching',
  //               label: 'Đang mở bán',
  //             },
  //             {
  //               value: 'completed',
  //               label: 'Hoàn thành',
  //             },
  //           ],
  //         },
  //         {
  //           id: 'address',
  //           key: 'Địa chỉ',
  //           type: 'text',
  //           value: 'Đường Nguyễn Hữu Trí, Xã Thanh Phú, Huyện Bến Lức, Long An',
  //         },
  //         {
  //           id: 'architectural_designer',
  //           key: 'Đơn vị thiết kế kiến trúc',
  //           type: 'text',
  //           value: 'Coteccons, Ricons',
  //         },
  //         {
  //           id: 'construction_unit',
  //           key: 'Đơn vị thi công',
  //           type: 'text',
  //           value: 'Coteccons, Ricons',
  //         },
  //         {
  //           id: 'landscape_designer',
  //           key: 'Đơn vị thiết kế cảnh quan',
  //           type: 'text',
  //           value: 'PLA Studio',
  //         },
  //         {
  //           id: 'total_units',
  //           key: 'Tổng số căn/sản phẩm',
  //           type: 'number',
  //           value: 1200,
  //         },
  //         {
  //           id: 'land_area',
  //           key: 'Diện tích đất',
  //           type: 'text',
  //           value: '220.05',
  //         },
  //         {
  //           id: 'bathrooms',
  //           key: 'Phòng tắm',
  //           type: 'range',
  //           value: [1, 3],
  //         },
  //         {
  //           id: 'bedrooms',
  //           key: 'Phòng ngủ',
  //           type: 'range',
  //           value: [1, 4],
  //         },
  //         {
  //           id: 'category',
  //           key: 'Danh mục',
  //           type: 'select',
  //           value: 'resort',
  //           hidden: true,
  //           options: [
  //             {
  //               value: 'residential',
  //               label: 'Nhà ở',
  //             },
  //             {
  //               value: 'international',
  //               label: 'Quốc tế',
  //             },
  //             {
  //               value: 'resort',
  //               label: 'Nghỉ dưỡng',
  //             },
  //           ],
  //         },
  //         {
  //           id: 'slug',
  //           key: 'Slug',
  //           type: 'text',
  //           value: 'eco-retreat',
  //           hidden: true,
  //         },
  //         {
  //           id: 'price',
  //           key: 'Giá',
  //           type: 'range',
  //           value: [1000000000, 2000000000],
  //           hidden: true,
  //         },
  //         {
  //           id: 'currency_unit',
  //           key: 'Đơn vị tiền tệ',
  //           type: 'select',
  //           value: 'vnd',
  //           hidden: true,
  //           options: [
  //             {
  //               value: 'vnd',
  //               label: 'VND',
  //             },
  //             {
  //               value: 'usd',
  //               label: 'USD',
  //             },
  //             {
  //               value: 'eur',
  //               label: 'EUR',
  //             },
  //           ],
  //         },
  //         {
  //           id: 'measurement_unit',
  //           key: 'Đơn vị đo lường',
  //           type: 'select',
  //           value: 'sqrt',
  //           hidden: true,
  //           options: [
  //             {
  //               value: 'sqm',
  //               label: 'sqm',
  //             },
  //             {
  //               value: 'sqrt',
  //               label: 'sqrt',
  //             },
  //           ],
  //         },
  //         {
  //           id: 'country',
  //           key: 'Quốc gia',
  //           type: 'text',
  //           value: 'Vietnam',
  //           hidden: true,
  //         },
  //         {
  //           id: 'city',
  //           key: 'Tỉnh/Thành phố',
  //           type: 'text',
  //           value: 'Tỉnh Long An',
  //           hidden: true,
  //         },
  //         {
  //           id: 'district',
  //           key: 'Quận/Huyện',
  //           type: 'text',
  //           value: 'Huyện Bến Lức',
  //           hidden: true,
  //         },
  //       ],
  //       overviewImages: [
  //         {
  //           image: {
  //             url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617326/IQI/projects/zudxhihxmlycodhfie0t.jpg',
  //             publicId: 'IQI/projects/zudxhihxmlycodhfie0t',
  //           },
  //           description:
  //             '<p>Khu đô thị “rừng retreat” đầu tiên của Ecopark</p>',
  //         },
  //         {
  //           image: {
  //             url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617326/IQI/projects/bzo6xajmia0h37oal8xo.jpg',
  //             publicId: 'IQI/projects/bzo6xajmia0h37oal8xo',
  //           },
  //           description:
  //             '<p>Chiếm &gt; 121 ha với 4 triệu cây hoa, 8 tầng 8 lớp thực vật</p>',
  //         },
  //         {
  //           image: {
  //             url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617326/IQI/projects/yss5mpta73ivix8qxy8h.jpg',
  //             publicId: 'IQI/projects/yss5mpta73ivix8qxy8h',
  //           },
  //           description:
  //             '<p><span style="color: rgb(241, 196, 15);">✦</span> Một khu phức hợp đầy đủ tiện ích</p><p><span style="color: rgb(241, 196, 15);">✦</span> Một “rừng trị liệu” với các tiện ích phục hồi, tái tạo sức khỏe cạnh nhà</p>',
  //         },
  //         {
  //           image: {
  //             url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617326/IQI/projects/w40oavd1z4sw4pvk19mi.jpg',
  //             publicId: 'IQI/projects/w40oavd1z4sw4pvk19mi',
  //           },
  //           description:
  //             '<p>Tọa độ giao thương huyết mạch của miền Nam, kết nối TP HCM &amp; sân bay Long Thành chỉ khoảng 30 phút</p>',
  //         },
  //       ],
  //       experienceImage: {
  //         url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617325/IQI/projects/j8zvdghuserbxmb23nve.webp',
  //         publicId: 'IQI/projects/j8zvdghuserbxmb23nve',
  //       },
  //       overviewBackground: {
  //         url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617325/IQI/projects/ia9kjoaqdfpia9h7gdjp.jpg',
  //         publicId: 'IQI/projects/ia9kjoaqdfpia9h7gdjp',
  //       },
  //     },
  //     location: {
  //       title:
  //         '<p style="line-height: 1.2;"><span style="font-size: 40px; color: rgb(118, 192, 75);">Vị Trí Độc Tôn</span></p><p style="line-height: 1.2;"><span style="color: rgb(255, 212, 170); font-size: 36px;">Không xa phố thị,</span><span style="color: rgb(118, 192, 75); font-size: 36px;"> đủ gần thiên nhiên</span></p>',
  //       embedCode:
  //         '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.890355931884!2d106.50165867480317!3d10.665617989476504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528b007259db1%3A0xc93181e7ddb0da89!2sEco%20Retreat%20Long%20An!5e0!3m2!1svi!2s!4v1757412641592!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  //       coordinates: '[object Object]',
  //       description:
  //         '<p><span style="color: rgb(241, 196, 15);">✦</span> <strong><em>Tọa độ kết nối huyết mạch của phía Nam</em></strong></p><p>“Cửa ngõ” kết nối Đông - Tây của TP HCM, thuận tiện di chuyển đến các quận của Sài Gòn, sân bay Tân Sơn Nhất, các tỉnh Tây Nam Bộ và tương lai đến sân bay Long Thành chỉ khoảng 30 phút.</p><p><span style="color: rgb(241, 196, 15);">✦</span> <strong><em>Trung tâm mạng lưới logistics của miền Nam</em></strong></p><p>Giao điểm của Vành đai 3, Cao tốc TP HCM - Trung Lương, Cao tốc Bến Lức - Long Thành, kết nối thuận tiện đến hệ thống cao tốc, sân bay, cảng biển, khu công nghiệp, công nghệ cao,…</p><p><span style="color: rgb(241, 196, 15);">✦</span> <strong><em>Tâm điểm sinh thái - “Nhà nghỉ dưỡng” của cư dân thành phố</em></strong></p><p>Nằm nép mình bên dòng sông Bến Lức và len lỏi những dòng chảy sông, hồ uốn lượn quanh đô thị.</p>',
  //       mapInputType: 'embed',
  //       locationImage: {
  //         url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617684/IQI/projects/ilvslm6nlpmwnoet6ki5.webp',
  //         publicId: 'IQI/projects/ilvslm6nlpmwnoet6ki5',
  //       },
  //       locationBackground: {
  //         url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617684/IQI/projects/e0wfkanflqucdfqhq7pm.jpg',
  //         publicId: 'IQI/projects/e0wfkanflqucdfqhq7pm',
  //       },
  //     },
  //     siteplan: {
  //       view360: 'https://360.eco-retreat.com.vn/plan',
  //       siteplanImages: [
  //         {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758619653/IQI/projects/mpms4zzwslrm9uug33gt.jpg',
  //           publicId: 'IQI/projects/mpms4zzwslrm9uug33gt',
  //         },
  //         {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758619653/IQI/projects/zvdak9qfyhu4gijwuz1v.jpg',
  //           publicId: 'IQI/projects/zvdak9qfyhu4gijwuz1v',
  //         },
  //       ],
  //     },
  //     production: {
  //       products: [
  //         {
  //           id: 1757495827022,
  //           name: 'Island Villa',
  //           image: {
  //             url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758697765/IQI/projects/pcl2vx7k9bfvrfx5dxmc.jpg',
  //             publicId: 'IQI/projects/pcl2vx7k9bfvrfx5dxmc',
  //           },
  //           description:
  //             '<table style="border-collapse: collapse; width: 100.687%; height: 65.7222px;" border="1"><colgroup><col style="width: 56.8134%;"><col style="width: 43.1866%;"></colgroup>\r\n<tbody>\r\n<tr style="height: 32.8611px;">\r\n<td style="line-height: 1.2;"><strong>Loại h&igrave;nh:</strong> Đơn lập, Song lập, Villa Rẻ quạt</td>\r\n<td style="line-height: 1.2;"><strong>X&acirc;y dựng:</strong> 2 tầng + 1 tum</td>\r\n</tr>\r\n<tr style="height: 32.8611px;">\r\n<td style="line-height: 1.2;"><strong>Diện t&iacute;ch:</strong> 205m&sup2; - 484m&sup2;</td>\r\n<td style="line-height: 1.2;"><strong>C&ocirc;ng năng:</strong> Để ở</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n<p>&nbsp;</p>',
  //         },
  //         {
  //           id: 1757496163883,
  //           name: 'Shop Villa đảo',
  //           image: {
  //             url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758697765/IQI/projects/s9kwvrvlxkd6zaqcgoh8.jpg',
  //             publicId: 'IQI/projects/s9kwvrvlxkd6zaqcgoh8',
  //           },
  //           description:
  //             '<table style="border-collapse: collapse; width: 100.687%; height: 65.7222px;" border="1"><colgroup><col style="width: 56.8134%;"><col style="width: 43.1866%;"></colgroup>\r\n<tbody>\r\n<tr style="height: 32.8611px;">\r\n<td style="line-height: 1.2;"><strong>Loại h&igrave;nh:</strong> Đơn lập, Song lập</td>\r\n<td style="line-height: 1.2;"><strong>X&acirc;y dựng:</strong> 3 tầng + 1 tum</td>\r\n</tr>\r\n<tr style="height: 32.8611px;">\r\n<td style="line-height: 1.2;"><strong>Diện t&iacute;ch đất:</strong> 205m&sup2; - 307m&sup2;</td>\r\n<td style="line-height: 1.2;"><strong>C&ocirc;ng năng:</strong> Thương mại kết hợp hoặc để ở</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n<p>&nbsp;</p>',
  //         },
  //         {
  //           id: 1757496250014,
  //           name: 'Dinh thự đảo',
  //           image: {
  //             url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758697765/IQI/projects/bw50zcs6hibe7tx3gt7q.jpg',
  //             publicId: 'IQI/projects/bw50zcs6hibe7tx3gt7q',
  //           },
  //           description:
  //             '<table style="border-collapse: collapse; width: 100.687%; height: 65.7222px;" border="1"><colgroup><col style="width: 56.8134%;"><col style="width: 43.1866%;"></colgroup>\r\n<tbody>\r\n<tr style="height: 32.8611px;">\r\n<td style="line-height: 1.2;"><strong>Diện t&iacute;ch đất:</strong> 567m&sup2; - 697m&sup2;</td>\r\n<td style="line-height: 1.2;"><strong>X&acirc;y dựng:</strong> 2 tầng + 1 tum</td>\r\n</tr>\r\n<tr style="height: 32.8611px;">\r\n<td style="line-height: 1.2;"><strong>Diện t&iacute;ch s&agrave;n:</strong> 437m&sup2;</td>\r\n<td style="line-height: 1.2;"><strong>C&ocirc;ng năng:</strong> Để ở</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n<p>&nbsp;</p>',
  //         },
  //         {
  //           id: 1757496319281,
  //           name: 'Căn hộ SKY RETREAT',
  //           image: {
  //             url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758697765/IQI/projects/dom28hhsuxchasb68zrp.jpg',
  //             publicId: 'IQI/projects/dom28hhsuxchasb68zrp',
  //           },
  //           description:
  //             '<table border="1" style="border-collapse: collapse; width: 100%;" class="ql-table-better"><temporary class="ql-table-temporary" border="1" style="border-collapse: collapse; width: 100%;" data-class="ql-table-better"><br></temporary><colgroup><col></colgroup><tbody><tr><td data-row="1"><p class="ql-table-block" data-cell="1"><strong>Loại hình sản phẩm:</strong> Studio, 1PN-3PN, Garden Villa, Duplex, Sky Villa</p></td></tr><tr><td data-row="2"><p class="ql-table-block" data-cell="1"><strong>Tiêu chuẩn bàn giao:</strong> Hoàn thiện nội thất liền tường</p></td></tr></tbody></table><p><br></p>',
  //         },
  //       ],
  //       furnitures: [
  //         {
  //           id: '1757558115925-0',
  //           image: {
  //             url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758697764/IQI/projects/zfhozauo0tbc0ukp325n.jpg',
  //             publicId: 'IQI/projects/zfhozauo0tbc0ukp325n',
  //           },
  //           title: 'Phòng khách hiện đại',
  //         },
  //         {
  //           id: '1757558115925-1',
  //           image: {
  //             url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758697764/IQI/projects/evdwjj0gvdqjxdudh1ba.jpg',
  //             publicId: 'IQI/projects/evdwjj0gvdqjxdudh1ba',
  //           },
  //           title: 'Villa ven hồ',
  //         },
  //         {
  //           id: '1757558115925-2',
  //           image: {
  //             url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758697956/IQI/projects/xuoi7g1vqkstaaafvzdj.jpg',
  //             publicId: 'IQI/projects/xuoi7g1vqkstaaafvzdj',
  //           },
  //           title: 'Không gian thoáng sáng',
  //         },
  //         {
  //           id: '1757558115925-3',
  //           image: {
  //             url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758697956/IQI/projects/ygyxrdxi5tm38ggc9gcg.jpg',
  //             publicId: 'IQI/projects/ygyxrdxi5tm38ggc9gcg',
  //           },
  //           title: 'Sống giữa thiên nhiên',
  //         },
  //       ],
  //       furnitureBackground: {
  //         url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758697764/IQI/projects/ppus97jhivyzjt3vnjbs.jpg',
  //         publicId: 'IQI/projects/ppus97jhivyzjt3vnjbs',
  //       },
  //     },
  //     amenity: {
  //       title:
  //         '<p class="ql-align-center" style="line-height: 1.2;"><span style="color: rgb(118, 192, 75); font-size: 40px;">Tiện Ích</span></p><p class="ql-align-center" style="line-height: 1.2;"><em style="color: rgb(118, 192, 75); font-size: 40px;">Không gian Retreat</em><span style="font-size: 40px;"> </span><em style="font-size: 40px; color: rgb(255, 212, 170);">cho mọi thế hệ</em></p>',
  //       description:
  //         '<p>Giống như một <strong>“thành phố hiện đại thu nhỏ”</strong>, Eco Retreat được quy hoạch bài bản, đầy đủ tiện ích từ hệ thống trường từ mầm non đến THPT, bệnh viện &amp; dịch vụ y tế quốc tế, khu thương mại - giải trí, trung tâm thể thao… Đặc biệt còn có Eco Bus phục vụ dành riêng cư dân Eco Retreat.</p><p class="ql-align-center">Điểm nhấn nổi bật là <strong>tiện ích “retreat” đặc quyền</strong> - lần đầu tiên xuất hiện trong dự án của NSL Ecopark và khó tìm thấy ở một đô thị khác trên thị trường bất động sản phía Nam.</p>',
  //       amenityImages: [
  //         {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617649/IQI/projects/tmjb2ec8jufkffv6kahz.jpg',
  //           publicId: 'IQI/projects/tmjb2ec8jufkffv6kahz',
  //         },
  //         {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617649/IQI/projects/upwvd6dprsgompcxprua.jpg',
  //           publicId: 'IQI/projects/upwvd6dprsgompcxprua',
  //         },
  //         {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617649/IQI/projects/arf7resm4yldh8bjlplb.jpg',
  //           publicId: 'IQI/projects/arf7resm4yldh8bjlplb',
  //         },
  //         {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617649/IQI/projects/ruwtqhyu8lhi8uoxcyum.jpg',
  //           publicId: 'IQI/projects/ruwtqhyu8lhi8uoxcyum',
  //         },
  //       ],
  //     },
  //     timeline: {
  //       progressTitle: 'Hình Ảnh Tiến Độ Dự Án',
  //       timelineImage: {
  //         url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698004/IQI/projects/ylraptuvkvebzxgzejqo.png',
  //         publicId: 'IQI/projects/ylraptuvkvebzxgzejqo',
  //       },
  //       timelineTitle:
  //         '<p><span style="color: rgb(118, 196, 114); font-size: 40px;">Các Cột Mốc Tạo Sóng</span></p><p><em style="color: rgb(255, 212, 170); font-size: 40px;">cho Eco Retreat</em></p>',
  //       progressImages: [
  //         {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698002/IQI/projects/ccx1wzfzuxtcxa5l3zrj.jpg',
  //           publicId: 'IQI/projects/ccx1wzfzuxtcxa5l3zrj',
  //         },
  //         {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698002/IQI/projects/nvwyd6zljrlreokyn7zi.jpg',
  //           publicId: 'IQI/projects/nvwyd6zljrlreokyn7zi',
  //         },
  //         {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698002/IQI/projects/ujwrzoio0pvlw2xcurhv.jpg',
  //           publicId: 'IQI/projects/ujwrzoio0pvlw2xcurhv',
  //         },
  //         {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698003/IQI/projects/w874fdt45mbu19a10ntw.jpg',
  //           publicId: 'IQI/projects/w874fdt45mbu19a10ntw',
  //         },
  //         {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698002/IQI/projects/nikv6qg7s3sgoerbtwn7.jpg',
  //           publicId: 'IQI/projects/nikv6qg7s3sgoerbtwn7',
  //         },
  //         {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698002/IQI/projects/rn78wykwbut6xwpqtxyt.jpg',
  //           publicId: 'IQI/projects/rn78wykwbut6xwpqtxyt',
  //         },
  //         {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698003/IQI/projects/gzq03cur4qosvgiwt1bd.jpg',
  //           publicId: 'IQI/projects/gzq03cur4qosvgiwt1bd',
  //         },
  //         {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698004/IQI/projects/gsjxgiuclvkw4rrculbw.jpg',
  //           publicId: 'IQI/projects/gsjxgiuclvkw4rrculbw',
  //         },
  //       ],
  //       backgroundImage: {
  //         url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698003/IQI/projects/ports9qi3lhmd01fmwal.jpg',
  //         publicId: 'IQI/projects/ports9qi3lhmd01fmwal',
  //       },
  //     },
  //     contact: {
  //       agency: {
  //         title: 'Thông Tin Đại Lý',
  //         agencyImage: {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698112/IQI/projects/p4rjlfecqmorfubfs6hi.png',
  //           publicId: 'IQI/projects/p4rjlfecqmorfubfs6hi',
  //         },
  //         description:
  //           '<p><span style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(15, 23, 42);">IQI Vietnam - thành viên của tập đoàn quốc tế IQI Global, là một trong những đơn vị phân phối bất động sản hàng đầu hiện nay. Với đội ngũ chuyên gia giàu kinh nghiệm và mạng lưới hoạt động rộng khắp, IQI Vietnam vinh dự trở thành Đại lý F1 chính thức phân phối dự án khu đô thị sinh thái Eco Retreat tại Ecopark.</span></p><p><span style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(15, 23, 42);">Việc hợp tác chiến lược này sẽ giúp khách hàng tiếp cận dễ dàng hơn với những sản phẩm đẳng cấp, pháp lý minh bạch và tiềm năng gia tăng giá trị bền vững. Đồng thời, IQI Vietnam cam kết mang đến dịch vụ tư vấn chuyên nghiệp, tận tâm nhằm đáp ứng tốt nhất nhu cầu đầu tư và an cư của Quý khách hàng.</span></p><p><br></p>',
  //       },
  //       layoutId: 'layout-1',
  //       logoImage: {
  //         url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698096/IQI/projects/tedlaonp9haz4tkp7x9d.png',
  //         publicId: 'IQI/projects/tedlaonp9haz4tkp7x9d',
  //       },
  //       contactBackground: {
  //         url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698099/IQI/projects/gem88qmhjb6ebcism9u6.png',
  //         publicId: 'IQI/projects/gem88qmhjb6ebcism9u6',
  //       },
  //     },
  //     other: {
  //       policy: {
  //         title: 'Chính Sách Bán Hàng Eco Retreat',
  //         policyText:
  //           '<p><span style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(255, 212, 170);">✦</span><span style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(15, 23, 42);"> Thanh toán đến khi nhận nhà chỉ </span><strong style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(118, 196, 114);"><em>25%</em></strong></p><p><span style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(255, 212, 170);">✦</span><span style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(15, 23, 42);"> Ngân hàng cho vay </span><strong style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(118, 196, 114);"><em>70%</em></strong></p><p><span style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(255, 212, 170);">✦</span><span style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(15, 23, 42);"> Hỗ trợ lãi suất &amp; ân hạn gốc </span><strong style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(118, 196, 114);"><em>24 tháng</em></strong></p><p><span style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(255, 212, 170);">✦</span><span style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(15, 23, 42);"> Ưu đãi thanh toán sớm </span><strong style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(118, 196, 114);"><em>10%</em></strong></p><p><span style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(255, 212, 170);">✦</span><span style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(15, 23, 42);"> Ưu đãi thanh toán theo tiến độ </span><strong style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(118, 196, 114);"><em>2%</em></strong></p><p><span style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(255, 212, 170);">✦</span><span style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(15, 23, 42);"> Ưu đãi cho KH đã sở hữu BĐS của NSL Ecopark </span><strong style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(118, 196, 114);"><em>0,5%</em></strong></p>',
  //         policyImage: {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1759909391/IQI/projects/tpu6lsk29ltf67rqfzay.webp',
  //           publicId: 'IQI/projects/tpu6lsk29ltf67rqfzay',
  //         },
  //       },
  //       invitation: {
  //         fields: [
  //           {
  //             id: 'field_1759898670704',
  //             size: 48,
  //             type: 'text',
  //             label: 'Tên',
  //             value: 'Võ Gia Bảo',
  //             position: {
  //               x: 50.81940001789413,
  //               y: 68.09016023909034,
  //             },
  //             fontFamily: 'Great Vibes',
  //           },
  //           {
  //             id: 'field_1759905514335',
  //             size: 240,
  //             type: 'image',
  //             label: 'Ảnh đại diện',
  //             value: {
  //               url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1759905573/IQI/projects/fpg5idbgw8vvnq2bvblu.png',
  //               publicId: 'IQI/projects/fpg5idbgw8vvnq2bvblu',
  //             },
  //             position: {
  //               x: 49.91639000288253,
  //               y: 43.92546153316582,
  //             },
  //             fontFamily: 'Inherit',
  //           },
  //           {
  //             id: 'field_1759908284749',
  //             size: 48,
  //             type: 'text',
  //             label: 'số điện thoại',
  //             value: '0911095800',
  //             position: {
  //               x: 50.44555182586116,
  //               y: 76.86425575087429,
  //             },
  //             fontFamily: 'DFVN Menata',
  //           },
  //           {
  //             id: 'field_1759908326752',
  //             size: 48,
  //             type: 'text',
  //             label: 'Chức vụ',
  //             value: 'Chuyên viên kinh doanh',
  //             position: {
  //               x: 50.86627230968972,
  //               y: 72.87695045989584,
  //             },
  //             fontFamily: 'DFVN Menata',
  //           },
  //         ],
  //         invitationImage: {
  //           url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1759909390/IQI/projects/ubgpno7eno4qoat5w4rg.jpg',
  //           publicId: 'IQI/projects/ubgpno7eno4qoat5w4rg',
  //         },
  //       },
  //       breakImages: [
  //         {
  //           image: {
  //             url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1759909407/IQI/projects/g0k36ux1znencixakqte.jpg',
  //             publicId: 'IQI/projects/g0k36ux1znencixakqte',
  //           },
  //           position: 'introduction',
  //         },
  //         {
  //           image: {
  //             url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1759909392/IQI/projects/cimo97jrgcqyfbii0bcu.jpg',
  //             publicId: 'IQI/projects/cimo97jrgcqyfbii0bcu',
  //           },
  //           position: 'location',
  //         },
  //       ],
  //     },
  //   },
  // });

  // console.log('Project created with id:', project.id);
  console.log('User created:', user);
  console.log('Contact created:', contact);
  console.log('Partners created:', partners);
  console.log('Article created:', article);
}

main()
  .catch((e) => console.error(e))
  .finally(() => {
    prisma.$disconnect().catch(console.error);
  });
