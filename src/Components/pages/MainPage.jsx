import { useEffect, useState } from 'react';
import AddModal from '../AddModal/AddModal';
import { Link, useNavigate } from 'react-router-dom';
import NavbarAuth from '../NavbarAuth';
import Navbar from '../Navbar';

function MainPage({ setAddModal }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Проверяем наличие токена в локальном хранилище
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Устанавливаем значение isLoggedIn в зависимости от наличия токена
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      const token = data.token;
      const userId = data.userId;
      navigate('/profile');

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error.message);
    }
  };

  return (
    <>
      {isLoggedIn ? <Navbar /> : <NavbarAuth />}
      <div className="h-[100%] my-[6%] w-[100%]  flex justify-center items-center  ">
        <div className="relative w-full ">
          <div class="max-w-[1240px] h-[544px] justify-start cont-gl items-end gap-[68px] inline-flex">
            <div class="flex-col justify-start items-start gap-[153px] inline-flex">
              <div class="flex-col justify-start cont-main items-start gap-[30px] flex">
                <div class="flex-col justify-start items-start gap-[9px] flex">
                  <div class="mx-2 max-w-[702px] title-main  text-left">
                    <span className="text-neutral-900 title text-[70px] font-bold font-['Actay Wide'] leading-[70px]">
                      Сотни{' '}
                    </span>
                    <span className="text-teal-700 title text-[70px] font-bold font-['Actay Wide'] leading-[70px]">
                      ВУЗов
                    </span>
                    <span className="text-neutral-900 title text-[70px] font-bold font-['Actay Wide'] leading-[70px]">
                      {' '}
                      страны ждут именно тебя!
                    </span>
                  </div>
                  <div class="max-w-[540px] desc text-zinc-600 text-xl font-normal font-['Manrope'] leading-snug">
                    Данный сервис может запустить адронный коллайддер, колонизировать Марс
                    и высушить планету
                  </div>
                </div>
              </div>
              <div class="max-w-[648px] recom  justify-between inline-flex">
                <div class="flex-col justify-start items-start mx-2 inline-flex">
                  <div class="self-stretch text-univer1 text-neutral-900 text-[50px] font-extrabold font-['Manrope'] leading-[57.50px]">
                    500 +
                  </div>
                  <div class="self-stretch text-univer text-neutral-900 text-xl font-normal font-['Manrope'] leading-[23px]">
                    университетов
                  </div>
                </div>
                <div class="flex-col justify-start items-start mx-8 inline-flex">
                  <div class="text-neutral-900 text-univer1 text-[50px] font-extrabold font-['Manrope'] leading-[57.50px]">
                    45k +
                  </div>
                  <div class="text-neutral-900 text-xl text-univer font-normal font-['Manrope'] leading-[23px]">
                    студентов
                  </div>
                </div>
                <div class="flex-col justify-start items-start inline-flex">
                  <div class="text-neutral-900 text-[50px] text-univer1 font-extrabold font-['Manrope'] leading-[57.50px]">
                    5k +
                  </div>
                  <div class="text-neutral-900 text-xl font-normal text-univer font-['Manrope'] leading-[23px]">
                    препродавателей
                  </div>
                </div>
              </div>
            </div>
            <div class="max-w-[470px] img-chebig h-[544px] justify-start  items-start gap-2.5 ">
              <img
                src="./chesu.svg"
                class="grow shrink basis-0 self-stretch bg-gradient-to-b  rounded-[20px]"
              />
              <a
                href="https://go-uni-3d-pano.netlify.app/"
                class="w-[430px] h-[83px] p-[30px] relative top-[-20%] bg-white rounded-[10px] justify-center items-center gap-2.5 inline-flex"
              >
                <div class="text-center text-black text-xl font-normal font-['Manrope'] leading-[23px]">
                  Перейти в 3D-панораму{' '}
                </div>
              </a>
            </div>
          </div>
          <div
            class="max-w-[470px] h-[544px] mt-[-40%] justify-start img-che items-start gap-2.5 "
            style={{ display: 'none' }}
          >
            <img
              src="./chesu.svg"
              class="grow shrink basis-0 self-stretch relative px-2 top-[12%] bg-gradient-to-b   rounded-[20px]"
            />
            <button class="max-w-[430px] h-[83px] p-[30px] relative my-[-100%] bg-white rounded-[10px] justify-center items-center gap-2.5 inline-flex">
              <div class="text-center text-black text-xl font-normal font-['Manrope'] leading-[23px]">
                Перейти в 3D-панораму{' '}
              </div>
            </button>
          </div>
          <div class="w-[100%] mt-[10%]  h-[390px] bg-teal-700">
            <div class="text-left title text-white relative top-[12%] left-8 text-[40px] font-bold font-['Actay Wide'] leading-10">
              Поступи в вузы России
            </div>
            <div class="w-[100%]  flex justify-around justify-center items-center h-[390px] bg-teal-700">
              <div class="w-[165px] h-[165px] bg-emerald-800 rounded-[20px]">
                <div class="w-[165px] h-[165px] bg-emerald-800  flex items-center justify-center rounded-[20px]">
                  <img src="chesuIcon.svg" />
                </div>
                <div class="mt-5 text-center text-white text-xl font-medium font-['Manrope'] leading-[23px]">
                  ЧГУ
                </div>
              </div>
              <div class="w-[165px] h-[165px] bg-emerald-800 rounded-[20px]">
                <div class="w-[165px] h-[165px] bg-emerald-800  flex items-center justify-center rounded-[20px]">
                  <img src="Mgu.svg" />
                </div>
                <div class="mt-5 text-center text-white text-xl font-medium font-['Manrope'] leading-[23px]">
                  МГУ
                </div>
              </div>
              <div class="w-[165px] h-[165px] bg-emerald-800 rounded-[20px]">
                <div class="w-[165px] h-[165px] bg-emerald-800  flex items-center justify-center rounded-[20px]">
                  <img src="gstou.svg" />
                </div>
                <div class="mt-5 text-center text-white text-xl font-medium font-['Manrope'] leading-[23px]">
                  ГГНТУ
                </div>
              </div>
              <div class="w-[165px] h-[165px] bg-emerald-800 rounded-[20px]">
                <div class="w-[165px] h-[165px] bg-emerald-800  flex items-center justify-center rounded-[20px]">
                  <img src="rusfed.svg" />
                </div>
                <div class="mt-5 text-center text-white text-xl font-medium font-['Manrope'] leading-[23px]">
                  <div class="text-center text-white text-xl font-medium font-['Manrope'] leading-[23px]">
                    СПБГУ
                  </div>
                </div>
              </div>
              <div class="w-[165px] h-[165px] bg-emerald-800 rounded-[20px]">
                <div class="w-[165px] h-[165px] bg-emerald-800  flex items-center justify-center rounded-[20px]">
                  <img src="tku.svg" />
                </div>
                <div class="mt-5 text-center text-white text-xl font-medium font-['Manrope'] leading-[23px]">
                  ТГУ
                </div>
              </div>
              <div class="w-[165px] h-[165px] bg-emerald-800 rounded-[20px]">
                <div class="w-[165px] h-[165px] bg-emerald-800  flex items-center justify-center rounded-[20px]">
                  <div class="w-[94px] text-center text-white text-[50px] font-bold font-['Actay Wide'] leading-[57.50px]">
                    1k+
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-[100%] mx-[3%] my-[4%]">
              <div class="w-[100%] items-left flex text-neutral-900 text-[40px] font-bold font-['Actay Wide'] leading-10">
                <span className="title">Направленния высшего образования в России</span>
              </div>
              <div class="w-[100%] inline-flex text-left justify-between my-[4%]">
                <div className="w-[30%]  h-[222px] rounded-[20px] border border-teal-700 flex-col justify-start items-start ">
                  <div className="mx-[10%] mt-6">
                    <div class="self-stretch text-black text-[22px] font-bold font-['Manrope'] leading-snug">
                      Образование и педагогика
                    </div>
                    <div class="self-stretch mt-[10%] max-h-[90px] flex-col justify-start items-start gap-[15px] flex">
                      <div class="self-stretch text-zinc-600 text-xl font-normal font-['Manrope'] leading-tight">
                        548 программ
                      </div>
                      <div class="self-stretch text-zinc-600 text-xl font-normal font-['Manrope'] leading-tight">
                        52 515 бюджетных мест
                      </div>
                      <div class="self-stretch text-zinc-600 text-xl font-normal font-['Manrope'] leading-tight">
                        59 644 платных места
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[30%]  h-[222px] rounded-[20px] border border-teal-700 flex-col justify-start items-start ">
                  <div className="mx-[10%] mt-6">
                    <div class="self-stretch text-black text-[22px] font-bold font-['Manrope'] leading-snug">
                      Юриспуденция
                    </div>
                    <div class="self-stretch mt-[10%] max-h-[90px] flex-col justify-start items-start gap-[15px] flex">
                      <div class="self-stretch text-zinc-600 text-xl font-normal font-['Manrope'] leading-tight">
                        289 программ
                      </div>
                      <div class="self-stretch text-zinc-600 text-xl font-normal font-['Manrope'] leading-tight">
                        38 000 бюджетных мест
                      </div>
                      <div class="self-stretch text-zinc-600 text-xl font-normal font-['Manrope'] leading-tight">
                        52 624 платных места
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[30%]  h-[222px] rounded-[20px] border border-teal-700 flex-col justify-start items-start ">
                  <div className="mx-[10%] mt-6">
                    <div class="w-[299px] text-black text-[22px] font-bold font-['Manrope'] leading-snug">
                      Экономика и финансы
                    </div>
                    <div class="self-stretch mt-[10%] max-h-[90px] flex-col justify-start items-start gap-[15px] flex">
                      <div class="self-stretch text-zinc-600 text-xl font-normal font-['Manrope'] leading-tight">
                        189 программ
                      </div>
                      <div class="self-stretch text-zinc-600 text-xl font-normal font-['Manrope'] leading-tight">
                        31 240 бюджетных мест
                      </div>
                      <div class="self-stretch text-zinc-600 text-xl font-normal font-['Manrope'] leading-tight">
                        52 200 платных места
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-[100%] inline-flex text-left justify-between my-[0%] mb-[10%]">
                <div className="w-[30%]  h-[222px] rounded-[20px] border border-teal-700 flex-col justify-start items-start ">
                  <div className="mx-[10%] mt-6">
                    <div class="self-stretch text-black text-[22px] font-bold font-['Manrope'] leading-snug">
                      Управление и менеджмент
                    </div>
                    <div class="self-stretch mt-[10%] max-h-[90px] flex-col justify-start items-start gap-[15px] flex">
                      <div class="self-stretch text-zinc-600 text-xl font-normal font-['Manrope'] leading-tight">
                        248 программ
                      </div>
                      <div class="self-stretch text-zinc-600 text-xl font-normal font-['Manrope'] leading-tight">
                        32 524 бюджетных мест
                      </div>
                      <div class="self-stretch text-zinc-600 text-xl font-normal font-['Manrope'] leading-tight">
                        51 634 платных места
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[30%]  h-[222px] rounded-[20px] border border-teal-700 flex-col justify-start items-start ">
                  <div className="mx-[10%] mt-6">
                    <div class="self-stretch text-black text-[22px] font-bold font-['Manrope'] leading-snug">
                      Математика и информатика
                    </div>
                    <div class="self-stretch mt-[10%] max-h-[90px] flex-col justify-start items-start gap-[15px] flex">
                      <div class="self-stretch text-zinc-600 text-xl font-normal font-['Manrope'] leading-tight">
                        223 программ
                      </div>
                      <div class="self-stretch text-zinc-600 text-xl font-normal font-['Manrope'] leading-tight">
                        32 642 бюджетных мест
                      </div>
                      <div class="self-stretch text-zinc-600 text-xl font-normal font-['Manrope'] leading-tight">
                        38 572 платных места
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[30%]  h-[222px] bg-teal-700 rounded-[20px] border border-teal-700 flex-col justify-start items-start ">
                  <div className="mx-[10%] mt-6">
                    <div class="w-[299px] text-white text-3xl font-bold font-['Manrope']">
                      Все направления бакалавриата
                    </div>
                    <button class="w-[100%] h-[30%] my-[14%] justify-start items-center gap-[18px] inline-flex">
                      <div class="text-white text-xl font-normal font-['Manrope']">
                        Перейти
                      </div>
                      <img src="rightIcon.svg" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
