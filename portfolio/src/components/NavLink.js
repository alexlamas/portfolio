import {
  LinkedinLogo,
  ReadCvLogo,
  EnvelopeSimple,
  ArrowUpRight,
} from "@phosphor-icons/react";

function NavLink({ text, hidden, href, iconName }) {
  const iconClasses =
    "opacity-80 group-hover:invisible group-hover:scale-90 transition text-foreground/50 ";
  const fetchIcon = () => {
    switch (iconName) {
      case "LinkedinLogo":
        return <LinkedinLogo size={16} className={iconClasses} />;
      case "ReadCvLogo":
        return <ReadCvLogo size={16} className={iconClasses} />;
      case "EnvelopeSimple":
        return <EnvelopeSimple size={16} className={iconClasses} />;
      default:
        return <></>;
    }
  };
  return (
    <a
      className={`${
        hidden ? "hidden lg:flex" : "flex"
      }  text-foreground/50 font-mono hover:text-highlight transition flex-nowrap px-6 py-4 group gap-2 items-center "`}
      href={href}
    >
      {iconName && fetchIcon()}
      <ArrowUpRight
        size={16}
        className="text-highlight invisible group-hover:visible fixed transition"
      />
      {text}
    </a>
  );
}

export default NavLink;
