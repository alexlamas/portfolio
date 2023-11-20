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
        <div
          id="form"
          className="flex flex-col gap-4 align-start cursor-default"
        >
          <h1 className="text-left text-md leading-normal dark:text-white">
            Enter the magic word to continue
          </h1>
          <form autoComplete="off">
            <input
              className="mb-5 w-full dark:text-white dark:bg-neutral-700 hover:dark:bg-neutral-600 p-2 bg-neutral-200 hover:bg-neutral-300 focus:bg-white rounded transition"
              type="password"
              id="password"
              required
              autoFocus
              autoComplete="new-password"
            />
            <button
              className="rounded bg-black px-4 py-3 font-bold text-white w-full"
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
