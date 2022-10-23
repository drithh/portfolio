interface props {
  icon: React.ReactNode;
  title: string;
  date: string;
  description: React.ReactNode;
}

export const Experience = (props: props) => {
  const { icon, title, date, description } = props;

  return (
    <div className="flex relative mt-4">
      <div className="sm:block hidden absolute inset-0 text-3xl w-8 h-10 dark:bg-dark-background bg-light-background">
        {icon}
      </div>
      <div className="flex sm:pl-[2.1rem] sm:ml-[0.9rem] flex-col gap-y-2 sm:border-l-2">
        <div className="title text-2xl">{title}</div>
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
