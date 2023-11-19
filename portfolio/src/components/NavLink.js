function NavLink(props) {
  return (
    <a
      className={`${
        props.hidden ? "hidden lg:flex" : "flex"
      } flex-nowrap font-mono px-6 py-4 group flex-row gap-2 items-center "`}
      href={props.href}
      target={props.target}
    >
      {props.text}{" "}
      {props.shortcut && (
        <div className=" rounded dark:bg-neutral-100/10 bg-neutral-200 w-5 h-5 flex items-center justify-center font-semibold text-[10px] group-hover:bg-neutral-300  dark:group-hover:bg-neutral-200/20">
          {props.shortcut}
        </div>
      )}
    </a>
  );
}

export default NavLink;
