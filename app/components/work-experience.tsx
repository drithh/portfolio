import { Experience } from "./experience";
import { IoCodeSlash } from "react-icons/io5";
import { SlGraduation } from "react-icons/sl";

export const WorkExperience = () => {
  return (
    <section id="experience" className="text-justify">
      <div className="title mb-4 mt-16 text-left font-title text-4xl font-bold tracking-wide md:text-5xl">
        Education & Work
      </div>
      <div className="mt-8 flex flex-col">
        <Experience
          icon={<IoCodeSlash />}
          title="Backend Developer"
          date="August 2024 - Present"
          description={
            <div>
              <div className="">Data Sintesa</div>
              <ul className="list-disc pl-6 text-secondary-foreground">
                <li>
                  Backend Developer using NestJS (for web services), Python (for
                  data processing and exporting), PostgreSQL, Redis, and BullMQ
                </li>
                <li>
                  Built and maintained features in a data-intensive platform
                  that enables users to analyze and visualize data from multiple
                  sources via interactive dashboards
                </li>
                <li>
                  Leveraged BullMQ with Redis to handle background job queues
                  and inter-service communication efficiently
                </li>
                <li>
                  Developed data ingestion, transformation, and export pipelines
                  using Python to support advanced analytics workflows
                </li>
              </ul>
            </div>
          }
        />
        <Experience
          icon={<IoCodeSlash />}
          title="Freelance"
          date="June 2024 - September 2024"
          description={
            <div className="flex flex-col gap-2">
              <div>
                <div className="">Pilates Website</div>
                <ul className="list-disc pl-6 text-secondary-foreground">
                  <li>
                    Fullstack Developer using NextJS, TailwindCSS, TypeScript,
                    and MySQL
                  </li>
                  <li>
                    Featured a complete system where users could purchase
                    packages, book classes, loyalty and track milestones. The
                    admin panel allowed for comprehensive data management,
                    including discount management.
                  </li>
                </ul>
              </div>
              <div>
                <div className="">Wijaya Door Website</div>
                <ul className="list-disc pl-6 text-secondary-foreground">
                  <li>
                    Company Portfolio Website using NextJS with Plasmic to
                    enable the client to manage the content easily, Has a 3D
                    Door customizer that allows users to customize the door
                    design and see the preview before ordering using ThreeJS
                  </li>
                </ul>
              </div>
            </div>
          }
        />
        <Experience
          icon={<IoCodeSlash />}
          title="Internship"
          date="Sep 2022 - June 2024"
          description={
            <>
              <div className="">
                Sebelas Maret University School ERP Project
              </div>
              <ul className="list-disc pl-6 text-secondary-foreground">
                <li>Fullstack Developer specializing in Golang and ReactJS</li>
                <li>
                  Modernized the frontend application by introducing TypeScript,
                  Tanstack Query, and Vite to enhance performance and developer
                  experience
                </li>
                <li>
                  Introduced OpenAPI Specification (OAS) for improved API
                  documentation and tighter coupling between frontend and
                  backend
                </li>
              </ul>
            </>
          }
        />
        <Experience
          icon={<IoCodeSlash />}
          title="Freelance"
          date="Mar 2021 - Nov 2021"
          description={
            <>
              <div className="">P!NGFEST2021</div>
              <ul className="list-disc pl-6 text-secondary-foreground">
                <li>
                  Designed & Implemented Home UI for website and mobile view
                </li>
                <li>
                  Improved User Experience by beautifying the website with
                  animations
                </li>
              </ul>
            </>
          }
        />
        <Experience
          icon={<SlGraduation />}
          title="College"
          date="July 2020 - June 2024"
          description={
            <>
              <div className="">
                Sebelas Maret University, Bachelor of Computer Science (3.92)
              </div>
              <ul className="list-disc pl-6 text-secondary-foreground">
                <li>Lecture assistant for Programming Concepts Lab</li>
                <li>Lecture assistant for Web Programming Lab</li>
                <li>Research Assistant in the field of Federated Learning</li>
              </ul>
            </>
          }
        />
      </div>
    </section>
  );
};
