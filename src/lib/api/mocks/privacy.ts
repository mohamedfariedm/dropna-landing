import type { LegalDocument } from "@/lib/api/types";

export const privacyMock: LegalDocument = {
  slug: "privacy",
  updatedAt: "2026-11-11",
  readTimeMinutes: 6,
  summary: [
    {
      id: "s1",
      text: {
        ar: "موقعك نستخدمه وقت الطلب وخلال المشوار.",
        en: "We use your location when you request a ride and during the trip.",
      },
    },
    {
      id: "s2",
      text: {
        ar: "نجمع اللي نحتاجه بس عشان نوصلك لوجهتك.",
        en: "We only collect what we need to get you to your destination.",
      },
    },
    {
      id: "s3",
      text: {
        ar: "تقدر تطلع على بياناتك وتصححها أو تحذف حسابك في أي وقت.",
        en: "You can view, correct, or delete your account data at any time.",
      },
    },
    {
      id: "s4",
      text: {
        ar: "ما نبيع بياناتك الشخصية لأي جهة.",
        en: "We never sell your personal data.",
      },
    },
  ],
  sections: [
    {
      id: "who",
      number: "01",
      title: { ar: "من نحن", en: "Who we are" },
      body: {
        ar: "دروبنا منصة لطلب المشاوير داخل المملكة العربية السعودية، ونحن الجهة المسؤولة عن معالجة بياناتك الشخصية وفق نظام حماية البيانات الشخصية ولائحته التنفيذية.\n\nالسجل التجاري: —————— · العنوان الوطني: —————— · البريد: admin@droobnasa.com",
        en: "Droobna is a ride-hailing platform in Saudi Arabia. We are the controller of your personal data under the Personal Data Protection Law and its regulations.\n\nCR: —————— · National address: —————— · Email: admin@droobnasa.com",
      },
    },
    {
      id: "data",
      number: "02",
      title: { ar: "البيانات اللي نجمعها", en: "Data we collect" },
      body: {
        ar: "نجمع الفئات التالية عند الحاجة:",
        en: "We collect the following categories when needed:",
      },
      bullets: [
        {
          ar: "بيانات الحساب: الاسم ورقم الجوال والبريد الإلكتروني.",
          en: "Account data: name, mobile number, and email.",
        },
        {
          ar: "بيانات المشوار: نقطة الانطلاق والوجهة ووقت الرحلة وسجل مشاويرك.",
          en: "Trip data: pickup, destination, time, and ride history.",
        },
        {
          ar: "بيانات الموقع: موقعك أثناء استخدام التطبيق وخلال الرحلة، بعد موافقتك.",
          en: "Location data: while using the app and during the trip, with your consent.",
        },
        {
          ar: "بيانات الدفع: طريقة الدفع وآخر أربعة أرقام من البطاقة، أما بيانات البطاقة الكاملة فتعالجها جهة الدفع المرخّصة.",
          en: "Payment data: method and last four digits; full card data is handled by licensed payment providers.",
        },
        {
          ar: "بيانات الجهاز: نوع الجهاز ونظام التشغيل وسجلات الأعطال.",
          en: "Device data: device type, OS, and crash logs.",
        },
        {
          ar: "تواصلك معنا: محتوى رسائلك وبلاغاتك.",
          en: "Communications: content of your messages and reports.",
        },
      ],
    },
    {
      id: "how",
      number: "03",
      title: { ar: "كيف نجمعها", en: "How we collect it" },
      body: {
        ar: "منك مباشرة عند التسجيل وطلب المشوار والتواصل معنا، وتلقائيًا من التطبيق أثناء الاستخدام، ومن شركائنا مثل مزوّدي خدمات الدفع.",
        en: "Directly from you when you register, request rides, or contact us; automatically from the app during use; and from partners such as payment providers.",
      },
    },
    {
      id: "why",
      number: "04",
      title: { ar: "ليش نستخدمها", en: "Why we use it" },
      body: {
        ar: "نستخدم بياناتك للأغراض التالية:",
        en: "We use your data for the following purposes:",
      },
      bullets: [
        {
          ar: "تنفيذ مشوارك وربطك بالسائق المناسب.",
          en: "Fulfilling your ride and matching you with a driver.",
        },
        {
          ar: "حساب السعر وإصدار الفاتورة الإلكترونية.",
          en: "Calculating price and issuing e-invoices.",
        },
        {
          ar: "سلامتك، ومشاركة رحلتك مع من تختار.",
          en: "Your safety, and sharing your trip with people you choose.",
        },
        {
          ar: "الرد على استفساراتك وبلاغاتك.",
          en: "Responding to inquiries and reports.",
        },
        {
          ar: "تحسين الخدمة وتجربة التطبيق.",
          en: "Improving the service and app experience.",
        },
        {
          ar: "إرسال العروض إذا وافقت، وتقدر تلغيها في أي وقت.",
          en: "Sending offers if you opt in — you can unsubscribe anytime.",
        },
        {
          ar: "الالتزام بالأنظمة المعمول بها في المملكة.",
          en: "Complying with applicable laws in the Kingdom.",
        },
      ],
    },
    {
      id: "legal-basis",
      number: "05",
      title: {
        ar: "الأساس النظامي للمعالجة",
        en: "Legal basis for processing",
      },
      body: {
        ar: "نعالج بياناتك بناءً على موافقتك، أو لتنفيذ الاتفاق بيننا عند طلبك للمشوار، أو لالتزام نظامي، أو لمصلحة مشروعة لا تتعارض مع حقوقك.",
        en: "We process your data based on your consent, to perform our agreement when you request a ride, for legal obligations, or for a legitimate interest that does not override your rights.",
      },
    },
    {
      id: "share",
      number: "06",
      title: { ar: "مع مين نشاركها", en: "Who we share it with" },
      body: {
        ar: "قد نشارك بيانات محدودة مع:",
        en: "We may share limited data with:",
      },
      bullets: [
        {
          ar: "السائق: اسمك الأول وموقع الانطلاق والوجهة فقط.",
          en: "Drivers: your first name, pickup, and destination only.",
        },
        {
          ar: "مزوّدو الدفع: لإتمام عمليات الدفع والاسترداد.",
          en: "Payment providers: to complete payments and refunds.",
        },
        {
          ar: "مزوّدو الخدمات التقنية: الاستضافة والدعم الفني، بموجب عقود تحمي بياناتك.",
          en: "Tech providers: hosting and support under contracts that protect your data.",
        },
        {
          ar: "الجهات المختصة: مثل الهيئة العامة للنقل، متى ما طلبها النظام.",
          en: "Competent authorities: such as the Public Transport Authority when required by law.",
        },
      ],
    },
    {
      id: "transfer",
      number: "07",
      title: {
        ar: "نقل البيانات خارج المملكة",
        en: "Transfers outside the Kingdom",
      },
      body: {
        ar: "الأصل أن تُعالج بياناتك داخل المملكة، وإذا احتجنا ننقلها للخارج نلتزم بالضوابط اللي يحددها النظام ولائحة نقل البيانات.",
        en: "As a rule, your data is processed inside the Kingdom. If transfer abroad is needed, we follow the controls set by law and the data transfer regulations.",
      },
    },
    {
      id: "retention",
      number: "08",
      title: { ar: "كم نحتفظ فيها", en: "How long we keep it" },
      body: {
        ar: "نحتفظ ببياناتك طول ما حسابك موجود، وبعد حذفه نتلفها خلال مدة معقولة، باستثناء ما يلزمنا النظام بالاحتفاظ به مثل الفواتير والسجلات المالية للمدة النظامية.",
        en: "We keep your data while your account exists, and delete it within a reasonable time after deletion, except where law requires retention such as invoices and financial records.",
      },
    },
    {
      id: "security",
      number: "09",
      title: { ar: "كيف نحميها", en: "How we protect it" },
      body: {
        ar: "نشفّر البيانات أثناء النقل والتخزين، ونقيّد الوصول لها على الموظفين المخوّلين فقط. وإذا صار تسرّب يمس بياناتك، نبلّغ الجهة المختصة ونبلغك حسب ما يطلبه النظام.",
        en: "We encrypt data in transit and at rest, and limit access to authorized staff. If a breach affects your data, we notify the competent authority and you as required by law.",
      },
    },
    {
      id: "rights",
      number: "10",
      title: { ar: "حقوقك", en: "Your rights" },
      body: {
        ar: "يكفل لك نظام حماية البيانات الشخصية حقوق الوصول والتصحيح والإتلاف والعلم والرجوع عن الموافقة. تبي تمارس حقك؟ من إعدادات التطبيق أو على admin@droobnasa.com، ونرد خلال 30 يوم. ولك الحق ترفع شكوى للهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا).",
        en: "Under the Personal Data Protection Law you have rights of access, correction, erasure, information, and withdrawal of consent. Exercise them in app settings or at admin@droobnasa.com — we respond within 30 days. You may also complain to SDAIA.",
      },
    },
    {
      id: "cookies",
      number: "11",
      title: { ar: "ملفات الارتباط (الكوكيز)", en: "Cookies" },
      body: {
        ar: "نستخدم ملفات ضرورية لتشغيل الموقع، وملفات قياس ما نفعّلها إلا بموافقتك. تقدر تغيّر اختيارك في أي وقت من إعدادات متصفحك.",
        en: "We use necessary cookies to run the site, and analytics cookies only with your consent. You can change your choice anytime in browser settings.",
      },
    },
    {
      id: "children",
      number: "12",
      title: { ar: "الأطفال", en: "Children" },
      body: {
        ar: "خدماتنا موجهة لمن أعمارهم 18 سنة فأكثر، وما نجمع بيانات الأطفال عن قصد.",
        en: "Our services are for ages 18+, and we do not knowingly collect children’s data.",
      },
    },
    {
      id: "updates",
      number: "13",
      title: {
        ar: "التحديثات على هذه السياسة",
        en: "Updates to this policy",
      },
      body: {
        ar: "إذا غيّرنا هذه السياسة بشكل جوهري نبلغك في التطبيق قبل سريان التغيير، وتلقى تاريخ آخر تحديث أعلى الصفحة.",
        en: "If we make material changes, we’ll notify you in the app before they take effect. The last updated date appears at the top of this page.",
      },
    },
  ],
};
