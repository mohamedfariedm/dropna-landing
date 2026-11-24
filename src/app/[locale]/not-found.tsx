import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("common");

  return (
    <div className="container-wide section-pad text-center">
      <h1 className="text-4xl">{t("errors.notFound")}</h1>
      <Link
        href="/"
        className="focus-ring mt-6 inline-flex rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-cream"
      >
        {t("nav.home")}
      </Link>
    </div>
  );
}
