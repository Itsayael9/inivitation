/** Wedding day: Saturday 20 May 2027, 4:00 PM (local). */
export const WEDDING_DATE = new Date(2027, 4, 20, 16, 0, 0);

export const RSVP_DEADLINE = new Date(2027, 4, 1);

export const BRIDE_NAME = "أميرة";
export const GROOM_NAME = "غيث";
export const COUPLE_DISPLAY = `${BRIDE_NAME} و ${GROOM_NAME}`;

export const VENUE_LABEL = "بقاعة";
export const VENUE_NAME = "Beldi Country Club";
export const VENUE_MAP_EMBED = "https://www.google.com/maps?q=Beldi+Country+Club&output=embed";
export const VENUE_MAP_LINK = "https://maps.google.com/?q=Beldi+Country+Club";

export const engagementMemories = [
  { src: "/images/engagement/memory-1.png", alt: "لحظة الخطوبة — Together Forever" },
  { src: "/images/engagement/memory-2.png", alt: "لحظة الخطوبة — تبادل الخواتم" },
  { src: "/images/engagement/memory-3.png", alt: "لحظة الخطوبة — يد بيد" },
] as const;

export const scheduleEvents = [
  {
    time: "18:00",
    title: "حفلة الحناء",
    description: "ليلة الحناء والبركة للعروس",
  },
  {
    time: "20:00",
    title: "دخلة العروس",
    description: "دخول العروسين على العمارية",
  },
  {
    time: "21:00",
    title: "العادة والعشاء",
    description: "مأدبة عشاء تقليدية مع الأهل والأصدقاء",
  },
  {
    time: "23:00",
    title: "الدقة والرقص",
    description: "موسيقى وأهازيج شعبية حتى الفجر",
  },
] as const;
