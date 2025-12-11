"use client";

import { ArrowLeft, Cookie } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { useLocale } from "@/contexts/locale-context";

type Section = {
  title: string;
  content: string | string[];
};

type CookieContentItem = {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: Section[];
};

type CookieContent = Record<string, CookieContentItem>;

const cookieContent: CookieContent = {
  lt: {
    title: "Slapukų politika",
    lastUpdated: "Paskutinį kartą atnaujinta: 2024 m. gruodžio mėn.",
    intro:
      "Ši slapukų politika paaiškina, kaip Nešvęsk Vienas naudoja slapukus ir panašias technologijas, kai lankotės mūsų svetainėje.",
    sections: [
      {
        title: "1. Kas yra slapukai",
        content:
          "Slapukai yra maži tekstiniai failai, kurie saugomi jūsų įrenginyje (kompiuteryje, planšetėje ar telefone), kai lankotės svetainėse. Jie padeda svetainėms atsiminti informaciją apie jūsų apsilankymą.",
      },
      {
        title: "2. Slapukų tipai, kuriuos naudojame",
        content: [
          "Būtinieji slapukai: Šie slapukai yra būtini svetainės veikimui. Jie leidžia jums naršyti svetainę ir naudotis jos funkcijomis.",
          "Analitiniai slapukai: Šie slapukai padeda mums suprasti, kaip lankytojai naudojasi mūsų svetaine, kad galėtume ją tobulinti.",
          "Rinkodaros slapukai: Šie slapukai naudojami stebėti lankytojus skirtingose svetainėse ir rodyti jiems aktualią reklamą.",
        ],
      },
      {
        title: "3. Kaip valdyti slapukus",
        content: [
          "Galite valdyti ir ištrinti slapukus savo naršyklės nustatymuose. Dauguma naršyklių leidžia blokuoti slapukus arba nustatyti įspėjimą prieš juos priimant.",
          "Atkreipkite dėmesį, kad kai kurių slapukų išjungimas gali paveikti svetainės funkcionalumą.",
        ],
      },
      {
        title: "4. Trečiųjų šalių slapukai",
        content:
          "Mūsų svetainė gali naudoti trečiųjų šalių paslaugas, tokias kaip analitika ir autentifikacija. Šios paslaugos gali nustatyti savo slapukus.",
      },
      {
        title: "5. Sutikimas",
        content:
          "Pirmą kartą apsilankę mūsų svetainėje, jūsų bus paprašyta sutikti su slapukų naudojimu. Galite bet kada pakeisti savo nustatymus.",
      },
      {
        title: "6. Susisiekite su mumis",
        content:
          "Jei turite klausimų apie mūsų slapukų politiką, susisiekite su mumis el. paštu info@nesveskvienas.lt.",
      },
    ],
  },
  en: {
    title: "Cookie Policy",
    lastUpdated: "Last updated: December 2024",
    intro:
      "This Cookie Policy explains how Nešvęsk Vienas uses cookies and similar technologies when you visit our website.",
    sections: [
      {
        title: "1. What are cookies",
        content:
          "Cookies are small text files stored on your device (computer, tablet, or phone) when you visit websites. They help websites remember information about your visit.",
      },
      {
        title: "2. Types of cookies we use",
        content: [
          "Necessary cookies: These cookies are essential for the website to function. They allow you to navigate the site and use its features.",
          "Analytics cookies: These cookies help us understand how visitors use our website so we can improve it.",
          "Marketing cookies: These cookies are used to track visitors across websites and display relevant advertising.",
        ],
      },
      {
        title: "3. How to manage cookies",
        content: [
          "You can manage and delete cookies in your browser settings. Most browsers allow you to block cookies or set up warnings before accepting them.",
          "Please note that disabling some cookies may affect the functionality of the website.",
        ],
      },
      {
        title: "4. Third-party cookies",
        content:
          "Our website may use third-party services such as analytics and authentication. These services may set their own cookies.",
      },
      {
        title: "5. Consent",
        content:
          "When you first visit our website, you will be asked to consent to the use of cookies. You can change your settings at any time.",
      },
      {
        title: "6. Contact us",
        content:
          "If you have questions about our Cookie Policy, please contact us at info@nesveskvienas.lt.",
      },
    ],
  },
  ua: {
    title: "Політика файлів cookie",
    lastUpdated: "Останнє оновлення: грудень 2024",
    intro:
      "Ця політика файлів cookie пояснює, як Nešvęsk Vienas використовує файли cookie та подібні технології під час відвідування нашого веб-сайту.",
    sections: [
      {
        title: "1. Що таке файли cookie",
        content:
          "Файли cookie — це невеликі текстові файли, які зберігаються на вашому пристрої (комп'ютері, планшеті або телефоні) під час відвідування веб-сайтів. Вони допомагають веб-сайтам запам'ятовувати інформацію про ваш візит.",
      },
      {
        title: "2. Типи файлів cookie, які ми використовуємо",
        content: [
          "Необхідні файли cookie: Ці файли cookie є важливими для роботи веб-сайту. Вони дозволяють вам переміщатися по сайту та використовувати його функції.",
          "Аналітичні файли cookie: Ці файли cookie допомагають нам зрозуміти, як відвідувачі використовують наш веб-сайт, щоб ми могли його покращити.",
          "Маркетингові файли cookie: Ці файли cookie використовуються для відстеження відвідувачів на різних веб-сайтах та показу їм релевантної реклами.",
        ],
      },
      {
        title: "3. Як керувати файлами cookie",
        content: [
          "Ви можете керувати та видаляти файли cookie в налаштуваннях браузера. Більшість браузерів дозволяють блокувати файли cookie або налаштувати попередження перед їх прийняттям.",
          "Зверніть увагу, що вимкнення деяких файлів cookie може вплинути на функціональність веб-сайту.",
        ],
      },
      {
        title: "4. Файли cookie третіх сторін",
        content:
          "Наш веб-сайт може використовувати сторонні послуги, такі як аналітика та автентифікація. Ці послуги можуть встановлювати власні файли cookie.",
      },
      {
        title: "5. Згода",
        content:
          "Коли ви вперше відвідуєте наш веб-сайт, вас попросять надати згоду на використання файлів cookie. Ви можете змінити свої налаштування в будь-який час.",
      },
      {
        title: "6. Зв'яжіться з нами",
        content:
          "Якщо у вас є питання щодо нашої політики файлів cookie, зв'яжіться з нами за адресою info@nesveskvienas.lt.",
      },
    ],
  },
  ru: {
    title: "Политика файлов cookie",
    lastUpdated: "Последнее обновление: декабрь 2024",
    intro:
      "Эта политика файлов cookie объясняет, как Nešvęsk Vienas использует файлы cookie и аналогичные технологии при посещении нашего веб-сайта.",
    sections: [
      {
        title: "1. Что такое файлы cookie",
        content:
          "Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве (компьютере, планшете или телефоне) при посещении веб-сайтов. Они помогают веб-сайтам запоминать информацию о вашем визите.",
      },
      {
        title: "2. Типы файлов cookie, которые мы используем",
        content: [
          "Необходимые файлы cookie: Эти файлы cookie необходимы для работы веб-сайта. Они позволяют вам перемещаться по сайту и использовать его функции.",
          "Аналитические файлы cookie: Эти файлы cookie помогают нам понять, как посетители используют наш веб-сайт, чтобы мы могли его улучшить.",
          "Маркетинговые файлы cookie: Эти файлы cookie используются для отслеживания посетителей на разных веб-сайтах и показа им релевантной рекламы.",
        ],
      },
      {
        title: "3. Как управлять файлами cookie",
        content: [
          "Вы можете управлять и удалять файлы cookie в настройках браузера. Большинство браузеров позволяют блокировать файлы cookie или настраивать предупреждения перед их принятием.",
          "Обратите внимание, что отключение некоторых файлов cookie может повлиять на функциональность веб-сайта.",
        ],
      },
      {
        title: "4. Файлы cookie третьих сторон",
        content:
          "Наш веб-сайт может использовать сторонние сервисы, такие как аналитика и аутентификация. Эти сервисы могут устанавливать собственные файлы cookie.",
      },
      {
        title: "5. Согласие",
        content:
          "Когда вы впервые посещаете наш веб-сайт, вас попросят дать согласие на использование файлов cookie. Вы можете изменить свои настройки в любое время.",
      },
      {
        title: "6. Свяжитесь с нами",
        content:
          "Если у вас есть вопросы о нашей политике файлов cookie, свяжитесь с нами по адресу info@nesveskvienas.lt.",
      },
    ],
  },
};

export default function CookiesPage() {
  const { locale } = useLocale();
  const content = cookieContent[locale] || cookieContent.en;

  return (
    <div className="flex min-h-screen flex-col bg-[#0F172A]">
      <Navbar />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            className="mb-6 inline-flex items-center gap-2 text-amber-400 transition-colors hover:text-amber-300"
            href="/"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to home</span>
          </Link>

          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm sm:p-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                <Cookie className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <h1 className="font-bold font-serif text-2xl text-amber-100 sm:text-3xl">
                  {content.title}
                </h1>
                <p className="text-slate-400 text-sm">{content.lastUpdated}</p>
              </div>
            </div>

            <p className="mb-8 text-slate-300">{content.intro}</p>

            <div className="space-y-8">
              {content.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="mb-3 font-semibold text-amber-100 text-lg">
                    {section.title}
                  </h2>
                  {typeof section.content === "string" ? (
                    <p className="text-slate-300 leading-relaxed">
                      {section.content}
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {section.content.map((item) => (
                        <li
                          className="flex gap-3 text-slate-300 leading-relaxed"
                          key={item.slice(0, 50)}
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
