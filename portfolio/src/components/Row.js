import Border from "./Border";
function Row({ children, sibling }) {
  return sibling ? (
    <>
      <div className="hover:bg-foreground/[0.02]">
        <div className="w-9/12 xl:w-[1024px] mx-auto ">
          <div className="flex items-stretch">
            <div className=" basis-full md:border-r border-border">
              {children}
            </div>
            <div className=" basis-full hidden md:block">{sibling}</div>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <Border />
        <div className="hover:bg-foreground/[0.02]">
          <div className="w-9/12 xl:w-[1024px] mx-auto ">
            <div className="flex">{sibling}</div>
          </div>
        </div>
      </div>
      <Border />
    </>
  ) : (
    <>
      <div className="hover:bg-foreground/[0.02]">
        <div className="w-9/12 xl:w-[1024px] mx-auto ">{children}</div>
      </div>
      <Border />
    </>
  );
}

export default Row;
