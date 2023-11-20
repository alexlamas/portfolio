import { ArrowRight } from "@phosphor-icons/react";

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
    <div className="">
      {isAuthenticated === false && (
        <div id="form" className="p-8 cursor-default flex flex-col gap-4 peer">
          <h1 className="text-left text-sm text-foreground/50 leading-normal font-bold ">
            Enter the magic word to continue:
          </h1>
          <form
            className="flex shadow-sm key border-0 ring-inset ring-foreground/10 ring-1 focus-within:shadow focus-within:outline-none mb-2 bg-background hover:bg-foreground/3 focus-within-hover:bg-background focus-within:bg-background rounded-md transition"
            autoComplete="off"
          >
            <input
              className="bg-transparent focus:outline-none key w-full h-11 mx-3"
              id="password"
              required
              autoFocus
              autoComplete="new-password"
            />
            <div className="m-2">
              <button
                className="flex items-center justify-center w-7 h-7 align-self-end focus:outline-none focus:ring-blue-500 focus:ring-2 rounded-full bg-foreground hover:animate-bounce p-1 font-bold text-white w-full"
                onClick={checkPassword}
              >
                <ArrowRight className="text-background" weight="bold" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Form;
