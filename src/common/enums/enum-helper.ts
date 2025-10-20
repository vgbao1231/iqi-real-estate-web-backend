// enum.helper.ts

export interface EnumItem {
  value: string;
  label: string;
}

// Hàm tiện ích
export const mapEnumToItems = (
  enumObj: object,
  labels: Record<string, string>,
): EnumItem[] => {
  return Object.values(enumObj)
    .filter((v): v is string => typeof v === 'string')
    .map((value) => ({
      value: value,
      label: labels[value] || value,
    }));
};

export const ARTICLE_TYPE_LABELS: Record<string, string> = {
  MACRO: 'Vĩ mô',
  MICRO: 'Vi mô',
};

export const ARTICLE_CATEGORY_LABELS: Record<string, string> = {
  MARKET: 'Thị trường',
  LAW: 'Pháp luật',
  INVESTMENT: 'Đầu tư',
  RESORT: 'Nghỉ dưỡng',
  BANK: 'Tài chính',
};

export const PARTNER_CATEGORY_LABELS: Record<string, string> = {
  DEVELOPER: 'Chủ đầu tư',
  INTERNATIONAL: 'Đối tác quốc tế',
  BANK: 'Đối tác ngân hàng',
};

export const USER_ROLE_LABELS: Record<string, string> = {
  ADMIN: 'Quản trị viên',
  MARKETING: 'Marketing',
  SALE: 'Kinh doanh',
};
