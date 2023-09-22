import { PostProvider } from "./contexts/PostContext";
import { SearchProvider } from "./contexts/SearchContext";
import { Archive, Footer, Header, Main, ThemeToggleBtn } from "./components";

export default function App() {
  return (
    <section>
      <ThemeToggleBtn />

      <SearchProvider>
        <PostProvider>
          <Header />
          <Main />
          <Archive />
          <Footer />
        </PostProvider>
      </SearchProvider>
    </section>
  );
}
