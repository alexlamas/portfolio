const Form = ({ setAuthentication, isAuthenticated }) => {
  const checkPassword = () => {
    var password = document.getElementById("password").value;
    if (password === "bomba") {
      setAuthentication(true);
    } else {
      alert("Incorrect password");
    }
  };
  return (
    <>
      {isAuthenticated === false && (
        <div id="form" className="flex flex-col gap-4 cursor-default">
          <h1 className="text-left text-md leading-normal ">
            Enter the magic word to continue
          </h1>
          <form autoComplete="off">
            <input
              className="focus:outline-none focus:ring-2 mb-5 w-full p-2 bg-foreground/5 hover:bg-foreground/10 focus:bg-foreground/10 rounded transition"
              type="password"
              id="password"
              required
              autoFocus
              autoComplete="new-password"
            />
            <button
              className="focus:outline-none focus:ring-2 rounded bg-black px-4 py-3 font-bold text-white w-full"
              onClick={checkPassword}
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Form;
