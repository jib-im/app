const RootHead = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
};

export default RootHead;
