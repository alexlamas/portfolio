const Form = () => {
  const checkPassword = () => {
    console.log("checking password");
    var password = document.getElementById("password").value;
    if (password === "bomba") {
      document.getElementById("password").value = "";
      document.getElementById("figma").classList.remove("hidden");
      document.getElementById("form").classList.add("hidden");
    } else {
      alert("Incorrect password");
    }
  };
  return (
    <div id="form" className="flex flex-col gap-4 align-start cursor-default">
      <h1 className="text-left text-md leading-normal dark:text-white">
        Enter the magic word to continue
      </h1>
      <form autoComplete="off">
        <input
          autocomplete="false"
          name="hidden"
          type="text"
          style={{ display: "none" }}
        />
        <input
          className="mb-4 w-full dark:text-white dark:bg-neutral-700 hover:dark:bg-neutral-600 px-2 py-1 bg-neutral-100 hover:bg-neutral-200 focus:bg-white rounded"
          type="password"
          id="password"
          required
          autoComplete="new-password"
        />
        <button
          className="rounded bg-black px-4 py-2 font-bold text-white w-full"
          onClick={checkPassword}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
