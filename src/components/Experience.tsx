interface props {
  icon: React.ReactNode;
  title: string;
  date: string;
  description: React.ReactNode;
}

export const Experience = (props: props) => {
  const { icon, title, date, description } = props;

  return (
    <div className="flex relative mt-4 ">
      <div className="sm:block hidden absolute inset-0 md:text-3xl text-2xl w-8 h-10 dark:bg-dark-background bg-light-background">
        {icon}
      </div>
      <div className="flex sm:pl-[2.1rem] sm:ml-[0.9rem] flex-col gap-y-2 sm:border-l-2 border-l-light-extra-transparent dark:border-l-dark-extra-transparent">
        <div className="title md:text-2xl text-xl">{title}</div>
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
