import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ callbackUrl?: string }>;
};

export const metadata: Metadata = { title: "Log in" };

export default async function LoginPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { callbackUrl } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "login" });

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-20">
      <h1 className="font-heading text-4xl sm:text-5xl font-light text-lapis-800 mb-3 text-center">
        {t("title")}
      </h1>
      <p className="text-center text-gray-600 mb-2">{t("inviteOnly")}</p>
      <p className="text-center text-sm text-sea-600 mb-10">{t("comingSoon")}</p>

      {/* Placeholder form — Auth.js not wired yet; UI only */}
      <form
        className="bg-white rounded-2xl shadow-sm border border-sea-100 p-6 sm:p-8 space-y-5"
        action="#"
        method="post"
      >
        {callbackUrl ? (
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
        ) : null}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-lapis-800 mb-1.5"
          >
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            className="w-full rounded-xl border border-sea-200 bg-sea-50/50 px-4 py-2.5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sea-400 focus:border-transparent"
            disabled
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-lapis-800 mb-1.5"
          >
            {t("password")}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder={t("passwordPlaceholder")}
            className="w-full rounded-xl border border-sea-200 bg-sea-50/50 px-4 py-2.5 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sea-400 focus:border-transparent"
            disabled
          />
        </div>

        <button
          type="button"
          disabled
          className="w-full rounded-full bg-lapis-700 text-white text-sm font-semibold tracking-widest uppercase px-6 py-3 opacity-60 cursor-not-allowed"
        >
          {t("submit")}
        </button>

        <p className="text-xs text-center text-gray-500 pt-1">{t("note")}</p>
      </form>
    </div>
  );
}
