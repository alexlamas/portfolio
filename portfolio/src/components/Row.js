function Row({ children }) {
  return (
    <div className="hover:bg-zinc-200/20 dark:hover:bg-zinc-800/20">
      <div className="w-9/12 xl:w-[1024px] mx-auto ">{children}</div>
    </div>
  );
}

export default Row;
