import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  await prisma.project.deleteMany({});
  const id = randomUUID();
  const projectId = randomUUID();
  const hashedPassword = await bcrypt.hash('123123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      id,
      name: 'Admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'ADMIN',
      isActive: true,
      avatarUrl: null,
      phone: '0911095800',
    },
  });

  const project = await prisma.project.create({
    data: {
      id: projectId,
      isFeatured: true,
      isExclusive: false,
      visibleOnWeb: true,
      createdAt: '2025-09-12T02:45:03.285Z',
      updatedAt: '2025-09-13T02:23:50.744Z',
      createdBy: id,
      updatedBy: id,
      introduction: {
        coverImage:
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757403917/projects/jugaibebygpodjfcgyas.jpg',
        coverTitle: 'Trải nghiệm nghỉ dưỡng giữa thiên nhiên',
        logoImages: [
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757403188/projects/bbzcbwsw50ovabfiprlk.png',
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757403187/projects/kg0dtcqjz11okxtcorrz.png',
        ],
        launchTitle:
          '<p style="line-height: 1.2;"><strong style="color: rgb(255, 140, 63);"><em>Chính thức ra mắt</em></strong></p><p style="line-height: 1.2;"><strong style="color: rgb(118, 192, 75); font-size: 36px;"><em>RETREAT ISLAND</em></strong></p><p style="line-height: 1.2;"><strong style="color: rgb(118, 192, 75);"><em>Biệt thự đảo giữa rừng retreat</em></strong></p>',
        launchImages: [
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757403913/projects/vkiilcy5tcbknmbqbemn.jpg',
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757403913/projects/qack9lx1run7a8txck6a.jpg',
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757403914/projects/n0lzvrvtnqbtcsyvrzes.jpg',
        ],
        coverLogoIndex: 1,
        headerLogoIndex: 0,
        launchBackground:
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757403923/projects/seywe3gvspcsybkfqpte.jpg',
        introductionImage:
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757403921/projects/mrcqofasy8pbe8zqner8.png',
        introductionTitle:
          '<p style="line-height: 1;"><strong style="font-size: 40px; color: rgb(118, 192, 75);">Eco Retreat</strong></p><p style="line-height: 1;"><strong style="font-size: 40px;">ĐÔ THỊ "RỪNG RETREAT"</strong></p><p style="line-height: 1;"><strong style="font-size: 40px;">ĐẦU TIÊN TẠI VIỆT NAM</strong></p><p style="line-height: 1;"><strong style="font-size: 40px; color: rgb(255, 212, 170);">của Ecopark</strong></p>',
        introductionVideo: 'https://www.youtube.com/watch?v=pLL2g9_mZdo',
        launchDescription:
          '<p><span style="color: rgb(241, 196, 15);">✦</span> View 2 mặt hồ thiên nga ngay cạnh nhà, có hồ bơi &amp; sân vườn riêng</p><p><span style="color: rgb(241, 196, 15);">✦</span> Nằm trên 16 nhánh đảo riêng biệt, trung tâm của đô thị đáng sống nhất miền Nam</p><p><span style="color: rgb(241, 196, 15);">✦</span> "Nhà giữa đảo - Đảo giữa rừng retreat" chưa từng có trên thị trường.</p>',
        introductionBackground:
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757403918/projects/dtnyfzfwxmpclaed6muk.jpg',
        introductionDescription:
          '<p style="line-height: 1.5;">Xây dựng mô hình khu đô thị trên thị trường không hiếm, nhưng kiến tạo môi trường đáng sống đúng nghĩa, mang đến những giá trị đích thực thì không phải dự án nào cũng làm được.</p><p style="line-height: 1.5;">Những khu đô thị xanh của Nhà sáng lập Ecopark là ngoại lệ - nơi mọi chủ nhân đều tự hào về quyết định sở hữu và đầu tư của mình.</p><p style="line-height: 1.5;">Chào mừng Quý Anh Chị đến với Eco Retreat - Đô thị xanh kiểu mẫu của Ecopark tại miền Nam!</p>',
      },
      overview: {
        basicInfo: [
          {
            id: 'project_name',
            key: 'Tên dự án',
            type: 'text',
            value: 'Eco Retreat',
          },
          {
            id: 'developer',
            key: 'Chủ đầu tư',
            type: 'text',
            value: 'Ecopark',
          },
          {
            id: 'product_group',
            key: 'Nhóm sản phẩm',
            type: 'text',
            value: 'Căn hộ, biệt thự nghỉ dưỡng',
          },
          {
            id: 'ownership_status',
            key: 'Tình trạng sở hữu',
            type: 'text',
            value: 'Lâu dài',
          },
          {
            id: 'phase',
            key: 'Giai đoạn',
            type: 'text',
            value: '1',
          },
          {
            id: 'project_type',
            key: 'Loại hình',
            type: 'select',
            value: 'Khu đô thị sinh thái',
            options: [
              'Căn hộ',
              'Biệt thự',
              'Nhà phố',
              'Resort',
              'Condotel',
              'Villa biển',
              'Văn phòng cho thuê',
              'Co-working space',
              'Khu đô thị sinh thái',
            ],
          },
          {
            id: 'legal_status',
            key: 'Tình trạng pháp lý',
            type: 'text',
            value: 'Sổ hồng sở hữu lâu dài',
          },
          {
            id: 'handover_time',
            key: 'Thời gian bàn giao',
            type: 'text',
            value: 'Dự kiến Quý II/2028',
          },
          {
            id: 'status',
            key: 'Trạng thái',
            type: 'select',
            value: 'Đang mở bán',
            options: [
              'Đang lên kế hoạch',
              'Đang xây dựng',
              'Đang bán',
              'Đang mở bán',
              'Hoàn thành',
            ],
          },
          {
            id: 'address',
            key: 'Địa chỉ',
            type: 'text',
            value: 'Đường Nguyễn Hữu Trí, Xã Thanh Phú, Huyện Bến Lức, Long An',
          },
          {
            id: 'architectural_designer',
            key: 'Đơn vị thiết kế kiến trúc',
            type: 'text',
            value: 'Coteccons, Ricons',
          },
          {
            id: 'construction_unit',
            key: 'Đơn vị thi công',
            type: 'text',
            value: 'Coteccons, Ricons',
          },
          {
            id: 'landscape_designer',
            key: 'Đơn vị thiết kế cảnh quan',
            type: 'text',
            value: 'PLA Studio',
          },
          {
            id: 'total_units',
            key: 'Tổng số căn/sản phẩm',
            type: 'number',
            value: 1200,
          },
          {
            id: 'land_area',
            key: 'Diện tích đất',
            type: 'text',
            value: '220.05',
          },
          {
            id: 'bathrooms',
            key: 'Phòng tắm',
            type: 'range',
            value: [1, 3],
          },
          {
            id: 'bedrooms',
            key: 'Phòng ngủ',
            type: 'range',
            value: [1, 4],
          },
          {
            id: 'category',
            key: 'Danh mục',
            type: 'select',
            value: 'Nghỉ dưỡng',
            hidden: true,
            options: ['Nhà ở', 'Quốc tế', 'Nghỉ dưỡng'],
          },
          {
            id: 'slug',
            key: 'Slug',
            type: 'text',
            value: 'eco-retreat',
            hidden: true,
          },
          {
            id: 'price',
            key: 'Giá',
            type: 'range',
            value: [1000000000, 2000000000],
            hidden: true,
          },
          {
            id: 'currency_unit',
            key: 'Đơn vị tiền tệ',
            type: 'select',
            value: 'VND',
            hidden: true,
            options: ['VND', 'USD', 'EUR'],
          },
          {
            id: 'measurement_unit',
            key: 'Đơn vị đo lường',
            type: 'select',
            value: 'sqrt',
            hidden: true,
            options: ['sqm', 'sqrt'],
          },
          {
            id: 'country',
            key: 'Quốc gia',
            type: 'text',
            value: 'Vietnam',
            hidden: true,
          },
          {
            id: 'city',
            key: 'Tỉnh/Thành phố',
            type: 'text',
            value: 'Tỉnh Long An',
            hidden: true,
          },
          {
            id: 'district',
            key: 'Quận/Huyện',
            type: 'text',
            value: 'Huyện Bến Lức',
            hidden: true,
          },
        ],
        overviewImages: [
          {
            image:
              'https://res.cloudinary.com/dpinnqt92/image/upload/v1757404137/projects/awpns8a0nucui0rqov8w.jpg',
            description:
              '<p>Khu đ&ocirc; thị &ldquo;rừng retreat&rdquo; đầu ti&ecirc;n của Ecopark</p>',
          },
          {
            image:
              'https://res.cloudinary.com/dpinnqt92/image/upload/v1757404138/projects/cvxm1yxkndjpuw6murwv.jpg',
            description:
              '<p>Chiếm &gt; 121 ha với 4 triệu c&acirc;y hoa, 8 tầng 8 lớp thực vật</p>',
          },
          {
            image:
              'https://res.cloudinary.com/dpinnqt92/image/upload/v1757404138/projects/xu8at69dg7dlylrwsbzi.jpg',
            description:
              '<p><span style="color: #f1c40f;">✦</span>&nbsp;Một khu phức hợp đầy đủ tiện &iacute;ch</p>\n<p><span style="color: #f1c40f;">✦</span> Một &ldquo;rừng trị liệu&rdquo; với c&aacute;c tiện &iacute;ch phục hồi, t&aacute;i tạo sức khỏe cạnh nh&agrave;</p>',
          },
          {
            image:
              'https://res.cloudinary.com/dpinnqt92/image/upload/v1757404140/projects/bh40lixfxdgjgbujrubk.jpg',
            description:
              '<p>Tọa độ giao thương huyết mạch của miền Nam, kết nối TP HCM &amp; s&acirc;n bay Long Th&agrave;nh chỉ khoảng 30 ph&uacute;t</p>',
          },
        ],
        experienceImage:
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757404232/projects/lupjjvxrejmfiholmymp.webp',
        overviewBackground:
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757412380/projects/lf1k73flaeiljoa2udvd.jpg',
      },
      location: {
        title:
          '<p style="line-height: 1.2;"><span style="font-size: 40px; color: #76c04b;">Vị Tr&iacute; Độc T&ocirc;n</span></p>\r\n<p style="line-height: 1.2;"><span style="font-size: 36px; color: #76c04b;"><span style="color: #ffd4aa;">Kh&ocirc;ng xa phố thị,</span> đủ gần thi&ecirc;n nhi&ecirc;n</span></p>',
        embedCode:
          '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.890355931884!2d106.50165867480317!3d10.665617989476504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528b007259db1%3A0xc93181e7ddb0da89!2sEco%20Retreat%20Long%20An!5e0!3m2!1svi!2s!4v1757412641592!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        coordinates: '[object Object]',
        description:
          '<p><span style="color: #f1c40f;">✦</span>&nbsp;<em><strong>Tọa độ kết nối huyết mạch của ph&iacute;a Nam</strong></em><br>&ldquo;Cửa ng&otilde;&rdquo; kết nối Đ&ocirc;ng - T&acirc;y của TP HCM, thuận tiện di chuyển đến c&aacute;c quận của S&agrave;i G&ograve;n, s&acirc;n bay T&acirc;n Sơn Nhất, c&aacute;c tỉnh T&acirc;y Nam Bộ v&agrave; tương lai đến s&acirc;n bay Long Th&agrave;nh chỉ khoảng 30 ph&uacute;t.</p>\r\n<p><span style="color: #f1c40f;">✦</span>&nbsp;<em><strong>Trung t&acirc;m mạng lưới logistics của miền Nam</strong></em><br>Giao điểm của V&agrave;nh đai 3, Cao tốc TP HCM - Trung Lương, Cao tốc Bến Lức - Long Th&agrave;nh, kết nối thuận tiện đến hệ thống cao tốc, s&acirc;n bay, cảng biển, khu c&ocirc;ng nghiệp, c&ocirc;ng nghệ cao,&hellip;</p>\r\n<p><span style="color: #f1c40f;">✦</span>&nbsp;<em><strong>T&acirc;m điểm sinh th&aacute;i - &ldquo;Nh&agrave; nghỉ dưỡng&rdquo; của cư d&acirc;n th&agrave;nh phố</strong></em><br>Nằm n&eacute;p m&igrave;nh b&ecirc;n d&ograve;ng s&ocirc;ng Bến Lức v&agrave; len lỏi những d&ograve;ng chảy s&ocirc;ng, hồ uốn lượn quanh đ&ocirc; thị.</p>',
        mapInputType: 'embed',
        locationImage:
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757412665/projects/digouq9feobs9cacbuqc.webp',
        locationBackground:
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757412666/projects/e5t9jxgejqbehnirvsg3.jpg',
      },
      siteplan: {
        view360: [
          {
            id: 1,
            image:
              'https://res.cloudinary.com/dpinnqt92/image/upload/v1757475309/projects/cru5agbrb87h9iyhwnnc.jpg',
            markers: [
              {
                id: 1,
                tooltip: 'Marker 1',
                latitude: -0.424836316126177,
                longitude: -0.791041159845561,
                panoramaTarget: 'beverly.jpg_2436358_1',
              },
              {
                id: 2,
                tooltip: 'Marker 2',
                latitude: -0.952478549072049,
                longitude: 1.601520731794111,
                panoramaTarget: 'beverly.jpg_2436358_1',
              },
            ],
          },
          {
            id: 2,
            image:
              'https://res.cloudinary.com/dpinnqt92/image/upload/v1757475313/projects/rxxtqdrnfb9eyszc9wid.jpg',
            markers: [
              {
                id: 1,
                tooltip: 'Marker 1',
                latitude: -0.5307699357483311,
                longitude: 0.01152159006731365,
                panoramaTarget: 'panorama.jpg_8372542_0',
              },
            ],
          },
        ],
        siteplanImages: [
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757475317/projects/w8qupa68mc674zmo3wwq.png',
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757475317/projects/vodgftkjnkpi9ztj24zy.jpg',
        ],
      },
      production: {
        products: [
          {
            id: 1757495827022,
            name: 'Island Villa',
            image:
              'https://res.cloudinary.com/dpinnqt92/image/upload/v1757496441/projects/gjmsgxwgnh2drnemoxex.jpg',
            description:
              '<table style="border-collapse: collapse; width: 100.687%; height: 65.7222px;" border="1"><colgroup><col style="width: 56.8134%;"><col style="width: 43.1866%;"></colgroup>\r\n<tbody>\r\n<tr style="height: 32.8611px;">\r\n<td style="line-height: 1.2;"><strong>Loại h&igrave;nh:</strong> Đơn lập, Song lập, Villa Rẻ quạt</td>\r\n<td style="line-height: 1.2;"><strong>X&acirc;y dựng:</strong> 2 tầng + 1 tum</td>\r\n</tr>\r\n<tr style="height: 32.8611px;">\r\n<td style="line-height: 1.2;"><strong>Diện t&iacute;ch:</strong> 205m&sup2; - 484m&sup2;</td>\r\n<td style="line-height: 1.2;"><strong>C&ocirc;ng năng:</strong> Để ở</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n<p>&nbsp;</p>',
          },
          {
            id: 1757496163883,
            name: 'Shop Villa đảo',
            image:
              'https://res.cloudinary.com/dpinnqt92/image/upload/v1757496442/projects/ormzv2ii3xei4lbsuzzz.jpg',
            description:
              '<table style="border-collapse: collapse; width: 100.687%; height: 65.7222px;" border="1"><colgroup><col style="width: 56.8134%;"><col style="width: 43.1866%;"></colgroup>\r\n<tbody>\r\n<tr style="height: 32.8611px;">\r\n<td style="line-height: 1.2;"><strong>Loại h&igrave;nh:</strong> Đơn lập, Song lập</td>\r\n<td style="line-height: 1.2;"><strong>X&acirc;y dựng:</strong> 3 tầng + 1 tum</td>\r\n</tr>\r\n<tr style="height: 32.8611px;">\r\n<td style="line-height: 1.2;"><strong>Diện t&iacute;ch đất:</strong> 205m&sup2; - 307m&sup2;</td>\r\n<td style="line-height: 1.2;"><strong>C&ocirc;ng năng:</strong> Thương mại kết hợp hoặc để ở</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n<p>&nbsp;</p>',
          },
          {
            id: 1757496250014,
            name: 'Dinh thự đảo',
            image:
              'https://res.cloudinary.com/dpinnqt92/image/upload/v1757496443/projects/kqtwlstbli09543neimh.jpg',
            description:
              '<table style="border-collapse: collapse; width: 100.687%; height: 65.7222px;" border="1"><colgroup><col style="width: 56.8134%;"><col style="width: 43.1866%;"></colgroup>\r\n<tbody>\r\n<tr style="height: 32.8611px;">\r\n<td style="line-height: 1.2;"><strong>Diện t&iacute;ch đất:</strong> 567m&sup2; - 697m&sup2;</td>\r\n<td style="line-height: 1.2;"><strong>X&acirc;y dựng:</strong> 2 tầng + 1 tum</td>\r\n</tr>\r\n<tr style="height: 32.8611px;">\r\n<td style="line-height: 1.2;"><strong>Diện t&iacute;ch s&agrave;n:</strong> 437m&sup2;</td>\r\n<td style="line-height: 1.2;"><strong>C&ocirc;ng năng:</strong> Để ở</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n<p>&nbsp;</p>',
          },
          {
            id: 1757496319281,
            name: 'Căn hộ SKY RETREAT',
            image:
              'https://res.cloudinary.com/dpinnqt92/image/upload/v1757496444/projects/vifpenabmp68he3dqupw.jpg',
            description:
              '<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 99.8145%;"></colgroup>\r\n<tbody>\r\n<tr>\r\n<td><strong>Loại h&igrave;nh sản phẩm:</strong> Studio, 1PN-3PN, Garden Villa, Duplex, Sky Villa</td>\r\n</tr>\r\n<tr>\r\n<td><strong>Ti&ecirc;u chuẩn b&agrave;n giao:</strong> Ho&agrave;n thiện nội thất liền tường</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n<p>&nbsp;</p>',
          },
        ],
        furnitures: [
          {
            id: '1757558115925-0',
            image:
              'https://res.cloudinary.com/dpinnqt92/image/upload/v1757558619/projects/ilrbmaa5eglyt6m3rmpp.jpg',
            title: 'Phòng khách hiện đại',
          },
          {
            id: '1757558115925-1',
            image:
              'https://res.cloudinary.com/dpinnqt92/image/upload/v1757558620/projects/genq78a2u4chxrkzki57.jpg',
            title: 'Villa ven hồ',
          },
          {
            id: '1757558115925-2',
            image:
              'https://res.cloudinary.com/dpinnqt92/image/upload/v1757558623/projects/b4iz8wnpcx3rc0sni0ys.jpg',
            title: 'Không gian thoáng sáng',
          },
          {
            id: '1757558115925-3',
            image:
              'https://res.cloudinary.com/dpinnqt92/image/upload/v1757561414/projects/abttvp3w68uxujn6nmxc.jpg',
            title: 'Sống giữa thiên nhiên',
          },
        ],
        furnitureBackground:
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757561417/projects/qecmcgirtqxpx8nhly2b.jpg',
      },
      amenity: {
        title:
          '<p style="text-align: center; line-height: 1.2;"><span style="color: #76c04b; font-size: 40px;">Tiện &Iacute;ch</span><br><span style="font-size: 40px;"><span style="color: #76c04b;"><em>Kh&ocirc;ng gian Retreat</em></span>&nbsp;<span style="color: #ffd4aa;"><em>cho mọi thế hệ</em></span></span></p>',
        description:
          '<p>Giống như một&nbsp;<strong>&ldquo;th&agrave;nh phố hiện đại thu nhỏ&rdquo;</strong>, Eco Retreat được quy hoạch b&agrave;i bản, đầy đủ tiện &iacute;ch từ hệ thống trường từ mầm non đến THPT, bệnh viện &amp; dịch vụ y tế quốc tế, khu thương mại - giải tr&iacute;, trung t&acirc;m thể thao&hellip; Đặc biệt c&ograve;n c&oacute; Eco Bus phục vụ d&agrave;nh ri&ecirc;ng cư d&acirc;n Eco Retreat.</p>\r\n<p style="text-align: center;">Điểm nhấn nổi bật l&agrave;&nbsp;<strong>tiện &iacute;ch &ldquo;retreat&rdquo; đặc quyền</strong> - lần đầu ti&ecirc;n xuất hiện trong dự &aacute;n của NSL Ecopark v&agrave; kh&oacute; t&igrave;m thấy ở một đ&ocirc; thị kh&aacute;c tr&ecirc;n thị trường bất động sản ph&iacute;a Nam.</p>',
        amenityImages: [
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757412495/projects/zxwduqhn6ctx8ldjtinb.jpg',
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757412498/projects/bjnbgbhoksefx6gfwbq3.jpg',
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757412495/projects/jnjsxwf6olnyvt1m5s3l.jpg',
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757412495/projects/ttnoreilpydbyoitatnm.jpg',
        ],
      },
      timeline: {
        progressTitle: 'Hình Ảnh Tiến Độ Dự Án',
        timelineImage:
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757646702/projects/tajzglusrudt9xmvlxkj.png',
        timelineTitle:
          '<p><span style="font-size: 40px; color: #76c472;">C&aacute;c Cột Mốc Tạo S&oacute;ng</span><br><span style="font-size: 40px; color: #ffd4aa;"><em>cho Eco Retreat</em></span></p>',
        progressImages: [
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757646702/projects/bhfr71j5i8tuu3sxpdn0.jpg',
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757646703/projects/vwdk4q3c9w87x1e4kyif.jpg',
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757646701/projects/inaphhn677lgiyq2mqma.jpg',
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757646701/projects/teloc6qg4pb54kcxvnoc.jpg',
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757646702/projects/ajorstskznudfwvpifmu.jpg',
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757646701/projects/oeehntjqw4xj0ypcwqh9.jpg',
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757646702/projects/i5lcmknxolwws1wc4fcn.jpg',
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757646701/projects/vmwy5zhn06zd4zp7sw3f.jpg',
        ],
        backgroundImage:
          'https://res.cloudinary.com/dpinnqt92/image/upload/v1757646701/projects/lqgo6fyonfprfk7x68ee.jpg',
      },
      contact: {
        agency: {
          title: '',
          agencyImage: null,
          description: '',
        },
        layoutId: 'layout-1',
        logoImage: null,
        contactBackground: null,
      },
      other: {
        policy: {
          title: '',
          policyText: '',
          policyImage:
            'https://res.cloudinary.com/dpinnqt92/image/upload/v1757651330/projects/j2bav8qqgwbffeo0gj1e.webp',
        },
        invitation: {
          fontSize: '18',
          position: {
            x: 52,
            y: 14,
          },
          invitationImage:
            'https://res.cloudinary.com/dpinnqt92/image/upload/v1757651330/projects/wzrc8qgo3ucovjp5ikoy.jpg',
        },
        breakImages: [],
      },
    },
  });

  console.log('Project created with id:', project.id);
  console.log('User created:', user);
}

main()
  .catch((e) => console.error(e))
  .finally(() => {
    prisma.$disconnect().catch(console.error);
  });
