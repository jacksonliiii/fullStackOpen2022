interface HeaderProps {
  name: string;
}

interface PartProps {
  part: CoursePart;
}

interface CoursePartsProps {
  contents: CoursePart[];
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartRequirements extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartRequirements;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic",
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group",
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic",
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial:
      "https://type-level-typescript.com/template-literal-types",
    kind: "background",
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "TypeScript in frontend with reqs",
    exerciseCount: 7,
    description: "a harder part",
    requirements: ["js", "jest"],
    kind: "special",
  },
];

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header = (props: HeaderProps) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  );
};

const Part = (props: PartProps) => {
  const part = props.part;

  switch (part.kind) {
    case "basic":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p>{part.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p>Project exercises: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p>{part.description}</p>
          <p>Submit to: {part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <p>{part.description}</p>
          Required skills: {part.requirements.join(", ")}
        </div>
      );
    default:
      return assertNever(part);
  }
};

const Content = (props: CoursePartsProps) => {
  return (
    <div>
      {props.contents.map((content) => {
        return (
          <div key={content.name}>
            <Part part={content} />
          </div>
        );
      })}
    </div>
  );
};

const Total = (props: CoursePartsProps) => {
  return (
    <div>
      <p>
        Number of exercises:{" "}
        {props.contents.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  return (
    <div>
      <Header name={courseName} />
      <Content contents={courseParts} />
      <Total contents={courseParts} />
    </div>
  );
};

export default App;
