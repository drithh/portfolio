import {
  FiInstagram,
  FiFacebook,
  FiGithub,
  FiMail,
  FiLinkedin,
} from "react-icons/fi";

const socialLinks = [
  {
    icon: <FiInstagram />,
    url: "https://www.instagram.com/adrielalfeus/",
    label: "Instagram",
  },
  {
    icon: <FiFacebook />,
    url: "https://www.facebook.com/adrielalfeus/",
    label: "Facebook",
  },
  {
    icon: <FiLinkedin />,
    url: "https://www.linkedin.com/in/adrielalfeus/",
    label: "LinkedIn",
  },
  {
    icon: <FiGithub />,
    url: "https://github.com/Drithh",
    label: "Github",
  },
  {
    icon: <FiMail />,
    url: "mailto:adrielafelsu@gmail.com",
    label: "Email",
  },
];

export const Contact = () => {
  return (
    <section id="contact" className="section mb-20 text-justify">
      <div className="header mt-12 flex flex-col place-content-start place-items-start gap-y-2">
        <div className="title mb-4 text-left font-title text-4xl font-bold tracking-wider md:text-5xl">
          Say Hi!
        </div>
        <div className="desc text-secondary-foreground ">
          Though, I am fairly introverted myself. I do reply to messages as long as
          my human interaction battery lasts. Coding, work, or even useless stuff,
          anything is cool. So feel free to message me on any of my social media or
          shoot me an <a href="mailto:contact@drith.me">email.</a>
        </div>
        <div className="mt text-secondary-foreground ">
          Don&apos;t be afraid to contact me!
        </div>
      </div>
      <div className="contact-list mt-5 mb-20 flex gap-5 text-2xl md:text-3xl">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="text-accent-foreground hover:text-secondary-foreground"
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </section>
  );
};
