import { useEffect, useState } from 'react';
import AddModal from '../AddModal/AddModal';
import { Link, useNavigate } from 'react-router-dom';
import NavbarAuth from '../NavbarAuth';
import Navbar from '../Navbar';

function Profile() {
  const [addModal, setAddModal] = useState(false);
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');
  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSelectChange = event => {
    setSearchType(event.target.value);
  };
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
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4007/auth/${userId}/get_data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Проверяем статус ответа
        if (!response.ok) {
          throw new Error('Failed to fetch data from port 4007');
        }

        // Получаем данные в формате JSON
        const jsonData = await response.json();

        // Обновляем состояние компонента
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {addModal && <AddModal setAddModal={setAddModal} />}
      {isLoggedIn ? <Navbar /> : <NavbarAuth />}
      <div className="h-[100%]  w-[100%]    ">
        <div className="flex w-[100%] mt-[3.8%]  items-left justify-around">
          <div class="w-[20%] h-[200px] flex-col  items-start gap-[26px] inline-flex">
            <div class="self-stretch h-[200px] flex-col justify-start items-center gap-5 flex">
              {data?.avatar ? (
                <img class="w-[135px] h-[135px] rounded-[115px]" src={data?.avatar} />
              ) : (
                <img
                  class="w-[135px] h-[135px] rounded-[115px]"
                  src="https://via.placeholder.com/135x135"
                />
              )}

              <div class="flex-col justify-start items-center gap-2.5 flex">
                <div class="text-center text-black text-xl font-bold font-['Manrope'] leading-tight">
                  {data?.name}
                </div>
                <div class="text-center mb-2 text-teal-700 text-[15px] font-semibold font-['Manrope'] leading-[15px]">
                  {data?.status}
                </div>
                <button
                  onClick={() => setAddModal(true)}
                  class="w-44 h-[50px] px-5 py-[15px] bg-teal-700 rounded-[10px] justify-center items-center gap-2.5 inline-flex"
                >
                  <div class="text-white text-[15px] font-normal font-['Manrope']">
                    Изменить профиль
                  </div>
                </button>
                <div class="w-[100%] mt-8 h-[202px] flex-col justify-start items-start gap-5 inline-flex">
                  <div class="text-neutral-900 text-xl font-bold font-['Manrope'] leading-tight">
                    Напоминания
                  </div>
                  <div class="flex-col justify-start items-start gap-[15px] flex">
                    <div class="justify-start items-center gap-2.5 inline-flex">
                      <div class="w-[58px] h-11 p-2.5 bg-blue-100 rounded-[5px] justify-center items-center gap-2.5 flex">
                        <div class="text-blue-500 text-[13px] font-bold font-['Manrope'] leading-[13px]">
                          16:30
                        </div>
                      </div>
                      <div class="flex-col justify-start items-start gap-[5px] inline-flex">
                        <div class="text-neutral-900 text-[15px] font-bold font-['Manrope']">
                          Контест по информатике
                        </div>
                        <div class="text-blue-500 text-[13px] font-semibold font-['Manrope'] leading-[13px]">
                          Вторник
                        </div>
                      </div>
                    </div>
                    <div class="justify-start items-center gap-2.5 inline-flex">
                      <div class="w-[58px] h-11 p-2.5 bg-blue-100 rounded-[5px] justify-center items-center gap-2.5 flex">
                        <div class="text-blue-500 text-[13px] font-bold font-['Manrope'] leading-[13px]">
                          14:15
                        </div>
                      </div>
                      <div class="flex-col justify-start items-start gap-[5px] inline-flex">
                        <div class="text-neutral-900 text-[15px] font-bold font-['Manrope']">
                          Интенсив по логарифмам
                        </div>
                        <div class="text-blue-500 text-[13px] font-semibold font-['Manrope'] leading-[13px]">
                          Четверг
                        </div>
                      </div>
                    </div>
                    <div class="justify-start items-center gap-2.5 inline-flex">
                      <div class="w-[58px] h-11 p-2.5 bg-blue-100 rounded-[5px] justify-center items-center gap-2.5 flex">
                        <div class="text-blue-500 text-[13px] font-bold font-['Manrope'] leading-[13px]">
                          15:00
                        </div>
                      </div>
                      <div class="flex-col justify-center items-start gap-[5px] inline-flex">
                        <div class="text-neutral-900 text-[15px] font-bold font-['Manrope']">
                          Интенсив по логарифмам
                        </div>
                        <div class="text-blue-500 text-[13px] font-semibold font-['Manrope'] leading-[13px]">
                          Субботу
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[1px] h-[680px] bg-neutral-400 "></div>
          <div className="w-[60%] flex-col">
            <div class="w-[100%] h-[150px] rounded-[20px] flex items-center border justify-center items-start gap-[70px] inline-flex ">
              <div class="flex-col justify-start items-start inline-flex">
                <div class="text-teal-700 text-3xl font-bold font-['Manrope']">Цель:</div>
                <div class="w-[310px] text-neutral-900 text-xl font-normal font-['Manrope']">
                  Программная инженерия МФТИ
                </div>
              </div>
              <div class="flex-col justify-start items-start gap-[7px] inline-flex">
                <div class="text-teal-700 text-[25px] font-bold font-['Manrope']">
                  Средний балл:
                </div>
                <div class="w-[57px] text-neutral-900 text-xl font-normal font-['Manrope']">
                  281
                </div>
              </div>
              <div class="flex-col justify-start items-start gap-[7px] inline-flex">
                <div class="text-teal-700 text-[25px] font-bold font-['Manrope']">
                  Город:
                </div>
                <div class="w-[147px] text-neutral-900 text-xl font-normal font-['Manrope']">
                  Долгопрудный
                </div>
              </div>
            </div>
            <div className="flex items-left text-left mt-8 justify-left">
              <div class="w-[30%] h-[105px] flex-col justify-start items-start gap-2.5 inline-flex">
                <div class="self-stretch text-black  text-3xl font-bold font-['Manrope']">
                  Твои курсы
                </div>
                <div class="w-[100%] text-neutral-700 text-xl font-normal font-['Manrope']">
                  На данный момент вы не проходите ни один курс
                </div>
              </div>
            </div>
            <div className="w-[100%]">
              <div class="w-[50%] h-56 flex-col justify-left items-left gap-5  mt-5 text-left flex">
                <div class="text-black text-3xl font-bold font-['Manrope']">
                  Персональные предложения
                </div>
                <div class="px-10 py-5 rounded-[10px] border border-black flex-col justify-start items-start gap-[15px] flex">
                  <div class="flex-col justify-start items-start flex">
                    <div class="text-neutral-900 text-[25px] font-bold font-['Manrope']">
                      Math Study
                    </div>
                    <div class="text-neutral-900 text-xl font-normal font-['Manrope']">
                      «18-ая задача Профильная математика»
                    </div>
                  </div>
                  <div class="w-[383px] justify-start items-start gap-[15px] inline-flex">
                    <div class="grow shrink basis-0 h-[41px] justify-start items-start gap-[5px] flex">
                      <div class="text-teal-700 text-3xl font-extrabold font-['Manrope']">
                        7900 ₽
                      </div>
                      <div class="text-neutral-700 text-xl font-extrabold font-['Manrope']">
                        10000 ₽
                      </div>
                    </div>
                    <div class="px-5 py-2.5 rounded-[7px] border border-teal-700 justify-center items-center gap-2.5 flex">
                      <div class="text-teal-700 text-xl font-normal font-['Manrope']">
                        Купить
                      </div>
                    </div>
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

export default Profile;
