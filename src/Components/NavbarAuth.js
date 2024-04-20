import { Link } from 'react-router-dom';

function NavbarAuth() {
  return (
    <div className="App">
      <header className="h-[80px] w-[100%] flex justify-center items-center">
        <div className="relative w-full max-w-[1500px] px-4">
          <div className="w-full flex justify-between items-center">
            <Link to="/" className="text-teal-800 text-2xl font-bold font-['Manrope']">
              Название
            </Link>

            <div className="flex w-[40%] gap-2">
              <input
                placeholder="Поиск по сайту"
                class="w-[100%] px-6 text-left mx-1 bg-neutral-100 rounded-[10px] border border-zinc-400 justify-start items-center gap-2.5 inline-flex"
              ></input>

              <Link
                to="/auth"
                className="px-5 mx-2 py-2 rounded-lg border border-teal-700"
              >
                <div className="text-teal-700 text-base font-normal font-['Manrope']">
                  Вход
                </div>
              </Link>
              <Link to="/reg" className="px-5 py-2 bg-teal-700 rounded-lg">
                <div className="text-white text-base font-normal font-['Manrope']">
                  Регистрация
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default NavbarAuth;
