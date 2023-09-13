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
      <div className="absolute inset-0 hidden h-10 w-8 bg-light-background text-2xl dark:bg-dark-background sm:block md:text-3xl">
        {icon}
      </div>
      <div className="flex flex-col gap-y-2 border-l-light-extra-transparent dark:border-l-dark-extra-transparent sm:ml-[0.9rem] sm:border-l-2 sm:pl-[2.1rem]">
        <div className="title text-xl md:text-2xl">{title}</div>
        <div className="date text-light-extra-transparent dark:text-dark-extra-transparent">
          {date}
        </div>
        <div className="desc text-light-transparent dark:text-dark-transparent">
          {description}
        </div>
      </div>
    </div>
  );
};
