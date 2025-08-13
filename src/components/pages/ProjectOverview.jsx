import React from "react";

/**
 * Component that presents a detailed description of the current project.
 * Used in the system's informational section to explain the goal, tasks,
 * timeline, and artifacts of the "Tech Volunteer Scheduling App" project.
 */
const ProjectOverview = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">
        📝 Project Description
      </h1>

      <div className="grid gap-6">
        {/* Section: Project Title */}
        <Card title="Project Title">Tech Volunteer Scheduling App</Card>

        {/* Section: Category */}
        <Card title="Project Category">Personal professional development</Card>

        {/* Section: Summary */}
        <Card title="Project Summary">
          This web application connects schools with tech volunteers willing to
          give talks or classes. It uses <strong>React</strong> for the
          frontend, <strong>Node.js</strong> on the backend, and{" "}
          <strong>PostgreSQL</strong> as the database, all deployed on{" "}
          <strong>Render</strong>.<br />
          <br />
          Available roles: <em>school</em>, <em>volunteer</em>, and{" "}
          <em>administrator</em>. Includes interactive calendar, booking forms,
          and responsive system.
        </Card>

        {/* Section: Problem */}
        <Card title="Specific Problem">
          Many schools lack a way to contact volunteer tech professionals,
          limiting students' access to real-world sector experiences.
        </Card>

        {/* Section: Goal */}
        <Card title="Measurable Goal">
          Create and deploy a functional platform with role-based
          authentication, dynamic calendar, and bookings. It will be tested with
          1 school and 3 volunteers.
        </Card>

        {/* Section: Professional Objectives */}
        <Card title="Professional Objectives">
          Develop full-stack skills, experience in authentication/authorization,
          and lead a socially impactful project.
        </Card>

        {/* Section: Tasks and Timeline */}
        <Card title="Tasks and Timeline">
          <ul className="list-disc list-inside space-y-1">
            <li>Research similar platforms – 4h</li>
            <li>Design database – 4h</li>
            <li>React frontend – 12h</li>
            <li>Node.js backend + PostgreSQL – 10h</li>
            <li>Login and role management – 6h</li>
            <li>Calendar + booking – 8h</li>
            <li>Testing and UI improvements – 3h</li>
            <li>Final documentation – 3h</li>
            <li className="font-semibold">⏱ Estimated total: 50 hours</li>
          </ul>
        </Card>

        {/* Section: Artifacts */}
        <Card title="Project Artifacts">
          <ul className="list-none space-y-6">
            <li className="flex items-center gap-4">
              <ImageWithModal
                src="../../src/assets/Diagram.png"
                alt="ER Diagram"
                className="w-20 h-20 object-contain rounded cursor-pointer"
              />
              <span className="text-lg font-medium">ER diagram</span>
            </li>
            <li className="flex items-center gap-4">
              <ImageWithModal
                src="../../src/assets/Wireframe.png"
                alt="Wireframes and UI"
                className="w-20 h-20 object-contain rounded cursor-pointer"
              />
              <span className="text-lg font-medium">Wireframes and UI</span>
            </li>
            <li className="flex items-center gap-4">
              <ImageWithModal
                src="../../src/assets/github.png"
                alt="Source Code"
                className="w-20 h-20 object-contain rounded cursor-pointer"
              />
                <ImageWithModal
                src="../../src/assets/github2.png"
                alt="Source Code"
                className="w-20 h-20 object-contain rounded cursor-pointer"
              />
              <span className="text-lg font-medium">Source code </span>
            </li>
            <li className="flex items-center gap-4">
              <ImageWithModal
                src="../../src/assets/home.png"
                alt="Screenshots"
                className="w-20 h-20 object-contain rounded cursor-pointer"
              />
                <ImageWithModal
                src="../../src/assets/Login.png"
                alt="Screenshots"
                className="w-20 h-20 object-contain rounded cursor-pointer"
              />
                <ImageWithModal
                src="../../src/assets/register.png"
                alt="Screenshots"
                className="w-20 h-20 object-contain rounded cursor-pointer"
              />
                <ImageWithModal
                src="../../src/assets/img1.png"
                alt="Screenshots"
                className="w-20 h-20 object-contain rounded cursor-pointer"
              />
                <ImageWithModal
                src="../../src/assets/img3.png"
                alt="Screenshots"
                className="w-20 h-20 object-contain rounded cursor-pointer"
              />
              <span className="text-lg font-medium">Screenshots </span>
            </li>
            <li className="flex items-center gap-4">
              <ImageWithModal
                src="../../src/assets/Documentation.png"
                alt="Technical Documentation"
                className="w-20 h-20 object-contain rounded cursor-pointer"
              />
              <span className="text-lg font-medium">Technical documentation</span>
            </li>
          </ul>
        </Card>
      </div>
    </section>
  );
};

/**
 * Componente reusable para mostrar una imagen que al hacer click se abre en modal.
 */
const ImageWithModal = ({ src, alt, className }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={className}
        onClick={openModal}
        loading="lazy"
      />
      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 cursor-pointer"
        >
          <img
            src={src}
            alt={alt}
            className="max-w-[90vw] max-h-[90vh] shadow-lg"
            onClick={(e) => e.stopPropagation()} // evita cerrar al clicar la imagen
          />
        </div>
      )}
    </>
  );
};

/**
 * Reusable component to display each project section.
 * @param {string} title - Section title.
 * @param {ReactNode} children - Section content.
 */
const Card = ({ title, children }) => (
  <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-blue-600">
    <h2 className="text-xl font-semibold text-blue-700 mb-2">{title}</h2>
    <div className="text-gray-800 text-base leading-relaxed">{children}</div>
  </div>
);

export default ProjectOverview;

