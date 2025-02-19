const DemoStyle = () => {
  return (
    <div className="layout-container bg-[#c525255e]">
      <div className="  text-primary bg-decent-foreground ">
        <h1 className="heading-text leading-[70px]">Hello, Tailwind!</h1>
        <h2 className="heading-h2">Testinf test</h2>
        <p className="text-lg font-serif text-muted-foreground">
          This is a paragraph with the Merriweather font.
        </p>
        <span className="btn text-xl">button</span>
        <p className="para-text">test</p>
        <code className="font-mono text-accent">
          console.log('Tailwind with custom fonts!');
        </code>
        <div className="mt-4 space-x-2">
          <button className="btn btn-primary">Primary Button</button>
          <button className="btn btn-secondary">Secondary Button</button>
          <button className="btn btn-outline">Outline Button</button>
          <button className="btn btn-ghost">Ghost Button</button>
          <button className="btn btn-danger">Danger Button</button>
        </div>
      </div>
    </div>
  );
};

export default DemoStyle;
