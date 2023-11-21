import {
  LinkedinLogo,
  ReadCvLogo,
  EnvelopeSimple,
  ArrowUpRight,
} from "@phosphor-icons/react";

function NavLink({ text, hidden, href, iconName }) {
  const fetchIcon = () => {
    switch (iconName) {
      case "LinkedinLogo":
        return (
          <LinkedinLogo
            size={16}
            className="opacity-80 group-hover:invisible group-hover:scale-90 transition"
          />
        );
      case "ReadCvLogo":
        return (
          <ReadCvLogo
            size={16}
            className="opacity-80 group-hover:invisible group-hover:scale-90 transition"
          />
        );
      case "EnvelopeSimple":
        return (
          <EnvelopeSimple
            size={16}
            className="opacity-80 group-hover:invisible group-hover:scale-90 transition"
          />
        );
      default:
        return <></>;
    }
  };
  return (
    <a
      className={`${
        hidden ? "hidden lg:flex" : "flex"
      } text-foreground/50 font-mono group-hover:text-foreground/80 transition flex-nowrap px-6 py-4 group gap-2 items-center "`}
      href={href}
    >
      {iconName && fetchIcon()}
      <ArrowUpRight
        size={16}
        className="opacity-80 invisible group-hover:visible fixed transition"
      />
      {text}
    </a>
  );
}

export default NavLink;
