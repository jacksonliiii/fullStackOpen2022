interface HeaderProps {
  name: string;
}

interface Content {
  id: number;
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  contents: Content[];
}

interface TotalProps {
  contents: Content[];
}

const Header = (props: HeaderProps) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  );
};

const Content = (props: ContentProps) => {
  return (
    <div>
      <p>
        {props.contents.map((content) => {
          return (
            <li key={content.id}>
              {content.name} {content.exerciseCount}
            </li>
          );
        })}
      </p>
    </div>
  );
};

const Total = (props: TotalProps) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.contents.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      id: 1,
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      id: 2,
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      id: 3,
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header name={courseName}/>
      <Content contents={courseParts}/>
      <Total contents={courseParts}/>
    </div>
  );
};

export default App;
