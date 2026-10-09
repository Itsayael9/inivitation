
/** Wedding day: Saturday 17 October 2026, 6:00 PM (local). */

export const WEDDING_DATE = new Date(2026, 9, 17, 18, 0, 0);

export const BRIDE_NAME = "زينب";

export const GROOM_NAME = "محمد";

export const COUPLE_DISPLAY = `${BRIDE_NAME} و ${GROOM_NAME}`;

export const VENUE_LABEL = "قاعة أفراح فلسطيني";

export const VENUE_NAME = "Salle Afrah Filistine";

export const VENUE_MAP_EMBED =
  "https://www.google.com/maps?q=Le+Palais+Palestinien+Tanger&output=embed";

export const VENUE_MAP_LINK =
  "https://share.google/1LFGu99q1JJG6CWRn";

export const scheduleEvents = [
  {
    id: "henna",
    time: "18:00",
    title: "حفلة الحناء",
    description: "ليلة حناءالعروس ",
  },
  {
    id: "bride-entrance",
    time: "20:00",
    title: "دخلة العروس",
    description: "دخول العروس بالشدة الطنجاوية ",
  },
  {
    id: "traditional-dinner",
    time: "22:00",
    title:"دخلة العروس",
    description: "دخول العروس فوق العمارية ",
  },
  {
    id: "music-until-dawn",
    time: "12:00",
    title: " العشاء",
    description:"مأدبة عشاء تقليدية مع الأهل والأصدقاء",
  },
] as const;
