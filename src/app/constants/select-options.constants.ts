export interface SelectOption {
  code: number;
  value: string;
}

export const CONTACT_PERSON_TYPE: SelectOption[] = [
  { code: 1, value: 'מבוטח' },
  { code: 2, value: 'סוכן' },
  { code: 3, value: 'בן/בת זוג' },
];

export const SUPER_CLAIM_TYPE: SelectOption[] = [
  { code: 1, value: "התביעה אושרה" },
  { code: 2, value: "התביעה נדחתה" },
  { code: 4, value: "טרם התקבלה החלטה" },
];

export const CLAIM_TYPE: SelectOption[] = [
  { code: 1, value: "מקפת - נכות" }, 
  { code: 2, value: "אובדן כושר עבודה" }, 
  { code: 3, value: "תאונת עבודה" },
  { code: 4, value: "מחלה מקצועית" }, 
  { code: 5, value: "פציעה" }, 
  { code: 6, value: "נזק רפואי" }, 
];

export const CLAIM_CAUSE: SelectOption[] = [
  { code: 1, value: "תאונה" },
  { code: 2, value: "מחלה" },
  { code: 5, value: "תאונת עבודה" },
  { code: 6, value: "אחר" },
];

export const INJURY_TYPE: SelectOption[] = [
  { code: 1, value: "אגן" },
  { code: 2, value: "גפיים" },
  { code: 5, value: "ראש" },
  { code: 6, value: "גב" },
  { code: 7, value: "לב" },
  { code: 9, value: "נפש" },
];

export const SUBMITION_METHOD: SelectOption[] = [
  { code: 1, value: 'דואר' },
  { code: 2, value: 'דיגיטל' },
  { code: 3, value: 'פקס' },
];
export const IDENTITY_TYPES: SelectOption[] = [
  { code: 1, value: 'ת.ז.' },
  { code: 2, value: 'דרכון' },
  { code: 3, value: 'מבוטח' },
  { code: 4, value: 'מפעל' },
];

