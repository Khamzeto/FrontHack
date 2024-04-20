import { Link } from 'react-router-dom';

function NavbarAuth() {
  return (
    <div className="App">
      <header className="h-[80px] w-[100%] flex  items-center">
        <div className="relative i w-full cont-nav max-w-[1500px] px-4">
          <div className="w-full flex justify-around items-center">
            <Link
              to="/"
              className="text-teal-800 tit-nav text-2xl ml-8 font-bold font-['Manrope'] "
            >
              Название
            </Link>
            <div class="w-[250px] h-5   items-start gap-2 relative left-[20%] flex nav-text">
              <div class="w-[121px] text-center text-neutral-900 text-xl font-medium font-['Manrope'] leading-tight">
                Главная
              </div>
              <div class="w-[121px] text-center text-neutral-900 text-xl font-medium font-['Manrope'] leading-tight">
                Лента
              </div>
            </div>

            <div className="flex ml-[55%] mr-[0%] w-[40%] nav-right gap-2">
              <Link
                to="/auth"
                className="px-5 mx-2 py-2 auth-nav rounded-lg border border-teal-700"
              >
                <div className="text-teal-700 text-base font-normal font-['Manrope']">
                  Вход
                </div>
              </Link>
              <Link to="/reg" className="px-5 reg-nav py-2 bg-teal-700 rounded-lg">
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
