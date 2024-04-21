import { useEffect, useState } from 'react';
import AddModal from '../AddModal/AddModal';
import { Link, useNavigate } from 'react-router-dom';
import NavbarAuth from '../NavbarAuth';
import Navbar from '../Navbar';

function Students({ setAddModal }) {
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4007/auth/`, {
          headers: {},
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
      {isLoggedIn ? <Navbar /> : <NavbarAuth />}
      <div className="h-[100%] my-[6%] w-[100%]   ">
        <div class="w-[100%] h-[68px] pl-[30px] pr-2.5 py-2.5 justify-start items-center flex">
          <input
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Найти других студентов"
            class="w-[40%] h-[68px] pl-[30px] pr-2.5 py-2.5 rounded-[76px] border border-teal-700 justify-start items-center gap-[187px] inline-flex"
          />
          <select
            value={searchType}
            onChange={handleSelectChange}
            className="h-[68px]  px-5 pl-5 w-[20%] border border-teal-700 rounded-[20px] justify-start items-center gap-[187px] inline-flex mx-5"
            style={{
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              appearance: 'none',
              paddingRight: '1rem',
              paddingLeft: '1rem',
              cursor: 'pointer',

              backgroundSize: '30px',
            }}
          >
            <option value="name">По ФИО</option>
            <option value="university">По университету</option>
            <option value="direction">По направлению</option>
          </select>

          <button class="px-[40px] absolute right-[60%] py-4 bg-teal-700 rounded-[29px] justify-start items-start gap-2.5 flex">
            <div class="w-[100%] text-center text-white text-base font-normal font-['Manrope'] leading-none">
              Найти
            </div>
          </button>
        </div>
        <div className="w-[100%] flex mx-2 flex-wrap ">
          {data
            ?.filter(item => {
              if (searchType === 'name') {
                return item.name.toLowerCase().includes(searchTerm.toLowerCase());
              } else if (searchType === 'university') {
                return item.university?.toLowerCase().includes(searchTerm.toLowerCase());
              } else if (searchType === 'direction') {
                return item.directions?.toLowerCase().includes(searchTerm.toLowerCase());
              }
              return true;
            })
            .map((item, index) => (
              <div
                key={index}
                className="w-[20%] h-36 my-[4%] mx-8 px-[25px] py-5 bg-white rounded-[10px] border border-teal-700 flex-col justify-start items-start gap-3.5 inline-flex"
              >
                <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
                  <img
                    className="w-[60px] h-[60px] rounded-[30px]"
                    src={item.avatar}
                    alt={item.name}
                  />
                  <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                    <div className="self-stretch h-[46px] flex-col justify-start items-start gap-[3px] flex">
                      <div className="text-gray-900 text-lg font-extrabold font-['Manrope']">
                        {item.name}
                      </div>
                      <div className="text-gray-500 text-[13px] font-normal font-['Manrope']">
                        {item.faculty},{item.directions}
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  href="http://localhost:3000/"
                  className="self-stretch px-2.5 py-2 bg-teal-700 rounded-[7px] justify-center items-center gap-2.5 inline-flex"
                >
                  <div className="text-center text-white text-[10px] font-normal font-['Manrope']">
                    Связаться
                  </div>
                </a>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Students;
