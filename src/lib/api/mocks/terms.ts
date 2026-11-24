import type { LegalDocument } from "@/lib/api/types";

export const termsMock: LegalDocument = {
  slug: "terms",
  updatedAt: "2026-11-11",
  readTimeMinutes: 5,
  summary: [
    {
      id: "s1",
      text: {
        ar: "السعر يظهر لك قبل ما تأكد طلبك.",
        en: "You’ll see the price before you confirm.",
      },
    },
    {
      id: "s2",
      text: {
        ar: "تقدر تلغي مجانًا قبل ما يقبل السائق الطلب.",
        en: "You can cancel for free before a driver accepts.",
      },
    },
    {
      id: "s3",
      text: {
        ar: "احترامك للسائق والسيارة جزء من الاتفاق.",
        en: "Respect for the driver and vehicle is part of the agreement.",
      },
    },
    {
      id: "s4",
      text: {
        ar: "تقدر تحذف حسابك في أي وقت.",
        en: "You can delete your account anytime.",
      },
    },
  ],
  sections: [
    {
      id: "accept",
      number: "01",
      title: { ar: "قبولك للشروط", en: "Acceptance of terms" },
      body: {
        ar: "باستخدامك تطبيق دروبنا أو موقعها، فأنت توافق على هذه الشروط وعلى سياسة الخصوصية. إذا ما توافق عليها، نرجو منك عدم استخدام الخدمة.",
        en: "By using the Droobna app or website, you agree to these terms and the Privacy Policy. If you do not agree, please do not use the service.",
      },
    },
    {
      id: "defs",
      number: "02",
      title: { ar: "التعريفات", en: "Definitions" },
      body: { ar: "", en: "" },
      bullets: [
        {
          ar: "دروبنا: الجهة المشغّلة للتطبيق والموقع.",
          en: "Droobna: the operator of the app and website.",
        },
        {
          ar: "العميل: كل من يستخدم التطبيق لطلب مشوار.",
          en: "Customer: anyone using the app to request a ride.",
        },
        {
          ar: "السائق: الشخص اللي ينفّذ المشوار.",
          en: "Driver: the person fulfilling the ride.",
        },
        {
          ar: "المشوار: خدمة التوصيل من نقطة الانطلاق إلى الوجهة.",
          en: "Ride: transport from pickup to destination.",
        },
      ],
    },
    {
      id: "account",
      number: "03",
      title: { ar: "حسابك", en: "Your account" },
      body: {
        ar: "لازم يكون عمرك 18 سنة أو أكثر، وتسجّل ببيانات صحيحة، وتحافظ على سرية حسابك. وأنت مسؤول عن أي استخدام يتم من خلاله.",
        en: "You must be 18 or older, register with accurate details, and keep your account secure. You are responsible for any use through it.",
      },
    },
    {
      id: "request",
      number: "04",
      title: { ar: "طلب المشوار", en: "Requesting a ride" },
      body: {
        ar: "تحدد نقطة الانطلاق والوجهة ونوع المشوار (فوري أو مجدول، فردي أو مشترك) والفئة. يظهر لك السعر قبل التأكيد، وبعد ما تأكد يعتبر الطلب ملزمًا.",
        en: "You set pickup, destination, ride type (instant or scheduled, solo or shared), and class. The price appears before confirmation; once confirmed, the request is binding.",
      },
    },
    {
      id: "pricing",
      number: "05",
      title: { ar: "الأسعار والدفع", en: "Pricing and payment" },
      body: {
        ar: "السعر اللي يظهر لك قبل التأكيد شامل ضريبة القيمة المضافة. وقد يتغيّر السعر النهائي إذا غيّرت الوجهة أو أضفت توقفًا أثناء المشوار. وبعد كل مشوار تصلك فاتورة إلكترونية.",
        en: "The pre-confirmation price includes VAT. The final price may change if you change destination or add a stop. After each ride you receive an e-invoice.",
      },
    },
    {
      id: "cancel",
      number: "06",
      title: { ar: "الإلغاء والاسترداد", en: "Cancellation and refunds" },
      body: { ar: "", en: "" },
      highlighted: true,
      bullets: [
        {
          ar: "تقدر تلغي مجانًا قبل ما يقبل السائق طلبك.",
          en: "You can cancel for free before a driver accepts your request.",
        },
        {
          ar: "إذا ألغيت بعد قبول الطلب، قد تنطبق رسوم إلغاء تظهر لك قبل ما تأكد الإلغاء.",
          en: "If you cancel after acceptance, a cancellation fee may apply and is shown before you confirm.",
        },
        {
          ar: "إذا انخصم منك مبلغ بالخطأ، نرجّعه لنفس وسيلة الدفع حسب المدة اللي تحتاجها جهة الدفع.",
          en: "Mistaken charges are refunded to the same payment method per the provider’s timeline.",
        },
      ],
    },
    {
      id: "conduct",
      number: "07",
      title: {
        ar: "التزاماتك أثناء المشوار",
        en: "Your obligations during the ride",
      },
      body: { ar: "", en: "" },
      bullets: [
        {
          ar: "احترام السائق والتعامل معه بلباقة.",
          en: "Treat the driver respectfully and courteously.",
        },
        {
          ar: "المحافظة على السيارة وعدم إتلافها.",
          en: "Care for the vehicle and do not damage it.",
        },
        {
          ar: "ربط حزام الأمان طول المشوار.",
          en: "Wear a seatbelt throughout the ride.",
        },
        {
          ar: "عدم نقل أي مواد ممنوعة نظامًا.",
          en: "Do not transport any legally prohibited materials.",
        },
      ],
    },
    {
      id: "lost",
      number: "08",
      title: { ar: "المفقودات", en: "Lost items" },
      body: {
        ar: "إذا نسيت شي في السيارة، بلّغنا من صفحة الرحلة في التطبيق، ونحاول نوصلك بالسائق عشان تسترجعه.",
        en: "If you leave something in the car, report it from the trip page in the app and we’ll try to connect you with the driver.",
      },
    },
    {
      id: "liability",
      number: "09",
      title: { ar: "حدود المسؤولية", en: "Limitation of liability" },
      body: {
        ar: "نبذل جهدنا لتقديم خدمة آمنة ومنتظمة، لكن قد تتأثر المواعيد بظروف خارجة عن إرادتنا مثل الزحام والطقس.",
        en: "We strive to provide a safe, reliable service, but timing may be affected by factors beyond our control such as traffic and weather.",
      },
    },
    {
      id: "ip",
      number: "10",
      title: { ar: "الملكية الفكرية", en: "Intellectual property" },
      body: {
        ar: "اسم دروبنا وشعارها وتصميم التطبيق والموقع ومحتواهما ملك لنا، وما يجوز استخدامها بدون إذن كتابي منا.",
        en: "The Droobna name, logo, and app/website design and content are ours and may not be used without written permission.",
      },
    },
    {
      id: "suspend",
      number: "11",
      title: { ar: "إيقاف الحساب", en: "Account suspension" },
      body: {
        ar: "نقدر نوقف حسابك إذا خالفت هذه الشروط أو أسأت استخدام الخدمة، وتقدر أنت تحذف حسابك في أي وقت.",
        en: "We may suspend your account if you breach these terms or misuse the service. You may delete your account anytime.",
      },
    },
    {
      id: "law",
      number: "12",
      title: { ar: "النظام المعمول به", en: "Governing law" },
      body: {
        ar: "تخضع هذه الشروط لأنظمة المملكة العربية السعودية، وأي خلاف نحاول نحله وديًا أولًا، وإذا تعذّر فالجهة المختصة هي محاكم المملكة.",
        en: "These terms are governed by the laws of Saudi Arabia. We try to resolve disputes amicably first; otherwise Saudi courts have jurisdiction.",
      },
    },
  ],
};
