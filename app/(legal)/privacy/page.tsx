"use client";

import { ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { useLocale } from "@/contexts/locale-context";

type Section = {
  title: string;
  content: string | string[];
};

type PrivacyContentItem = {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: Section[];
};

type PrivacyContent = Record<string, PrivacyContentItem>;

const privacyContent: PrivacyContent = {
  lt: {
    title: "Privatumo politika",
    lastUpdated: "Paskutinį kartą atnaujinta: 2024 m. gruodžio mėn.",
    intro:
      "Ši privatumo politika aprašo, kaip Nešvęsk Vienas renka, naudoja ir saugo jūsų asmeninę informaciją. Naudodamiesi mūsų paslaugomis, jūs sutinkate su šia politika.",
    sections: [
      {
        title: "1. Kokią informaciją renkame",
        content: [
          "Paskyros informacija: Kai registruojatės, renkame jūsų vardą, el. pašto adresą, miestą ir profilio nuotrauką. Galite taip pat pateikti papildomą informaciją, tokią kaip amžius, kalbos ir biografija.",
          "Profilio informacija: Informacija, kurią pateikiate savo viešame profilyje, įskaitant aprašymą, nuotraukas, pasiekiamas datas ir nustatymus.",
          "Komunikacijos: Pranešimai, kuriuos siunčiate ir gaunate per mūsų platformą.",
          "Naudojimo duomenys: Informacija apie tai, kaip naudojatės mūsų paslaugomis, įskaitant IP adresą, naršyklės tipą, puslapius, kuriuos lankote, ir laiką, praleistą platformoje.",
          "Tapatybės tikrinimas: Jei naudojatės mūsų tapatybės tikrinimo funkcija, apdorojame nuotraukas vietoje jūsų įrenginyje. Mes nesaugome jūsų ID nuotraukų ar selfių serveriuose – saugomas tik tikrinimo rezultatas (patvirtinta/nepatvirtinta).",
        ],
      },
      {
        title: "2. Kaip naudojame jūsų informaciją",
        content: [
          "Paslaugų teikimas: Teikiame ir palaikome mūsų platformą, leidžiame jums kurti profilį ir bendrauti su kitais nariais.",
          "Komunikacija: Siunčiame jums svarbius pranešimus apie paslaugą, įskaitant paskyros patvirtinimus, saugumo įspėjimus ir atnaujinimus.",
          "Tobulinimas: Analizuojame naudojimo modelius, kad pagerintume mūsų paslaugas ir naudotojų patirtį.",
          "Saugumas: Naudojame informaciją sukčiavimui aptikti ir užkirsti kelią, taip pat saugoti mūsų bendruomenę.",
        ],
      },
      {
        title: "3. Informacijos dalijimasis",
        content: [
          "Vieša profilio informacija: Jūsų profilio informacija (vardas, miestas, biografija, nuotraukos, pasiekiamos datos) yra matoma kitiems platformos nariams.",
          "Privati informacija: Tam tikra informacija (pavardė, telefono numeris, adresas) atskleidžiama tik nariams, su kuriais esate susijungę (priėmę kvietimą).",
          "Jokio pardavimo: Mes neparduodame jūsų asmeninės informacijos trečiosioms šalims.",
          "Teisiniai reikalavimai: Galime atskleisti informaciją, jei to reikalauja įstatymai arba reaguojant į galiojančius teisinius procesus.",
        ],
      },
      {
        title: "4. Duomenų saugumas",
        content: [
          "Mes imamės pagrįstų techninių ir organizacinių priemonių apsaugoti jūsų asmeninę informaciją nuo neteisėtos prieigos, pakeitimo, atskleidimo ar sunaikinimo.",
          "Naudojame pramonės standartų šifravimą duomenų perdavimui ir saugojimui.",
          "Reguliariai peržiūrime ir atnaujiname savo saugumo praktikas.",
        ],
      },
      {
        title: "5. Jūsų teisės",
        content: [
          "Prieiga: Turite teisę prieiti prie savo asmeninių duomenų ir gauti jų kopiją.",
          "Taisymas: Galite prašyti ištaisyti netikslius ar neišsamius duomenis.",
          "Ištrynimas: Galite prašyti ištrinti savo paskyrą ir susijusius duomenis.",
          "Atsisakymas: Galite atsisakyti rinkodaros pranešimų bet kuriuo metu.",
          "Duomenų perkeliamumas: Galite prašyti savo duomenų struktūrizuotu, kompiuterio skaitomu formatu.",
        ],
      },
      {
        title: "6. Slapukai ir sekimo technologijos",
        content: [
          "Naudojame slapukus ir panašias technologijas, kad: palaikytume jūsų sesiją ir nustatymus, suprastume, kaip naudojate mūsų paslaugas, pagerintume jūsų patirtį.",
          "Galite valdyti slapukų nustatymus savo naršyklėje. Tačiau kai kurių slapukų išjungimas gali paveikti mūsų paslaugų funkcionalumą.",
        ],
      },
      {
        title: "7. Duomenų saugojimas",
        content:
          "Saugome jūsų asmeninę informaciją tol, kol jūsų paskyra yra aktyvi arba kiek reikia paslaugoms teikti. Galite bet kada prašyti ištrinti savo paskyrą, ir mes ištrinsime jūsų duomenis per pagrįstą laikotarpį, nebent privalome juos saugoti pagal teisinių įsipareigojimų.",
      },
      {
        title: "8. Vaikų privatumas",
        content:
          "Mūsų paslaugos nėra skirtos asmenims jaunesniems nei 18 metų. Mes sąmoningai nerenkame asmeninės informacijos iš vaikų. Jei sužinome, kad surinkome informaciją iš vaiko, nedelsdami imsimės veiksmų ją ištrinti.",
      },
      {
        title: "9. Tarptautinis duomenų perdavimas",
        content:
          "Jūsų informacija gali būti perduodama ir apdorojama šalyse, kurios nėra jūsų gyvenamoji šalis. Šios šalys gali turėti skirtingus duomenų apsaugos įstatymus. Mes imamės priemonių užtikrinti, kad jūsų informacija būtų tinkamai apsaugota.",
      },
      {
        title: "10. Šios politikos pakeitimai",
        content:
          "Galime retkarčiais atnaujinti šią privatumo politiką. Informuosime jus apie bet kokius reikšmingus pakeitimus paskelbdami naują politiką mūsų platformoje ir atnaujindami datą viršuje.",
      },
      {
        title: "11. Susisiekite su mumis",
        content:
          "Jei turite klausimų apie šią privatumo politiką ar norite pasinaudoti savo teisėmis, susisiekite su mumis el. paštu: info@nesveskvienas.lt",
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: December 2024",
    intro:
      "This privacy policy describes how Nešvęsk Vienas collects, uses, and protects your personal information. By using our services, you agree to this policy.",
    sections: [
      {
        title: "1. Information We Collect",
        content: [
          "Account Information: When you register, we collect your name, email address, city, and profile photo. You may also provide additional information such as age, languages, and bio.",
          "Profile Information: Information you provide in your public profile, including description, photos, available dates, and preferences.",
          "Communications: Messages you send and receive through our platform.",
          "Usage Data: Information about how you use our services, including IP address, browser type, pages visited, and time spent on the platform.",
          "Identity Verification: If you use our identity verification feature, we process photos locally on your device. We do not store your ID photos or selfies on servers – only the verification result (verified/not verified) is stored.",
        ],
      },
      {
        title: "2. How We Use Your Information",
        content: [
          "Service Delivery: Provide and maintain our platform, allow you to create a profile and interact with other members.",
          "Communication: Send you important service notifications, including account confirmations, security alerts, and updates.",
          "Improvement: Analyze usage patterns to improve our services and user experience.",
          "Safety: Use information to detect and prevent fraud and protect our community.",
        ],
      },
      {
        title: "3. Information Sharing",
        content: [
          "Public Profile Information: Your profile information (name, city, bio, photos, available dates) is visible to other platform members.",
          "Private Information: Certain information (last name, phone number, address) is only revealed to members you are connected with (accepted invitation).",
          "No Selling: We do not sell your personal information to third parties.",
          "Legal Requirements: We may disclose information if required by law or in response to valid legal processes.",
        ],
      },
      {
        title: "4. Data Security",
        content: [
          "We take reasonable technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.",
          "We use industry-standard encryption for data transmission and storage.",
          "We regularly review and update our security practices.",
        ],
      },
      {
        title: "5. Your Rights",
        content: [
          "Access: You have the right to access your personal data and obtain a copy.",
          "Correction: You can request correction of inaccurate or incomplete data.",
          "Deletion: You can request deletion of your account and associated data.",
          "Opt-out: You can opt out of marketing communications at any time.",
          "Data Portability: You can request your data in a structured, machine-readable format.",
        ],
      },
      {
        title: "6. Cookies and Tracking Technologies",
        content: [
          "We use cookies and similar technologies to: maintain your session and preferences, understand how you use our services, improve your experience.",
          "You can manage cookie settings in your browser. However, disabling certain cookies may affect the functionality of our services.",
        ],
      },
      {
        title: "7. Data Retention",
        content:
          "We retain your personal information for as long as your account is active or as needed to provide services. You can request deletion of your account at any time, and we will delete your data within a reasonable period, unless we are required to retain it for legal obligations.",
      },
      {
        title: "8. Children's Privacy",
        content:
          "Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If we learn that we have collected information from a child, we will take immediate steps to delete it.",
      },
      {
        title: "9. International Data Transfer",
        content:
          "Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We take measures to ensure your information is adequately protected.",
      },
      {
        title: "10. Changes to This Policy",
        content:
          "We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on our platform and updating the date at the top.",
      },
      {
        title: "11. Contact Us",
        content:
          "If you have questions about this privacy policy or want to exercise your rights, please contact us at: info@nesveskvienas.lt",
      },
    ],
  },
  ru: {
    title: "Политика конфиденциальности",
    lastUpdated: "Последнее обновление: декабрь 2024 г.",
    intro:
      "Эта политика конфиденциальности описывает, как Не празднуй один собирает, использует и защищает вашу личную информацию. Используя наши услуги, вы соглашаетесь с этой политикой.",
    sections: [
      {
        title: "1. Какую информацию мы собираем",
        content: [
          "Информация об учетной записи: При регистрации мы собираем ваше имя, адрес электронной почты, город и фото профиля. Вы также можете предоставить дополнительную информацию, такую как возраст, языки и биографию.",
          "Информация профиля: Информация, которую вы предоставляете в своем публичном профиле, включая описание, фотографии, доступные даты и предпочтения.",
          "Коммуникации: Сообщения, которые вы отправляете и получаете через нашу платформу.",
          "Данные об использовании: Информация о том, как вы используете наши услуги, включая IP-адрес, тип браузера, посещенные страницы и время, проведенное на платформе.",
          "Проверка личности: Если вы используете функцию проверки личности, мы обрабатываем фотографии локально на вашем устройстве. Мы не храним ваши фото удостоверения личности или селфи на серверах – сохраняется только результат проверки.",
        ],
      },
      {
        title: "2. Как мы используем вашу информацию",
        content: [
          "Предоставление услуг: Предоставляем и поддерживаем нашу платформу, позволяем вам создать профиль и взаимодействовать с другими участниками.",
          "Коммуникация: Отправляем вам важные уведомления о сервисе, включая подтверждения учетной записи, предупреждения о безопасности и обновления.",
          "Улучшение: Анализируем модели использования для улучшения наших услуг и пользовательского опыта.",
          "Безопасность: Используем информацию для обнаружения и предотвращения мошенничества и защиты нашего сообщества.",
        ],
      },
      {
        title: "3. Обмен информацией",
        content: [
          "Публичная информация профиля: Информация вашего профиля (имя, город, биография, фотографии, доступные даты) видна другим участникам платформы.",
          "Личная информация: Определенная информация (фамилия, номер телефона, адрес) раскрывается только участникам, с которыми вы связаны (принятое приглашение).",
          "Без продажи: Мы не продаем вашу личную информацию третьим лицам.",
          "Юридические требования: Мы можем раскрыть информацию, если это требуется по закону или в ответ на законные правовые процессы.",
        ],
      },
      {
        title: "4. Безопасность данных",
        content: [
          "Мы принимаем разумные технические и организационные меры для защиты вашей личной информации от несанкционированного доступа, изменения, раскрытия или уничтожения.",
          "Мы используем шифрование отраслевого стандарта для передачи и хранения данных.",
          "Мы регулярно пересматриваем и обновляем наши практики безопасности.",
        ],
      },
      {
        title: "5. Ваши права",
        content: [
          "Доступ: Вы имеете право получить доступ к своим личным данным и получить их копию.",
          "Исправление: Вы можете запросить исправление неточных или неполных данных.",
          "Удаление: Вы можете запросить удаление своей учетной записи и связанных данных.",
          "Отказ: Вы можете отказаться от маркетинговых сообщений в любое время.",
          "Переносимость данных: Вы можете запросить свои данные в структурированном, машиночитаемом формате.",
        ],
      },
      {
        title: "6. Файлы cookie и технологии отслеживания",
        content: [
          "Мы используем файлы cookie и аналогичные технологии для: поддержания вашей сессии и настроек, понимания того, как вы используете наши услуги, улучшения вашего опыта.",
          "Вы можете управлять настройками файлов cookie в своем браузере. Однако отключение определенных файлов cookie может повлиять на функциональность наших услуг.",
        ],
      },
      {
        title: "7. Хранение данных",
        content:
          "Мы храним вашу личную информацию до тех пор, пока ваша учетная запись активна или пока это необходимо для предоставления услуг. Вы можете в любое время запросить удаление своей учетной записи, и мы удалим ваши данные в разумные сроки, если мы не обязаны хранить их по юридическим обязательствам.",
      },
      {
        title: "8. Конфиденциальность детей",
        content:
          "Наши услуги не предназначены для лиц младше 18 лет. Мы сознательно не собираем личную информацию от детей. Если мы узнаем, что собрали информацию от ребенка, мы немедленно примем меры для ее удаления.",
      },
      {
        title: "9. Международная передача данных",
        content:
          "Ваша информация может быть передана и обработана в странах, отличных от страны вашего проживания. В этих странах могут действовать другие законы о защите данных. Мы принимаем меры для обеспечения надлежащей защиты вашей информации.",
      },
      {
        title: "10. Изменения в этой политике",
        content:
          "Мы можем время от времени обновлять эту политику конфиденциальности. Мы уведомим вас о любых существенных изменениях, опубликовав новую политику на нашей платформе и обновив дату вверху.",
      },
      {
        title: "11. Свяжитесь с нами",
        content:
          "Если у вас есть вопросы об этой политике конфиденциальности или вы хотите воспользоваться своими правами, свяжитесь с нами по адресу: info@nesveskvienas.lt",
      },
    ],
  },
  ua: {
    title: "Політика конфіденційності",
    lastUpdated: "Останнє оновлення: грудень 2024 р.",
    intro:
      "Ця політика конфіденційності описує, як Не святкуй наодинці збирає, використовує та захищає вашу особисту інформацію. Використовуючи наші послуги, ви погоджуєтеся з цією політикою.",
    sections: [
      {
        title: "1. Яку інформацію ми збираємо",
        content: [
          "Інформація про обліковий запис: При реєстрації ми збираємо ваше ім'я, адресу електронної пошти, місто та фото профілю. Ви також можете надати додаткову інформацію, таку як вік, мови та біографію.",
          "Інформація профілю: Інформація, яку ви надаєте у своєму публічному профілі, включаючи опис, фотографії, доступні дати та вподобання.",
          "Комунікації: Повідомлення, які ви надсилаєте та отримуєте через нашу платформу.",
          "Дані про використання: Інформація про те, як ви використовуєте наші послуги, включаючи IP-адресу, тип браузера, відвідані сторінки та час, проведений на платформі.",
          "Перевірка особи: Якщо ви використовуєте функцію перевірки особи, ми обробляємо фотографії локально на вашому пристрої. Ми не зберігаємо ваші фото посвідчення особи або селфі на серверах – зберігається лише результат перевірки.",
        ],
      },
      {
        title: "2. Як ми використовуємо вашу інформацію",
        content: [
          "Надання послуг: Надаємо та підтримуємо нашу платформу, дозволяємо вам створити профіль та взаємодіяти з іншими учасниками.",
          "Комунікація: Надсилаємо вам важливі повідомлення про сервіс, включаючи підтвердження облікового запису, попередження про безпеку та оновлення.",
          "Покращення: Аналізуємо моделі використання для покращення наших послуг та досвіду користувачів.",
          "Безпека: Використовуємо інформацію для виявлення та запобігання шахрайству та захисту нашої спільноти.",
        ],
      },
      {
        title: "3. Обмін інформацією",
        content: [
          "Публічна інформація профілю: Інформація вашого профілю (ім'я, місто, біографія, фотографії, доступні дати) видима іншим учасникам платформи.",
          "Особиста інформація: Певна інформація (прізвище, номер телефону, адреса) розкривається лише учасникам, з якими ви з'єднані (прийняте запрошення).",
          "Без продажу: Ми не продаємо вашу особисту інформацію третім особам.",
          "Юридичні вимоги: Ми можемо розкрити інформацію, якщо це вимагається законом або у відповідь на законні правові процеси.",
        ],
      },
      {
        title: "4. Безпека даних",
        content: [
          "Ми вживаємо розумних технічних та організаційних заходів для захисту вашої особистої інформації від несанкціонованого доступу, зміни, розкриття або знищення.",
          "Ми використовуємо шифрування галузевого стандарту для передачі та зберігання даних.",
          "Ми регулярно переглядаємо та оновлюємо наші практики безпеки.",
        ],
      },
      {
        title: "5. Ваші права",
        content: [
          "Доступ: Ви маєте право отримати доступ до своїх особистих даних та отримати їх копію.",
          "Виправлення: Ви можете запросити виправлення неточних або неповних даних.",
          "Видалення: Ви можете запросити видалення свого облікового запису та пов'язаних даних.",
          "Відмова: Ви можете відмовитися від маркетингових повідомлень у будь-який час.",
          "Переносимість даних: Ви можете запросити свої дані у структурованому, машиночитабельному форматі.",
        ],
      },
      {
        title: "6. Файли cookie та технології відстеження",
        content: [
          "Ми використовуємо файли cookie та подібні технології для: підтримки вашої сесії та налаштувань, розуміння того, як ви використовуєте наші послуги, покращення вашого досвіду.",
          "Ви можете керувати налаштуваннями файлів cookie у своєму браузері. Однак вимкнення певних файлів cookie може вплинути на функціональність наших послуг.",
        ],
      },
      {
        title: "7. Зберігання даних",
        content:
          "Ми зберігаємо вашу особисту інформацію доти, поки ваш обліковий запис активний або поки це необхідно для надання послуг. Ви можете в будь-який час запросити видалення свого облікового запису, і ми видалимо ваші дані в розумні терміни, якщо ми не зобов'язані зберігати їх за юридичними зобов'язаннями.",
      },
      {
        title: "8. Конфіденційність дітей",
        content:
          "Наші послуги не призначені для осіб молодше 18 років. Ми свідомо не збираємо особисту інформацію від дітей. Якщо ми дізнаємося, що зібрали інформацію від дитини, ми негайно вживемо заходів для її видалення.",
      },
      {
        title: "9. Міжнародна передача даних",
        content:
          "Ваша інформація може бути передана та оброблена в країнах, відмінних від країни вашого проживання. У цих країнах можуть діяти інші закони про захист даних. Ми вживаємо заходів для забезпечення належного захисту вашої інформації.",
      },
      {
        title: "10. Зміни до цієї політики",
        content:
          "Ми можемо час від часу оновлювати цю політику конфіденційності. Ми повідомимо вас про будь-які істотні зміни, опублікувавши нову політику на нашій платформі та оновивши дату вгорі.",
      },
      {
        title: "11. Зв'яжіться з нами",
        content:
          "Якщо у вас є запитання щодо цієї політики конфіденційності або ви хочете скористатися своїми правами, зв'яжіться з нами за адресою: info@nesveskvienas.lt",
      },
    ],
  },
};

export default function PrivacyPage() {
  const { t, locale } = useLocale();
  const c = privacyContent[locale] || privacyContent.lt;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          className="mb-8 inline-flex items-center text-green-700 transition-colors hover:text-green-800 active:scale-95"
          href="/browse"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t.home}
        </Link>

        <div className="rounded-lg bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <Lock className="h-8 w-8 text-green-600" />
            <div>
              <h1 className="font-bold text-3xl text-gray-900">{c.title}</h1>
              <p className="text-gray-500 text-sm">{c.lastUpdated}</p>
            </div>
          </div>

          <p className="mb-8 text-gray-600 text-lg">{c.intro}</p>

          <div className="space-y-8">
            {c.sections.map((section) => (
              <div key={section.title}>
                <h2 className="mb-3 font-semibold text-gray-900 text-xl">
                  {section.title}
                </h2>
                {Array.isArray(section.content) ? (
                  <ul className="list-inside list-disc space-y-2">
                    {section.content.map((item, index) => (
                      <li
                        className="text-gray-600 leading-relaxed"
                        key={`${section.title}-${index}`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
