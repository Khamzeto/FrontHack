import { Link } from 'react-router-dom';

function NavbarAuth() {
  return (
    <div className="App">
      <header className="h-[80px]  w-[100%] flex  items-center">
        <div className="relative w-full cont-nav max-w-[1500px] px-4">
          <div class="w-[1240px] h-[70px] justify-start items-center gap-[37px] inline-flex">
            <Link to="/">
              <span class="text-teal-700 text-3xl font-bold font-['Actay Wide'] leading-[34.50px]">
                GO
              </span>
              <span class="text-neutral-900 text-3xl font-bold font-['Actay Wide'] leading-[34.50px]">
                uni
              </span>
            </Link>
            <div class="h-[70px] pl-10 pr-2.5 py-2.5 rounded-[50px] border border-teal-700 justify-start items-center gap-[115px] flex">
              <div class="grow shrink basis-0 h-5 justify-start items-start gap-[60px] flex">
                <Link
                  to="/"
                  class="text-center text-neutral-900 text-xl font-medium font-['Manrope'] leading-tight"
                >
                  Главная
                </Link>
                <div class="text-center text-neutral-900 text-xl font-medium font-['Manrope'] leading-tight">
                  События
                </div>
                <div class="text-center text-neutral-900 text-xl font-medium font-['Manrope'] leading-tight">
                  Комнаты
                </div>
                <div class="text-center text-neutral-900 text-xl font-medium font-['Manrope'] leading-tight">
                  Университеты
                </div>
                <div class="text-center text-neutral-900 text-xl font-medium font-['Manrope'] leading-tight">
                  Shorts
                </div>
              </div>
              <div class="justify-start items-start gap-[15px] flex">
                <Link
                  to="/auth"
                  class="h-12 px-[30px] py-4 bg-teal-700 rounded-[33px] justify-start items-start gap-2.5 flex"
                >
                  <div class="grow shrink basis-0 text-center text-white text-base font-normal font-['Manrope'] leading-none">
                    Вход
                  </div>
                </Link>
                <Link
                  to="/reg"
                  class="h-12 px-[30px] py-4 rounded-[33px] border border-teal-700 justify-start items-start gap-2.5 flex"
                >
                  <div class="grow shrink basis-0 text-center text-teal-700 text-base font-normal font-['Manrope'] leading-none">
                    Регистрация
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-around items-center">
            <Link
              to="/"
              className="text-teal-800 note tit-nav text-2xl ml-8 font-bold font-['Manrope']  "
              style={{ display: 'none' }}
            >
              Название
            </Link>
            <div
              class="w-[250px] h-5  items-start gap-2 relative left-[20%] flex nav-text"
              style={{ display: 'none' }}
            >
              <div class="w-[121px] text-center text-neutral-900 text-xl font-medium font-['Manrope'] leading-tight">
                Главная
              </div>
              <div
                class="w-[121px] note text-center text-neutral-900 text-xl font-medium font-['Manrope'] leading-tight"
                style={{ display: 'none' }}
              >
                Лента
              </div>
            </div>

            <div className="flex ml-[55%] mr-[0%] w-[40%] nav-right gap-2">
              <Link
                to="/auth"
                className="px-5 mx-2 py-2 note auth-nav rounded-lg border border-teal-700"
                style={{ display: 'none' }}
              >
                <div className="text-teal-700 text-base font-normal font-['Manrope']">
                  Вход
                </div>
              </Link>
              <Link
                to="/reg"
                className="px-5 reg-nav note  bg-teal-700 rounded-lg"
                style={{ display: 'none' }}
              >
                <div className="text-white text-base font-normal font-['Manrope']">
                  Регистрация
                </div>
              </Link>
              <div
                class="w-[60px] burger  h-[50px] m p-[5px] bg-teal-700 rounded-[6px] flex-col justify-center items-center gap-1 inline-flex"
                style={{ display: 'none' }}
              >
                <div class="w-[20px] h-[0px] border border-white"></div>
                <div class="w-[20px] h-[0px] border border-white"></div>
                <div class="w-[20px] h-[0px] border border-white"></div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default NavbarAuth;
