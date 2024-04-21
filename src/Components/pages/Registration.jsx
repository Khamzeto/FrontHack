import { useState } from 'react';
import AddModal from '../AddModal/AddModal';
import { Link, useNavigate } from 'react-router-dom';
import NavbarAuth from '../NavbarAuth';

function Registration({ setAddModal }) {
  const baseUrl = process.env.BASE_URL;
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });

  const [status, setStatus] = useState('Абитуриент');

  const handleButtonClick = text => {
    setStatus(text);
    console.log(status);
  };
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // Отправляем первый запрос на http://localhost:4007/auth/registration
      const response1 = await fetch(`http://localhost:4007/auth/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          status: status,
        }),
      });

      // Проверяем успешность первого запроса
      if (!response1.ok) {
        const errorData = await response1.json();
        throw new Error(errorData.message);
      }

      // Получаем данные из первого запроса
      const data1 = await response1.json();
      const token = data1.token;
      const userId = data1.userId;

      // Отправляем второй запрос на http://localhost:4001/api/auth/register
      const response2 = await fetch(`http://localhost:4001/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.name,
        }),
      });

      // Проверяем успешность второго запроса
      if (!response2.ok) {
        const errorData = await response2.json();
        throw new Error(errorData.message);
      }

      // В случае успешного выполнения обоих запросов, перенаправляем пользователя
      navigate('/auth');
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error.message);
    }
  };

  return (
    <>
      <NavbarAuth />
      <div className="h-[100%] w-[100%]  flex justify-center items-center  ">
        <div className="relative w-full ">
          <div className="max-w-[560px] cont-reg  h-[750px] my-8 p-[30px] mx-8 rounded-[15px] border border-teal-700 flex-col gap-5 inline-flex flex-shrink">
            <div class="flex-col justify-start items-start gap-5 flex">
              <div class="max-w-[100%] cont-reg1  justify-start items-start gap-5 inline-flex">
                <div class="grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
                  <div class="self-stretch text-black text-[25px] font-bold font-['Manrope'] leading-7">
                    Регистрация{' '}
                  </div>
                  <div class="w-[501px] cont-reg2">
                    <span className="text-black text-[15px] font-normal font-['Manrope'] leading-[17.25px]">
                      Уже есть аккаунт?{' '}
                    </span>

                    <Link
                      to="/auth"
                      className="text-teal-700 text-[15px] font-semibold font-['Manrope'] leading-[17.25px]"
                    >
                      Войти
                    </Link>
                  </div>
                  <div class="self-stretch"></div>
                </div>
              </div>
              <div class="w-[100%] p-[5px] bg-white rounded-[10px] border border-teal-700 justify-start items-start gap-[5px] inline-flex">
                <button
                  onClick={() => handleButtonClick('Абитуриент')}
                  className={`grow shrink basis-0 h-[37px] px-5 py-2.5 rounded-[5px] justify-center items-center gap-2.5 flex ${
                    status === 'Абитуриент' ? 'bg-teal-700 text-white' : ''
                  }`}
                >
                  <div
                    className={`text-center text-neutral-900 text-[15px] font-medium font-['Manrope'] leading-[17.25px] ${
                      status === 'Абитуриент' ? 'bg-teal-700 text-white' : ''
                    }`}
                  >
                    Абитуриент
                  </div>
                </button>
                <button
                  onClick={() => handleButtonClick('Студент')}
                  className={`grow shrink basis-0 h-[37px] px-5 py-2.5 rounded-[5px] justify-center items-center gap-2.5 flex ${
                    status === 'Студент' ? 'bg-teal-700 text-white' : ''
                  }`}
                >
                  <div
                    className={`text-center text-neutral-900 text-[15px]   font-medium font-['Manrope'] leading-[17.25px] ${
                      status === 'Студент' ? ' text-white' : ''
                    } `}
                  >
                    Студент
                  </div>
                </button>
              </div>
            </div>
            <div class="flex-col justify-start items-start gap-5 flex">
              <div class="flex-col justify-start items-start gap-5 flex">
                <div class="text-black text-[25px] font-bold font-['Manrope'] leading-7">
                  ФИО
                </div>

                <input
                  placeholder="Введите ФИО"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  className="w-[501px] inputmob px-5 py-[15px] bg-gray-50 rounded-[10px] border border-zinc-400 justify-start items-center gap-2.5 inline-flex"
                />
              </div>
              <div class="flex-col justify-start items-start gap-5 flex">
                <div class="text-black text-[25px] font-bold font-['Manrope'] leading-7">
                  Email
                </div>
                <input
                  placeholder="Введите email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  class="w-[501px] inputmob px-5 py-[15px] bg-gray-50 rounded-[10px] border border-zinc-400 justify-start items-center gap-2.5 inline-flex"
                ></input>
              </div>
              <div class="flex-col justify-start items-start gap-5 flex">
                <div class="text-black text-[25px] font-bold font-['Manrope'] leading-7">
                  Пароль
                </div>
                <input
                  placeholder="Введите пароль"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={formData.password}
                  class="w-[501px] inputmob px-5 py-[15px] bg-gray-50 rounded-[10px] border border-zinc-400 justify-start items-center gap-2.5 inline-flex"
                ></input>
              </div>
            </div>
            <button class="text-teal-700 text-[15px] font-semibold font-['Manrope'] leading-[17.25px]">
              Забыли пароль?
            </button>
            <button
              onClick={handleSubmit}
              class="w-[501px] px-5 butmob py-[15px] bg-teal-700 rounded-[10px] justify-center items-center gap-2.5 inline-flex"
            >
              <div class="text-center text-white text-[15px] font-normal font-['Manrope'] leading-[17.25px]">
                Создать аккаунт
              </div>
            </button>
            <div class="self-stretch accept justify-start items-center gap-5 my-2 inline-flex">
              Принимая данное соглашение вы соглашаетесь с Политикой конфиденциальности и
              Условиями пользования платформы
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
