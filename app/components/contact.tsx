import * as React from "react";
import {
  FiInstagram,
  FiFacebook,
  FiGithub,
  FiMail,
  FiLinkedin,
  FiArrowUpRight,
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
    <section id="contact" className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          [05] // Get In Touch
        </div>
        <h2 className="font-title text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Say Hi!
        </h2>
        <div className="flex max-w-2xl flex-col gap-2 text-base leading-relaxed text-secondary-foreground">
          <p>
            Though, I am fairly introverted myself. I do reply to messages as
            long as my human interaction battery lasts. Coding, work, or even
            useless stuff, anything is cool. So feel free to message me on any
            of my social media or shoot me an{" "}
            <a
              href="mailto:contact@drith.me"
              className="font-medium text-foreground underline underline-offset-4 hover:opacity-80"
            >
              email.
            </a>
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Don&apos;t be afraid to contact me!
          </p>
        </div>
      </div>

      {/* Contact Channels Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between rounded-xl border border-border/70 bg-card/40 p-3.5 transition-all duration-200 hover:border-foreground/30 hover:bg-card hover:shadow-sm active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="text-xl text-foreground/80 transition-colors group-hover:text-foreground"
              >
                {React.isValidElement(link.icon)
                  ? React.cloneElement(
                      link.icon as React.ReactElement<Record<string, unknown>>,
                      {
                        role: "presentation",
                        "aria-hidden": "true",
                        focusable: "false",
                      },
                    )
                  : link.icon}
              </span>
              <span className="font-sans text-sm font-medium text-foreground">
                {link.label}
              </span>
            </div>
            <FiArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            />
          </a>
        ))}
      </div>
    </section>
  );
};
