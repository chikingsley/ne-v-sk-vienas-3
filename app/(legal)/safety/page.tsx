"use client";

import {
  AlertTriangle,
  ArrowLeft,
  Eye,
  Flag,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { useLocale } from "@/contexts/locale-context";

type SafetyTip = {
  icon: string;
  title: string;
  content: string;
};

type SafetyContentItem = {
  title: string;
  subtitle: string;
  intro: string;
  tips: SafetyTip[];
  reportTitle: string;
  reportContent: string;
  emergencyTitle: string;
  emergencyContent: string;
};

type SafetyContent = Record<string, SafetyContentItem>;

const safetyContent: SafetyContent = {
  lt: {
    title: "Saugos gairės",
    subtitle: "Jūsų saugumas yra svarbus. Priimkite tai rimtai. Mes taip pat.",
    intro:
      "Susitikdami su naujais žmonėmis, visada būkite atsargūs. Šios gairės padės jums saugiai naudotis platforma. Atminkite, kad Nešvęsk Vienas yra platforma, skirta sujungti žmones – tačiau jūsų saugumas visada priklauso ir nuo jūsų pačių sprendimų.",
    tips: [
      {
        icon: "eye",
        title: "Atidžiai peržiūrėkite profilius",
        content:
          "Nesvarbu, ar keliaujate, ar dalyvaujate renginyje, skirkite laiko atidžiai peržiūrėti narių profilius. Perskaitykite, ką nariai sako apie save. Duokite sau laiko kruopščiai perskaityti visą turimą informaciją ir nekompromituokite. Jei jaučiatės nepatogiai, ieškokite toliau.",
      },
      {
        icon: "alert",
        title: "Pasitikėkite savo nuojauta",
        content:
          "Jei asmuo, situacija ar profilis atrodo nesaugus dėl bet kokios priežasties, eikite toliau. Nesijaudinkite dėl to, kad atrodote nemandagūs. Būkite aiškūs dėl savo ribų ir nedrovėkite jų pareikšti. Jei kas nors jus verčia jaustis nepatogiai, palikite situaciją arba nedalyvaukite. Bendravimas aiškiai su kitais ir rūpinkitės savimi.",
      },
      {
        icon: "mappin",
        title: "Turėkite atsarginį planą",
        content:
          "Žinokite savo galimybes. Jei kažkas neveikia su jūsų šeimininku arba jie klaidingai apibūdino save ar savo namus, įsitikinkite, kad turite alternatyvią vietą apsistoti. Nustatykite artimiausią viešbutį ar hostelį arba turėkite atsarginį šeimininką prieš vykdami. Jei įmanoma, išsiaiškinkite šeimininko apylinkes prieš atvykdami.",
      },
      {
        icon: "message",
        title: "Bendraukite per platformą",
        content:
          "Niekada nesidalinkite savo telefono numeriu ar el. pašto adresu naujam asmeniui, kol nesusitiksite ir nepasijusite patogiai su jais. Naudokite tik svetainę ir mobilias programėles bendravimui. Kelionių patvirtinimas ir visų komunikacijų laikymas Nešvęsk Vienas platformoje padeda mūsų saugumo komandai identifikuoti problemas ir greitai reaguoti.",
      },
      {
        icon: "users",
        title: "Susitikite viešoje vietoje",
        content:
          "Pirmą kartą susitikdami, pasirinkite viešą vietą. Praneškite draugui ar šeimos nariui, kur būsite. Jei jaučiatės nepatogiai likti vieni su nariu, apsvarstykite galimybę apsistoti pas šeimas ar poras.",
      },
      {
        icon: "shield",
        title: "Žinokite savo ribas",
        content:
          "Vakarėliai gali būti smagūs, bet tai perduoda jūsų saugumą ir gerovę kitiems. Būkite sąmoningi dėl savo aplinkos ir saugokite savo daiktus. Nustatykite aiškias ribas ir jų laikykitės.",
      },
      {
        icon: "heart",
        title: "Būkite informuoti apie kultūrą",
        content:
          "Atlikite namų darbus ir įsitikinkite, kad esate informuoti apie kultūrinius ir religinius skirtumus, jautrumus ir bendras saugumo rekomendacijas kiekvienai vietai, į kurią keliaujate. Lyčių vaidmenys ir lūkesčiai gali labai skirtis.",
      },
      {
        icon: "flag",
        title: "Palikite atsiliepimus",
        content:
          "Naudokite atsiliepimų sistemą, kad praneštumėte kitiems nariams apie savo patirtį su žmonėmis, kuriuos sutinkate. Būkite sąžiningi ir aiškūs. Atsiliepimų sistema padeda kurti pasitikėjimą bendruomenėje.",
      },
    ],
    reportTitle: "Pranešti apie neigiamą patirtį",
    reportContent:
      "Mūsų pasitikėjimo ir saugumo komanda yra čia, kad padėtų kurti saugiausią ir patikimiausią bendruomenę. Pranešimas apie saugumo problemas Nešvęsk Vienas padeda apsaugoti būsimus narius. Konfidencialiai praneškite apie neigiamas patirtis ar saugumo problemas mums el. paštu: info@nesveskvienas.lt",
    emergencyTitle: "Skubios pagalbos kontaktai Lietuvoje",
    emergencyContent:
      "Bendrasis pagalbos numeris: 112 | Policija: 02 arba 112 | Greitoji pagalba: 03 arba 112",
  },
  en: {
    title: "Safety Guidelines",
    subtitle: "Your safety is important. Take it seriously. We do.",
    intro:
      "When meeting new people, always exercise caution. These guidelines will help you use the platform safely. Remember, Nešvęsk Vienas is a platform designed to connect people – but your safety always depends on your own decisions as well.",
    tips: [
      {
        icon: "eye",
        title: "Review Profiles Carefully",
        content:
          "Whether traveling, attending an event, or joining a gathering, take the time to carefully review member profiles. Read what members say about themselves. Give yourself the time to thoroughly read through all the information available and don't compromise. If you're uncomfortable, keep looking.",
      },
      {
        icon: "alert",
        title: "Trust Your Instincts",
        content:
          "If a person, situation or profile seems unsafe for any reason, move on. Don't worry about seeming rude. Be clear about your boundaries and don't be shy about stating them. If someone makes you uncomfortable, leave the situation or don't attend. Communicate clearly with others and take care of yourself.",
      },
      {
        icon: "mappin",
        title: "Have a Backup Plan",
        content:
          "Know your options. If something doesn't work out with your host, or if they misrepresented themselves or their home, make sure you have an alternate place to stay. Identify the nearest hostel or hotel, or have a backup host in place before you go. If possible, research your host's neighborhood prior to arriving.",
      },
      {
        icon: "message",
        title: "Communicate Through Platform",
        content:
          "Never give out your phone number or email address to a new person until you meet and feel comfortable with them. Use only the website and mobile apps to communicate. Confirming trips and keeping all communication on Nešvęsk Vienas helps our safety team identify issues and react quickly.",
      },
      {
        icon: "users",
        title: "Meet in Public Places",
        content:
          "For first meetings, choose a public place. Let a friend or family member know where you'll be. If you're uncomfortable staying alone with a member, consider staying with families or with couples.",
      },
      {
        icon: "shield",
        title: "Know Your Limits",
        content:
          "Partying like a rockstar might be fun, but it puts your safety and well-being in the hands of others. Be aware of your surroundings and keep your belongings safe. Set clear boundaries and stick to them.",
      },
      {
        icon: "heart",
        title: "Be Informed About the Culture",
        content:
          "Do your homework, and be sure you're aware of cultural and religious differences, sensitivities, and general safety recommendations for each place that you travel. Gender roles and expectations can differ widely.",
      },
      {
        icon: "flag",
        title: "Leave References",
        content:
          "Use the reference system to let other members know about your experiences with the people you meet. Be honest and clear. The reference system helps build trust in the community.",
      },
    ],
    reportTitle: "Report Negative Experiences",
    reportContent:
      "Our Trust and Safety team is here to help build the safest and most trusted community possible. Reporting safety concerns to Nešvęsk Vienas helps keep future members safe. Confidentially report negative experiences or safety concerns to us at: info@nesveskvienas.lt",
    emergencyTitle: "Emergency Contacts in Lithuania",
    emergencyContent:
      "General Emergency: 112 | Police: 02 or 112 | Ambulance: 03 or 112",
  },
  ru: {
    title: "Правила безопасности",
    subtitle: "Ваша безопасность важна. Отнеситесь к этому серьезно. Мы тоже.",
    intro:
      "При встрече с новыми людьми всегда соблюдайте осторожность. Эти рекомендации помогут вам безопасно пользоваться платформой. Помните, что Не празднуй один — это платформа для связи людей, но ваша безопасность всегда зависит и от ваших собственных решений.",
    tips: [
      {
        icon: "eye",
        title: "Внимательно изучайте профили",
        content:
          "Путешествуете ли вы, посещаете мероприятие или присоединяетесь к встрече, уделите время тщательному изучению профилей участников. Прочитайте, что участники говорят о себе. Дайте себе время внимательно прочитать всю доступную информацию и не идите на компромиссы. Если вам некомфортно, продолжайте поиск.",
      },
      {
        icon: "alert",
        title: "Доверяйте своей интуиции",
        content:
          "Если человек, ситуация или профиль кажутся небезопасными по какой-либо причине, идите дальше. Не беспокойтесь о том, что покажетесь грубым. Четко обозначьте свои границы и не стесняйтесь их озвучивать. Если кто-то заставляет вас чувствовать себя некомфортно, покиньте ситуацию или не участвуйте.",
      },
      {
        icon: "mappin",
        title: "Имейте запасной план",
        content:
          "Знайте свои варианты. Если что-то не получается с хозяином или они исказили информацию о себе или своем доме, убедитесь, что у вас есть альтернативное место для проживания. Определите ближайший хостел или отель или имейте запасного хозяина перед поездкой.",
      },
      {
        icon: "message",
        title: "Общайтесь через платформу",
        content:
          "Никогда не давайте свой номер телефона или адрес электронной почты новому человеку, пока не встретитесь и не почувствуете себя комфортно с ним. Используйте только сайт и мобильные приложения для общения.",
      },
      {
        icon: "users",
        title: "Встречайтесь в общественных местах",
        content:
          "Для первых встреч выбирайте общественное место. Сообщите другу или члену семьи, где вы будете. Если вам некомфортно оставаться наедине с участником, рассмотрите возможность проживания у семей или пар.",
      },
      {
        icon: "shield",
        title: "Знайте свои границы",
        content:
          "Развлечения могут быть веселыми, но они передают вашу безопасность и благополучие в руки других. Будьте внимательны к окружающей обстановке и берегите свои вещи. Установите четкие границы и придерживайтесь их.",
      },
      {
        icon: "heart",
        title: "Будьте информированы о культуре",
        content:
          "Сделайте домашнее задание и убедитесь, что вы осведомлены о культурных и религиозных различиях, чувствительности и общих рекомендациях по безопасности для каждого места, куда вы путешествуете.",
      },
      {
        icon: "flag",
        title: "Оставляйте отзывы",
        content:
          "Используйте систему отзывов, чтобы сообщить другим участникам о вашем опыте общения с людьми, которых вы встречаете. Будьте честны и понятны. Система отзывов помогает укреплять доверие в сообществе.",
      },
    ],
    reportTitle: "Сообщить о негативном опыте",
    reportContent:
      "Наша команда доверия и безопасности помогает создать максимально безопасное и надежное сообщество. Сообщение о проблемах безопасности помогает защитить будущих участников. Конфиденциально сообщайте о негативном опыте или проблемах безопасности по адресу: info@nesveskvienas.lt",
    emergencyTitle: "Экстренные контакты в Литве",
    emergencyContent:
      "Общий номер экстренной помощи: 112 | Полиция: 02 или 112 | Скорая помощь: 03 или 112",
  },
  ua: {
    title: "Правила безпеки",
    subtitle: "Ваша безпека важлива. Ставтеся до цього серйозно. Ми теж.",
    intro:
      "При зустрічі з новими людьми завжди дотримуйтесь обережності. Ці рекомендації допоможуть вам безпечно користуватися платформою. Пам'ятайте, що Не святкуй наодинці — це платформа для з'єднання людей, але ваша безпека завжди залежить і від ваших власних рішень.",
    tips: [
      {
        icon: "eye",
        title: "Уважно вивчайте профілі",
        content:
          "Подорожуєте ви, відвідуєте захід чи приєднуєтеся до зустрічі, приділіть час ретельному вивченню профілів учасників. Прочитайте, що учасники говорять про себе. Дайте собі час уважно прочитати всю доступну інформацію і не йдіть на компроміси. Якщо вам некомфортно, продовжуйте пошук.",
      },
      {
        icon: "alert",
        title: "Довіряйте своїй інтуїції",
        content:
          "Якщо людина, ситуація або профіль здаються небезпечними з будь-якої причини, йдіть далі. Не турбуйтеся про те, що здаватиметеся грубим. Чітко позначте свої межі і не соромтеся їх озвучувати. Якщо хтось змушує вас почуватися некомфортно, залиште ситуацію або не беріть участі.",
      },
      {
        icon: "mappin",
        title: "Майте запасний план",
        content:
          "Знайте свої варіанти. Якщо щось не виходить з господарем або вони спотворили інформацію про себе чи свій дім, переконайтеся, що у вас є альтернативне місце для проживання. Визначте найближчий хостел або готель або майте запасного господаря перед поїздкою.",
      },
      {
        icon: "message",
        title: "Спілкуйтеся через платформу",
        content:
          "Ніколи не давайте свій номер телефону або адресу електронної пошти новій людині, поки не зустрінетеся і не відчуєте себе комфортно з нею. Використовуйте тільки сайт і мобільні додатки для спілкування.",
      },
      {
        icon: "users",
        title: "Зустрічайтеся в громадських місцях",
        content:
          "Для перших зустрічей обирайте громадське місце. Повідомте другу або члену сім'ї, де ви будете. Якщо вам некомфортно залишатися наодинці з учасником, розгляньте можливість проживання у сімей або пар.",
      },
      {
        icon: "shield",
        title: "Знайте свої межі",
        content:
          "Розваги можуть бути веселими, але вони передають вашу безпеку та благополуччя в руки інших. Будьте уважні до оточення і бережіть свої речі. Встановіть чіткі межі і дотримуйтесь їх.",
      },
      {
        icon: "heart",
        title: "Будьте інформовані про культуру",
        content:
          "Зробіть домашнє завдання і переконайтеся, що ви обізнані про культурні та релігійні відмінності, чутливість та загальні рекомендації з безпеки для кожного місця, куди ви подорожуєте.",
      },
      {
        icon: "flag",
        title: "Залишайте відгуки",
        content:
          "Використовуйте систему відгуків, щоб повідомити іншим учасникам про ваш досвід спілкування з людьми, яких ви зустрічаєте. Будьте чесні та зрозумілі. Система відгуків допомагає зміцнювати довіру в спільноті.",
      },
    ],
    reportTitle: "Повідомити про негативний досвід",
    reportContent:
      "Наша команда довіри та безпеки допомагає створити максимально безпечну та надійну спільноту. Повідомлення про проблеми безпеки допомагає захистити майбутніх учасників. Конфіденційно повідомляйте про негативний досвід або проблеми безпеки за адресою: info@nesveskvienas.lt",
    emergencyTitle: "Екстрені контакти в Литві",
    emergencyContent:
      "Загальний номер екстреної допомоги: 112 | Поліція: 02 або 112 | Швидка допомога: 03 або 112",
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  eye: Eye,
  alert: AlertTriangle,
  mappin: MapPin,
  message: MessageCircle,
  users: Users,
  shield: ShieldCheck,
  phone: Phone,
  heart: Heart,
  flag: Flag,
};

export default function SafetyPage() {
  const { t, locale } = useLocale();
  const c = safetyContent[locale] || safetyContent.lt;

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
          <div className="mb-8 flex items-center gap-3">
            <Shield className="h-10 w-10 text-green-600" />
            <div>
              <h1 className="font-bold text-3xl text-gray-900">{c.title}</h1>
              <p className="text-gray-600">{c.subtitle}</p>
            </div>
          </div>

          <p className="mb-8 text-gray-600 text-lg">{c.intro}</p>

          <div className="grid gap-6 md:grid-cols-2">
            {c.tips.map((tip) => {
              const IconComponent = iconMap[tip.icon] || ShieldCheck;
              return (
                <div
                  className="rounded-lg border border-gray-100 bg-gray-50 p-6"
                  key={tip.title}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <IconComponent className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{tip.content}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-lg bg-amber-50 p-6">
            <h2 className="mb-2 font-semibold text-amber-800 text-lg">
              {c.reportTitle}
            </h2>
            <p className="text-amber-700">{c.reportContent}</p>
          </div>

          <div className="mt-6 rounded-lg bg-red-50 p-6">
            <h2 className="mb-2 font-semibold text-lg text-red-800">
              {c.emergencyTitle}
            </h2>
            <p className="font-medium text-red-700">{c.emergencyContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
