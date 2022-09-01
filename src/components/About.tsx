export const About = () => {
  return (
    <div id="about" className="section mt-20 flex flex-col gap-12">
      <div className="about flex flex-col gap-2 text-justify">
        <div className="mb-3 text-2xl text-light-text text-opacity-50 dark:text-dark-text">
          Ohh you found me?. Howdy!
        </div>
        <div>
          My name is <span className="font-bold">Adriel Alfeus Hutabarat</span>,
          I'm a software developer based in Surakarta, Indonesia. I am a
          self-taught developer and I am passionate about building web
          applications.{' '}
        </div>
        <div>
          I am currently studying at the Sebelas Maret University, Majoring in
          Computer Science. I really like learning new technologies and
          discovering new stuff
        </div>
      </div>
      <div className="tech-stack">
        Here are few technologies that are cup of my coffee
        <div className="grid grid-cols-2">
          <div className="wrapper flex"></div>
        </div>
      </div>
    </div>
  );
};
