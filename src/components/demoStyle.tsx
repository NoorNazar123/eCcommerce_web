const DemoStyle = () => {
  return (
    <div className="layout-container  text-center">
      <h1 className="mb-10 heading-h2 mx-auto">eCommerce buid</h1>
      <div className="  text-primary bg-decent-foreground ">
        <h1 className="heading-h1 leading-[70px] mb-10">Hello, Tailwind!</h1>
        <h2 className="heading-h2">Testinf test</h2>
        <p className="text-lg font-serif text-muted-foreground">
          This is a paragraph with the Merriweather font.
        </p>

        <p className="para">test</p>
        <code className="font-mono text-accent">
          console.log('Tailwind with custom fonts!');
        </code>
        <div className="space-y-4 space-x-2">
          {/* <button className="btn btn-primary">Primary Button</button> */}
          <button className="btn btn-secondary">Secondary Button</button>
          <button className="btn btn-outline">Outline Button</button>
          {/* <button className="btn btn-ghost">Ghost Button</button> */}
          <button className="btn btn-danger">Danger Button</button>
        </div>
      </div>
    </div>
  );
};

export default DemoStyle;
