export function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-16">
      <div className="max-w-4xl mx-auto px-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}
