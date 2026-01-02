import { Header } from "../components/header/header";
import { Hero } from "../components/Hero";
import { PostList } from "../components/PostList";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <PostList />
    </>
  );
}
