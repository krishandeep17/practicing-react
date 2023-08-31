import { PostProvider } from "./PostContext";
import { Archive, Footer, Header, Main, ThemeToggleBtn } from "./components";

export default function App() {
  return (
    <section>
      <ThemeToggleBtn />

      <PostProvider>
        <Header />
        <Main />
        <Archive />
        <Footer />
      </PostProvider>
    </section>
  );
}
