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
      updatedAt: '2025-09-25T10:23:24.513Z',
      createdBy: id,
      updatedBy: id,
      introduction: {
        coverImage: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758614081/IQI/projects/y601uamfqtzg1sd4yvcm.jpg',
          publicId: 'IQI/projects/y601uamfqtzg1sd4yvcm',
        },
        coverTitle: 'Trải nghiệm nghỉ dưỡng giữa thiên nhiên',
        logoImages: [
          {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758614080/IQI/projects/ad3bemdaaq18ob6kzh8f.png',
            publicId: 'IQI/projects/ad3bemdaaq18ob6kzh8f',
          },
          {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758614079/IQI/projects/qqeuyax8zixoncz0rje0.png',
            publicId: 'IQI/projects/qqeuyax8zixoncz0rje0',
          },
        ],
        launchTitle:
          '<p style="line-height: 1.2;"><strong style="color: rgb(255, 140, 63);"><em>Chính thức ra mắt</em></strong></p><p style="line-height: 1.2;"><strong style="color: rgb(118, 192, 75); font-size: 36px;"><em>RETREAT ISLAND</em></strong></p><p style="line-height: 1.2;"><strong style="color: rgb(118, 192, 75);"><em>Biệt thự đảo giữa rừng retreat</em></strong></p>',
        launchImages: [
          {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758616310/IQI/projects/rkslvscuweo0tngypzf1.jpg',
            publicId: 'IQI/projects/rkslvscuweo0tngypzf1',
          },
          {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758616310/IQI/projects/aoro2fpf3xwwkmwkkwmu.jpg',
            publicId: 'IQI/projects/aoro2fpf3xwwkmwkkwmu',
          },
          {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758616310/IQI/projects/dijeanx5lubzjemofyug.jpg',
            publicId: 'IQI/projects/dijeanx5lubzjemofyug',
          },
        ],
        coverLogoIndex: 1,
        headerLogoIndex: 0,
        launchBackground: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758616309/IQI/projects/l2ylp0sspm8othknyxuz.jpg',
          publicId: 'IQI/projects/l2ylp0sspm8othknyxuz',
        },
        introductionImage: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758616310/IQI/projects/os9resjywvudntvzvbl9.png',
          publicId: 'IQI/projects/os9resjywvudntvzvbl9',
        },
        introductionTitle:
          '<p style="line-height: 1;"><strong style="font-size: 40px; color: rgb(118, 192, 75);">Eco Retreat</strong></p><p style="line-height: 1;"><strong style="font-size: 40px;">ĐÔ THỊ "RỪNG RETREAT"</strong></p><p style="line-height: 1;"><strong style="font-size: 40px;">ĐẦU TIÊN TẠI VIỆT NAM</strong></p><p style="line-height: 1;"><strong style="font-size: 40px; color: rgb(255, 212, 170);">của Ecopark</strong></p>',
        introductionVideo: 'https://www.youtube.com/watch?v=pLL2g9_mZdo',
        launchDescription:
          '<p><span style="color: rgb(241, 196, 15);">✦</span> View 2 mặt hồ thiên nga ngay cạnh nhà, có hồ bơi &amp; sân vườn riêng</p><p><span style="color: rgb(241, 196, 15);">✦</span> Nằm trên 16 nhánh đảo riêng biệt, trung tâm của đô thị đáng sống nhất miền Nam</p><p><span style="color: rgb(241, 196, 15);">✦</span> "Nhà giữa đảo - Đảo giữa rừng retreat" chưa từng có trên thị trường.</p>',
        introductionBackground: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758616309/IQI/projects/sojymmfwavlfp0q6aivv.jpg',
          publicId: 'IQI/projects/sojymmfwavlfp0q6aivv',
        },
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
            image: {
              url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617326/IQI/projects/zudxhihxmlycodhfie0t.jpg',
              publicId: 'IQI/projects/zudxhihxmlycodhfie0t',
            },
            description:
              '<p>Khu đô thị “rừng retreat” đầu tiên của Ecopark</p>',
          },
          {
            image: {
              url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617326/IQI/projects/bzo6xajmia0h37oal8xo.jpg',
              publicId: 'IQI/projects/bzo6xajmia0h37oal8xo',
            },
            description:
              '<p>Chiếm &gt; 121 ha với 4 triệu cây hoa, 8 tầng 8 lớp thực vật</p>',
          },
          {
            image: {
              url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617326/IQI/projects/yss5mpta73ivix8qxy8h.jpg',
              publicId: 'IQI/projects/yss5mpta73ivix8qxy8h',
            },
            description:
              '<p><span style="color: rgb(241, 196, 15);">✦</span> Một khu phức hợp đầy đủ tiện ích</p><p><span style="color: rgb(241, 196, 15);">✦</span> Một “rừng trị liệu” với các tiện ích phục hồi, tái tạo sức khỏe cạnh nhà</p>',
          },
          {
            image: {
              url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617326/IQI/projects/w40oavd1z4sw4pvk19mi.jpg',
              publicId: 'IQI/projects/w40oavd1z4sw4pvk19mi',
            },
            description:
              '<p>Tọa độ giao thương huyết mạch của miền Nam, kết nối TP HCM &amp; sân bay Long Thành chỉ khoảng 30 phút</p>',
          },
        ],
        experienceImage: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617325/IQI/projects/j8zvdghuserbxmb23nve.webp',
          publicId: 'IQI/projects/j8zvdghuserbxmb23nve',
        },
        overviewBackground: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617325/IQI/projects/ia9kjoaqdfpia9h7gdjp.jpg',
          publicId: 'IQI/projects/ia9kjoaqdfpia9h7gdjp',
        },
      },
      location: {
        title:
          '<p style="line-height: 1.2;"><span style="font-size: 40px; color: rgb(118, 192, 75);">Vị Trí Độc Tôn</span></p><p style="line-height: 1.2;"><span style="color: rgb(255, 212, 170); font-size: 36px;">Không xa phố thị,</span><span style="color: rgb(118, 192, 75); font-size: 36px;"> đủ gần thiên nhiên</span></p>',
        embedCode:
          '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.890355931884!2d106.50165867480317!3d10.665617989476504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528b007259db1%3A0xc93181e7ddb0da89!2sEco%20Retreat%20Long%20An!5e0!3m2!1svi!2s!4v1757412641592!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        coordinates: '[object Object]',
        description:
          '<p><span style="color: rgb(241, 196, 15);">✦</span> <strong><em>Tọa độ kết nối huyết mạch của phía Nam</em></strong></p><p>“Cửa ngõ” kết nối Đông - Tây của TP HCM, thuận tiện di chuyển đến các quận của Sài Gòn, sân bay Tân Sơn Nhất, các tỉnh Tây Nam Bộ và tương lai đến sân bay Long Thành chỉ khoảng 30 phút.</p><p><span style="color: rgb(241, 196, 15);">✦</span> <strong><em>Trung tâm mạng lưới logistics của miền Nam</em></strong></p><p>Giao điểm của Vành đai 3, Cao tốc TP HCM - Trung Lương, Cao tốc Bến Lức - Long Thành, kết nối thuận tiện đến hệ thống cao tốc, sân bay, cảng biển, khu công nghiệp, công nghệ cao,…</p><p><span style="color: rgb(241, 196, 15);">✦</span> <strong><em>Tâm điểm sinh thái - “Nhà nghỉ dưỡng” của cư dân thành phố</em></strong></p><p>Nằm nép mình bên dòng sông Bến Lức và len lỏi những dòng chảy sông, hồ uốn lượn quanh đô thị.</p>',
        mapInputType: 'embed',
        locationImage: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617684/IQI/projects/ilvslm6nlpmwnoet6ki5.webp',
          publicId: 'IQI/projects/ilvslm6nlpmwnoet6ki5',
        },
        locationBackground: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617684/IQI/projects/e0wfkanflqucdfqhq7pm.jpg',
          publicId: 'IQI/projects/e0wfkanflqucdfqhq7pm',
        },
      },
      siteplan: {
        view360: [
          {
            id: 1,
            image: {
              url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758619653/IQI/projects/uqumnf5tijcttdlk3tj5.jpg',
              publicId: 'IQI/projects/uqumnf5tijcttdlk3tj5',
            },
            markers: [
              {
                id: 1,
                tooltip: 'Marker 1',
                latitude: -0.5243201891714478,
                longitude: 0.01231187696960243,
                panoramaTarget: 'undefined_undefined_1',
              },
            ],
          },
          {
            id: 2,
            image: {
              url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758619653/IQI/projects/u3agsckw12uie2xd6oag.jpg',
              publicId: 'IQI/projects/u3agsckw12uie2xd6oag',
            },
            markers: [
              {
                id: 1,
                tooltip: 'Tổng thể',
                latitude: -0.403746017600482,
                longitude: -0.7818072168936628,
                panoramaTarget: 'undefined_undefined_0',
              },
            ],
          },
        ],
        siteplanImages: [
          {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758619653/IQI/projects/mpms4zzwslrm9uug33gt.jpg',
            publicId: 'IQI/projects/mpms4zzwslrm9uug33gt',
          },
          {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758619653/IQI/projects/zvdak9qfyhu4gijwuz1v.jpg',
            publicId: 'IQI/projects/zvdak9qfyhu4gijwuz1v',
          },
        ],
      },
      production: {
        products: [
          {
            id: 1757495827022,
            name: 'Island Villa',
            image: {
              url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758697765/IQI/projects/pcl2vx7k9bfvrfx5dxmc.jpg',
              publicId: 'IQI/projects/pcl2vx7k9bfvrfx5dxmc',
            },
            description:
              '<table style="border-collapse: collapse; width: 100.687%; height: 65.7222px;" border="1"><colgroup><col style="width: 56.8134%;"><col style="width: 43.1866%;"></colgroup>\r\n<tbody>\r\n<tr style="height: 32.8611px;">\r\n<td style="line-height: 1.2;"><strong>Loại h&igrave;nh:</strong> Đơn lập, Song lập, Villa Rẻ quạt</td>\r\n<td style="line-height: 1.2;"><strong>X&acirc;y dựng:</strong> 2 tầng + 1 tum</td>\r\n</tr>\r\n<tr style="height: 32.8611px;">\r\n<td style="line-height: 1.2;"><strong>Diện t&iacute;ch:</strong> 205m&sup2; - 484m&sup2;</td>\r\n<td style="line-height: 1.2;"><strong>C&ocirc;ng năng:</strong> Để ở</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n<p>&nbsp;</p>',
          },
          {
            id: 1757496163883,
            name: 'Shop Villa đảo',
            image: {
              url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758697765/IQI/projects/s9kwvrvlxkd6zaqcgoh8.jpg',
              publicId: 'IQI/projects/s9kwvrvlxkd6zaqcgoh8',
            },
            description:
              '<table style="border-collapse: collapse; width: 100.687%; height: 65.7222px;" border="1"><colgroup><col style="width: 56.8134%;"><col style="width: 43.1866%;"></colgroup>\r\n<tbody>\r\n<tr style="height: 32.8611px;">\r\n<td style="line-height: 1.2;"><strong>Loại h&igrave;nh:</strong> Đơn lập, Song lập</td>\r\n<td style="line-height: 1.2;"><strong>X&acirc;y dựng:</strong> 3 tầng + 1 tum</td>\r\n</tr>\r\n<tr style="height: 32.8611px;">\r\n<td style="line-height: 1.2;"><strong>Diện t&iacute;ch đất:</strong> 205m&sup2; - 307m&sup2;</td>\r\n<td style="line-height: 1.2;"><strong>C&ocirc;ng năng:</strong> Thương mại kết hợp hoặc để ở</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n<p>&nbsp;</p>',
          },
          {
            id: 1757496250014,
            name: 'Dinh thự đảo',
            image: {
              url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758697765/IQI/projects/bw50zcs6hibe7tx3gt7q.jpg',
              publicId: 'IQI/projects/bw50zcs6hibe7tx3gt7q',
            },
            description:
              '<table style="border-collapse: collapse; width: 100.687%; height: 65.7222px;" border="1"><colgroup><col style="width: 56.8134%;"><col style="width: 43.1866%;"></colgroup>\r\n<tbody>\r\n<tr style="height: 32.8611px;">\r\n<td style="line-height: 1.2;"><strong>Diện t&iacute;ch đất:</strong> 567m&sup2; - 697m&sup2;</td>\r\n<td style="line-height: 1.2;"><strong>X&acirc;y dựng:</strong> 2 tầng + 1 tum</td>\r\n</tr>\r\n<tr style="height: 32.8611px;">\r\n<td style="line-height: 1.2;"><strong>Diện t&iacute;ch s&agrave;n:</strong> 437m&sup2;</td>\r\n<td style="line-height: 1.2;"><strong>C&ocirc;ng năng:</strong> Để ở</td>\r\n</tr>\r\n</tbody>\r\n</table>\r\n<p>&nbsp;</p>',
          },
          {
            id: 1757496319281,
            name: 'Căn hộ SKY RETREAT',
            image: {
              url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758697765/IQI/projects/dom28hhsuxchasb68zrp.jpg',
              publicId: 'IQI/projects/dom28hhsuxchasb68zrp',
            },
            description:
              '<table border="1" style="border-collapse: collapse; width: 100%;" class="ql-table-better"><temporary class="ql-table-temporary" border="1" style="border-collapse: collapse; width: 100%;" data-class="ql-table-better"><br></temporary><colgroup><col></colgroup><tbody><tr><td data-row="1"><p class="ql-table-block" data-cell="1"><strong>Loại hình sản phẩm:</strong> Studio, 1PN-3PN, Garden Villa, Duplex, Sky Villa</p></td></tr><tr><td data-row="2"><p class="ql-table-block" data-cell="1"><strong>Tiêu chuẩn bàn giao:</strong> Hoàn thiện nội thất liền tường</p></td></tr></tbody></table><p><br></p>',
          },
        ],
        furnitures: [
          {
            id: '1757558115925-0',
            image: {
              url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758697764/IQI/projects/zfhozauo0tbc0ukp325n.jpg',
              publicId: 'IQI/projects/zfhozauo0tbc0ukp325n',
            },
            title: 'Phòng khách hiện đại',
          },
          {
            id: '1757558115925-1',
            image: {
              url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758697764/IQI/projects/evdwjj0gvdqjxdudh1ba.jpg',
              publicId: 'IQI/projects/evdwjj0gvdqjxdudh1ba',
            },
            title: 'Villa ven hồ',
          },
          {
            id: '1757558115925-2',
            image: {
              url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758697956/IQI/projects/xuoi7g1vqkstaaafvzdj.jpg',
              publicId: 'IQI/projects/xuoi7g1vqkstaaafvzdj',
            },
            title: 'Không gian thoáng sáng',
          },
          {
            id: '1757558115925-3',
            image: {
              url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758697956/IQI/projects/ygyxrdxi5tm38ggc9gcg.jpg',
              publicId: 'IQI/projects/ygyxrdxi5tm38ggc9gcg',
            },
            title: 'Sống giữa thiên nhiên',
          },
        ],
        furnitureBackground: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758697764/IQI/projects/ppus97jhivyzjt3vnjbs.jpg',
          publicId: 'IQI/projects/ppus97jhivyzjt3vnjbs',
        },
      },
      amenity: {
        title:
          '<p class="ql-align-center" style="line-height: 1.2;"><span style="color: rgb(118, 192, 75); font-size: 40px;">Tiện Ích</span></p><p class="ql-align-center" style="line-height: 1.2;"><em style="color: rgb(118, 192, 75); font-size: 40px;">Không gian Retreat</em><span style="font-size: 40px;"> </span><em style="font-size: 40px; color: rgb(255, 212, 170);">cho mọi thế hệ</em></p>',
        description:
          '<p>Giống như một <strong>“thành phố hiện đại thu nhỏ”</strong>, Eco Retreat được quy hoạch bài bản, đầy đủ tiện ích từ hệ thống trường từ mầm non đến THPT, bệnh viện &amp; dịch vụ y tế quốc tế, khu thương mại - giải trí, trung tâm thể thao… Đặc biệt còn có Eco Bus phục vụ dành riêng cư dân Eco Retreat.</p><p class="ql-align-center">Điểm nhấn nổi bật là <strong>tiện ích “retreat” đặc quyền</strong> - lần đầu tiên xuất hiện trong dự án của NSL Ecopark và khó tìm thấy ở một đô thị khác trên thị trường bất động sản phía Nam.</p>',
        amenityImages: [
          {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617649/IQI/projects/tmjb2ec8jufkffv6kahz.jpg',
            publicId: 'IQI/projects/tmjb2ec8jufkffv6kahz',
          },
          {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617649/IQI/projects/upwvd6dprsgompcxprua.jpg',
            publicId: 'IQI/projects/upwvd6dprsgompcxprua',
          },
          {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617649/IQI/projects/arf7resm4yldh8bjlplb.jpg',
            publicId: 'IQI/projects/arf7resm4yldh8bjlplb',
          },
          {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758617649/IQI/projects/ruwtqhyu8lhi8uoxcyum.jpg',
            publicId: 'IQI/projects/ruwtqhyu8lhi8uoxcyum',
          },
        ],
      },
      timeline: {
        progressTitle: 'Hình Ảnh Tiến Độ Dự Án',
        timelineImage: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698004/IQI/projects/ylraptuvkvebzxgzejqo.png',
          publicId: 'IQI/projects/ylraptuvkvebzxgzejqo',
        },
        timelineTitle:
          '<p><span style="color: rgb(118, 196, 114); font-size: 40px;">Các Cột Mốc Tạo Sóng</span></p><p><em style="color: rgb(255, 212, 170); font-size: 40px;">cho Eco Retreat</em></p>',
        progressImages: [
          {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698002/IQI/projects/ccx1wzfzuxtcxa5l3zrj.jpg',
            publicId: 'IQI/projects/ccx1wzfzuxtcxa5l3zrj',
          },
          {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698002/IQI/projects/nvwyd6zljrlreokyn7zi.jpg',
            publicId: 'IQI/projects/nvwyd6zljrlreokyn7zi',
          },
          {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698002/IQI/projects/ujwrzoio0pvlw2xcurhv.jpg',
            publicId: 'IQI/projects/ujwrzoio0pvlw2xcurhv',
          },
          {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698003/IQI/projects/w874fdt45mbu19a10ntw.jpg',
            publicId: 'IQI/projects/w874fdt45mbu19a10ntw',
          },
          {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698002/IQI/projects/nikv6qg7s3sgoerbtwn7.jpg',
            publicId: 'IQI/projects/nikv6qg7s3sgoerbtwn7',
          },
          {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698002/IQI/projects/rn78wykwbut6xwpqtxyt.jpg',
            publicId: 'IQI/projects/rn78wykwbut6xwpqtxyt',
          },
          {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698003/IQI/projects/gzq03cur4qosvgiwt1bd.jpg',
            publicId: 'IQI/projects/gzq03cur4qosvgiwt1bd',
          },
          {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698004/IQI/projects/gsjxgiuclvkw4rrculbw.jpg',
            publicId: 'IQI/projects/gsjxgiuclvkw4rrculbw',
          },
        ],
        backgroundImage: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698003/IQI/projects/ports9qi3lhmd01fmwal.jpg',
          publicId: 'IQI/projects/ports9qi3lhmd01fmwal',
        },
      },
      contact: {
        agency: {
          title: 'Thông Tin Đại Lý',
          agencyImage: {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698112/IQI/projects/p4rjlfecqmorfubfs6hi.png',
            publicId: 'IQI/projects/p4rjlfecqmorfubfs6hi',
          },
          description:
            '<p><span style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(15, 23, 42);">IQI Vietnam - thành viên của tập đoàn quốc tế IQI Global, là một trong những đơn vị phân phối bất động sản hàng đầu hiện nay. Với đội ngũ chuyên gia giàu kinh nghiệm và mạng lưới hoạt động rộng khắp, IQI Vietnam vinh dự trở thành Đại lý F1 chính thức phân phối dự án khu đô thị sinh thái Eco Retreat tại Ecopark.</span></p><p><span style="background-color: rgb(250, 250, 250); font-size: 18px; color: rgb(15, 23, 42);">Việc hợp tác chiến lược này sẽ giúp khách hàng tiếp cận dễ dàng hơn với những sản phẩm đẳng cấp, pháp lý minh bạch và tiềm năng gia tăng giá trị bền vững. Đồng thời, IQI Vietnam cam kết mang đến dịch vụ tư vấn chuyên nghiệp, tận tâm nhằm đáp ứng tốt nhất nhu cầu đầu tư và an cư của Quý khách hàng.</span></p><p><br></p>',
        },
        layoutId: 'layout-1',
        logoImage: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698096/IQI/projects/tedlaonp9haz4tkp7x9d.png',
          publicId: 'IQI/projects/tedlaonp9haz4tkp7x9d',
        },
        contactBackground: {
          url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758698099/IQI/projects/gem88qmhjb6ebcism9u6.png',
          publicId: 'IQI/projects/gem88qmhjb6ebcism9u6',
        },
      },
      other: {
        policy: {
          title: 'Chính Sách Bán Hàng Eco Retreat',
          policyText:
            '<p><span style="color: rgb(255, 212, 170); font-size: 18px; background-color: rgb(250, 250, 250);">✦</span><span style="color: rgb(15, 23, 42); font-size: 18px; background-color: rgb(250, 250, 250);"> Thanh toán đến khi nhận nhà chỉ </span><strong style="color: rgb(118, 196, 114); font-size: 18px; background-color: rgb(250, 250, 250);"><em>25%</em></strong></p><p><span style="color: rgb(255, 212, 170); font-size: 18px; background-color: rgb(250, 250, 250);">✦</span><span style="color: rgb(15, 23, 42); font-size: 18px; background-color: rgb(250, 250, 250);"> Ngân hàng cho vay </span><strong style="color: rgb(118, 196, 114); font-size: 18px; background-color: rgb(250, 250, 250);"><em>70%</em></strong></p><p><span style="color: rgb(255, 212, 170); font-size: 18px; background-color: rgb(250, 250, 250);">✦</span><span style="color: rgb(15, 23, 42); font-size: 18px; background-color: rgb(250, 250, 250);"> Hỗ trợ lãi suất &amp; ân hạn gốc </span><strong style="color: rgb(118, 196, 114); font-size: 18px; background-color: rgb(250, 250, 250);"><em>24 tháng</em></strong></p><p><span style="color: rgb(255, 212, 170); font-size: 18px; background-color: rgb(250, 250, 250);">✦</span><span style="color: rgb(15, 23, 42); font-size: 18px; background-color: rgb(250, 250, 250);"> Ưu đãi thanh toán sớm </span><strong style="color: rgb(118, 196, 114); font-size: 18px; background-color: rgb(250, 250, 250);"><em>10%</em></strong></p><p><span style="color: rgb(255, 212, 170); font-size: 18px; background-color: rgb(250, 250, 250);">✦</span><span style="color: rgb(15, 23, 42); font-size: 18px; background-color: rgb(250, 250, 250);"> Ưu đãi thanh toán theo tiến độ </span><strong style="color: rgb(118, 196, 114); font-size: 18px; background-color: rgb(250, 250, 250);"><em>2%</em></strong></p><p><span style="color: rgb(255, 212, 170); font-size: 18px; background-color: rgb(250, 250, 250);">✦</span><span style="color: rgb(15, 23, 42); font-size: 18px; background-color: rgb(250, 250, 250);"> Ưu đãi cho KH đã sở hữu BĐS của NSL Ecopark </span><strong style="color: rgb(118, 196, 114); font-size: 18px; background-color: rgb(250, 250, 250);"><em>0,5%</em></strong></p>',
          policyImage: {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758785663/IQI/projects/d0xzsenme3acqfywn9rj.webp',
            publicId: 'IQI/projects/d0xzsenme3acqfywn9rj',
          },
        },
        invitation: {
          fields: [
            {
              id: 'name',
              size: 32,
              type: 'text',
              label: 'Tên trên thiệp',
              value: 'Nguyễn Văn A',
              position: {
                x: 49.4619532777474,
                y: 68.28754226167952,
              },
              placeholder: 'Nguyễn Văn A',
            },
            {
              id: 'title',
              size: 24,
              type: 'text',
              label: 'Chức danh',
              value: 'Chuyên viên kinh doanh',
              position: {
                x: 50.9357236526344,
                y: 73.34824529497321,
              },
              placeholder: 'Giám đốc kinh doanh',
            },
            {
              id: 'phone',
              size: 20,
              type: 'text',
              label: 'Số điện thoại',
              value: '0911095800',
              position: {
                x: 50.09356915269897,
                y: 77.48882050403168,
              },
              placeholder: '0123456789',
            },
            {
              id: 'image',
              size: 220,
              type: 'image',
              label: 'Ảnh đại diện',
              value: {
                url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758795824/IQI/projects/w1epkd0cmyroi5fer6tv.png',
                publicId: 'IQI/projects/w1epkd0cmyroi5fer6tv',
              },
              position: {
                x: 49.67249190273126,
                y: 44.74973512301365,
              },
            },
          ],
          invitationImage: {
            url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758783373/IQI/projects/yilrd4r6qhymmye2e39m.jpg',
            publicId: 'IQI/projects/yilrd4r6qhymmye2e39m',
          },
        },
        breakImages: [
          {
            image: {
              url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758785860/IQI/projects/kygcyxw6hizir6dh9pp2.jpg',
              publicId: 'IQI/projects/kygcyxw6hizir6dh9pp2',
            },
            position: 'introduction',
          },
          {
            image: {
              url: 'https://res.cloudinary.com/dpinnqt92/image/upload/v1758785860/IQI/projects/eoxtqaicrjrmk4h1brg0.jpg',
              publicId: 'IQI/projects/eoxtqaicrjrmk4h1brg0',
            },
            position: 'location',
          },
        ],
        visibleOnWeb: true,
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
