import type { FaqResponse } from "@/lib/api/types";

export const faqMock: FaqResponse = {
  categories: ["booking", "payment", "safety", "account"],
  items: [
    {
      id: "book-ride",
      category: "booking",
      question: {
        ar: "كيف أحجز مشوار؟",
        en: "How do I book a ride?",
      },
      answer: {
        ar: "افتح التطبيق وحدد وجهتك، بعدها اختر نوع المشوار (فوري أو مجدول، فردي أو مشترك) والفئة اللي تناسبك. يظهر لك السعر قبل التأكيد، وأول ما تأكد نوصلك بأقرب سائق.",
        en: "Open the app, set your destination, then choose ride type (instant or scheduled, solo or shared) and the class that suits you. You’ll see the price before confirming, and once you confirm we connect you with the nearest driver.",
      },
    },
    {
      id: "solo-vs-shared",
      category: "booking",
      question: {
        ar: "وش الفرق بين المشوار الفردي والمشترك؟",
        en: "What’s the difference between solo and shared rides?",
      },
      answer: {
        ar: "المشوار الفردي تكون السيارة لك لحالك من البداية للنهاية. المشترك تقسّم الرحلة مع ركاب ثانيين في نفس الاتجاه، وعادة يكون أوفر.",
        en: "A solo ride means the car is yours for the whole trip. A shared ride means you split the journey with other riders going the same way, usually at a lower price.",
      },
    },
    {
      id: "schedule",
      category: "booking",
      question: {
        ar: "أقدر أجدول مشواري لوقت لاحق؟",
        en: "Can I schedule a ride for later?",
      },
      answer: {
        ar: "نعم. اختر رحلة مجدولة وحدد الوقت والتاريخ، ونجهّز سائقك ليكون جاهز في الموعد.",
        en: "Yes. Choose a scheduled ride, set the date and time, and we’ll have your driver ready on time.",
      },
    },
    {
      id: "cancel",
      category: "booking",
      question: {
        ar: "كيف ألغي مشواري؟ وهل فيه رسوم؟",
        en: "How do I cancel a ride, and are there fees?",
      },
      answer: {
        ar: "تقدر تلغي من التطبيق قبل ما يقبل السائق بدون رسوم. إذا ألغيت بعد القبول، قد تظهر رسوم إلغاء قبل ما تأكد.",
        en: "You can cancel in the app for free before a driver accepts. After acceptance, a cancellation fee may apply and will be shown before you confirm.",
      },
    },
    {
      id: "lost-item",
      category: "booking",
      question: {
        ar: "نسيت غرض في السيارة، وش أسوي؟",
        en: "I left something in the car. What should I do?",
      },
      answer: {
        ar: "من صفحة الرحلة داخل التطبيق بلّغ عن مفقودات، ونحاول نوصلك بالسائق عشان تسترجع غرضك.",
        en: "Report a lost item from the trip page in the app, and we’ll try to connect you with the driver to recover it.",
      },
    },
    {
      id: "price-before",
      category: "payment",
      question: {
        ar: "كيف أعرف السعر قبل ما أأكد؟",
        en: "How do I know the price before I confirm?",
      },
      answer: {
        ar: "بعد ما تحدد الوجهة والفئة، يظهر لك السعر التقديري شامل الضريبة قبل ما تضغط تأكيد.",
        en: "After you set destination and class, you’ll see an estimated price including tax before you confirm.",
      },
    },
    {
      id: "payment-methods",
      category: "payment",
      question: {
        ar: "وش طرق الدفع المتاحة؟",
        en: "What payment methods are available?",
      },
      answer: {
        ar: "تقدر تدفع ببطاقة ائتمان أو مدى أو طرق الدفع المتاحة داخل التطبيق حسب منطقتك.",
        en: "You can pay by credit card, mada, or other methods available in the app for your region.",
      },
    },
    {
      id: "promo",
      category: "payment",
      question: {
        ar: "كيف أستخدم كود الخصم؟",
        en: "How do I use a promo code?",
      },
      answer: {
        ar: "من شاشة الدفع أو المحفظة أدخل كود الخصم قبل تأكيد المشوار، ويظهر الخصم على السعر فورًا إذا كان صالحًا.",
        en: "Enter the promo code on the payment or wallet screen before confirming. If valid, the discount applies to the price immediately.",
      },
    },
    {
      id: "verify-car",
      category: "safety",
      question: {
        ar: "كيف أتأكد إن السيارة هي الصح؟",
        en: "How do I make sure it’s the right car?",
      },
      answer: {
        ar: "قبل الوصول تشوف اسم السائق، نوع السيارة، رقم اللوحة، والتقييم داخل التطبيق. طابقها قبل ما تركب.",
        en: "Before pickup you’ll see the driver’s name, car model, plate number, and rating in the app. Match them before you get in.",
      },
    },
    {
      id: "share-trip",
      category: "safety",
      question: {
        ar: "كيف أشارك رحلتي مع أهلي؟",
        en: "How do I share my trip with family?",
      },
      answer: {
        ar: "من تفاصيل الرحلة اضغط مشاركة الرحلة وأرسل الرابط لأهلك ليتابعوا موقعك لحظة بلحظة.",
        en: "From trip details, tap share trip and send the link so your family can follow your location live.",
      },
    },
    {
      id: "edit-profile",
      category: "account",
      question: {
        ar: "كيف أعدّل بياناتي؟",
        en: "How do I edit my details?",
      },
      answer: {
        ar: "من إعدادات الحساب داخل التطبيق تقدر تعدّل الاسم والجوال وبياناتك الأخرى.",
        en: "From account settings in the app you can update your name, phone, and other details.",
      },
    },
    {
      id: "delete-account",
      category: "account",
      question: {
        ar: "كيف أحذف حسابي؟",
        en: "How do I delete my account?",
      },
      answer: {
        ar: "من إعدادات الحساب اختر حذف الحساب، أو راسلنا على بريد الدعم وسننفذ طلبك حسب السياسة.",
        en: "Choose delete account in settings, or email support and we’ll process your request per our policy.",
      },
    },
  ],
};
