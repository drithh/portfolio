interface props {
  icon: React.ReactNode;
  title: string;
  date: string;
  description: React.ReactNode;
}

export const Experience = (props: props) => {
  const { icon, title, date, description } = props;

  return (
    <div className="relative mt-4 flex ">
      <div className="absolute inset-0 hidden h-10 w-8 bg-background text-2xl text-secondary-foreground sm:block md:text-3xl">
        {icon}
      </div>
      <div className="flex flex-col gap-y-2 border-l-accent-foreground sm:ml-[0.9rem] sm:border-l-2 sm:pl-[2.1rem]">
        <div className="title text-xl md:text-2xl">{title}</div>
        <div className="date text-accent-foreground">{date}</div>
        <div className="desc max-w-xl text-justify text-secondary-foreground">
          {description}
        </div>
      </div>
    </div>
  );
};
