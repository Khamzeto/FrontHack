function Navbar() {
  const handleRemoveToken = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  return (
    <div className="App">
      <header className="bg-white h-[80px] w-[100%] flex  items-center px-4">
        <div className="flex w-[80%] justify-around ml-[16%]"></div>
      </header>
    </div>
  );
}

export default Navbar;
