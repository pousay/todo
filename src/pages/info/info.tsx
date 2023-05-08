import { useContext } from "react";
import { SettingContext } from "../../globalComponents/Context";
import Navbar from "../../globalComponents/Navbar";

function Info() {
  const { settings } = useContext(SettingContext);
  return (
    <>
      <Navbar what={3} />
      <main className="pe-5 ps-4">
        <h5 className="mt-5 pt-5">
          لیست وظایف یک پروژه متن باز است. این برنامه بر سهولت استفاده از یک
          برنامه انجام وظایف متمرکز شده است. کارهای خود را بنویسید، برخی تنظیمات
          را تغییر دهید، با دوستان خود به اشتراک بگذارید، لذت ببرید!
        </h5>

        <h4 className="mt-5 pt-4">ارتباط : </h4>
        <div className="d-flex gap-3 mt-4">
          <a href="https://t.me/Better_ring_fring">
            <img
              alt="تلگرام"
              style={{ height: "40px" }}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/512px-Telegram_logo.svg.png?20220101141644"
            />
          </a>
          <a href="https://discordapp.com/users/837373420764790856">
            <img
              alt="دیسکورد"
              style={{ height: "40px" }}
              src="https://skillicons.dev/icons?i=discord"
            />
          </a>
          <a href="https://www.instagram.com/pourya_the_g/">
            <img
              alt="اینستاگرام"
              style={{ height: "40px" }}
              src="https://skillicons.dev/icons?i=instagram"
            />
          </a>
          <a href="https://github.com/pousay">
            <svg
              height="40"
              fill={settings.theme === "dark" ? "white" : "black"}
              viewBox="0 0 16 16"
              width="40"
            >
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
          </a>
        </div>
      </main>
    </>
  );
}

export default Info;
