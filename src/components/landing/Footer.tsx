const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row">
        <p>© {year} MIIX Automations. All rights reserved.</p>
        <nav className="flex items-center gap-6">
          <a href="#features" className="hover:underline">Features</a>
          <a href="#process" className="hover:underline">Process</a>
          <a href="#cta" className="hover:underline">Contact</a>
          <a href="/" className="hover:underline">Privacy</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
